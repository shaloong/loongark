import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { controlIcons } from "@loongark/kit";
const row = {
  display: "flex",
  alignItems: "center",
  gap: "var(--lk-space-component-md)",
  flexWrap: "wrap",
};
export const IconExample = defineComponent({
  setup() {
    const active = ref(false);
    return () =>
      h(L.LoongArkStack, {}, () => [
        h(L.LoongArkPaper, {}, () =>
          h(L.LoongArkStack, {}, () => [
            h("h2", "统一的线条图标"),
            h("p", "默认继承文字颜色，图标按钮由按钮提供名称。"),
            h("div", { style: row }, [
              h(L.LoongArkIcon, {
                icon: controlIcons.search,
                label: "Small search",
                size: "sm",
              }),
              h(L.LoongArkIcon, {
                icon: controlIcons.search,
                label: "Medium search",
              }),
              h(L.LoongArkIcon, {
                icon: controlIcons.search,
                label: "Large search",
                size: "lg",
              }),
              h(L.LoongArkIcon, {
                icon: controlIcons.search,
                label: "Fixed stroke search",
                size: 32,
                absoluteStrokeWidth: true,
              }),
            ]),
            h("div", { style: row }, [
              h(
                L.LoongArkButton,
                { "aria-label": "Search", size: "icon", variant: "outline" },
                () => h(L.LoongArkIcon, { icon: controlIcons.search }),
              ),
              h(
                L.LoongArkButton,
                { disabled: true, variant: "outline" },
                () => [
                  h(L.LoongArkIcon, { icon: controlIcons.plus }),
                  "添加项目",
                ],
              ),
              h(
                L.LoongArkButton,
                {
                  variant: "outline",
                  onClick: () => (active.value = !active.value),
                },
                () => "切换图标",
              ),
            ]),
            h(L.LoongArkIcon, {
              "data-testid": "dynamic-icon",
              icon: active.value ? controlIcons.check : controlIcons.search,
              label: active.value
                ? "Ready illustration"
                : "Search illustration",
              size: active.value ? 32 : 16,
              strokeWidth: active.value ? 1.5 : 2,
            }),
          ]),
        ),
        h(L.LoongArkPaper, {}, () =>
          h(L.LoongArkStack, {}, () => [
            h("h2", "逻辑方向"),
            h("p", "仅导航箭头镜像，搜索、加号等图标保持原形。"),
            ...["ltr", "rtl"].map((dir) =>
              h("div", { dir, style: row }, [
                h("span", dir.toUpperCase()),
                h(L.LoongArkIcon, {
                  "data-testid": dir + "-arrow",
                  icon: controlIcons.arrowRight,
                  mirrorInRtl: true,
                }),
                h(L.LoongArkIcon, {
                  "data-testid": dir + "-search",
                  icon: controlIcons.search,
                }),
              ]),
            ),
          ]),
        ),
      ]);
  },
});
