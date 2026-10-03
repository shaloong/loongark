<script lang="ts">
  import * as L from "@loongark/svelte";
  import { documentItems, documentSections } from "../shared/arkNextDemo";
  let scroll = $state<HTMLElement | null>(null),
    mounted = $state(true),
    paused = $state(false),
    active = $state<string[]>([]),
    notice = $state<L.TocActiveChangeDetails>({
      activeIds: [],
      activeItems: [],
    });
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px"
  ><L.LoongArkTypography as="h2">Follow a document</L.LoongArkTypography
  ><L.LoongArkTypography variant="muted"
    >The outline follows visible headings. Links scroll inside the article.</L.LoongArkTypography
  ><L.LoongArkButton variant="outline" onclick={() => (mounted = !mounted)}
    >{mounted ? "Hide outline" : "Show outline"}</L.LoongArkButton
  >
  <L.LoongArkButton variant="outline" onclick={() => (paused = !paused)}
    >{paused
      ? "Resume outline updates"
      : "Pause outline updates"}</L.LoongArkButton
  >
  {#if mounted && scroll}<L.LoongArkTocRoot
      activeIds={active}
      onActiveChange={(details) => {
        notice = details;
        if (!paused) active = details.activeIds;
      }}
      items={documentItems}
      scrollEl={() => scroll}
      ><L.LoongArkTocNav placement="left"
        ><L.LoongArkTocTitle>On this page</L.LoongArkTocTitle><L.LoongArkBox
          style="position:relative"
          ><L.LoongArkTocIndicator /><L.LoongArkTocList
            >{#each documentSections as section}<L.LoongArkTocItem
                item={section}
                ><L.LoongArkTocLink href={"#" + section.value}
                  >{section.title}</L.LoongArkTocLink
                ></L.LoongArkTocItem
              >{/each}</L.LoongArkTocList
          ></L.LoongArkBox
        ></L.LoongArkTocNav
      ><output
        aria-label="Visible sections"
        data-notified-items={notice.activeItems
          .map((item) => item.value)
          .join(",")}
        >{notice.activeIds.join(", ") || "No visible section"}</output
      ></L.LoongArkTocRoot
    >{/if}
  <L.LoongArkTocContent
    bind:ref={scroll}
    aria-label="Component guide"
    tabindex={0}
    style="height:320px;overflow:auto;padding:var(--lk-space-component-lg);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg)"
    >{#each documentSections as section}<section style="min-height:240px">
        <L.LoongArkTypography
          as={section.depth === 2 ? "h2" : "h3"}
          id={section.value}>{section.title}</L.LoongArkTypography
        >
        <p>{section.text}</p>
      </section>{/each}</L.LoongArkTocContent
  >
</L.LoongArkStack>
