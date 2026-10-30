import { defineConfig } from "@playwright/test";

const port = 3700;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  use: {
    baseURL: `http://localhost:${port}`,
    // the installed Edge (PDF_CHANNEL=chrome for Chrome), like scripts/cv-pdf.ts: no `playwright install`
    channel: process.env.PDF_CHANNEL ?? "msedge",
  },
  webServer: {
    command: `bun run build && bun run start -p ${port}`,
    url: `http://localhost:${port}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
