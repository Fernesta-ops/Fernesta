import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const rootDir = process.cwd();
const outputPath = path.join(rootDir, "public", "downloads", "fernesta-capabilities-deck.pdf");
const logoWordmarkPath = path.join(rootDir, "public", "images", "site", "branding", "logo-wordmark-clean.png");
const monogramPath = path.join(rootDir, "public", "images", "site", "branding", "monogram-clean.png");

const sections = [
  {
    title: "Core Service Lines",
    points: [
      "Search Engine Optimization (on-page, off-page, technical).",
      "Performance Marketing across Google Ads and Meta Ads.",
      "Social Media Management with content and paid support.",
      "Website and Conversion Systems for lead and sales journeys.",
      "Workflow automation, reporting systems, and approval pipelines.",
      "Branding, Graphic Design, and PR or Influencer programs.",
    ],
  },
  {
    title: "How Engagement Starts",
    points: [
      "Step 1: Discovery and baseline audit of existing channel performance.",
      "Step 2: Growth architecture with KPI-linked channel, workflow, and reporting priorities.",
      "Step 3: Execution sprint with weekly governance, reporting, and automation handoffs.",
    ],
  },
  {
    title: "Reporting and Governance",
    points: [
      "Clients receive weekly decision-oriented reports, transparent KPIs, and next-action priorities.",
      "Automation layers are designed to reduce manual follow-up, approval lag, and reporting friction.",
      "Each campaign is mapped to a commercial objective with accountable ownership.",
    ],
  },
  {
    title: "Recommended Next Step",
    points: [
      "Book a strategy consultation at https://www.fernesta.com/contact-us to receive a tailored growth roadmap.",
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getMimeTypeFromExtension(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

function asDataUri(filePath) {
  const bytes = fs.readFileSync(filePath);
  const mime = getMimeTypeFromExtension(filePath);
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

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
      "No browser executable found for PDF rendering.",
      "Set `PDF_BROWSER_PATH` to a local Edge/Chrome executable path.",
      "Example: set PDF_BROWSER_PATH=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    ].join(" ")
  );
}

function buildHtml(logoWordmarkDataUri, monogramDataUri) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Fernesta Capabilities Deck</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: #16261f;
        font-family: "Source Sans 3", "Segoe UI", Arial, sans-serif;
        background: #f2f0e7;
      }
      .page {
        min-height: 297mm;
        padding: 14mm 14mm 12mm;
      }
      .cover {
        color: #f0f3ef;
        display: grid;
        gap: 8mm;
        grid-template-rows: auto auto 1fr auto;
        background:
          linear-gradient(130deg, rgba(22, 44, 36, 0.9), rgba(27, 61, 49, 0.72)),
          radial-gradient(circle at 84% 20%, rgba(153, 191, 174, 0.26), transparent 38%),
          radial-gradient(circle at 12% 86%, rgba(122, 158, 140, 0.2), transparent 40%);
      }
      .brand {
        align-items: center;
        border-bottom: 1px solid rgba(235, 243, 238, 0.32);
        display: flex;
        justify-content: space-between;
        padding-bottom: 5mm;
      }
      .brand-lockup {
        align-items: center;
        display: inline-flex;
        gap: 2.2mm;
      }
      .brand-mark-shell {
        align-items: center;
        background: rgba(242, 245, 237, 0.94);
        border-radius: 999px;
        display: inline-flex;
        height: 10.4mm;
        justify-content: center;
        width: 10.4mm;
      }
      .brand-monogram {
        display: block;
        height: 7.2mm;
        object-fit: contain;
        width: auto;
      }
      .brand-wordmark {
        display: block;
        height: 7mm;
        object-fit: contain;
        width: auto;
      }
      .brand-sub {
        font-size: 3.2mm;
        letter-spacing: 0.42mm;
        text-transform: uppercase;
      }
      .cover-kicker {
        font-size: 3.2mm;
        letter-spacing: 0.44mm;
        opacity: 0.92;
        text-transform: uppercase;
      }
      .cover h1 {
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 15.5mm;
        line-height: 1.02;
        margin: 0;
        max-width: 150mm;
      }
      .cover-intro {
        color: #e2ece6;
        font-size: 4.2mm;
        line-height: 1.5;
        margin: 2mm 0 0;
        max-width: 160mm;
      }
      .signals {
        display: grid;
        gap: 3.6mm;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .signal {
        background: rgba(232, 241, 236, 0.12);
        border: 1px solid rgba(230, 239, 234, 0.26);
        border-radius: 8px;
        padding: 3.5mm 3.3mm;
      }
      .signal strong {
        display: block;
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 6.2mm;
        line-height: 1.04;
      }
      .signal span {
        font-size: 2.9mm;
        letter-spacing: 0.24mm;
        text-transform: uppercase;
      }
      .cover-foot {
        border-top: 1px solid rgba(235, 243, 238, 0.26);
        display: flex;
        font-size: 3.1mm;
        justify-content: space-between;
        letter-spacing: 0.26mm;
        padding-top: 3.6mm;
        text-transform: uppercase;
      }
      .content {
        background: #f4f5ef;
        color: #172a22;
      }
      .content-head {
        display: grid;
        gap: 2mm;
        margin-bottom: 6.5mm;
      }
      .content-head h2 {
        color: #1b4336;
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 10mm;
        line-height: 1.05;
        margin: 0;
      }
      .content-head p {
        color: #2b463a;
        font-size: 3.7mm;
        line-height: 1.55;
        margin: 0;
      }
      .section-grid {
        display: grid;
        gap: 5mm;
      }
      .section-card {
        background: #ffffff;
        border: 1px solid #cfd8d1;
        border-radius: 10px;
        padding: 4.5mm 4.8mm;
      }
      .section-card h3 {
        color: #204b3d;
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 6.2mm;
        margin: 0 0 2.2mm;
      }
      .section-card ul {
        display: grid;
        gap: 1.8mm;
        margin: 0;
        padding-left: 4.8mm;
      }
      .section-card li {
        color: #263f35;
        font-size: 3.45mm;
        line-height: 1.48;
      }
      .content-foot {
        border-top: 1px solid #d0dbd3;
        color: #4d6a5d;
        display: flex;
        font-size: 2.9mm;
        justify-content: space-between;
        letter-spacing: 0.2mm;
        margin-top: 6mm;
        padding-top: 3.2mm;
      }
    </style>
  </head>
  <body>
    <section class="page cover">
      <header class="brand">
        <div class="brand-lockup">
          <span class="brand-mark-shell"><img class="brand-monogram" src="${monogramDataUri}" alt="" /></span>
          <img class="brand-wordmark" src="${logoWordmarkDataUri}" alt="Fernesta" />
        </div>
        <div class="brand-sub">Growth and Workflow Systems</div>
      </header>

      <div>
        <p class="cover-kicker">Capabilities Deck | Updated March 2026</p>
        <h1>Digital Growth and Workflow Systems for Indian SMEs</h1>
        <p class="cover-intro">This deck summarizes Fernesta's service architecture, workflow automation capability, and execution cadence for growth-focused partnerships.</p>
      </div>

      <div class="signals">
        <div class="signal"><strong>SEO</strong><span>Visibility Systems</span></div>
        <div class="signal"><strong>Automation</strong><span>Workflow Systems</span></div>
        <div class="signal"><strong>Performance</strong><span>Revenue Campaigns</span></div>
      </div>

      <footer class="cover-foot">
        <span>Prepared by Fernesta</span>
        <span>www.fernesta.com</span>
      </footer>
    </section>

    <section class="page content">
      <div class="content-head">
        <h2>Execution Framework</h2>
        <p>Every engagement is mapped to measurable commercial outcomes, with transparent weekly reporting, cleaner internal handoffs, and channel-level accountability.</p>
      </div>

      <div class="section-grid">
        ${sections
          .map(
            (section) => `
              <article class="section-card">
                <h3>${escapeHtml(section.title)}</h3>
                <ul>
                  ${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                </ul>
              </article>
            `
          )
          .join("")}
      </div>

      <footer class="content-foot">
        <span>Fernesta Capabilities Deck</span>
        <span>Page 2</span>
      </footer>
    </section>
  </body>
</html>`;
}

async function main() {
  const logoWordmarkDataUri = asDataUri(logoWordmarkPath);
  const monogramDataUri = asDataUri(monogramPath);
  const executablePath = resolveBrowserExecutable();

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ["--disable-gpu", "--font-render-hinting=none"],
  });

  try {
    const page = await browser.newPage({
      viewport: { width: 1240, height: 1754 },
      deviceScaleFactor: 1.5,
    });
    await page.setContent(buildHtml(logoWordmarkDataUri, monogramDataUri), { waitUntil: "networkidle" });
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    await page.close();
  } finally {
    await browser.close();
  }

  const size = fs.statSync(outputPath).size;
  console.log(`Generated ${path.basename(outputPath)} (${size} bytes)`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
