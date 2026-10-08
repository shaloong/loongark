import { copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

const [sourceDir, targetDir, ...extensions] = process.argv.slice(2);

if (!sourceDir || !targetDir || extensions.length === 0) {
  console.error(
    "Usage: node scripts/copy-assets.mjs <source> <target> <ext...>",
  );
  process.exit(1);
}

const extensionSet = new Set(extensions);

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
      [...extensionSet].some((extension) => entry.name.endsWith(extension))
    ) {
      paths.push(path);
    }
  }

  return paths;
};

for (const sourcePath of await walk(sourceDir)) {
  const targetPath = join(targetDir, relative(sourceDir, sourcePath));
  await mkdir(dirname(targetPath), { recursive: true });
  await copyFile(sourcePath, targetPath);
}
