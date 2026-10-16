import React, { useEffect, useState } from "react";
import * as L from "@shaloong/loongark-react";
import { createTicketWorkflow, ticketColumns } from "../shared/ticketWorkflow";
export function TicketWorkflowExample() {
  const [, redraw] = useState(0);
  const [demo] = useState(() =>
    createTicketWorkflow(() => redraw((value) => value + 1)),
  );
  useEffect(() => {
    demo.activate();
    return demo.dispose;
  }, [demo]);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: "960px" }}>
      <L.LoongArkTypography as="h2">工单工作台</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        筛选工单，选择一行后编辑。保存使用本地模拟服务，不会发送数据。
      </L.LoongArkTypography>
      <L.LoongArkStack gap="sm">
        <L.LoongArkField.Root>
          <L.LoongArkField.Label>搜索工单</L.LoongArkField.Label>
          <L.LoongArkField.Input
            type="search"
            value={demo.state.query}
            onInput={(event) => demo.setQuery(event.currentTarget.value)}
          />
        </L.LoongArkField.Root>
        <label>
          状态筛选
          <L.LoongArkNativeSelect
            aria-label="状态筛选"
            value={demo.state.status}
            onChange={(event) => demo.setStatus(event.currentTarget.value)}
          >
            <option value="">全部状态</option>
            <option value="待处理">待处理</option>
            <option value="已解决">已解决</option>
          </L.LoongArkNativeSelect>
        </label>
      </L.LoongArkStack>
      <output aria-live="polite">找到 {demo.visibleRows.length} 条工单</output>
      <L.LoongArkDataTable
        label="工单列表"
        data={demo.visibleRows}
        columns={ticketColumns}
        selectedIds={demo.state.selectedIds}
        onSelectionChange={demo.select}
        pageSize={5}
      />
      <L.LoongArkDialog.Root
        open={demo.state.open}
        onOpenChange={(details) => demo.setOpen(details.open)}
      >
        <L.LoongArkDialog.Trigger
          disabled={demo.state.selectedIds.length !== 1}
        >
          编辑所选工单
        </L.LoongArkDialog.Trigger>
        <L.LoongArkDialog.Portal>
          <L.LoongArkDialog.Overlay />
          <L.LoongArkDialog.Positioner>
            <L.LoongArkDialog.Content>
              <L.LoongArkDialog.Title>
                编辑工单 {demo.state.draft?.id}
              </L.LoongArkDialog.Title>
              <L.LoongArkDialog.Description>
                修改标题和联系邮箱。取消会放弃尚未保存的草稿。
              </L.LoongArkDialog.Description>
              <form
                noValidate
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  if ((await demo.submit()) === "invalid")
                    demo.focusError(form);
                }}
                onReset={(event) => {
                  event.preventDefault();
                  demo.reset();
                }}
                aria-busy={demo.state.pending}
              >
                <L.LoongArkStack gap="md">
                  <L.LoongArkField.Root
                    required
                    invalid={Boolean(demo.state.errors.title)}
                    disabled={demo.state.pending}
                  >
                    <L.LoongArkField.Label>
                      标题
                      <L.LoongArkField.RequiredIndicator />
                    </L.LoongArkField.Label>
                    <L.LoongArkField.Input
                      name="title"
                      value={demo.state.draft?.title ?? ""}
                      onInput={(event) =>
                        demo.setDraft("title", event.currentTarget.value)
                      }
                    />
                    <L.LoongArkField.HelperText>
                      至少 3 个字符
                    </L.LoongArkField.HelperText>
                    {demo.state.errors.title && (
                      <L.LoongArkField.ErrorText>
                        {demo.state.errors.title}
                      </L.LoongArkField.ErrorText>
                    )}
                  </L.LoongArkField.Root>
                  <L.LoongArkField.Root
                    required
                    invalid={Boolean(demo.state.errors.email)}
                    disabled={demo.state.pending}
                  >
                    <L.LoongArkField.Label>
                      联系邮箱
                      <L.LoongArkField.RequiredIndicator />
                    </L.LoongArkField.Label>
                    <L.LoongArkField.Input
                      name="email"
                      type="email"
                      value={demo.state.draft?.email ?? ""}
                      onInput={(event) =>
                        demo.setDraft("email", event.currentTarget.value)
                      }
                    />
                    {demo.state.errors.email && (
                      <L.LoongArkField.ErrorText>
                        {demo.state.errors.email}
                      </L.LoongArkField.ErrorText>
                    )}
                  </L.LoongArkField.Root>
                  {demo.state.failure && (
                    <p role="alert">{demo.state.failure}</p>
                  )}
                  <L.LoongArkButton type="submit" disabled={demo.state.pending}>
                    {demo.state.pending ? "保存中…" : "保存工单"}
                  </L.LoongArkButton>
                  <L.LoongArkButton
                    type="reset"
                    variant="outline"
                    disabled={demo.state.pending}
                  >
                    重置修改
                  </L.LoongArkButton>
                  <L.LoongArkButton
                    type="button"
                    variant="ghost"
                    aria-pressed={demo.state.failNext}
                    disabled={demo.state.pending}
                    onClick={demo.failNext}
                  >
                    模拟下次保存失败
                  </L.LoongArkButton>
                  <L.LoongArkButton
                    type="button"
                    variant="outline"
                    onClick={() => demo.setOpen(false)}
                  >
                    取消
                  </L.LoongArkButton>
                  <L.LoongArkDialog.CloseTrigger
                    type="button"
                    aria-label="关闭编辑"
                  />
                </L.LoongArkStack>
              </form>
            </L.LoongArkDialog.Content>
          </L.LoongArkDialog.Positioner>
        </L.LoongArkDialog.Portal>
      </L.LoongArkDialog.Root>
      <output>{demo.state.notification}</output>
    </L.LoongArkStack>
  );
}
