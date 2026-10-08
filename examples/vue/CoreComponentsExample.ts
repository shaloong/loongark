import type { AngleSliderHiddenInputProps } from "@ark-ui/vue/angle-slider";
import type { PinInputHiddenInputProps } from "@ark-ui/vue/pin-input";
// 本文件由 scripts/generate-core-examples.mjs 生成，并参与真实四端编译与浏览器验收。
import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  ref,
} from "vue";
import * as L from "@loongark/vue";
export const CoreComponentsExample = defineComponent({
  setup() {
    const family = ref("NativeSelect");
    return () =>
      h(
        "section",
        {
          style: {
            display: "grid",
            gap: "var(--lk-space-component-lg)",
            "max-width": "40rem",
            "min-width": 0,
            width: "100%",
          },
        },
        [
          h(
            "label",
            { style: { display: "grid", gap: "var(--lk-control-fieldgap)" } },
            [
              "组件示例",
              h(
                L.LoongArkNativeSelect,
                {
                  "aria-label": "组件示例",
                  value: family.value,
                  onChange: (event: Event) => {
                    if (event.target instanceof HTMLSelectElement)
                      family.value = event.target.value;
                  },
                },
                [
                  "Accordion",
                  "Alert",
                  "AlertDialog",
                  "AngleSlider",
                  "AspectRatio",
                  "Badge",
                  "Breadcrumb",
                  "ButtonGroup",
                  "Collapsible",
                  "Direction",
                  "Empty",
                  "FilterBar",
                  "FloatingPanel",
                  "Item",
                  "Kbd",
                  "Marquee",
                  "Menubar",
                  "NativeSelect",
                  "NavigationMenu",
                  "PinInput",
                  "Popover",
                  "QRCode",
                  "Separator",
                  "Sheet",
                  "Sidebar",
                  "SignaturePad",
                  "Skeleton",
                  "Slider",
                  "Spinner",
                  "Table",
                  "Tabs",
                  "Timer",
                  "Toggle",
                  "ToggleGroup",
                  "Tooltip",
                ].map((name) => h("option", {}, name)),
              ),
            ],
          ),
          family.value === "Accordion"
            ? h(
                "div",
                { "data-core-family": "Accordion", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkAccordionRoot,
                    { collapsible: true },
                    {
                      default: () => [
                        h(
                          L.LoongArkAccordionItem,
                          { value: "one" },
                          {
                            default: () => [
                              h(
                                L.LoongArkAccordionItemTrigger,
                                {},
                                {
                                  default: () => [
                                    "部署设置",
                                    h(
                                      L.LoongArkAccordionItemIndicator,
                                      {},
                                      { default: () => [] },
                                    ),
                                  ],
                                },
                              ),
                              h(
                                L.LoongArkAccordionItemContent,
                                {},
                                {
                                  default: () => [
                                    "通过 main 发布正式组件展示。",
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Alert"
            ? h(
                "div",
                { "data-core-family": "Alert", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkAlert,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkAlertTitle,
                          {},
                          { default: () => ["设置已保存"] },
                        ),
                        h(
                          L.LoongArkAlertDescription,
                          {},
                          { default: () => ["当前修改已经生效。"] },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "AlertDialog"
            ? h(
                "div",
                { "data-core-family": "AlertDialog", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkAlertDialogRoot,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkDialogTrigger,
                          {},
                          { default: () => ["确认操作"] },
                        ),
                        h(
                          L.LoongArkDialogPortal,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkDialogOverlay,
                                {},
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkDialogPositioner,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkDialogContent,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkDialogTitle,
                                            {},
                                            { default: () => ["继续操作？"] },
                                          ),
                                          h(
                                            L.LoongArkDialogDescription,
                                            {},
                                            {
                                              default: () => [
                                                "关闭窗口不会修改任何数据。",
                                              ],
                                            },
                                          ),
                                          h(
                                            L.LoongArkDialogCloseTrigger,
                                            {},
                                            { default: () => ["取消"] },
                                          ),
                                        ],
                                      },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "AngleSlider"
            ? h(
                "div",
                { "data-core-family": "AngleSlider", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkAngleSlider.Root,
                    { defaultValue: 45 },
                    {
                      default: () => [
                        h(
                          L.LoongArkAngleSlider.Label,
                          {},
                          { default: () => ["旋转角度"] },
                        ),
                        h(
                          L.LoongArkAngleSlider.Control,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkAngleSlider.Thumb,
                                {},
                                { default: () => [] },
                              ),
                            ],
                          },
                        ),
                        h(
                          L.LoongArkAngleSlider.ValueText,
                          {},
                          { default: () => [] },
                        ),
                        createVNode(
                          resolveDynamicComponent(
                            L.LoongArkAngleSlider.HiddenInput,
                          ),
                          {
                            name: "rotation",
                          } satisfies AngleSliderHiddenInputProps,
                          { default: () => [] },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "AspectRatio"
            ? h(
                "div",
                { "data-core-family": "AspectRatio", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkAspectRatio,
                    { ratio: 16 / 9 },
                    {
                      default: () => [
                        h(
                          L.LoongArkPaper,
                          { padding: "md" },
                          { default: () => ["16:9 内容区域"] },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Badge"
            ? h(
                "div",
                { "data-core-family": "Badge", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkBadge,
                    { variant: "outline" },
                    { default: () => ["已发布"] },
                  ),
                ],
              )
            : null,
          family.value === "Breadcrumb"
            ? h(
                "div",
                { "data-core-family": "Breadcrumb", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkBreadcrumb,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkBreadcrumbList,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkBreadcrumbItem,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkBreadcrumbLink,
                                      { href: "#overview" },
                                      { default: () => ["概览"] },
                                    ),
                                  ],
                                },
                              ),
                              h(
                                L.LoongArkBreadcrumbSeparator,
                                {},
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkBreadcrumbItem,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkBreadcrumbPage,
                                      {},
                                      { default: () => ["组件"] },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "ButtonGroup"
            ? h(
                "div",
                { "data-core-family": "ButtonGroup", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkButtonGroup,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkButton,
                          { variant: "outline" },
                          { default: () => ["保存草稿"] },
                        ),
                        h(L.LoongArkButton, {}, { default: () => ["发布"] }),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Collapsible"
            ? h(
                "div",
                { "data-core-family": "Collapsible", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkCollapsibleRoot,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkCollapsibleTrigger,
                          {},
                          { default: () => ["查看详细信息"] },
                        ),
                        h(
                          L.LoongArkCollapsibleContent,
                          {},
                          {
                            default: () => [
                              "展开内容保留组件的键盘和焦点行为。",
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Direction"
            ? h(
                "div",
                { "data-core-family": "Direction", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkDirection,
                    { dir: "rtl" },
                    {
                      default: () => [
                        h(
                          L.LoongArkNativeSelect,
                          { "aria-label": "从右向左的选项" },
                          {
                            default: () => [
                              h("option", { value: "one" }, ["方向与箭头留白"]),
                              h("option", { value: "two" }, ["第二项"]),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Empty"
            ? h(
                "div",
                { "data-core-family": "Empty", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkEmpty,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkEmptyHeader,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkEmptyTitle,
                                {},
                                { default: () => ["暂无文件"] },
                              ),
                              h(
                                L.LoongArkEmptyDescription,
                                {},
                                { default: () => ["添加文件后将在这里显示。"] },
                              ),
                            ],
                          },
                        ),
                        h(
                          L.LoongArkEmptyContent,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkButton,
                                {},
                                { default: () => ["添加文件"] },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "FilterBar"
            ? h(
                "div",
                { "data-core-family": "FilterBar", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkFilterBar,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkFilterBarSearch,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkInputRoot,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkInputLabel,
                                      {},
                                      { default: () => ["搜索"] },
                                    ),
                                    h(
                                      L.LoongArkInputControl,
                                      { placeholder: "搜索组件" },
                                      { default: () => [] },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                        h(
                          L.LoongArkFilterBarActions,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkButton,
                                { variant: "outline" },
                                { default: () => ["重置"] },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "FloatingPanel"
            ? h(
                "div",
                { "data-core-family": "FloatingPanel", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkFloatingPanel.Root,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkFloatingPanel.Trigger,
                          {},
                          { default: () => ["打开检查面板"] },
                        ),
                        h(
                          L.LoongArkFloatingPanel.Positioner,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkFloatingPanel.Content,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkFloatingPanel.Header,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkFloatingPanel.Title,
                                            {},
                                            { default: () => ["检查面板"] },
                                          ),
                                          h(
                                            L.LoongArkFloatingPanel
                                              .CloseTrigger,
                                            {},
                                            { default: () => ["关闭"] },
                                          ),
                                        ],
                                      },
                                    ),
                                    h(
                                      L.LoongArkFloatingPanel.Body,
                                      {},
                                      {
                                        default: () => [
                                          "拖动标题栏或右下角调整面板。",
                                        ],
                                      },
                                    ),
                                    h(
                                      L.LoongArkFloatingPanel.ResizeTrigger,
                                      { axis: "se" },
                                      { default: () => [] },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Item"
            ? h("div", { "data-core-family": "Item", style: { minWidth: 0 } }, [
                h(
                  L.LoongArkItem,
                  {},
                  {
                    default: () => [
                      h(
                        L.LoongArkItemContent,
                        {},
                        {
                          default: () => [
                            h(
                              L.LoongArkItemTitle,
                              {},
                              { default: () => ["组件说明"] },
                            ),
                            h(
                              L.LoongArkItemDescription,
                              {},
                              {
                                default: () => [
                                  "用于列表中的标题、描述和操作组合。",
                                ],
                              },
                            ),
                          ],
                        },
                      ),
                      h(
                        L.LoongArkItemActions,
                        {},
                        {
                          default: () => [
                            h(
                              L.LoongArkButton,
                              { variant: "outline" },
                              { default: () => ["查看"] },
                            ),
                          ],
                        },
                      ),
                    ],
                  },
                ),
              ])
            : null,
          family.value === "Kbd"
            ? h("div", { "data-core-family": "Kbd", style: { minWidth: 0 } }, [
                h(
                  L.LoongArkKbdGroup,
                  {},
                  {
                    default: () => [
                      h(L.LoongArkKbd, {}, { default: () => ["Ctrl"] }),
                      h("span", {}, ["+"]),
                      h(L.LoongArkKbd, {}, { default: () => ["K"] }),
                    ],
                  },
                ),
              ])
            : null,
          family.value === "Marquee"
            ? h(
                "div",
                { "data-core-family": "Marquee", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkMarquee.Root,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkMarquee.Viewport,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkMarquee.Content,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkMarquee.Item,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkBadge,
                                            { variant: "outline" },
                                            { default: () => ["React"] },
                                          ),
                                        ],
                                      },
                                    ),
                                    h(
                                      L.LoongArkMarquee.Item,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkBadge,
                                            { variant: "outline" },
                                            { default: () => ["Vue"] },
                                          ),
                                        ],
                                      },
                                    ),
                                    h(
                                      L.LoongArkMarquee.Item,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkBadge,
                                            { variant: "outline" },
                                            {
                                              default: () => ["Solid / Svelte"],
                                            },
                                          ),
                                        ],
                                      },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Menubar"
            ? h(
                "div",
                { "data-core-family": "Menubar", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkMenubar,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkMenuRoot,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkMenuTrigger,
                                {},
                                { default: () => ["文件"] },
                              ),
                              h(
                                L.LoongArkMenuPositioner,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkMenuContent,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkMenuItem,
                                            { value: "new" },
                                            { default: () => ["新建"] },
                                          ),
                                          h(
                                            L.LoongArkMenuItem,
                                            { value: "save" },
                                            { default: () => ["保存"] },
                                          ),
                                        ],
                                      },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "NativeSelect"
            ? h(
                "div",
                { "data-core-family": "NativeSelect", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkNativeSelect,
                    { name: "plan", "aria-label": "方案" },
                    {
                      default: () => [
                        h("option", { value: "free" }, ["免费方案"]),
                        h("option", { value: "pro" }, [
                          "专业方案与较长的选项名称",
                        ]),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "NavigationMenu"
            ? h(
                "div",
                {
                  "data-core-family": "NavigationMenu",
                  style: { minWidth: 0 },
                },
                [
                  h(
                    L.LoongArkNavigationMenu,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkNavigationMenuList,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkNavigationMenuItem,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkNavigationMenuLink,
                                      { href: "#overview" },
                                      { default: () => ["概览"] },
                                    ),
                                  ],
                                },
                              ),
                              h(
                                L.LoongArkNavigationMenuItem,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkNavigationMenuLink,
                                      { href: "#reference" },
                                      { default: () => ["API"] },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "PinInput"
            ? h(
                "div",
                { "data-core-family": "PinInput", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkPinInputRoot,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkPinInputLabel,
                          {},
                          { default: () => ["验证码"] },
                        ),
                        h(
                          L.LoongArkPinInputControl,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkPinInputInput,
                                { index: 0 },
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkPinInputInput,
                                { index: 1 },
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkPinInputInput,
                                { index: 2 },
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkPinInputInput,
                                { index: 3 },
                                { default: () => [] },
                              ),
                            ],
                          },
                        ),
                        createVNode(
                          resolveDynamicComponent(
                            L.LoongArkPinInputHiddenInput,
                          ),
                          { name: "code" } satisfies PinInputHiddenInputProps,
                          { default: () => [] },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Popover"
            ? h(
                "div",
                { "data-core-family": "Popover", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkPopoverRoot,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkPopoverTrigger,
                          { asChild: false },
                          { default: () => ["打开详情"] },
                        ),
                        h(
                          L.LoongArkPopoverPositioner,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkPopoverContent,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkPopoverTitle,
                                      {},
                                      { default: () => ["详情"] },
                                    ),
                                    h(
                                      L.LoongArkPopoverDescription,
                                      {},
                                      { default: () => ["浮层继承当前主题。"] },
                                    ),
                                    h(
                                      L.LoongArkPopoverCloseTrigger,
                                      {},
                                      { default: () => ["关闭"] },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "QRCode"
            ? h(
                "div",
                { "data-core-family": "QRCode", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkQrCode.Root,
                    { value: "https://shaloong.github.io/loongark/" },
                    {
                      default: () => [
                        h(
                          L.LoongArkQrCode.Frame,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkQrCode.Pattern,
                                {},
                                { default: () => [] },
                              ),
                            ],
                          },
                        ),
                        h(
                          L.LoongArkQrCode.DownloadTrigger,
                          { mimeType: "image/png", fileName: "loongark.png" },
                          { default: () => ["下载二维码"] },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Separator"
            ? h(
                "div",
                { "data-core-family": "Separator", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkStack,
                    {},
                    {
                      default: () => [
                        h("span", {}, ["基本设置"]),
                        h(L.LoongArkSeparator, {}, { default: () => [] }),
                        h("span", {}, ["高级设置"]),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Sheet"
            ? h(
                "div",
                { "data-core-family": "Sheet", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkSheetRoot,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkSheetTrigger,
                          {},
                          { default: () => ["打开侧边面板"] },
                        ),
                        h(
                          L.LoongArkSheetPortal,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkSheetOverlay,
                                {},
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkSheetPositioner,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkSheetContent,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkSheetTitle,
                                            {},
                                            { default: () => ["编辑偏好"] },
                                          ),
                                          h(
                                            L.LoongArkSheetDescription,
                                            {},
                                            {
                                              default: () => [
                                                "关闭后恢复触发器焦点。",
                                              ],
                                            },
                                          ),
                                          h(
                                            L.LoongArkSheetAction,
                                            {},
                                            { default: () => ["完成"] },
                                          ),
                                        ],
                                      },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Sidebar"
            ? h(
                "div",
                { "data-core-family": "Sidebar", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkSidebar,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkSidebarHeader,
                          {},
                          { default: () => ["工作区"] },
                        ),
                        h(
                          L.LoongArkSidebarContent,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkSidebarMenu,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkSidebarMenuItem,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkSidebarMenuButton,
                                            {},
                                            { default: () => ["概览"] },
                                          ),
                                        ],
                                      },
                                    ),
                                    h(
                                      L.LoongArkSidebarMenuItem,
                                      {},
                                      {
                                        default: () => [
                                          h(
                                            L.LoongArkSidebarMenuButton,
                                            {},
                                            { default: () => ["设置"] },
                                          ),
                                        ],
                                      },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "SignaturePad"
            ? h(
                "div",
                { "data-core-family": "SignaturePad", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkSignaturePad.Root,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkSignaturePad.Label,
                          {},
                          { default: () => ["签名"] },
                        ),
                        h(
                          L.LoongArkSignaturePad.Control,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkSignaturePad.Segment,
                                {},
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkSignaturePad.Guide,
                                {},
                                { default: () => [] },
                              ),
                            ],
                          },
                        ),
                        h(
                          L.LoongArkSignaturePad.ClearTrigger,
                          {},
                          { default: () => ["清除签名"] },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Skeleton"
            ? h(
                "div",
                { "data-core-family": "Skeleton", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkStack,
                    {},
                    {
                      default: () => [
                        h(L.LoongArkSkeleton, {}, { default: () => [] }),
                        h(L.LoongArkSkeleton, {}, { default: () => [] }),
                        h("span", {}, ["内容正在加载"]),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Slider"
            ? h(
                "div",
                { "data-core-family": "Slider", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkSliderRoot,
                    { defaultValue: [50] },
                    {
                      default: () => [
                        h(
                          L.LoongArkSliderLabel,
                          {},
                          { default: () => ["音量"] },
                        ),
                        h(
                          L.LoongArkSliderControl,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkSliderTrack,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkSliderRange,
                                      {},
                                      { default: () => [] },
                                    ),
                                  ],
                                },
                              ),
                              h(
                                L.LoongArkSliderThumb,
                                { index: 0 },
                                { default: () => [] },
                              ),
                            ],
                          },
                        ),
                        h(L.LoongArkSliderValueText, {}, { default: () => [] }),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Spinner"
            ? h(
                "div",
                { "data-core-family": "Spinner", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkStack,
                    { orientation: "horizontal" },
                    {
                      default: () => [
                        h(
                          L.LoongArkSpinner,
                          { "aria-label": "加载中" },
                          { default: () => [] },
                        ),
                        h("span", {}, ["正在载入组件"]),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Table"
            ? h(
                "div",
                { "data-core-family": "Table", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkTable,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkTableCaption,
                          {},
                          { default: () => ["发布组件"] },
                        ),
                        h(
                          L.LoongArkTableHeader,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkTableRow,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkTableHead,
                                      {},
                                      { default: () => ["框架"] },
                                    ),
                                    h(
                                      L.LoongArkTableHead,
                                      {},
                                      { default: () => ["状态"] },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                        h(
                          L.LoongArkTableBody,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkTableRow,
                                {},
                                {
                                  default: () => [
                                    h(
                                      L.LoongArkTableCell,
                                      {},
                                      {
                                        default: () => [
                                          "React / Vue / Solid / Svelte",
                                        ],
                                      },
                                    ),
                                    h(
                                      L.LoongArkTableCell,
                                      {},
                                      { default: () => ["支持"] },
                                    ),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Tabs"
            ? h("div", { "data-core-family": "Tabs", style: { minWidth: 0 } }, [
                h(
                  L.LoongArkTabsRoot,
                  { defaultValue: "overview" },
                  {
                    default: () => [
                      h(
                        L.LoongArkTabsList,
                        {},
                        {
                          default: () => [
                            h(
                              L.LoongArkTabsTrigger,
                              { value: "overview" },
                              { default: () => ["概览"] },
                            ),
                            h(
                              L.LoongArkTabsTrigger,
                              { value: "api" },
                              { default: () => ["API"] },
                            ),
                          ],
                        },
                      ),
                      h(
                        L.LoongArkTabsContent,
                        { value: "overview" },
                        { default: () => ["组件概览"] },
                      ),
                      h(
                        L.LoongArkTabsContent,
                        { value: "api" },
                        { default: () => ["组件的公开 API"] },
                      ),
                    ],
                  },
                ),
              ])
            : null,
          family.value === "Timer"
            ? h(
                "div",
                { "data-core-family": "Timer", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkTimer.Root,
                    { countdown: true, startMs: 60000 },
                    {
                      default: () => [
                        h(
                          L.LoongArkTimer.Area,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkTimer.Item,
                                { type: "minutes" },
                                { default: () => [] },
                              ),
                              h(
                                L.LoongArkTimer.Separator,
                                {},
                                { default: () => [":"] },
                              ),
                              h(
                                L.LoongArkTimer.Item,
                                { type: "seconds" },
                                { default: () => [] },
                              ),
                            ],
                          },
                        ),
                        h(
                          L.LoongArkTimer.Control,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkTimer.ActionTrigger,
                                { action: "start" },
                                { default: () => ["开始"] },
                              ),
                              h(
                                L.LoongArkTimer.ActionTrigger,
                                { action: "pause" },
                                { default: () => ["暂停"] },
                              ),
                              h(
                                L.LoongArkTimer.ActionTrigger,
                                { action: "reset" },
                                { default: () => ["重置"] },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Toggle"
            ? h(
                "div",
                { "data-core-family": "Toggle", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkToggleRoot,
                    { "aria-label": "加粗" },
                    { default: () => ["加粗"] },
                  ),
                ],
              )
            : null,
          family.value === "ToggleGroup"
            ? h(
                "div",
                { "data-core-family": "ToggleGroup", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkToggleGroupRoot,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkToggleGroupItem,
                          { value: "bold" },
                          { default: () => ["加粗"] },
                        ),
                        h(
                          L.LoongArkToggleGroupItem,
                          { value: "italic" },
                          { default: () => ["斜体"] },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
          family.value === "Tooltip"
            ? h(
                "div",
                { "data-core-family": "Tooltip", style: { minWidth: 0 } },
                [
                  h(
                    L.LoongArkTooltipRoot,
                    {},
                    {
                      default: () => [
                        h(
                          L.LoongArkTooltipTrigger,
                          { asChild: false },
                          { default: () => ["查看提示"] },
                        ),
                        h(
                          L.LoongArkTooltipPositioner,
                          {},
                          {
                            default: () => [
                              h(
                                L.LoongArkTooltipContent,
                                {},
                                { default: () => ["支持键盘聚焦和鼠标悬停。"] },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                ],
              )
            : null,
        ],
      );
  },
});
