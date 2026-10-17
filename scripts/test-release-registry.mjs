import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { test } from "node:test";
import {
  loadRelease,
  packageOrder,
  planPublication,
  planReleaseAssets,
  publishMissing,
  waitForPublication,
} from "./release-registry.mjs";

const bytes = Buffer.from("verified tarball fixture");
const target = (suffix) => ({
  name: `@shaloong/loongark-${suffix}`,
  version: "0.1.1",
  file: `${suffix}.tgz`,
  integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
  sha256: createHash("sha256").update(bytes).digest("hex"),
});
const pkg = (entry) => ({
  name: entry.name,
  version: entry.version,
  repository: { url: "git+https://github.com/shaloong/loongark.git" },
  dist: {
    integrity: entry.integrity,
    tarball: `https://registry.npmjs.org/${entry.name}.tgz`,
    attestations: {
      url: `https://registry.npmjs.org/attestations/${entry.name}`,
      provenance: { predicateType: "https://slsa.dev/provenance/v1" },
    },
  },
});
const json = (value) => Response.json(value);
const pending = (status) => new Response(null, { status });
function registry(entry, override = () => undefined) {
  return async (url) => {
    const path = decodeURIComponent(new URL(url).pathname);
    const response = override(path);
    if (response) return response;
    if (path.endsWith(".tgz")) return new Response(bytes);
    if (path.startsWith("/attestations/"))
      return json({ attestations: [{ bundle: {} }] });
    if (path === `/${entry.name}`)
      return json({
        versions: { [entry.version]: pkg(entry) },
        "dist-tags": { latest: entry.version },
      });
    return json(pkg(entry));
  };
}
function clock() {
  let time = 0;
  return {
    now: () => time,
    pause: async (ms) => {
      time += ms;
    },
    maxWaitMs: 3,
    pollMs: 1,
    onProgress: () => {},
  };
}

test("传播窗口内的 404、503 和旧 latest 只重试读取，不发布", async () => {
  const entry = target("react");
  let reads = 0;
  const fetchImpl = registry(entry, (path) => {
    if (path.endsWith("/0.1.1") && ++reads === 1) return pending(404);
    if (path.endsWith("/0.1.1") && reads === 2) return pending(503);
    if (path.endsWith("/latest") && reads === 3)
      return json({ ...pkg(entry), version: "0.0.0-stage" });
  });
  const result = await waitForPublication([entry], {
    ...clock(),
    maxWaitMs: 4,
    fetchImpl,
  });
  assert.equal(reads, 4);
  assert.equal(result[0].integrity, entry.integrity);
});

test("部分发布重跑先核对所有包，只发布缺失版本", async () => {
  const entries = [target("tokens"), target("react")];
  const fetchImpl = async (url) => {
    const path = decodeURIComponent(new URL(url).pathname);
    if (path.includes("loongark-react")) return pending(404);
    return registry(entries[0])(url);
  };
  const plan = await planPublication(entries, { fetchImpl });
  const writes = [];
  await publishMissing(plan, async (file) => {
    writes.push(file);
  });
  assert.deepEqual(writes, ["react.tgz"]);
});

test("版本端点已可用但安装清单仍缺失时不能放行", async () => {
  const entry = target("react");
  let packuments = 0;
  const fetchImpl = registry(entry, (path) =>
    path === `/${entry.name}` && ++packuments === 1
      ? json({ versions: {}, "dist-tags": { latest: "0.0.0-stage" } })
      : undefined,
  );
  assert.equal(
    (await waitForPublication([entry], { ...clock(), fetchImpl })).length,
    1,
  );
  assert.equal(packuments, 2);
});

test("已有版本内容冲突使整个预检失败，不能先发布其他包", async () => {
  const entries = [target("tokens"), target("react")];
  const fetchImpl = async (url) => {
    const path = decodeURIComponent(new URL(url).pathname);
    if (path.includes("loongark-tokens")) return pending(404);
    return json({
      ...pkg(entries[1]),
      dist: { ...pkg(entries[1]).dist, integrity: "sha512-conflict" },
    });
  };
  let writes = 0;
  await assert.rejects(
    async () =>
      publishMissing(
        await planPublication(entries, { fetchImpl }),
        async () => {
          writes++;
        },
      ),
    /内容冲突/,
  );
  assert.equal(writes, 0);
});

test("预检网络异常或权限不足不当作未发布", async () => {
  for (const status of [401, 403, 429, 503]) {
    await assert.rejects(
      planPublication([target("react")], {
        fetchImpl: async () => pending(status),
      }),
      new RegExp(`HTTP ${status}`),
    );
  }
  await assert.rejects(
    planPublication([target("react")], {
      fetchImpl: async () => {
        throw Error("offline");
      },
    }),
    /offline/,
  );
});

test("Release 附件重跑只上传缺失项，冲突和重名时拒绝覆盖", () => {
  const files = [
    { file: "/original/react.tgz", digest: "sha256:original" },
    { file: "/original/SHA256SUMS", digest: "sha256:sums" },
  ];
  const existing = [{ name: "react.tgz", digest: "sha256:original" }];
  assert.deepEqual(planReleaseAssets(files, existing), [
    "/original/SHA256SUMS",
  ]);
  assert.deepEqual(
    planReleaseAssets(files, [
      ...existing,
      { name: "SHA256SUMS", digest: "sha256:sums" },
    ]),
    [],
  );
  assert.throws(
    () =>
      planReleaseAssets(files, [
        { name: "react.tgz", digest: "sha256:changed" },
      ]),
    /冲突/,
  );
  assert.throws(
    () => planReleaseAssets(files, [...existing, ...existing]),
    /重名/,
  );
});

test("tarball 被替换时立即失败，不将其作为传播延迟", async () => {
  const entry = target("react");
  let pauses = 0;
  const fetchImpl = registry(entry, (path) =>
    path.endsWith(".tgz") ? new Response("corrupt") : undefined,
  );
  await assert.rejects(
    waitForPublication([entry], {
      ...clock(),
      fetchImpl,
      pause: async () => {
        pauses++;
      },
    }),
    /tarball 内容冲突/,
  );
  assert.equal(pauses, 0);
});

test("provenance 尚未可见时等待；403 立即失败", async () => {
  const entry = target("react");
  let attestations = 0;
  const fetchImpl = registry(entry, (path) =>
    path.startsWith("/attestations/") && ++attestations === 1
      ? pending(404)
      : undefined,
  );
  assert.equal(
    (await waitForPublication([entry], { ...clock(), fetchImpl })).length,
    1,
  );
  await assert.rejects(
    waitForPublication([entry], {
      ...clock(),
      fetchImpl: async () => pending(403),
    }),
    /HTTP 403/,
  );
});

test("超时保留明确未完成包，已通过包不反复下载", async () => {
  const first = target("tokens");
  const second = target("react");
  let downloads = 0;
  const fetchImpl = async (url) => {
    if (String(url).includes("loongark-react")) return pending(404);
    if (String(url).endsWith(".tgz")) downloads++;
    return registry(first)(url);
  };
  await assert.rejects(
    waitForPublication([first, second], { ...clock(), fetchImpl }),
    /已验证 1\/2.*loongark-react.*Release 草稿/,
  );
  assert.equal(downloads, 1);
});

test("清单按依赖排序，只接受唯一版本和唯一原始产物", async () => {
  const parent = resolve(".artifacts/releases/registry-tests");
  await mkdir(parent, { recursive: true });
  const root = await mkdtemp(resolve(parent, "manifest-"));
  try {
    await mkdir(resolve(root, "packages"));
    const report = packageOrder.toReversed().map((suffix) => ({
      name: `@shaloong/loongark-${suffix}`,
      version: "0.1.1",
      tarball: `/original/shaloong-loongark-${suffix}-0.1.1.tgz`,
    }));
    for (const entry of report)
      await writeFile(
        resolve(root, "packages", entry.tarball.split("/").at(-1)),
        bytes,
      );
    await writeFile(
      resolve(root, "packages/report.json"),
      JSON.stringify(report),
    );
    assert.deepEqual(
      (await loadRelease(root, "0.1.1")).map((entry) => entry.name),
      packageOrder.map((suffix) => `@shaloong/loongark-${suffix}`),
    );
    await assert.rejects(loadRelease(root, "0.1.2"), /版本不一致/);
    await mkdir(resolve(root, "duplicate"));
    await writeFile(
      resolve(root, "duplicate/shaloong-loongark-react-0.1.1.tgz"),
      bytes,
    );
    await assert.rejects(loadRelease(root, "0.1.1"), /重复 tarball/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("总预算耗尽后不能为后续包再发请求", async () => {
  let time = 0;
  let reads = 0;
  await assert.rejects(
    waitForPublication([target("tokens"), target("react")], {
      ...clock(),
      maxWaitMs: 30,
      now: () => time,
      fetchImpl: async () => {
        reads++;
        time += 40;
        return pending(404);
      },
    }),
    /验收超时/,
  );
  assert.equal(reads, 1);
});

test("响应头成功后响应体超时也属于可重试的读取失败", async () => {
  const entry = target("react");
  let reads = 0;
  const fetchImpl = registry(entry, (path) => {
    if (path.endsWith("/0.1.1") && ++reads === 1)
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.error(
              new DOMException("body timed out", "TimeoutError"),
            );
          },
        }),
      );
  });
  const result = await waitForPublication([entry], { ...clock(), fetchImpl });
  assert.equal(result.length, 1);
  assert.equal(reads, 2);
});
