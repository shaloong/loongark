import { defineComponent, h, ref, type Component } from "vue";
import * as L from "@loongark/vue";
export const FoundationsExample = defineComponent({
  setup() {
    const notes = ref(""),
      chip = ref(true),
      selection = ref("Overview"),
      route = ref("Home"),
      submitted = ref(0);
    const el = (
      c: Component | string,
      props: Record<string, unknown> | null,
      ...children: any[]
    ): any =>
      h(c as any, props, typeof c === "string" ? children : () => children);
    return () =>
      el(
        L.LoongArkContainer,
        null,
        el(
          L.LoongArkStack,
          { gap: "lg" },
          el(
            L.LoongArkAppBar,
            null,
            el(
              L.LoongArkToolbar,
              null,
              el("strong", null, "LoongArk"),
              el(L.LoongArkLink, { href: "#docs" }, "Documentation"),
            ),
          ),
          el(
            L.LoongArkGrid,
            { columns: 2, gap: "md" },
            el(
              L.LoongArkPaper,
              null,
              el(
                L.LoongArkStack,
                { gap: "md" },
                el("h2", null, "Project notes"),
                el(
                  "form",
                  {
                    onSubmit: (e: Event) => {
                      e.preventDefault();
                      submitted.value++;
                    },
                  },
                  el(
                    L.LoongArkStack,
                    { gap: "sm" },
                    el(L.LoongArkLabel, { for: "foundation-notes" }, "Notes"),
                    el(L.LoongArkTextarea, {
                      id: "foundation-notes",
                      name: "notes",
                      modelValue: notes.value,
                      "onUpdate:modelValue": (v: string) => (notes.value = v),
                      placeholder: "Write a project note…",
                    }),
                    el(
                      "output",
                      { "data-testid": "notes-count" },
                      notes.value.length + " characters",
                    ),
                    chip.value
                      ? el(
                          L.LoongArkChip,
                          { style: "width:fit-content" },
                          el(L.LoongArkChipLabel, null, "Design"),
                          el(
                            L.LoongArkChipRemoveTrigger,
                            {
                              "aria-label": "Remove Design",
                              onClick: () => (chip.value = false),
                            },
                            "×",
                          ),
                        )
                      : el(
                          L.LoongArkButton,
                          {
                            variant: "outline",
                            onClick: () => (chip.value = true),
                          },
                          "Restore Design",
                        ),
                    el(
                      "span",
                      { "data-testid": "submitted", hidden: true },
                      String(submitted.value),
                    ),
                  ),
                ),
              ),
            ),
            el(
              L.LoongArkPaper,
              null,
              el(
                L.LoongArkStack,
                { gap: "md" },
                el("h2", null, "Workspace"),
                el(
                  L.LoongArkList,
                  null,
                  ...["Overview", "Members", "Settings"].map((name) =>
                    el(
                      L.LoongArkListItem,
                      null,
                      el(
                        L.LoongArkListItemButton,
                        {
                          "aria-pressed": selection.value === name,
                          onClick: () => (selection.value = name),
                        },
                        el(L.LoongArkListItemIcon, null, "○"),
                        el(L.LoongArkListItemText, null, name),
                      ),
                    ),
                  ),
                ),
                el(
                  L.LoongArkAvatarGroup,
                  { role: "group", "aria-label": "Members" },
                  ...["LA", "JL", "MK"].map((name) =>
                    el(
                      L.LoongArkAvatarRoot,
                      null,
                      el(L.LoongArkAvatarFallback, null, name),
                    ),
                  ),
                  el(
                    L.LoongArkAvatarGroupOverflow,
                    { "aria-label": "3 more members" },
                    "+3",
                  ),
                ),
              ),
            ),
          ),
          el(
            L.LoongArkBox,
            { padding: "sm" },
            el(
              L.LoongArkTimeline,
              null,
              ...["Created", "Designed", "Published"].map((name, i) =>
                el(
                  L.LoongArkTimelineItem,
                  null,
                  el(L.LoongArkTimelineIndicator, null, String(i + 1)),
                  el(
                    L.LoongArkTimelineContent,
                    null,
                    el(L.LoongArkTimelineTitle, null, name),
                    el(L.LoongArkTimelineDescription, null, "Project activity"),
                    el(
                      L.LoongArkTimelineTime,
                      {
                        datetime:
                          "2026-10-03T" +
                          String(i + 8).padStart(2, "0") +
                          ":00:00+08:00",
                      },
                      i + 8 + ":00",
                    ),
                  ),
                ),
              ),
            ),
          ),
          el(
            L.LoongArkBottomNavigation,
            null,
            ...["Home", "Search", "Settings"].map((name) =>
              el(
                L.LoongArkBottomNavigationItem,
                {
                  href: "#" + name,
                  active: route.value === name,
                  onClick: (e: Event) => {
                    e.preventDefault();
                    route.value = name;
                  },
                },
                el(L.LoongArkBottomNavigationIcon, null, "○"),
                el(L.LoongArkBottomNavigationLabel, null, name),
              ),
            ),
          ),
        ),
      );
  },
});
