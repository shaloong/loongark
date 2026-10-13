import { readdir, readFile, writeFile, unlink, mkdir } from "node:fs/promises";
import { join, resolve, relative, dirname } from "node:path";
import { transformAsync } from "@babel/core";
import solid from "babel-preset-solid";

const dist = resolve(process.argv[2] ?? "dist");
const compile = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (["ssr", "server", "source"].includes(entry.name)) continue;
      await compile(path);
    } else if (entry.name.endsWith(".jsx")) {
      const result = await transformAsync(await readFile(path, "utf8"), {
        filename: path,
        babelrc: false,
        configFile: false,
        presets: [
          [solid, { generate: "dom", hydratable: true, delegateEvents: false }],
        ],
      });
      if (!result?.code) throw new Error(`Solid 编译未生成代码：${path}`);
      await writeFile(path.slice(0, -4) + ".js", result.code + "\n");
      const ssrPath = join(dist, "ssr", relative(dist, path)).replace(
        /\.jsx$/,
        ".js",
      );
      await mkdir(dirname(ssrPath), { recursive: true });
      const server = await transformAsync(await readFile(path, "utf8"), {
        filename: path,
        babelrc: false,
        configFile: false,
        presets: [[solid, { generate: "ssr", hydratable: true }]],
      });
      if (!server?.code) throw new Error(`Solid SSR 编译未生成代码：${path}`);
      await writeFile(ssrPath, server.code + "\n");
      await unlink(path);
    } else if (entry.name.endsWith(".js") || entry.name.endsWith(".d.ts")) {
      const destination = join(dist, "ssr", relative(dist, path));
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, await readFile(path, "utf8"));
    }
  }
};
await compile(dist);
