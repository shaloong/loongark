import assert from 'node:assert/strict';
import ts from 'typescript';
import {cp,mkdir,mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

await mkdir('.artifacts/current',{recursive:true});
const root=await mkdtemp(resolve('.artifacts/current/style-bindings-'));
const check=()=>spawnSync(process.execPath,['scripts/check-automatic-style-bindings.mjs',`--root=${root}`],{encoding:'utf8'});
try {
 for(const framework of ['react','vue','solid','svelte'])
  await cp(`packages/${framework}/src`,resolve(root,`packages/${framework}/src`),{recursive:true});
 await mkdir(resolve(root,'packages/primitives/src'),{recursive:true});
 await cp('packages/primitives/src/automatic-style-scopes.json',resolve(root,'packages/primitives/src/automatic-style-scopes.json'));
 let result=check();assert.equal(result.status,0,result.stderr);
 const file=resolve(root,'packages/svelte/src/components/extended.ts');
 const source=await readFile(file,'utf8');
 const missing=source.replace('/*#__PURE__*/ withAutomaticStyles(Tour, lkAutomaticTourStyles)','Tour');
 assert.notEqual(missing,source,'使用真实 Tour namespace 声明复现遗漏');
 await writeFile(file,missing);result=check();
 assert.notEqual(result.status,0,'不能跳过 Svelte TypeScript namespace');
 assert.match(result.stderr,/LoongArkTour.*tour/);await writeFile(file,source);
 const forwarded=resolve(root,'packages/svelte/src/components/JsonTreeViewRoot.svelte');
 const component=await readFile(forwarded,'utf8');
 const unstyled=component.replace(/registerAutomaticStyles\([^)]*\);/,'');
 assert.notEqual(unstyled,component,'使用真实 default import 转发叶子');
 await writeFile(forwarded,unstyled);result=check();
 assert.notEqual(result.status,0,'不能跳过经 default import 转发的 Svelte 文件');
 assert.match(result.stderr,/JsonTreeViewRoot\.svelte.*json-tree-view/);
 await writeFile(forwarded,component);result=check();assert.equal(result.status,0,result.stderr);
 const select=resolve(root,'packages/react/src/components/select.tsx');
 const selectSource=await readFile(select,'utf8');
 const ast=ts.createSourceFile(select,selectSource,ts.ScriptTarget.Latest,true);
 const declaration=ast.statements.filter(ts.isVariableStatement).flatMap(node=>node.declarationList.declarations).find(node=>node.name.getText(ast)==='SelectLabel');
 assert.ok(declaration&&ts.isCallExpression(declaration.initializer));
 const call=declaration.initializer;
 await writeFile(select,selectSource.slice(0,call.getStart(ast))+call.arguments[0].getText(ast)+selectSource.slice(call.end));
 result=check();assert.notEqual(result.status,0,'公开入口别名不能绕过样式检查');
 assert.match(result.stderr,/SelectLabel.*select/);
 await writeFile(select,selectSource);result=check();assert.equal(result.status,0,result.stderr);
 console.log('自动样式守卫：公开入口别名、真实 Svelte TS namespace、default import 转发与恢复回归通过。');
} finally {await rm(root,{recursive:true,force:true});}
