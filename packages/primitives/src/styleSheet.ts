const STYLE_TAG_PREFIX = "loongark-primitive";

type StyleHost = Document | ShadowRoot;

const isDocumentHost = (host: StyleHost): host is Document =>
  typeof (host as Document).head !== "undefined";

const resolveDocument = (host: StyleHost): Document | null =>
  isDocumentHost(host) ? host : host.ownerDocument;

/**
 * Mounts primitive-level styles into the provided host (document/shadow root).
 * Falls back to globalThis.document when host is not supplied or unavailable.
 */
export const mountPrimitiveStyles = (
  key: string,
  css: string,
  host?: StyleHost
) => {
  const target = host ?? (globalThis.document as Document | undefined);
  if (!target) {
    return;
  }

  const doc = resolveDocument(target);
  if (!doc) {
    return;
  }

  const styleId = `${STYLE_TAG_PREFIX}-${key}`;
  const existing = target.querySelector?.(
    `#${styleId}`
  ) as HTMLStyleElement | null;

  const styleEl = existing ?? doc.createElement("style");
  styleEl.id = styleId;

  if (styleEl.textContent !== css) {
    styleEl.textContent = css;
  }

  if (!existing) {
    if (isDocumentHost(target)) {
      target.head?.appendChild(styleEl);
    } else {
      target.appendChild(styleEl);
    }
  }
};
