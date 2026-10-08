import ts from "typescript";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, resolve, relative } from "node:path";

const normalize = (value) => value.replace(/[^a-z0-9]/gi, "").toLowerCase();
const root = process.cwd();
const output = resolve(".artifacts/storybook-reference");
const coverage = JSON.parse(
  await readFile("docs/component-coverage.json", "utf8"),
);
const config = ts.readConfigFile("tsconfig.json", ts.sys.readFile).config;
const { options } = ts.parseJsonConfigFileContent(config, ts.sys, root);
options.jsx = ts.JsxEmit.ReactJSX;
const program = ts.createProgram(["packages/react/src/index.ts"], options);
const checker = program.getTypeChecker();
const module = program.getSourceFile("packages/react/src/index.ts");
const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(module));
const branch = process.env.GITHUB_REF_NAME || "develop";
const link = (path) =>
  `https://github.com/shaloong/loongark/blob/${encodeURIComponent(branch)}/${path}`;
const allExamples = {};
for (const framework of ["react", "vue", "solid", "svelte"]) {
  allExamples[framework] = await Promise.all(
    (await readdir(`examples/${framework}`))
      .filter((file) => /\.(tsx?|svelte)$/.test(file))
      .map(async (file) => ({
        path: `examples/${framework}/${file}`,
        code: await readFile(`examples/${framework}/${file}`, "utf8"),
      })),
  );
}

function declaration(symbol) {
  return symbol.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol).declarations?.[0]
    : symbol.declarations?.[0];
}
function defaults(node, found = new Map()) {
  if (!node) return found;
  if (
    ts.isBindingElement(node) &&
    node.initializer &&
    ts.isIdentifier(node.name)
  )
    found.set(node.name.text, node.initializer.getText());
  ts.forEachChild(node, (child) => {
    defaults(child, found);
  });
  return found;
}
function api(symbol, name = symbol.name) {
  const node = declaration(symbol);
  if (!node) return null;
  const type = checker.getTypeOfSymbolAtLocation(symbol, node);
  const signature = type.getCallSignatures()[0];
  const parameter = signature?.parameters[0];
  if (!parameter) return null;
  const props = checker.getTypeOfSymbolAtLocation(
    parameter,
    signature.declaration ?? node,
  );
  const initial = defaults(node);
  const properties = props.getProperties().flatMap((property) => {
    const location = property.declarations?.[0];
    if (
      !location ||
      /(?:@types\/react|lib\.dom\.d\.ts)/.test(
        location.getSourceFile().fileName,
      )
    )
      return [];
    const tags = property.getJsDocTags(checker);
    const documented = tags.find((tag) =>
      /^(default|defaultValue)$/.test(tag.name),
    );
    const value =
      initial.get(property.name) ??
      (documented ? ts.displayPartsToString(documented.text) : undefined);
    return [
      {
        name: property.name,
        type: checker.typeToString(
          checker.getTypeOfSymbolAtLocation(property, location),
          location,
          ts.TypeFormatFlags.NoTruncation,
        ),
        required: !(property.flags & ts.SymbolFlags.Optional),
        description: ts.displayPartsToString(
          property.getDocumentationComment(checker),
        ),
        default:
          value ??
          (property.flags & ts.SymbolFlags.Optional
            ? "未指定；由共享模型、上下文或原生行为处理"
            : "必填"),
        defaultSource: initial.has(property.name)
          ? "适配层源码"
          : documented
            ? "公开类型注释"
            : "类型可选性",
      },
    ];
  });
  return {
    name,
    path: relative(root, node.getSourceFile().fileName),
    properties,
  };
}
async function sourceFiles(example) {
  const files = [{ ...example, url: link(example.path) }];
  const visit = async (file) => {
    for (const match of file.code.matchAll(
      /from\s+["'](\.{1,2}\/[^"']+)["']/g,
    )) {
      const base = resolve(dirname(file.path), match[1]);
      const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.svelte`];
      for (const candidate of candidates) {
        if (!candidate.startsWith(resolve("examples") + "/")) continue;
        try {
          const path = relative(root, candidate);
          if (files.some((entry) => entry.path === path)) break;
          const dependency = {
            path,
            code: await readFile(candidate, "utf8"),
            url: link(path),
          };
          files.push(dependency);
          await visit(dependency);
          break;
        } catch (error) {
          if (error.code !== "ENOENT" && error.code !== "EISDIR") throw error;
        }
      }
    }
  };
  await visit(example);
  return files;
}

await mkdir(output, { recursive: true });
const summary = [];
for (const family of coverage.families) {
  const key = normalize(family);
  const symbols = exports.filter((symbol) => {
    const name = normalize(symbol.name).replace(/^loongark/, "");
    const owner = coverage.families
      .filter((entry) => name.startsWith(normalize(entry)))
      .sort((a, b) => normalize(b).length - normalize(a).length)[0];
    return owner === family;
  });
  const apis = symbols.map((symbol) => api(symbol)).filter(Boolean);
  for (const symbol of symbols.filter(
    (entry) => normalize(entry.name) === `loongark${key}`,
  )) {
    const node = declaration(symbol);
    if (!node) continue;
    for (const part of checker
      .getTypeOfSymbolAtLocation(symbol, node)
      .getProperties()) {
      const value = api(part, `${symbol.name}.${part.name}`);
      if (value) apis.push(value);
    }
  }
  apis.sort((a, b) => {
    const rank = (entry) =>
      normalize(entry.name) === `loongark${key}` ||
      normalize(entry.name) === `loongark${key}root` ||
      entry.name.endsWith(".Root")
        ? 0
        : 1;
    return rank(a) - rank(b) || a.name.localeCompare(b.name);
  });
  const fileKey = (file) =>
    normalize(basename(file.path).replace(/\.(tsx?|svelte|vue)$/, ""));
  const candidates = Object.fromEntries(
    Object.entries(allExamples).map(([framework, files]) => [
      framework,
      files.filter(
        (file) =>
          normalize(file.code).includes(`loongark${key}`) ||
          fileKey(file).startsWith(key),
      ),
    ]),
  );
  const paired = [...new Set(candidates.react.map(fileKey))].filter((name) =>
    Object.values(candidates).every((files) =>
      files.some((file) => fileKey(file) === name),
    ),
  );
  const rank = (name) =>
    name === `${key}example`
      ? 0
      : name.startsWith(key)
        ? 1
        : name === "corecomponentsexample"
          ? 3
          : 2;
  paired.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  if (!paired.length)
    throw new Error(
      `${family} 缺少同场景四端真实调用示例；不能用实现源码或不对应的文件补位。`,
    );
  const names = paired.filter(
    (name, index) =>
      index === 0 ||
      name.startsWith(key) ||
      [
        "corecomponentsexample",
        "foundationsExample".toLowerCase(),
        "compoundfieldexample",
        "inputadornmentsexample",
        "virtualizationexample",
      ].includes(name),
  );
  const variants = [];
  for (const name of names) {
    const examples = {};
    for (const framework of ["react", "vue", "solid", "svelte"]) {
      const selected = candidates[framework]
        .filter((file) => fileKey(file) === name)
        .sort(
          (a, b) =>
            Number(a.path.endsWith(".vue")) - Number(b.path.endsWith(".vue")),
        )[0];
      examples[framework] = await sourceFiles(selected);
    }
    variants.push({
      id: name,
      name: basename(examples.react[0].path).replace(/\.(tsx?|svelte)$/, ""),
      examples,
    });
  }
  const examples = variants[0].examples;
  await writeFile(
    resolve(output, `${key}.json`),
    JSON.stringify({ family, branch, apis, examples, variants }) + "\n",
  );
  summary.push({
    family,
    key,
    apiComponents: apis.length,
    examples: Object.fromEntries(
      Object.entries(examples).map(([framework, files]) => [
        framework,
        files[0].path,
      ]),
    ),
  });
}
await writeFile(
  resolve(output, "index.json"),
  JSON.stringify(summary, null, 2) + "\n",
);
console.log(
  `Storybook 参考资料：${summary.length} 族四端真实代码，类型签名、缺省值来源与共享模型已生成。`,
);
