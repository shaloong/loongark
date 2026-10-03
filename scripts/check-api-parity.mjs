import ts from "typescript";
import { writeFile } from "node:fs/promises";
const frameworks = ["react", "vue", "solid", "svelte"];
const files = frameworks.map((f) => `packages/${f}/dist/index.d.ts`);
const program = ts.createProgram(files, {
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  module: ts.ModuleKind.ESNext,
  skipLibCheck: true,
});
const checker = program.getTypeChecker();
const apis = Object.fromEntries(
  frameworks.map((f, i) => [
    f,
    checker
      .getExportsOfModule(
        checker.getSymbolAtLocation(program.getSourceFile(files[i])),
      )
      .filter(
        (s) =>
          s.name.startsWith("LoongArk") &&
          s.name !== "LoongArkProvider" &&
          Boolean(
            (s.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(s) : s)
              .flags & ts.SymbolFlags.Value,
          ),
      )
      .map((s) => s.name)
      .sort(),
  ]),
);
let failed = false;
for (const f of frameworks.slice(1)) {
  const missing = apis.react.filter((k) => !apis[f].includes(k)),
    extra = apis[f].filter((k) => !apis.react.includes(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(f, { missing, extra });
  }
}
await writeFile(
  process.env.API_PARITY_REPORT ?? "docs/api-parity.json",
  JSON.stringify(apis, null, 2),
);
if (failed) process.exitCode = 1;
else console.log(`四端 ${apis.react.length} 个公开 LoongArk 导出一致`);
