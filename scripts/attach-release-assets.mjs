import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { loadRelease, planReleaseAssets } from "./release-registry.mjs";

const { RELEASE_VERSION: version, REPOSITORY: repo } = process.env;
const targets = await loadRelease(".artifacts/verified-release", version);
const sums = ".artifacts/verified-release/SHA256SUMS";
await writeFile(
  sums,
  targets
    .map((target) => `${target.sha256}  ${basename(target.file)}`)
    .join("\n") + "\n",
);
const release = JSON.parse(
  execFileSync(
    "gh",
    ["release", "view", `v${version}`, "--repo", repo, "--json", "databaseId"],
    { encoding: "utf8" },
  ),
);
const { assets } = JSON.parse(
  execFileSync("gh", ["api", `repos/${repo}/releases/${release.databaseId}`], {
    encoding: "utf8",
  }),
);
const files = await Promise.all(
  [...targets.map((target) => target.file), sums].map(async (file) => ({
    file,
    digest: `sha256:${createHash("sha256")
      .update(await readFile(file))
      .digest("hex")}`,
  })),
);
const missing = planReleaseAssets(files, assets);
if (missing.length)
  execFileSync(
    "gh",
    ["release", "upload", `v${version}`, ...missing, "--repo", repo],
    { stdio: "inherit" },
  );
