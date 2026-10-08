import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const failures = [];

const fail = (message) => {
  failures.push(message);
};

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (
      entry.isDirectory() &&
      [
        "node_modules",
        ".git",
        "dist",
        "storybook-static",
        "test-results",
      ].includes(entry.name)
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      paths.push(...(await walk(path)));
      continue;
    }

    paths.push(path);
  }

  return paths;
};

const assertPackageExports = async () => {
  const packageDirs = await readdir(join(root, "packages"), {
    withFileTypes: true,
  });

  for (const entry of packageDirs) {
    if (!entry.isDirectory()) {
      continue;
    }

    const packagePath = join(root, "packages", entry.name, "package.json");
    const manifest = await readJson(packagePath);
    const label = relative(root, packagePath);

    if (manifest.main !== "dist/index.js") {
      fail(`${label}: main must be dist/index.js`);
    }

    if (manifest.types !== "dist/index.d.ts") {
      fail(`${label}: types must be dist/index.d.ts`);
    }

    if (manifest.exports?.["."]?.import !== "./dist/index.js") {
      fail(`${label}: exports[\".\"].import must be ./dist/index.js`);
    }

    if (manifest.exports?.["."]?.types !== "./dist/index.d.ts") {
      fail(`${label}: exports[\".\"].types must be ./dist/index.d.ts`);
    }

    if (manifest.exports?.["./package.json"] !== "./package.json") {
      fail(`${label}: exports must expose ./package.json`);
    }

    if (!Array.isArray(manifest.files) || !manifest.files.includes("dist")) {
      fail(`${label}: files must include dist`);
    }
  }
};

const assertNoLocalConflictFiles = async () => {
  const paths = await walk(root);
  const conflictFiles = paths
    .map((path) => relative(root, path))
    .filter((path) =>
      /(^|[\\/])[^\\/]+-[A-Za-z0-9]+-[A-Za-z0-9]+\.tsx?$/.test(path),
    );

  for (const path of conflictFiles) {
    fail(`${path}: remove machine/local conflict file`);
  }
};

await assertPackageExports();
await assertNoLocalConflictFiles();

if (failures.length > 0) {
  console.error("[verify-workspace] failed");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("[verify-workspace] ok");
