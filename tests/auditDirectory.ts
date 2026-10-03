import { mkdirSync } from "node:fs";
/** Linux 验收不得写入既有 Windows 证据目录。 */
export function auditDirectory(batch: string) {
  const path = process.env.DESIGN_AUDIT_DIR
    ? `${process.env.DESIGN_AUDIT_DIR}/regressions/${batch.replaceAll("/", "-")}`
    : `docs/audits/${batch}${process.platform === "win32" ? "" : "-" + process.platform}`;
  mkdirSync(path, { recursive: true });
  return path;
}
