import { readFile } from "node:fs/promises";
const read = async (p) => JSON.parse(await readFile(p, "utf8"));
const manifest = await read("docs/component-coverage.json");
const index = await read("storybook-static/index.json");
const apis = await read("docs/api-parity.json");
const entries = Object.values(index.entries).filter((e) => e.type === "story");
const actual = [
  ...new Set(
    entries
      .filter((e) => e.title.startsWith("Components/"))
      .map((e) => e.title.slice(11)),
  ),
].sort();
const wanted = [...manifest.families].sort();
if (JSON.stringify(actual) !== JSON.stringify(wanted))
  throw Error("Story families do not match docs/component-coverage.json");
for (const [framework, names] of Object.entries(apis))
  for (const family of wanted) {
    const prefix = "LoongArk" + family.replace(/[ -]/g, "");
    if (!names.some((n) => n === prefix || n === prefix + "Root"))
      throw Error(framework + ": missing " + family + " public root");
  }
console.log(
  `Coverage: ${actual.length} families, ${entries.length} stories, four-framework roots verified.`,
);
