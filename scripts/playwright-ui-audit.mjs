import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const rootDir = process.cwd();
const outputDir = path.join(rootDir, "output", "playwright", "audit");
const baseUrl = process.env.AUDIT_BASE_URL || "http://127.0.0.1:4173";
const routes = ["/", "/services", "/case-studies", "/contact-us"];

function resolveBrowserExecutable() {
  if (process.env.PDF_BROWSER_PATH && fs.existsSync(process.env.PDF_BROWSER_PATH)) {
    return process.env.PDF_BROWSER_PATH;
  }

  const candidates = [
    path.join(process.env["PROGRAMFILES(X86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(process.env.PROGRAMFILES || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(process.env["PROGRAMFILES(X86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env.PROGRAMFILES || "", "Google", "Chrome", "Application", "chrome.exe"),
  ].filter(Boolean);

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  throw new Error(
    [
      "No browser executable found for Playwright audit.",
      "Set `PDF_BROWSER_PATH` to an Edge/Chrome executable path.",
    ].join(" ")
  );
}

function safeName(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/[^\w-]/g, "-");
}

async function captureViewport(browser, viewport, suffix) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
  });

  try {
    for (const route of routes) {
      const page = await context.newPage();
      const url = new URL(route, baseUrl).toString();
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const step = Math.max(240, Math.floor(window.innerHeight * 0.75));
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await delay(120);
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
      const filePath = path.join(outputDir, `${safeName(route)}-${suffix}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      await page.close();
      console.log(`Captured ${path.relative(rootDir, filePath)}`);
    }
  } finally {
    await context.close();
  }
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const executablePath = resolveBrowserExecutable();
  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ["--disable-gpu", "--font-render-hinting=none"],
  });

  try {
    await captureViewport(browser, { width: 1440, height: 900 }, "desktop");
    await captureViewport(browser, { width: 390, height: 844 }, "mobile");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
