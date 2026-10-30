import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./routes";

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test.describe(`axe, reducedMotion ${reducedMotion}`, () => {
    test.use({ reducedMotion });
    for (const { url } of pages) {
      test(`${url} has no serious or critical violations`, async ({ page }) => {
        await page.goto(url);
        const { violations } = await new AxeBuilder({ page }).analyze();
        const bad = violations
          .filter((v) => v.impact === "serious" || v.impact === "critical")
          .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
        expect(bad).toEqual([]);
      });
    }
  });
}
