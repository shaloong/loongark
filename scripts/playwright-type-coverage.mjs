import { resolve, relative } from "node:path";
import ts from "typescript";

export const playwrightConfigs = [
  "",
  ".react",
  ".vue",
  ".solid",
  ".svelte",
].map((framework) => `tsconfig.playwright${framework}.json`);

// 检查实际编译单元（包含被入口导入的辅助模块），避免 exclude 静默漏检。
export function assertPlaywrightTypeCoverage(
  root = process.cwd(),
  configs = playwrightConfigs,
) {
  const covered = new Set();
  for (const config of configs) {
    const path = resolve(root, config);
    const input = ts.readConfigFile(path, ts.sys.readFile);
    if (input.error)
      throw new Error(
        ts.flattenDiagnosticMessageText(input.error.messageText, "\n"),
      );
    const parsed = ts.parseJsonConfigFileContent(
      input.config,
      ts.sys,
      root,
      undefined,
      path,
      undefined,
      config.endsWith(".svelte.json")
        ? [
            {
              extension: ".svelte",
              isMixedContent: true,
              scriptKind: ts.ScriptKind.Deferred,
            },
          ]
        : [],
    );
    if (parsed.errors.length)
      throw new Error(
        parsed.errors
          .map((error) =>
            ts.flattenDiagnosticMessageText(error.messageText, "\n"),
          )
          .join("\n"),
      );
    // Svelte 文件由后续 svelte-check 编译；tsc 检查其入口及其余真实源码。
    for (const file of parsed.fileNames) covered.add(resolve(file));
    const program = ts.createProgram(
      parsed.fileNames.filter((file) => !file.endsWith(".svelte")),
      parsed.options,
    );
    for (const file of program.getSourceFiles())
      covered.add(resolve(file.fileName));
  }
  const sources = ts.sys.readDirectory(
    root,
    [".ts", ".tsx", ".mts", ".cts", ".svelte"],
    ["**/node_modules/**", "**/dist/**", "tests/consumer-dist/**"],
    ["tests/**/*", "examples/shared/**/*", "playwright.config.ts"],
  );
  const missing = sources.filter((file) => !covered.has(resolve(file)));
  if (missing.length)
    throw new Error(
      "Playwright 源码未纳入类型检查：\n" +
        missing
          .map((file) => relative(root, file))
          .sort()
          .join("\n"),
    );
  return sources.length;
}
