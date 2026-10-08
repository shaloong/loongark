import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
// 对照真实安装版本和成功构建的声明；不得按旧 .pnpm 目录猜测版本。
fs.mkdirSync(".artifacts/ark-coverage", { recursive: true });
const apiReport = {},
  partsReport = {};
for (const framework of ["react", "vue", "solid", "svelte"]) {
  const packageDirectory = path.dirname(
    fs.realpathSync(
      `packages/${framework}/node_modules/@ark-ui/${framework}/package.json`,
    ),
  );
  const base = path.join(packageDirectory, "dist/components");
  const directories = fs
    .readdirSync(base)
    .filter((name) => fs.existsSync(path.join(base, name, "index.d.ts")));
  const files = [
    path.resolve(`packages/${framework}/dist/index.d.ts`),
    ...directories.map((name) => path.join(base, name, "index.d.ts")),
  ];
  const program = ts.createProgram(files, {
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    skipLibCheck: true,
    jsx: ts.JsxEmit.Preserve,
  });
  const checker = program.getTypeChecker();
  const symbols = (file) =>
    checker.getExportsOfModule(
      checker.getSymbolAtLocation(program.getSourceFile(file)),
    );
  const isValue = (symbol) => {
    if (symbol.name.endsWith("Props")) return false;
    if (
      symbol.declarations?.some(
        (declaration) =>
          ts.isExportSpecifier(declaration) &&
          (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly),
      )
    )
      return false;
    const target =
      symbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(symbol)
        : symbol;
    // Solid 上游声明把部分纯类型生成为 `declare const X: typeof Interface`；它们不是运行时部件。
    const invalidTypeQuery = target.declarations?.some((declaration) => {
      if (
        !ts.isVariableDeclaration(declaration) ||
        !declaration.type ||
        !ts.isTypeQueryNode(declaration.type)
      )
        return false;
      let reference = checker.getSymbolAtLocation(declaration.type.exprName);
      if (!reference)
        return Boolean(
          checker.getTypeFromTypeNode(declaration.type).flags &
          ts.TypeFlags.Any,
        );
      if (reference?.flags & ts.SymbolFlags.Alias)
        reference = checker.getAliasedSymbol(reference);
      return reference && !(reference.flags & ts.SymbolFlags.Value);
    });
    return (
      !invalidTypeQuery &&
      target.name !== "unknown" &&
      Boolean(target.flags & ts.SymbolFlags.Value)
    );
  };
  const ours = new Set(
    symbols(files[0])
      .filter(isValue)
      .map((symbol) => symbol.name),
  );
  apiReport[framework] = {};
  partsReport[framework] = {};
  for (const [index, directory] of directories.entries()) {
    const nativeSymbols = symbols(files[index + 1]);
    const values = nativeSymbols.filter(isValue).map((symbol) => symbol.name);
    apiReport[framework][directory] = {
      exportedValues: values,
      missingPublicParts: values.filter(
        (name) =>
          /^[A-Z]/.test(name) &&
          !name.endsWith("Provider") &&
          !ours.has("LoongArk" + name),
      ),
      missingProviders: values.filter(
        (name) => name.endsWith("RootProvider") && !ours.has("LoongArk" + name),
      ),
      missingHooks: values.filter(
        (name) => /^use[A-Z]/.test(name) && !ours.has(name),
      ),
    };
    const namespace = directory
      .split("-")
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join("");
    const symbol = nativeSymbols.find((symbol) => symbol.name === namespace);
    if (!symbol) continue;
    const namespaceSymbol =
      symbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(symbol)
        : symbol;
    const partSymbols = namespaceSymbol.exports
      ? checker.getExportsOfModule(namespaceSymbol)
      : checker
          .getTypeOfSymbolAtLocation(
            symbol,
            program.getSourceFile(files[index + 1]),
          )
          .getProperties();
    const parts = partSymbols
      .filter(isValue)
      .map((part) => part.name)
      .filter(
        (name) =>
          /^[A-Z]/.test(name) &&
          !["Color", "ListCollection", "DateValue"].includes(name),
      );
    const equivalents = {
      "Dialog.Backdrop": "LoongArkDialogOverlay",
      "Drawer.Backdrop": "LoongArkDrawerOverlay",
      "Listbox.Content": "LoongArkListboxList",
    };
    const equivalentParts = Object.fromEntries(
      parts.flatMap((part) => {
        const equivalent = equivalents[namespace + "." + part];
        return equivalent && ours.has(equivalent) ? [[part, equivalent]] : [];
      }),
    );
    partsReport[framework][directory] = {
      namespace,
      parts,
      equivalentParts,
      missing: parts.filter(
        (part) =>
          !ours.has("LoongArk" + namespace + part) && !equivalentParts[part],
      ),
    };
  }
  console.log(
    `${framework}: Ark ${JSON.parse(fs.readFileSync(path.join(packageDirectory, "package.json"))).version}, ${directories.length} modules audited`,
  );
}
for (const [name, report] of [
  ["api", apiReport],
  ["parts", partsReport],
])
  fs.writeFileSync(
    `.artifacts/ark-coverage/${name}.json`,
    JSON.stringify(report, null, 2) + "\n",
  );
