import ts from 'typescript';
import postcss from 'postcss';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const check=process.argv.includes('--check');
const root='packages/primitives/src';
const marker='__LOONGARK_SELECT_ARROW__';
const parse=async file=>ts.createSourceFile(file,await readFile(file,'utf8'),ts.ScriptTarget.Latest,true);
const declarations=source=>source.statements.filter(ts.isVariableStatement).flatMap(s=>s.declarationList.declarations);
const readCSS=async(file,name)=>{
 const source=await parse(file);const expression=declarations(source).find(d=>d.name.getText(source)===name)?.initializer;
 const text=node=>{
  if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))return node.text;
  if(ts.isTemplateExpression(node))return node.head.text+node.templateSpans.map(span=>{
   if(span.expression.getText(source)!=='selectArrow')throw Error(`不支持的 CSS 插值：${file}`);
   return marker+span.literal.text;
  }).join('');
  if(ts.isBinaryExpression(node)&&node.operatorToken.kind===ts.SyntaxKind.PlusToken&&node.left.getText(source)==='foundationCSS')return text(node.right);
  throw Error(`无法解析 CSS 源：${file}/${name}`);
 };
 if(!expression)throw Error(`缺少 CSS 源：${file}/${name}`);
 return text(expression);
};
const scopes=selector=>[...selector.matchAll(/\[data-scope\s*=\s*(?:"([^"]+)"|'([^']+)'|([\w-]+))\]/g)].map(m=>m[1]??m[2]??m[3]);
const categories=[
 ['extended','extended.ts','css','field'],
 ['data-table','data-table.ts','css','data-table'],
 ['chart','chart.ts','css','chart'],
 ['ark-additions','ark-additions.ts','css','image-cropper'],
 ['ark-next','ark-next.ts','css','date-input'],
 ['icon','icon.ts','css','icon'],
 ['editor','editor.ts','css','editor'],
 ['questionnaire-ranking','questionnaire-ranking.ts','css','questionnaire-ranking'],
 ['virtual-layout','virtual-layout.ts','css','VirtualLayout'],
 ['foundations','shared-styles/foundations.ts','foundationCSS'],
 ['layout','shared-styles/layout.ts','layoutCSS'],
 ['selection','shared-styles/selection-styles.ts','selectionInputsCSS'],
 ['media','shared-styles/media-layout-styles.ts','mediaLayoutCSS'],
 ['actions','shared-styles/speed-dial-styles.ts','actionMediaCSS'],
 ['conversation','shared-styles/conversation-styles.ts','conversationCSS'],
 ['scroller','shared-styles/message-scroller-styles.ts','messageScrollerCSS'],
 ['questionnaire','shared-styles/questionnaire-styles.ts','questionnaireCSS'],
];
async function save(file,content){
 if(check){if(await readFile(file,'utf8')!==content)throw Error(`自动样式不同步：${file}，运行 pnpm generate:styles`);}
 else{await mkdir(resolve(file,'..'),{recursive:true});await writeFile(file,content);}
}
const catalog=new Map();
const assets=new Map();
const categoryKeys=new Map();
for(const [category,file,name,anchor] of categories){
 const css=await readCSS(`${root}/${file}`,name);
 const sheet=postcss.parse(css,{from:file});
 const owned=new Set();sheet.walkRules(rule=>scopes(rule.selector).forEach(scope=>owned.add(scope)));
 const keys=[];
 for(const scope of [...owned].sort()){
  const filter=node=>{
   if(node.type==='rule')return scopes(node.selector).includes(scope)?node.clone():null;
   if(node.type==='atrule'&&node.nodes){
    if(/keyframes$/.test(node.name))return node.clone();
    const children=node.nodes.map(filter).filter(Boolean);
    return children.length?node.clone({nodes:children}):null;
   }
   // 无作用域的声明不应被悄悄丢弃；普通注释不影响级联。
   if(node.type==='comment')return null;
   if(node.type==='rule')return null;
   throw Error(`未归属的 CSS 节点：${file}/${node.type}`);
  };
  const css=postcss.root({nodes:sheet.nodes.map(filter).filter(Boolean)}).toString();
  if(!css)throw Error(`空组件样式：${category}/${scope}`);
  const key=`automatic-${category}-${scope}`;
  keys.push(`primitive-${key}`);
  const usesArrow=css.includes(marker);
  const sourceContract = anchor ? (category==='virtual-layout'?'VirtualLayout':category==='questionnaire-ranking'?'questionnaire-ranking':scope) : undefined;
  const content=`// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 ${file}。\nimport { createPrimitive } from "../core";\n${usesArrow?'import { selectArrow } from "../shared-styles/native-arrow";\n':''}export const style = /*#__PURE__*/ createPrimitive(\n  { name: ${JSON.stringify(key)}, tokens: [], defaults: {} },\n  (theme) => theme.mountStyles(${JSON.stringify(key)}, ${JSON.stringify(css)}${usesArrow?`.split(${JSON.stringify(marker)}).join(selectArrow)`:''}),\n  ${JSON.stringify(sourceContract)},\n);\n`;
  await save(`${root}/automatic-styles/${key}.ts`,content);
  const entry={module:`./${key}`,name:'style'};
  const entries=catalog.get(scope)??[];entries.push(entry);catalog.set(scope,entries);
  assets.set(key,{scope,category,css});
 }
 categoryKeys.set(category,keys);
}
const primitiveOrderSource=await parse(`${root}/style-order.ts`);
const orderInitializer=declarations(primitiveOrderSource).find(d=>d.name.getText(primitiveOrderSource)==='primitiveStyleOrder').initializer;
const order=orderInitializer.expression.elements.map(n=>n.text);
const basics=new Map();
for(const name of order){
 if(name==='neutral-system')continue;
 const filename=name==='pin-input'?'pinInput':name;
 let source;try{source=await parse(`${root}/${filename}.ts`);}catch{continue;}
 const declaration=declarations(source).find(d=>/Primitive$/.test(d.name.getText(source)));
 if(!declaration)continue;
 const primitive=declaration.name.getText(source);
 const entry={module:`../${filename}`,name:primitive};
 const entries=catalog.get(name)??[];entries.unshift(entry);catalog.set(name,entries);basics.set(name,primitive);
}
// HTML 组合部件的依赖不一定出现为框架子组件，需显式保留它们的样式。
const dependencies={
 'data-table':['table','checkbox','input','native-select','button','icon','textarea'],
 questionnaire:['button','input','textarea','native-select','checkbox','radio-group','icon'],
 editor:['button','input','native-select','icon'],
 chart:['icon'],
 'message-scroller':['message','bubble'],
};
const aliases={
 'alert-dialog':['dialog'],calendar:['date-picker'],'context-menu':['menu'],menubar:['menu'],
 command:['combobox'],sheet:['drawer','sheet'],'code-editor':['editor'],'rich-text-editor':['editor'],
 'toolbar':['app-bar'], 'circular-progress':['progress'], 'filter-bar':['filter-bar'],'filter-chip':['filter-bar'],'filter-divider':['filter-bar'],
};
catalog.set('filter-bar',[{module:'../shared-styles/filter-bar',name:'filterBarPrimitive'}]);
for(const [alias,targets] of Object.entries(aliases)){
 // 组合别名保留自身外壳规则，再补齐底层 Ark 部件；不能用别名覆盖已有作用域。
 const entries=[...(catalog.get(alias)??[]),...targets.flatMap(target=>catalog.get(target)??[])];
 catalog.set(alias,entries);
}
const dependenciesFor=scope=>{
 const targets=aliases[scope]??[scope];
 return targets.flatMap(target=>dependencies[target]??[]);
};
for(const scope of [...catalog.keys()]){
 const entries=[...catalog.get(scope),...dependenciesFor(scope).flatMap(target=>catalog.get(target)??[])];
 const unique=[...new Map(entries.map(e=>[`${e.module}:${e.name}`,e])).values()];
 const imports=unique.map((e,index)=>`import { ${e.name} as style${index} } from ${JSON.stringify(e.module)};`).join('\n');
 await save(`${root}/automatic-styles/${scope}.ts`,`// 由 scripts/generate-automatic-styles.mjs 生成；组件样式及内部 HTML 依赖。\n${imports}\nexport const styles = [${unique.map((_,i)=>`style${i}`).join(', ')}];\n`);
}
const cssOrder=['primitive-base'];
for(const name of order){
 const category=categories.find(row=>row[3]===name)?.[0];
 if(category){cssOrder.push(...categoryKeys.get(category));cssOrder.push(`primitive-${category}`);}
 cssOrder.push(`primitive-${name==='VirtualLayout'?'virtual-layout':name}`);
}
cssOrder.push('kit-filter-bar');
for(const [category,,,anchor] of categories)if(!anchor)cssOrder.push(...categoryKeys.get(category));
cssOrder.push('kit-layout');
await save(`${root}/automatic-style-order.ts`,`// 由 scripts/generate-automatic-styles.mjs 生成；动态入口与共享主题使用同一顺序。\nexport const automaticStyleOrder = ${JSON.stringify([...new Set(cssOrder)],null,2)} as const;\n`);
const existing=(await readdir(`${root}/automatic-styles`)).filter(f=>f.endsWith('.ts'));
const expected=new Set([...assets.keys(),...catalog.keys()].map(name=>`${name}.ts`));
if(existing.some(name=>!expected.has(name)))throw Error('自动样式目录存在过期文件');
await save(`${root}/automatic-style-scopes.json`,JSON.stringify([...catalog.keys()].sort(),null,2)+'\n');
// 明确列出实际入口；打包验证逐个核对类型和运行时文件，不以通配符掩盖缺件。
const manifestPath = 'packages/primitives/package.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
for (const key of Object.keys(manifest.exports))
 if (key.startsWith('./automatic-styles/') || key.startsWith('./shared-styles/')) delete manifest.exports[key];
for (const file of [...expected].sort()) {
 const name = file.slice(0, -3);
 manifest.exports[`./automatic-styles/${name}`] = {
  types: `./dist/automatic-styles/${name}.d.ts`,
  import: `./dist/automatic-styles/${name}.js`,
 };
}
for (const file of (await readdir(`${root}/shared-styles`)).filter(name => name.endsWith('.ts')).sort()) {
 const name = file.slice(0, -3);
 manifest.exports[`./shared-styles/${name}`] = {
  types: `./dist/shared-styles/${name}.d.ts`,
  import: `./dist/shared-styles/${name}.js`,
 };
}
await save(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`自动样式：${catalog.size} 个作用域、${assets.size} 个独立规则组，原始选择器与条件规则保留。`);
