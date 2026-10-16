import {
  createVNode,
  defineComponent,
  h,
  onBeforeUnmount,
  ref,
  resolveDynamicComponent,
  type VNodeProps,
  type InputHTMLAttributes,
} from "vue";
import type { FieldInputProps } from "@ark-ui/vue/field";
import * as L from "@shaloong/loongark-vue";
import { createTicketWorkflow, ticketColumns } from "../shared/ticketWorkflow";

export const TicketWorkflowExample = defineComponent({
  setup() {
    const revision = ref(0);
    const demo = createTicketWorkflow(() => revision.value++);
    onBeforeUnmount(demo.dispose);
    const input = (props: FieldInputProps & InputHTMLAttributes & VNodeProps) =>
      createVNode(resolveDynamicComponent(L.LoongArkField.Input), { ...props });
    const value = (event: Event, update: (value: string) => void) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement
      )
        update(event.target.value);
    };
    return () => {
      revision.value;
      const state = demo.state;
      const field = (name: "title" | "email", label: string) =>
        h(
          L.LoongArkField.Root,
          {
            required: true,
            invalid: Boolean(state.errors[name]),
            disabled: state.pending,
          },
          () => [
            h(L.LoongArkField.Label, {}, () => [
              label,
              h(L.LoongArkField.RequiredIndicator),
            ]),
            input({
              name,
              type: name === "email" ? "email" : "text",
              value: state.draft?.[name] ?? "",
              onInput: (event) =>
                value(event, (next) => demo.setDraft(name, next)),
            }),
            name === "title"
              ? h(L.LoongArkField.HelperText, {}, () => "至少 3 个字符")
              : null,
            state.errors[name]
              ? h(L.LoongArkField.ErrorText, {}, () => state.errors[name])
              : null,
          ],
        );
      return h(
        L.LoongArkStack,
        { gap: "lg", style: "width:100%;max-width:960px" },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "工单工作台"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "筛选工单，选择一行后编辑。保存使用本地模拟服务，不会发送数据。",
          ),
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(L.LoongArkField.Root, {}, () => [
              h(L.LoongArkField.Label, {}, () => "搜索工单"),
              input({
                type: "search",
                value: state.query,
                onInput: (event) => value(event, demo.setQuery),
              }),
            ]),
            h("label", {}, [
              "状态筛选",
              h(
                L.LoongArkNativeSelect,
                {
                  "aria-label": "状态筛选",
                  value: state.status,
                  onChange: (event: Event) => value(event, demo.setStatus),
                },
                () => [
                  h("option", { value: "" }, "全部状态"),
                  h("option", { value: "待处理" }, "待处理"),
                  h("option", { value: "已解决" }, "已解决"),
                ],
              ),
            ]),
          ]),
          h(
            "output",
            { "aria-live": "polite" },
            `找到 ${demo.visibleRows.length} 条工单`,
          ),
          h(L.LoongArkDataTable, {
            label: "工单列表",
            data: demo.visibleRows,
            columns: ticketColumns,
            selectedIds: state.selectedIds,
            onSelectionChange: demo.select,
            pageSize: 5,
          }),
          h(
            L.LoongArkDialog.Root,
            {
              open: state.open,
              onOpenChange: (details) => demo.setOpen(details.open),
            },
            () => [
              h(
                L.LoongArkDialog.Trigger,
                { disabled: state.selectedIds.length !== 1 },
                () => "编辑所选工单",
              ),
              h(L.LoongArkDialog.Portal, {}, () => [
                h(L.LoongArkDialog.Overlay),
                h(L.LoongArkDialog.Positioner, {}, () =>
                  h(L.LoongArkDialog.Content, {}, () => [
                    h(
                      L.LoongArkDialog.Title,
                      {},
                      () => `编辑工单 ${state.draft?.id ?? ""}`,
                    ),
                    h(
                      L.LoongArkDialog.Description,
                      {},
                      () => "修改标题和联系邮箱。取消会放弃尚未保存的草稿。",
                    ),
                    h(
                      "form",
                      {
                        novalidate: true,
                        "aria-busy": state.pending,
                        onSubmit: async (event: SubmitEvent) => {
                          event.preventDefault();
                          const form = event.currentTarget;
                          if (
                            (await demo.submit()) === "invalid" &&
                            form instanceof HTMLFormElement
                          )
                            demo.focusError(form);
                        },
                        onReset: (event: Event) => {
                          event.preventDefault();
                          demo.reset();
                        },
                      },
                      [
                        h(L.LoongArkStack, { gap: "md" }, () => [
                          field("title", "标题"),
                          field("email", "联系邮箱"),
                          state.failure
                            ? h("p", { role: "alert" }, state.failure)
                            : null,
                          h(
                            L.LoongArkButton,
                            { type: "submit", disabled: state.pending },
                            () => (state.pending ? "保存中…" : "保存工单"),
                          ),
                          h(
                            L.LoongArkButton,
                            {
                              type: "reset",
                              variant: "outline",
                              disabled: state.pending,
                            },
                            () => "重置修改",
                          ),
                          h(
                            L.LoongArkButton,
                            {
                              type: "button",
                              variant: "ghost",
                              "aria-pressed": state.failNext,
                              disabled: state.pending,
                              onClick: demo.failNext,
                            },
                            () => "模拟下次保存失败",
                          ),
                          h(
                            L.LoongArkButton,
                            {
                              type: "button",
                              variant: "outline",
                              onClick: () => demo.setOpen(false),
                            },
                            () => "取消",
                          ),
                          h(L.LoongArkDialog.CloseTrigger, {
                            type: "button",
                            "aria-label": "关闭编辑",
                          }),
                        ]),
                      ],
                    ),
                  ]),
                ),
              ]),
            ],
          ),
          h("output", {}, state.notification),
        ],
      );
    };
  },
});
