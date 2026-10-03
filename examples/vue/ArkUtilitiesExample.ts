import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
export const ArkUtilitiesExample = defineComponent({
  setup() {
    const present = ref(true),
      trapped = ref(false),
      frameVisible = ref(true);
    const button = (label: string, click: () => void, disabled = false) =>
      h(
        L.LoongArkButton,
        { type: "button", variant: "outline", onClick: click, disabled },
        () => label,
      );
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: "width:100%;max-width:640px" },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Accessible utilities"),
          h("p", {}, [
            h(L.LoongArkHighlight, {
              text: "Find LoongArk in your component workspace.",
              query: "LoongArk",
            }),
          ]),
          h("dl", {}, [
            h("dt", "File size"),
            h("dd", {}, [
              h(L.LoongArkFormatByte, { value: 2048, unitSystem: "binary" }),
            ]),
            h("dt", "Budget"),
            h("dd", {}, [
              h(L.LoongArkFormatNumber, {
                value: 1250.5,
                style: "currency",
                currency: "USD",
              }),
            ]),
          ]),
          h(
            L.LoongArkClientOnly,
            {},
            {
              default: () => h("p", "Client is ready"),
              fallback: () => h("p", "Waiting for client…"),
            },
          ),
          h(
            L.LoongArkDownloadTrigger,
            {
              fileName: "loongark-notes.txt",
              mimeType: "text/plain",
              data: "LoongArk component notes",
              "data-scope": "button",
              "data-part": "root",
              "data-size": "md",
              "data-variant": "outline",
            },
            () => "Download notes",
          ),
          button("Toggle presence", () => {
            present.value = !present.value;
          }),
          h(
            L.LoongArkPresence,
            { present: present.value, lazyMount: true, unmountOnExit: true },
            () => h("p", "Optional details"),
          ),
          button("Start focus task", () => {
            trapped.value = true;
          }),
          trapped.value
            ? h(
                L.LoongArkFocusTrap,
                {
                  initialFocus: "#focus-task-input",
                  returnFocusOnDeactivate: true,
                },
                () =>
                  h(L.LoongArkStack, { gap: "sm" }, () => [
                    h(L.LoongArkInputRoot, {}, () => [
                      h(
                        L.LoongArkInputLabel,
                        { for: "focus-task-input" },
                        () => "Task name",
                      ),
                      h(L.LoongArkInputInput, { id: "focus-task-input" }),
                    ]),
                    button("Finish focus task", () => {
                      trapped.value = false;
                    }),
                  ]),
              )
            : null,
          button("Toggle frame", () => {
            frameVisible.value = !frameVisible.value;
          }),
          frameVisible.value
            ? h(
                L.LoongArkFrame,
                {
                  title: "Isolated dark preview",
                  style:
                    "width:100%;height:120px;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md)",
                },
                () =>
                  h(L.LoongArkProvider, { mode: "dark" }, () =>
                    h(
                      "main",
                      {
                        "aria-label": "Isolated preview content",
                        style:
                          "padding:var(--lk-space-component-md);min-height:120px;background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)",
                      },
                      [
                        h(
                          L.LoongArkTypography,
                          { as: "h1" },
                          () => "Frame content",
                        ),
                        h(
                          L.LoongArkButton,
                          { type: "button" },
                          () => "Inside frame",
                        ),
                      ],
                    ),
                  ),
              )
            : null,
        ],
      );
  },
});
