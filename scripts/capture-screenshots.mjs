import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "overview", "screenshots");
const baseUrl = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000";

const captures = [
  { name: "01-full-page-desktop", fullPage: true, viewport: { width: 1440, height: 900 } },
  { name: "02-hero-desktop", selector: "#home", viewport: { width: 1440, height: 900 } },
  { name: "03-about-desktop", selector: "#about", viewport: { width: 1440, height: 900 } },
  { name: "04-skills-desktop", selector: "#skills", viewport: { width: 1440, height: 900 } },
  { name: "05-workflow-desktop", selector: "#workflow", viewport: { width: 1440, height: 900 } },
  { name: "06-projects-desktop", selector: "#projects", viewport: { width: 1440, height: 900 } },
  { name: "07-services-desktop", selector: "#services", viewport: { width: 1440, height: 900 } },
  { name: "08-contact-desktop", selector: "#contact", viewport: { width: 1440, height: 900 } },
  { name: "09-footer-desktop", selector: "footer", viewport: { width: 1440, height: 900 } },
  { name: "10-hero-mobile", selector: "#home", viewport: { width: 390, height: 844 } },
  { name: "11-workflow-mobile", selector: "#workflow", viewport: { width: 390, height: 844 } },
  { name: "12-projects-mobile", selector: "#projects", viewport: { width: 390, height: 844 } },
];

async function launchBrowser() {
  const channels = ["msedge", "chrome"];
  for (const channel of channels) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {
      // try next channel
    }
  }

  return chromium.launch({ headless: true });
}

async function captureSection(page, capture) {
  await page.setViewportSize(capture.viewport);
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("load");
  await page.waitForTimeout(2500);

  const filePath = path.join(outDir, `${capture.name}.png`);

  if (capture.fullPage) {
    await page.screenshot({ path: filePath, fullPage: true });
    return;
  }

  const target = page.locator(capture.selector).first();
  await target.waitFor({ state: "visible", timeout: 30000 });
  await target.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await target.screenshot({ path: filePath });
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await launchBrowser();
  const page = await browser.newPage();

  for (const capture of captures) {
    console.log(`Capturing ${capture.name}...`);
    await captureSection(page, capture);
  }

  await browser.close();
  console.log(`Saved ${captures.length} screenshots to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
