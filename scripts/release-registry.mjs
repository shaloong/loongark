import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

export const packageOrder = [
  "tokens",
  "theme",
  "primitives",
  "kit",
  "react",
  "vue",
  "solid",
  "svelte",
  "cli",
];
const repository = "git+https://github.com/shaloong/loongark.git";
const integrity = (bytes) =>
  `sha512-${createHash("sha512").update(bytes).digest("base64")}`;

export async function loadRelease(directory, version) {
  assert.match(version, /^\d+\.\d+\.\d+$/);
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    return (
      await Promise.all(
        entries.map((entry) =>
          entry.isDirectory()
            ? walk(join(dir, entry.name))
            : [join(dir, entry.name)],
        ),
      )
    ).flat();
  }
  const files = await walk(directory);
  const reports = files.filter(
    (file) =>
      basename(file) === "report.json" &&
      basename(dirname(file)) === "packages",
  );
  assert.equal(reports.length, 1, "必须恰有一份已验收包清单");
  const report = JSON.parse(await readFile(reports[0], "utf8"));
  assert.equal(report.length, packageOrder.length);
  return Promise.all(
    packageOrder.map(async (suffix) => {
      const name = `@shaloong/loongark-${suffix}`;
      const entries = report.filter((entry) => entry.name === name);
      assert.equal(entries.length, 1, `缺少或重复包：${name}`);
      const entry = entries[0];
      assert.equal(entry.version, version, `${name} 版本不一致`);
      const filename = `shaloong-loongark-${suffix}-${version}.tgz`;
      assert.equal(basename(entry.tarball), filename);
      const matches = files.filter((file) => basename(file) === filename);
      assert.equal(matches.length, 1, `缺少或重复 tarball：${name}`);
      const bytes = await readFile(matches[0]);
      return {
        name,
        version,
        file: matches[0],
        integrity: integrity(bytes),
        sha256: createHash("sha256").update(bytes).digest("hex"),
      };
    }),
  );
}

class Pending extends Error {}

function client(registry, timeoutMs, fetchImpl, remainingMs = () => Infinity) {
  const origin = new URL(registry);
  assert.equal(origin.protocol, "https:", "registry 必须使用 HTTPS");
  const request = async (url) => {
    const budget = Math.min(timeoutMs, remainingMs());
    if (budget <= 0) throw new Pending("registry 等待预算已耗尽");
    let response;
    try {
      response = await fetchImpl(url, {
        signal: AbortSignal.timeout(Math.ceil(budget)),
        headers: { "cache-control": "no-cache" },
      });
    } catch (error) {
      throw new Pending(`registry 请求未完成：${error.message}`);
    }
    if (
      response.status === 404 ||
      response.status === 429 ||
      response.status >= 500
    ) {
      await response.body?.cancel();
      throw new Pending(`registry HTTP ${response.status}`);
    }
    assert.ok(response.ok, `registry HTTP ${response.status}：${url}`);
    const read = async (body) => {
      if (remainingMs() <= 0) {
        throw new Pending("registry 等待预算已耗尽");
      }
      try {
        return await body();
      } catch (error) {
        if (
          error.name === "AbortError" ||
          error.name === "TimeoutError" ||
          error instanceof TypeError
        ) {
          throw new Pending(`registry 响应体未读完：${error.message}`);
        }
        throw error;
      }
    };
    return {
      json: () => read(() => response.json()),
      arrayBuffer: () => read(() => response.arrayBuffer()),
    };
  };
  const metadata = async (target, selector = target.version) => {
    const response = await request(
      new URL(`${target.name.replace("/", "%2f")}/${selector}`, origin),
    );
    return response.json();
  };
  return { request, metadata };
}

function checkMetadata(target, pkg) {
  assert.equal(pkg.name, target.name, "registry 包名冲突");
  assert.equal(pkg.version, target.version, "registry 版本冲突");
  assert.equal(
    pkg.dist?.integrity,
    target.integrity,
    `${target.name} 已有版本与验收产物内容冲突；禁止覆盖或跳过`,
  );
  assert.equal(
    pkg.repository?.url,
    repository,
    `${target.name} repository 不一致`,
  );
}

async function checkTarball(target, pkg, request) {
  const url = new URL(pkg.dist.tarball);
  assert.equal(url.protocol, "https:");
  const response = await request(url);
  assert.equal(
    integrity(Buffer.from(await response.arrayBuffer())),
    target.integrity,
    `${target.name} registry tarball 内容冲突`,
  );
}

export async function planPublication(
  targets,
  {
    registry = "https://registry.npmjs.org/",
    timeoutMs = 15000,
    fetchImpl = fetch,
  } = {},
) {
  const { metadata, request } = client(registry, timeoutMs, fetchImpl);
  const plan = [];
  // 全部预检后才允许写入；已有版本必须与原始产物相同。
  for (const target of targets) {
    let pkg;
    try {
      pkg = await metadata(target);
    } catch (error) {
      if (error instanceof Pending && error.message === "registry HTTP 404") {
        plan.push({ target, action: "publish" });
        continue;
      }
      throw error;
    }
    checkMetadata(target, pkg);
    await checkTarball(target, pkg, request);
    plan.push({ target, action: "skip" });
  }
  return plan;
}

export async function publishMissing(plan, publish) {
  for (const { target, action } of plan) {
    if (action === "skip") {
      console.log(
        `${target.name}@${target.version} 已存在且内容一致，跳过发布`,
      );
    } else {
      await publish(target.file);
    }
  }
}

export function planReleaseAssets(files, assets) {
  return files
    .filter(({ file, digest }) => {
      const existing = assets.filter((asset) => asset.name === basename(file));
      assert.ok(existing.length <= 1, "Release 附件重名");
      if (!existing.length) return true;
      assert.equal(
        existing[0].digest,
        digest,
        `已有附件 ${basename(file)} 与原始产物冲突，禁止覆盖`,
      );
      return false;
    })
    .map(({ file }) => file);
}

export async function waitForPublication(
  targets,
  {
    registry = "https://registry.npmjs.org/",
    timeoutMs = 15000,
    fetchImpl = fetch,
    maxWaitMs = 600000,
    pollMs = 15000,
    now = Date.now,
    pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    onProgress = console.log,
  } = {},
) {
  const deadline = now() + maxWaitMs;
  const { metadata, request } = client(
    registry,
    timeoutMs,
    fetchImpl,
    () => deadline - now(),
  );
  const verified = new Map();
  const pending = new Map();
  do {
    for (const target of targets) {
      if (verified.has(target.name)) continue;
      try {
        const pkg = await metadata(target);
        checkMetadata(target, pkg);
        await checkTarball(target, pkg, request);
        if (
          !pkg.dist.attestations?.url ||
          pkg.dist.attestations.provenance?.predicateType !==
            "https://slsa.dev/provenance/v1"
        ) {
          throw new Pending("provenance 尚不可见");
        }
        const url = new URL(pkg.dist.attestations.url);
        assert.equal(url.protocol, "https:");
        const attestations = await (await request(url)).json();
        if (!attestations.attestations?.length)
          throw new Pending("provenance 内容尚不可见");
        const latest = await metadata(target, "latest");
        if (latest.version !== target.version)
          throw new Pending(`latest 仍为 ${latest.version}`);
        checkMetadata(target, latest);
        const packument = await (
          await request(new URL(target.name.replace("/", "%2F"), registry))
        ).json();
        if (
          !packument.versions?.[target.version] ||
          packument["dist-tags"]?.latest !== target.version
        )
          throw new Pending("安装入口的版本清单尚未同步");
        checkMetadata(target, packument.versions[target.version]);
        verified.set(target.name, {
          name: target.name,
          version: target.version,
          integrity: target.integrity,
          sha256: target.sha256,
          provenance: url.href,
        });
        pending.delete(target.name);
        onProgress(
          `${target.name}@${target.version}：原始 tarball、latest 与 provenance 可用`,
        );
      } catch (error) {
        if (!(error instanceof Pending)) throw error;
        pending.set(target.name, error.message);
      }
    }
    if (verified.size === targets.length) return [...verified.values()];
    if (now() >= deadline) break;
    onProgress(
      `等待 registry 传播：${JSON.stringify(Object.fromEntries(pending))}`,
    );
    await pause(Math.min(pollMs, deadline - now()));
  } while (now() <= deadline);
  throw Error(
    `registry 验收超时；已验证 ${verified.size}/${targets.length}，未完成：${JSON.stringify(Object.fromEntries(pending))}。保留 Release 草稿；可使用相同原始产物重试，禁止改写已发布版本。`,
  );
}
