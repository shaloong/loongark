import {
  defineComponent,
  h,
  ref,
  shallowRef,
  type ComponentPublicInstance,
} from "vue";
import * as L from "@loongark/vue";
import { documentItems, documentSections } from "../shared/arkNextDemo";
export const TocExample = defineComponent({
  setup() {
    const scroll = shallowRef<HTMLElement | null>(null),
      mounted = ref(true),
      paused = ref(false),
      active = shallowRef<string[]>([]),
      notice = shallowRef<L.TocActiveChangeDetails>({
        activeIds: [],
        activeItems: [],
      });
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Follow a document"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "The outline follows visible headings. Links scroll inside the article.",
          ),
          h(
            L.LoongArkButton,
            {
              variant: "outline",
              onClick: () => (mounted.value = !mounted.value),
            },
            () => (mounted.value ? "Hide outline" : "Show outline"),
          ),
          h(
            L.LoongArkButton,
            {
              variant: "outline",
              onClick: () => (paused.value = !paused.value),
            },
            () =>
              paused.value ? "Resume outline updates" : "Pause outline updates",
          ),
          mounted.value &&
            h(
              L.LoongArkTocRoot,
              {
                activeIds: active.value,
                onActiveChange: (details: L.TocActiveChangeDetails) => {
                  notice.value = details;
                  if (!paused.value) active.value = details.activeIds;
                },
                items: documentItems,
                scrollEl: () => scroll.value,
              },
              () => [
                h(L.LoongArkTocNav, { placement: "left" }, () => [
                  h(L.LoongArkTocTitle, {}, () => "On this page"),
                  h(L.LoongArkBox, { style: { position: "relative" } }, () => [
                    h(L.LoongArkTocIndicator),
                    h(L.LoongArkTocList, {}, () => [
                      ...documentSections.map((section) =>
                        h(L.LoongArkTocItem, { item: section }, () =>
                          h(
                            L.LoongArkTocLink,
                            { href: "#" + section.value },
                            () => section.title,
                          ),
                        ),
                      ),
                    ]),
                  ]),
                ]),
                h(
                  "output",
                  {
                    "aria-label": "Visible sections",
                    "data-notified-items": notice.value.activeItems
                      .map((item) => item.value)
                      .join(","),
                  },
                  notice.value.activeIds.join(", ") || "No visible section",
                ),
              ],
            ),
          h(
            L.LoongArkTocContent,
            {
              ref: (element: Element | ComponentPublicInstance | null) => {
                const candidate =
                  element && "$el" in element ? element.$el : element;
                scroll.value =
                  candidate instanceof HTMLElement ? candidate : null;
              },
              "aria-label": "Component guide",
              tabindex: 0,
              style: {
                height: "320px",
                overflow: "auto",
                padding: "var(--lk-space-component-lg)",
                border:
                  "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
                borderRadius: "var(--lk-radius-lg)",
              },
            },
            () =>
              documentSections.map((section) =>
                h("section", { style: { minHeight: "240px" } }, [
                  h(
                    L.LoongArkTypography,
                    {
                      as: section.depth === 2 ? "h2" : "h3",
                      id: section.value,
                    },
                    () => section.title,
                  ),
                  h("p", section.text),
                ]),
              ),
          ),
        ],
      );
  },
});
