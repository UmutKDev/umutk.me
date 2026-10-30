import { expect, test, type Page } from "@playwright/test";

const pill = (page: Page) => page.getByRole("button", { name: "Search" });
const palette = (page: Page) => page.getByRole("dialog", { name: "Command palette" });

test.beforeEach(async ({ page }) => {
  await page.goto("/en");
  await expect(pill(page)).toBeVisible(); // hidden until hydrated
});

for (const key of ["Meta+k", "Control+k"]) {
  test(`${key} opens the palette, typing filters, Enter navigates`, async ({ page }) => {
    await page.keyboard.press(key);
    await expect(palette(page)).toBeVisible();
    await page.keyboard.type("uses");
    await expect(page.getByRole("option")).toHaveText(["Uses"]);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/uses$/);
    await expect(palette(page)).toBeHidden();
  });
}

test("the search pill opens the palette and Escape hands focus back", async ({ page }) => {
  await pill(page).click();
  await expect(palette(page)).toBeVisible();
  await expect(page.getByRole("combobox")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(palette(page)).toBeHidden();
  await expect(pill(page)).toBeFocused();
});

test("record tabs move with the arrow keys, Home and End", async ({ page }) => {
  const tabs = page.getByRole("tab");
  const n = await tabs.count();
  expect(n).toBeGreaterThan(1);
  const at = async (i: number) => {
    await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(i)).toBeFocused();
  };
  await tabs.nth(n - 1).focus(); // newest is selected and sits last
  await page.keyboard.press("ArrowLeft");
  await at(n - 2);
  await page.keyboard.press("ArrowRight");
  await at(n - 1);
  await page.keyboard.press("ArrowRight");
  await at(0); // wraps
  await page.keyboard.press("End");
  await at(n - 1);
  await page.keyboard.press("Home");
  await at(0);
});
