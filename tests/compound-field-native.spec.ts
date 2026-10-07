import { expect, test } from "@playwright/test";
for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 320])
      test(`compound Field native contracts ${framework} ${mode} ${width}`, async ({
        page,
        browserName,
      }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
        );
        await page.setViewportSize({ width, height: 1100 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-field--compound-inputs&globals=mode:${mode}`
            : `/examples-${framework}/?example=CompoundFieldExample&mode=${mode}`,
        );
        const form = page.getByRole("form", {
          name: "Compound field preferences",
        });
        const quantity = form.locator('input[name="quantity"]'),
          password = form.locator('input[name="password"]');
        const ownQuantity = form.locator('input[name="own-quantity"]'),
          ownPassword = form.locator('input[name="own-password"]');
        const button = (name: string) =>
          page.getByRole("button", { name, exact: true });
        const entries = () =>
          form.evaluate((n) =>
            Object.fromEntries(new FormData(n as HTMLFormElement)),
          );
        const capture = (state: string) =>
          form.screenshot({
            path: `.artifacts/p0-field/compound-${browserName}-${framework}-${mode}-${width}-${state}.png`,
            animations: "disabled",
          });
        await expect(form).toBeVisible();
        await expect(quantity).toHaveValue("3");
        await expect(ownQuantity).toHaveValue("3");
        await expect(quantity).toHaveJSProperty("required", true);
        await expect(password).toHaveJSProperty("required", true);
        await expect(ownQuantity).toHaveJSProperty("required", false);
        await expect(ownPassword).toHaveJSProperty("required", false);
        for (const input of [quantity, password, ownQuantity, ownPassword]) {
          await expect(input).toHaveAccessibleName(/quantity|password/i);
          await expect
            .poll(() =>
              input.evaluate((n) =>
                (n.getAttribute("aria-describedby") ?? "")
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((id) => document.getElementById(id)?.textContent ?? "")
                  .join(" "),
              ),
            )
            .toContain("Disabled inputs are excluded");
        }
        await expect
          .poll(() =>
            quantity.evaluate((n) =>
              (n.getAttribute("aria-describedby") ?? "")
                .split(/\s+/)
                .map((id) => document.getElementById(id)?.textContent ?? "")
                .join(" "),
            ),
          )
          .toContain("between 0 and 99");
        await button("Submit").click();
        await expect(password).toBeFocused();
        await expect(form.getByRole("status")).toHaveText("No submission yet");
        await password.fill("sample");
        await ownPassword.fill("independent");
        await quantity.fill("8");
        await quantity.press("Tab");
        await expect(quantity).toHaveValue("8");
        await button("Reject numeric updates").click();
        await quantity.fill("9");
        await quantity.press("Tab");
        await expect(quantity).toHaveValue("8");
        await button("Reject numeric updates").click();
        await button("Disabled").click();
        await expect(quantity).toBeDisabled();
        await expect(password).toBeDisabled();
        await expect(ownQuantity).toBeEnabled();
        await expect(ownPassword).toBeEnabled();
        await expect(
          quantity.locator("xpath=..").locator("[data-part=increment-trigger]"),
        ).toBeDisabled();
        await expect(
          password
            .locator("xpath=..")
            .locator("[data-part=visibility-trigger]"),
        ).toBeDisabled();
        await expect
          .poll(entries)
          .toEqual({ "own-quantity": "3", "own-password": "independent" });
        await capture("disabled");
        await button("Disabled").click();
        await button("Read only").click();
        await expect(quantity).toHaveJSProperty("readOnly", true);
        await expect(password).toHaveJSProperty("readOnly", true);
        await expect(ownQuantity).toHaveJSProperty("readOnly", false);
        await expect(ownPassword).toHaveJSProperty("readOnly", false);
        await quantity.focus();
        await page.keyboard.press("ArrowUp");
        await expect(quantity).toHaveValue("8");
        await password.focus();
        await page.keyboard.press("x");
        await expect(password).toHaveValue("sample");
        await capture("readonly");
        await button("Read only").click();
        await button("Invalid").click();
        await expect(quantity).toHaveAttribute("aria-invalid", "true");
        await expect(password).toHaveAttribute("aria-invalid", "true");
        for (const input of [quantity, password])
          await expect
            .poll(() =>
              input.evaluate((n) =>
                (n.getAttribute("aria-describedby") ?? "")
                  .split(/\s+/)
                  .map((id) => document.getElementById(id)?.textContent ?? "")
                  .join(" "),
              ),
            )
            .toContain("before submitting");
        await expect(ownQuantity).not.toHaveAttribute("aria-invalid", "true");
        await expect(ownPassword).not.toHaveAttribute("aria-invalid", "true");
        await button("Long descriptions").click();
        await button("Right-to-left").click();
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          )
          .toBe(true);
        await capture("invalid-long-rtl");
        await button("Right-to-left").click();
        await button("Long descriptions").click();
        await button("Invalid").click();
        await button("Submit").click();
        await expect(form.getByRole("status")).toHaveText(
          "quantity, password, own-quantity, own-password",
        );
        await button("Reset").click();
        await expect(quantity).toHaveValue("3");
        await expect(ownQuantity).toHaveValue("3");
        await expect(password).toHaveValue("");
        await expect(ownPassword).toHaveValue("");
      });
