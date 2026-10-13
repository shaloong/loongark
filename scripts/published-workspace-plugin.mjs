import {readFile,stat} from 'node:fs/promises';
import {resolve,dirname,relative} from 'node:path';
const names=['react','vue','solid','svelte','kit','primitives','theme','tokens'];
/** 消费真实发布入口与 sideEffects 元数据，避免根 alias 吞掉子路径。 */
export async function publishedWorkspacePlugin(condition='browser'){
 const packages=await Promise.all(names.map(async name=>({name,root:resolve(`packages/${name}`),manifest:JSON.parse(await readFile(`packages/${name}/package.json`,'utf8'))})));
 const describe=(pkg,id)=>{
  const sideEffects=pkg.manifest.sideEffects;
  const local='./'+relative(pkg.root,id).replaceAll('\\','/');
  const moduleSideEffects=Array.isArray(sideEffects)?sideEffects.some(pattern=>{
   const regex=pattern.split('*').map(part=>part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('[^/]*');
   return new RegExp('^'+regex+'$').test(local);
  }):sideEffects!==false;
  return {id,moduleSideEffects};
 };
 return {name:'actual-published-workspace',async resolveId(id,importer){
  const match=/^@loongark\/([^/]+)(\/.+)?$/.exec(id);
  if(match){
   const pkg=packages.find(p=>p.name===match[1]);if(!pkg)return;
   const entry=pkg.manifest.exports[match[2]?'.'+match[2]:'.'];
   if(!entry)throw Error(`未公开入口：${id}`);
   const file=typeof entry==='string'?entry:entry[condition]??entry.import;
   if(!file)throw Error(`缺少 ${condition} 条件入口：${id}`);
   return describe(pkg,resolve(pkg.root,file));
  }
  if(!importer||!id.startsWith('.'))return;
  const pkg=packages.find(p=>importer.startsWith(p.root+'/'));if(!pkg)return;
  const target=resolve(dirname(importer),id);
  for(const file of [target,target+'.js',target+'.svelte',resolve(target,'index.js')]){
   try{if((await stat(file)).isFile())return describe(pkg,file);}catch{}
  }
 }};
}
