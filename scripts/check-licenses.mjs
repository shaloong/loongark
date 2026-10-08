import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const license = await readFile("LICENSE", "utf8");
assert(license.startsWith("MIT License\n"));
const manifests = ["package.json"];
for (const name of await readdir("packages")) {
  const directory = `packages/${name}`;
  manifests.push(`${directory}/package.json`);
  assert.equal(
    await readFile(`${directory}/LICENSE`, "utf8"),
    license,
    directory,
  );
}
for (const path of manifests) {
  assert.equal(JSON.parse(await readFile(path, "utf8")).license, "MIT", path);
}
console.log(`MIT 许可检查通过：根清单与 ${manifests.length - 1} 个发布包。`);

assert.equal(
  await readFile("packages/kit/THIRD_PARTY_NOTICES.txt", "utf8"),
  await readFile(".storybook/public/third-party-licenses.txt", "utf8"),
);
