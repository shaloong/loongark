import ts from "typescript";
import { resolve } from "node:path";
const frameworks = ["react", "vue", "solid", "svelte"];
let failed = false;
for (const framework of frameworks) {
  const program = ts.createProgram(
    [resolve(`packages/${framework}/dist/index.d.ts`)],
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
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .filter(
      (diagnostic) =>
        diagnostic.file?.fileName
          .replaceAll("\\", "/")
          .includes("/packages/") &&
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
