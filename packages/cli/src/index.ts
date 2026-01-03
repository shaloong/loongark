#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import process from "node:process";
import { buildTokenArtifacts } from "@loongark/tokens";
import {
  createLoongArkTheme,
  type CreateThemeOptions,
  type ThemeMode,
} from "@loongark/theme";

type Format = "css" | "json";

type FlagMap = Record<string, string | boolean>;

const parseFlags = (args: string[]): FlagMap => {
  const flags: FlagMap = {};
  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (!token.startsWith("-")) {
      continue;
    }

    const isLong = token.startsWith("--");
    const key = isLong ? token.slice(2) : token.slice(1);
    if (!key) {
      continue;
    }

    if (token.includes("=")) {
      const [k, value = ""] = token.replace(/^--?/, "").split("=");
      flags[k] = value;
      continue;
    }

    const next = args[i + 1];
    if (next && !next.startsWith("-")) {
      flags[key] = next;
      i += 1;
    } else {
      flags[key] = true;
    }
  }
  return flags;
};

const resolveFormats = (input?: string | boolean): Format[] => {
  if (!input || input === true) {
    return ["css", "json"];
  }

  const normalized = String(input)
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (normalized.length === 0 || normalized.includes("both")) {
    return ["css", "json"];
  }

  const formats = normalized.filter(
    (value): value is Format => value === "css" || value === "json"
  );

  return formats.length > 0 ? formats : ["css", "json"];
};

const resolveMode = (value?: string | boolean): ThemeMode | undefined => {
  if (!value || value === true) {
    return undefined;
  }

  const normalized = String(value).toLowerCase();
  if (
    normalized === "light" ||
    normalized === "dark" ||
    normalized === "high-contrast"
  ) {
    return normalized as ThemeMode;
  }
  return undefined;
};

const resolveThemeOptions = (flags: FlagMap): CreateThemeOptions => {
  const mode = resolveMode(
    (flags.mode ?? flags.m) as string | boolean | undefined
  );
  const brand = flags.brand ?? flags.b;
  const accent = flags.accent ?? flags.a;

  return {
    ...(mode ? { mode } : {}),
    ...(typeof brand === "string" && brand ? { brand } : {}),
    ...(typeof accent === "string" && accent ? { accent } : {}),
  };
};

const resolvePath = (
  target: string | boolean | undefined,
  dir: string | undefined,
  fileName: string
) => {
  if (typeof target === "string" && target.length > 0) {
    return resolve(process.cwd(), target);
  }

  if (dir) {
    return join(resolve(process.cwd(), dir), fileName);
  }

  return undefined;
};

const ensureDir = async (filePath: string) => {
  await mkdir(dirname(filePath), { recursive: true });
};

const writeOutput = async (
  content: string,
  filePath?: string,
  label?: string
) => {
  if (!filePath) {
    process.stdout.write(content);
    if (!content.endsWith("\n")) {
      process.stdout.write("\n");
    }
    return;
  }

  await ensureDir(filePath);
  await writeFile(filePath, content, "utf8");
  console.log(`[loongark] 写入 ${label ?? filePath}: ${filePath}`);
};

const buildArtifacts = (options: CreateThemeOptions = {}) => {
  const theme = createLoongArkTheme(options);
  return theme.snapshot();
};

const runExtract = async (flags: FlagMap) => {
  const formats = resolveFormats(
    (flags.format ?? flags.f) as string | boolean | undefined
  );
  const dir = (flags.dir ?? flags.out ?? flags.o) as string | undefined;
  const cssPath = resolvePath(
    flags.css as string | undefined,
    dir,
    "tokens.css"
  );
  const jsonPath = resolvePath(
    flags.json as string | undefined,
    dir,
    "tokens.json"
  );
  const artifacts = buildArtifacts(resolveThemeOptions(flags));

  if (formats.includes("css")) {
    await writeOutput(artifacts.css, cssPath, "CSS");
  }

  if (formats.includes("json")) {
    await writeOutput(artifacts.json, jsonPath, "JSON");
  }
};

const compareArtifacts = async (
  actual: string,
  filePath: string,
  label: string
) => {
  const expected = await readFile(filePath, "utf8");
  if (expected.trim() === actual.trim()) {
    console.log(`[loongark] ${label} 校验通过 (${filePath})`);
    return true;
  }

  console.error(`[loongark] ${label} 不一致：${filePath}`);
  return false;
};

const runVerify = async (flags: FlagMap) => {
  const formats = resolveFormats(
    (flags.format ?? flags.f) as string | boolean | undefined
  );
  const dir = (flags.dir ?? flags.out ?? flags.o) as string | undefined;
  const cssPath = resolvePath(
    flags.css as string | undefined,
    dir,
    "tokens.css"
  );
  const jsonPath = resolvePath(
    flags.json as string | undefined,
    dir,
    "tokens.json"
  );
  const artifacts = buildArtifacts(resolveThemeOptions(flags));

  const targets: Array<{ format: Format; path?: string }> = [];
  if (formats.includes("css")) {
    targets.push({ format: "css", path: cssPath });
  }
  if (formats.includes("json")) {
    targets.push({ format: "json", path: jsonPath });
  }

  if (targets.length === 0 || targets.every((target) => !target.path)) {
    console.error("[loongark] verify 需要提供 --dir、--css 或 --json 参数");
    process.exit(1);
  }

  const results = await Promise.all(
    targets.map((target) =>
      compareArtifacts(
        target.format === "css" ? artifacts.css : artifacts.json,
        target.path as string,
        target.format.toUpperCase()
      )
    )
  );

  if (results.every(Boolean)) {
    console.log("[loongark] 所有目标均已匹配最新 Token 产物");
  } else {
    process.exit(1);
  }
};

const showUsage = () => {
  console.error("Usage: loongark <extract|verify> [options]");
  console.error(
    "  extract --dir dist/tokens --format css,json --mode dark --brand #0052cc --accent #00b8d9"
  );
  console.error("  verify --dir dist/tokens --mode dark");
};

const main = async () => {
  const [command, ...rest] = process.argv.slice(2);
  if (!command) {
    showUsage();
    process.exit(1);
  }

  const flags = parseFlags(rest);

  switch (command) {
    case "extract":
      await runExtract(flags);
      break;
    case "verify":
      await runVerify(flags);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      showUsage();
      process.exit(1);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
