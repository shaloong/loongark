import ts from 'typescript';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';

// 公开族与根入口是唯一来源；子路径直达声明模块，不经根 barrel 回流。
const coverage = JSON.parse(await readFile('docs/component-coverage.json', 'utf8'));
const normalize = value => value.replace(/[^a-z0-9]/gi, '').toLowerCase();
const slug = value => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
const owner = name => coverage.families.filter(family => normalize(name).replace(/^loongark/, '').replace(/^use/, '').startsWith(normalize(family))).sort((a,b) => normalize(b).length - normalize(a).length)[0];
function groupFor(name) {
  if (['LoongArkProvider','LoongArkProviderProps','useLoongArkTheme','createThemeStore','ThemeStoreOptions','createLoongArkVuePlugin','VuePluginOptions'].includes(name)) return 'provider';
  if (/Command/.test(name)) return 'command';
  if (/Collection|^createAsync|^useAsyncList$|^(?:Use|use)?ListSelection/.test(name)) return 'collection';
  if (['parseDate','parseLocalizedDate','parseDateTime','parseZonedDateTime','LocalizedDateOptions'].includes(name)) return 'date-picker';
  if (name === 'parseColor') return 'color-picker';
  if (name === 'exportImageCropper') return 'image-cropper';
  if (name === 'createToaster') return 'toast';
  if (name === 'useDownload') return 'download-trigger';
  if (/^(?:LoongArk)?Filter(?:Chip|Divider)/.test(name)) return 'filter-bar';
  if (/Locale|^(useFilter|useCollator)$/.test(name)) return 'locale';
  if (/Environment/.test(name)) return 'environment';
  if (/^(LoongArk)?Portal/.test(name)) return 'portal';
  if (/^(LoongArk)?Toolbar/.test(name)) return 'toolbar';
  if (/^(DataRow|DataColumn|DataSort|DataFilter)/.test(name)) return 'data-table';
  if (/^Question/.test(name)) return 'questionnaire';
  if (/^RichText/.test(name)) return 'rich-text-editor';
  if (/^CodeEditor/.test(name)) return 'code-editor';
  return owner(name) && slug(owner(name));
}
const check = process.argv.includes('--check');
async function save(path, content) {
  if (check) {
    if (await readFile(path, 'utf8') !== content) throw new Error(`公开入口不同步：${path}，运行 pnpm generate:entries`);
  } else { await mkdir(dirname(path), { recursive:true }); await writeFile(path, content); }
}
for (const framework of ['react','vue','solid','svelte']) {
  const cache = new Map();
  async function exportsOf(path) {
    if (cache.has(path)) return cache.get(path);
    const exports = new Map(); cache.set(path, exports);
    const source = ts.createSourceFile(path, await readFile(path,'utf8'), ts.ScriptTarget.Latest, true);
    for (const statement of source.statements) {
      if (ts.isExportDeclaration(statement) && statement.moduleSpecifier) {
        const module = statement.moduleSpecifier.text;
        if (!statement.exportClause && module.startsWith('.')) {
          let file = resolve(dirname(path), module + '.ts');
          try { await access(file); } catch { file = resolve(dirname(path), module + '.tsx'); }
          for (const [name, entry] of await exportsOf(file)) if (!exports.has(name)) exports.set(name,entry);
        } else if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
          for (const element of statement.exportClause.elements) exports.set(element.name.text, { module: module.startsWith('.') ? resolve(dirname(path),module) : module, name:(element.propertyName ?? element.name).text, type: statement.isTypeOnly || element.isTypeOnly });
        }
      } else if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        // 局部重导出（如 createListCollection as createCommandCollection）也是公开 API。
        for (const element of statement.exportClause.elements) exports.set(element.name.text, { module:path.replace(/\.tsx?$/,''), name:element.name.text, type:statement.isTypeOnly || element.isTypeOnly });
      } else if (statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
        if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) exports.set(declaration.name.text,{module:path.replace(/\.tsx?$/,''),name:declaration.name.text,type:false});
        else if (statement.name) exports.set(statement.name.text,{module:path.replace(/\.tsx?$/,''),name:statement.name.text,type:ts.isInterfaceDeclaration(statement)||ts.isTypeAliasDeclaration(statement)});
      }
    }
    return exports;
  }
  const exports = await exportsOf(resolve(`packages/${framework}/src/index.ts`));
  const groups = new Map(coverage.families.map(family => [slug(family), []]));
  for (const name of ['provider','collection','portal','toolbar','locale','environment']) groups.set(name, []);
  for (const [name,entry] of exports) {
    const group = groupFor(name);
    if (!group) continue;
    groups.get(group).push([name,entry]);
  }
  const manifestPath=`packages/${framework}/package.json`;
  const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
  const publicExports={'.':manifest.exports['.'],'./package.json':manifest.exports['./package.json'],'./editors':manifest.exports['./editors']};
  for (const [group,entries] of groups) {
    if (!entries.some(([,entry])=>!entry.type)) throw new Error(`${framework}/${group} 没有公开值`);
    // 同族实现中公开的 Props/Options 类型随子路径一起暴露。
    for (const module of new Set(entries.map(([,entry]) => entry.module).filter(module => module.startsWith('/') && !/\.(?:svelte|d)$/.test(module)))) {
      let file = module + '.ts';
      try { await access(file); } catch { file = module + '.tsx'; try { await access(file); } catch { continue; } }
      for (const [name, entry] of await exportsOf(file)) if (entry.type && groupFor(name) === group && !entries.some(([existing]) => existing === name)) entries.push([name,entry]);
    }
    const folder=resolve(`packages/${framework}/src/entries`);
    const code='// 由 scripts/generate-entries.mjs 生成；只导出本组件族的公开能力。\n'+entries.sort(([a],[b])=>a.localeCompare(b)).map(([name,entry])=>{
      const module=entry.module.startsWith('/') ? relative(folder,entry.module).replaceAll('\\','/') : entry.module;
      return `export ${entry.type?'type ':''}{ ${entry.name===name?name:`${entry.name} as ${name}`} } from ${JSON.stringify(module)};`;
    }).join('\n')+'\n';
    await save(`${folder}/${group}.ts`,code);
    publicExports[`./${group}`]={types:`./dist/entries/${group}.d.ts`,...(framework==='solid'?{browser:`./dist/entries/${group}.js`,node:`./dist/server/entries/${group}.js`}:{}),import:`./dist/entries/${group}.js`};
  }
  manifest.exports=publicExports;
  await save(manifestPath,JSON.stringify(manifest,null,2)+'\n');
  console.log(`${framework}: ${groups.size} 个类型完整的公开子路径`);
}
