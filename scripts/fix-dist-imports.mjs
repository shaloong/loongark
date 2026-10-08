import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";

const distDir = process.argv[2] ?? "dist";

const hasExtension = (specifier) =>
  extname(specifier.split(/[?#]/, 1)[0]) !== "";
const isRelative = (specifier) =>
  specifier.startsWith("./") || specifier.startsWith("../");

const toFileUrlPath = (path) => resolve(path).replaceAll("\\", "/");

const withoutExtension = (specifier) => {
  const suffixMatch = specifier.match(/([?#].*)$/);
  const suffix = suffixMatch?.[1] ?? "";
  const bare = suffix ? specifier.slice(0, -suffix.length) : specifier;
  const extension = extname(bare);

  return {
    base: extension ? bare.slice(0, -extension.length) : bare,
    extension,
    suffix,
  };
};

const resolveRuntimeSpecifier = (filePath, specifier, emittedFiles) => {
  if (!isRelative(specifier)) {
    return specifier;
  }

  const parsed = withoutExtension(specifier);
  const basePath = toFileUrlPath(join(dirname(filePath), parsed.base));

  if (parsed.extension) {
    const targetPath = `${basePath}${parsed.extension}`;
    if (emittedFiles.has(targetPath)) {
      return specifier;
    }

    if (parsed.extension === ".js" && emittedFiles.has(`${basePath}.jsx`)) {
      return `${parsed.base}.jsx${parsed.suffix}`;
    }

    return specifier;
  }

  if (emittedFiles.has(`${basePath}.js`)) {
    return `${specifier}.js`;
  }

  if (emittedFiles.has(`${basePath}.jsx`)) {
    return `${specifier}.jsx`;
  }

  return `${specifier}.js`;
};

const fixSpecifiers = (filePath, source, emittedFiles) =>
  source.replace(
    /((?:import|export)\s+(?:[^'"]*?\s+from\s+)?|import\s*\(\s*)(["'])(\.{1,2}\/[^"']+)\2/g,
    (match, prefix, quote, specifier) => {
      const runtimeSpecifier = resolveRuntimeSpecifier(
        filePath,
        specifier,
        emittedFiles,
      );

      return `${prefix}${quote}${runtimeSpecifier}${quote}`;
    },
  );

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...(await walk(path)));
      continue;
    }

    if (
      entry.isFile() &&
      (entry.name.endsWith(".js") || entry.name.endsWith(".jsx"))
    ) {
      paths.push(path);
    }
  }

  return paths;
};

const emittedFiles = new Set((await walk(distDir)).map(toFileUrlPath));

for (const path of await walk(distDir)) {
  const source = await readFile(path, "utf8");
  const fixed = fixSpecifiers(path, source, emittedFiles);
  if (fixed !== source) {
    await writeFile(path, fixed);
  }
}
