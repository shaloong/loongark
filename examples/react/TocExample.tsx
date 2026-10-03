import { useRef, useState } from "react";
import * as L from "@loongark/react";
import { documentItems, documentSections } from "../shared/arkNextDemo";
export function TocExample() {
  const scroll = useRef<HTMLElement>(null),
    [mounted, setMounted] = useState(true);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkTypography as="h2">Follow a document</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        The outline follows visible headings. Links scroll inside the article.
      </L.LoongArkTypography>
      <L.LoongArkButton variant="outline" onClick={() => setMounted(!mounted)}>
        {mounted ? "Hide outline" : "Show outline"}
      </L.LoongArkButton>
      {mounted && (
        <L.LoongArkTocRoot
          items={documentItems}
          scrollEl={() => scroll.current}
        >
          <L.LoongArkTocNav placement="left">
            <L.LoongArkTocTitle>On this page</L.LoongArkTocTitle>
            <L.LoongArkBox style={{ position: "relative" }}>
              <L.LoongArkTocIndicator />
              <L.LoongArkTocList>
                {documentSections.map((section) => (
                  <L.LoongArkTocItem key={section.value} item={section}>
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
                {toc.activeIds.join(", ") || "No visible section"}
              </output>
            )}
          </L.LoongArkTocContext>
        </L.LoongArkTocRoot>
      )}
      <L.LoongArkTocContent
        ref={scroll}
        aria-label="Component guide"
        tabIndex={0}
        style={{
          height: 320,
          overflow: "auto",
          padding: "var(--lk-space-component-lg)",
          border:
            "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
          borderRadius: "var(--lk-radius-lg)",
        }}
      >
        {documentSections.map((section) => (
          <section key={section.value} style={{ minHeight: 240 }}>
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
