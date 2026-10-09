import ts from "typescript";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
const frameworks = ["react", "vue", "solid", "svelte"];
let failed = false;
for (const framework of frameworks) {
  const program = ts.createProgram(
    [
      resolve(`packages/${framework}/dist/index.d.ts`),
      ...readdirSync(`packages/${framework}/dist/entries`).filter(name => name.endsWith(".d.ts")).map(name => resolve(`packages/${framework}/dist/entries`, name)),
      ...(framework === "vue"
        ? [
            resolve("tests/public-types/nativeSelectionProps.ts"),
            resolve("tests/consumers/vue/NativeSelectionParts.ts"),
          ]
        : []),
      ...(framework === "solid"
        ? [resolve("tests/consumers/solid/NativeSelectionRefs.tsx")]
        : []),
    ],
    {
      noEmit: true,
      strict: true,
      skipLibCheck: false,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.Preserve,
      lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
    },
  );
  const checker = program.getTypeChecker();
  const values = path => checker.getExportsOfModule(checker.getSymbolAtLocation(program.getSourceFile(path))).filter(symbol => Boolean((symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol).flags & ts.SymbolFlags.Value));
  const rootValues = values(resolve(`packages/${framework}/dist/index.d.ts`));
  const entries = readdirSync(`packages/${framework}/dist/entries`).filter(name => name.endsWith('.d.ts')).flatMap(name => values(resolve(`packages/${framework}/dist/entries`, name)));
  const actual = new Map(entries.map(symbol => [symbol.name, symbol]));
  for (const symbol of rootValues) {
    assert.ok(actual.has(symbol.name), `${framework} 子路径缺少公开能力：${symbol.name}`);
    const original = value => value.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(value) : value;
    assert.equal(original(actual.get(symbol.name)), original(symbol), `${framework}/${symbol.name} 子路径改变了公开实现`);
  }
  assert.equal(actual.size, rootValues.length, `${framework} 子路径不应增加新的公开值别名`);
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .filter(
      (diagnostic) =>
        diagnostic.file?.fileName
          .replaceAll("\\", "/")
          .match(/\/(?:packages|tests\/(?:public-types|consumers))\//) &&
        !diagnostic.file.fileName.includes("node_modules"),
    );
  if (diagnostics.length) {
    failed = true;
    console.error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (file) => file,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => "\n",
      }),
    );
  } else console.log(`${framework}: 发布声明无本地类型错误`);
}
if (failed) process.exit(1);
