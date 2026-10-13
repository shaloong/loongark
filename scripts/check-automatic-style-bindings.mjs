import ts from 'typescript';
import {readFile,readdir,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
const root=resolve(process.argv.find(arg=>arg.startsWith('--root='))?.slice(7)??'.');
const scopes=JSON.parse(await readFile(resolve(root,'packages/primitives/src/automatic-style-scopes.json'),'utf8'));
const normalize=name=>name.toLowerCase().replace(/[^a-z0-9]/g,'');
const owner=name=>name==='LoongArkTextareaControl'||name==='TextareaControl'?'input':scopes.filter(scope=>normalize(name.replace(/^LoongArk/,'')).startsWith(normalize(scope))).sort((a,b)=>normalize(b).length-normalize(a).length)[0];
// Ark 的节点上下文 Provider 不渲染 DOM，不拥有组件样式。
const withoutDOM=new Set(['LoongArkTreeViewNodeProvider']);
const compatible=(expected,actual)=>actual===expected||(expected==='toolbar'&&actual==='app-bar');
const modules=new Map();
async function moduleInfo(file){
 if(modules.has(file))return modules.get(file);
 const source=await readFile(file,'utf8'),ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true);
 const data={source,ast,imports:new Map(),styles:new Map(),locals:new Map(),exports:new Map()};modules.set(file,data);
 for(const node of ast.statements){
  if(ts.isImportDeclaration(node)&&ts.isStringLiteral(node.moduleSpecifier)&&node.importClause?.name&&!node.importClause.isTypeOnly)
   data.imports.set(node.importClause.name.text,{module:node.moduleSpecifier.text,name:'default'});
  if(ts.isImportDeclaration(node)&&ts.isStringLiteral(node.moduleSpecifier)&&node.importClause?.namedBindings&&ts.isNamedImports(node.importClause.namedBindings)){
   for(const binding of node.importClause.namedBindings.elements){
    data.imports.set(binding.name.text,{module:node.moduleSpecifier.text,name:(binding.propertyName??binding.name).text});
    const scope=node.moduleSpecifier.text.split('@loongark/primitives/automatic-styles/')[1];
    if(scope)data.styles.set(binding.name.text,scope);
   }
  }
  if(ts.isVariableStatement(node))for(const declaration of node.declarationList.declarations){
   const name=declaration.name.getText(ast);data.locals.set(name,declaration);
   if(node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword))data.exports.set(name,{local:name});
  }
  if(ts.isFunctionDeclaration(node)&&node.name){
   data.locals.set(node.name.text,node);
   if(node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword))data.exports.set(node.name.text,{local:node.name.text});
  }
  if(ts.isExportDeclaration(node)&&!node.isTypeOnly&&node.exportClause&&ts.isNamedExports(node.exportClause))for(const binding of node.exportClause.elements){
   if(binding.isTypeOnly)continue;
   data.exports.set(binding.name.text,{local:(binding.propertyName??binding.name).text,module:node.moduleSpecifier?.text});
  }
 }
 return data;
}
async function localModule(file,module){
 if(!module.startsWith('.'))throw Error(`外部部件未声明样式：${file}/${module}`);
 if(module.endsWith('.svelte')){
  const candidate=resolve(dirname(file),module);
  await access(candidate);return candidate;
 }
 for(const suffix of ['.ts','.tsx']){
  const candidate=resolve(dirname(file),module+suffix);
  try{await access(candidate);return candidate;}catch{}
 }
 throw Error(`转发模块不存在：${file}/${module}`);
}
const active=new Set(),checked=new Set();
async function validate(file,name,scope){
 const key=file+'|'+name+'|'+scope;
 if(checked.has(key))return;
 // 通用 Portal 只负责传送 children，不渲染组件所属 DOM。
 if(/[\\/]components[\\/]Portal\.svelte$/.test(file)){checked.add(key);return;}
 if(file.endsWith('.svelte')){
  const source=await readFile(file,'utf8');
  const match=[...source.matchAll(/import \{ styles as (\w+) \} from "@loongark\/primitives\/automatic-styles\/([^";]+)";/g)].find(m=>compatible(scope,m[2]));
  if(!match||!source.includes(`registerAutomaticStyles(${match[1]});`))throw Error(`Svelte 组件缺少正确样式声明：${file} → ${scope}`);
  checked.add(key);return;
 }
 if(active.has(key))throw Error(`样式导出循环：${key}`);
 active.add(key);
 const data=await moduleInfo(file),entry=data.exports.get(name);
 if(!entry)throw Error(`缺少真实导出：${key}`);
 if(entry.module)await validate(await localModule(file,entry.module),entry.local,scope);
 else if(!data.locals.has(entry.local)&&data.imports.has(entry.local)){
  const imported=data.imports.get(entry.local);
  await validate(await localModule(file,imported.module),imported.name,scope);
 }else{
  const declaration=data.locals.get(entry.local),call=declaration?.initializer;
  if(!call||!ts.isCallExpression(call)||call.expression.getText(data.ast)!=='withAutomaticStyles'||!compatible(scope,data.styles.get(call.arguments[1]?.getText(data.ast))))throw Error(`组件缺少正确样式声明：${key} → ${scope}`);
  if(!data.source.slice(declaration.name.end,call.getStart(data.ast)).includes('/*#__PURE__*/'))throw Error(`组件缺少可裁剪声明：${key}`);
 }
 active.delete(key);checked.add(key);
}
let count=0;
for(const framework of ['react','vue','solid','svelte'])
 for(const file of await readdir(resolve(root,`packages/${framework}/src/components`))){
  if(!/\.tsx?$/.test(file)||file.endsWith('.d.ts'))continue;
  const path=resolve(root,`packages/${framework}/src/components/${file}`),data=await moduleInfo(path);
  for(const name of data.exports.keys()){
   const scope=owner(name);if(!name.startsWith('LoongArk')||!scope||withoutDOM.has(name))continue;
   await validate(path,name,scope);count++;
  }
 }
// 公开入口可能把未带 LoongArk 前缀的实现转发为公共组件。
for(const framework of ['react','vue','solid','svelte'])
 for(const file of await readdir(resolve(root,`packages/${framework}/src/entries`))){
  if(!file.endsWith('.ts'))continue;
  const path=resolve(root,`packages/${framework}/src/entries/${file}`),data=await moduleInfo(path);
  for(const name of data.exports.keys()){
   const scope=owner(name);if(!name.startsWith('LoongArk')||!scope||withoutDOM.has(name))continue;
   await validate(path,name,scope);count++;
  }
 }
for(const file of await readdir(resolve(root,'packages/svelte/src/components'))){
 if(!file.endsWith('.svelte'))continue;
 const scope=owner(file.slice(0,-7));if(!scope)continue;
 const path=resolve(root,`packages/svelte/src/components/${file}`);
 await validate(path,'default',scope);
 count++;
}
console.log(`自动样式绑定：${count} 个声明覆盖四端真实组件，入口可裁剪。`);
