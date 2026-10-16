import { mkdir, writeFile } from "node:fs/promises";
import { loadRelease, waitForPublication } from "./release-registry.mjs";

const targets = await loadRelease(
  process.env.RELEASE_ARTIFACTS ?? ".artifacts/verified-release",
  process.env.RELEASE_VERSION,
);
await mkdir(".artifacts/releases/published", { recursive: true });
try {
  const verified = await waitForPublication(targets);
  await writeFile(
    ".artifacts/releases/published/registry.json",
    JSON.stringify({ verified }, null, 2) + "\n",
  );
} catch (error) {
  await writeFile(
    ".artifacts/releases/published/registry.json",
    JSON.stringify({ error: error.message }, null, 2) + "\n",
  );
  throw error;
}
