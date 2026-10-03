import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkConversationActions } from "./conversationActionsChecks";
for (const mode of ["light", "dark"])
  test(`Conversation actions ${mode} 异步操作、取消、预览与焦点`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=examples-conversationactions--overview&globals=mode:${mode}`,
    );
    await checkConversationActions(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
