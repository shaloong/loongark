import { mkdirSync } from "node:fs";
/** 临时证据默认留在忽略目录；平台隔离，不改动受版本管理的视觉基线。 */
export function auditRoot() {
  return (
    process.env.DESIGN_AUDIT_DIR ?? `.artifacts/audits/${process.platform}`
  );
}
export function auditDirectory(batch: string) {
  const path = `${auditRoot()}/regressions/${batch.replaceAll("/", "-")}`;
  mkdirSync(path, { recursive: true });
  return path;
}
