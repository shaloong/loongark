/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { documentItems, documentSections } from "../shared/arkNextDemo";
export function TocExample() {
  let scroll: HTMLElement | undefined;
  const [mounted, setMounted] = createSignal(true);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">Follow a document</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        The outline follows visible headings. Links scroll inside the article.
      </L.LoongArkTypography>
      <L.LoongArkButton
        variant="outline"
        onClick={() => setMounted(!mounted())}
      >
        {mounted() ? "Hide outline" : "Show outline"}
      </L.LoongArkButton>
      {mounted() && (
        <L.LoongArkTocRoot
          items={documentItems}
          scrollEl={() => scroll ?? null}
        >
          <L.LoongArkTocNav placement="left">
            <L.LoongArkTocTitle>On this page</L.LoongArkTocTitle>
            <L.LoongArkBox style={{ position: "relative" }}>
              <L.LoongArkTocIndicator />
              <L.LoongArkTocList>
                {documentSections.map((section) => (
                  <L.LoongArkTocItem item={section}>
                    <L.LoongArkTocLink href={"#" + section.value}>
                      {section.title}
                    </L.LoongArkTocLink>
                  </L.LoongArkTocItem>
                ))}
              </L.LoongArkTocList>
            </L.LoongArkBox>
          </L.LoongArkTocNav>
          <L.LoongArkTocContext>
            {(toc) => (
              <output aria-label="Visible sections">
                {toc().activeIds.join(", ") || "No visible section"}
              </output>
            )}
          </L.LoongArkTocContext>
        </L.LoongArkTocRoot>
      )}
      <L.LoongArkTocContent
        ref={(element) => {
          scroll = element;
        }}
        aria-label="Component guide"
        tabIndex={0}
        style={{
          height: "320px",
          overflow: "auto",
          padding: "var(--lk-space-component-lg)",
          border:
            "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
          "border-radius": "var(--lk-radius-lg)",
        }}
      >
        {documentSections.map((section) => (
          <section style={{ "min-height": "240px" }}>
            <L.LoongArkTypography
              as={section.depth === 2 ? "h2" : "h3"}
              id={section.value}
            >
              {section.title}
            </L.LoongArkTypography>
            <p>{section.text}</p>
          </section>
        ))}
      </L.LoongArkTocContent>
    </L.LoongArkStack>
  );
}
