import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const rootDir = process.cwd();
const outputPath = path.join(rootDir, "public", "downloads", "fernesta-capabilities-deck.pdf");
const logoFullPath = path.join(rootDir, "public", "images", "site", "branding", "logo-wordmark-white.png");

const sections = [
  {
    title: "Core Service Architecture",
    points: [
      "Search Engine Optimization with technical, content, and authority-building tracks.",
      "Paid media systems across Google Ads and Meta Ads with funnel-aware budget control.",
      "Social media growth operations across strategy, creative, community, and performance.",
      "Conversion-focused website and landing page architecture for lead and revenue journeys.",
      "Brand, design, PR, and influencer systems tied to commercial objectives.",
    ],
  },
  {
    title: "How Engagement Starts",
    points: [
      "Step 1: Discovery sprint covering channel baseline, ICP clarity, and funnel leak points.",
      "Step 2: Growth architecture with KPI-linked channel priorities and role ownership.",
      "Step 3: 30-day execution sprint with weekly decision checkpoints and transparent reporting.",
    ],
  },
  {
    title: "Client Fit and Delivery Model",
    points: [
      "Best fit: growth-stage teams, SME founders, and marketing leaders needing accountable execution.",
      "Remote-first delivery with India-based operations and global collaboration cadence.",
      "Weekly tactical reports plus monthly strategic review for executive-level visibility.",
      "Single owner per workstream to avoid delivery ambiguity and execution lag.",
    ],
  },
  {
    title: "What Clients Get in the First 90 Days",
    points: [
      "A documented growth baseline and channel KPI map within the first two weeks.",
      "Structured campaign and creative operating cadence by month one.",
      "Lead-quality and conversion improvements through ongoing test-and-learn loops.",
      "A prioritised next-quarter roadmap tied to revenue or pipeline objectives.",
    ],
  },
  {
    title: "Recommended Next Step",
    points: [
      "Book a strategy consultation at https://www.fernesta.com/contact-us.",
      "Request a tailored 90-day growth roadmap aligned to your market and current stage.",
      "Contact: info@fernesta.com | +91 701 412 7724",
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

function buildHtml(logoFullDataUri) {
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
      }
      .brand-full {
        display: block;
        width: 54mm;
        max-width: 54mm;
        object-fit: contain;
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
          <img class="brand-full" src="${logoFullDataUri}" alt="Fernesta" />
        </div>
        <div class="brand-sub">Global Growth Delivery</div>
      </header>

      <div>
        <p class="cover-kicker">Capabilities Deck | Updated March 2026</p>
        <h1>Digital Marketing Growth Systems for Global, Growth-Stage Businesses</h1>
        <p class="cover-intro">This deck summarizes Fernesta's service architecture, delivery standards, and execution cadence for performance-focused partnerships across regions.</p>
      </div>

      <div class="signals">
        <div class="signal"><strong>SEO + Content</strong><span>Demand Capture</span></div>
        <div class="signal"><strong>Paid Media</strong><span>Revenue Systems</span></div>
        <div class="signal"><strong>Creative + CRO</strong><span>Conversion Lift</span></div>
      </div>

      <footer class="cover-foot">
        <span>Prepared by Fernesta</span>
        <span>www.fernesta.com</span>
      </footer>
    </section>

    <section class="page content">
      <div class="content-head">
        <h2>Execution Framework</h2>
        <p>Every engagement is mapped to measurable commercial outcomes with transparent governance, market-ready creative standards, and channel-level accountability.</p>
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
        <span>www.fernesta.com | Page 2</span>
      </footer>
    </section>
  </body>
</html>`;
}

async function main() {
  const logoFullDataUri = asDataUri(logoFullPath);
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
    await page.setContent(buildHtml(logoFullDataUri), { waitUntil: "networkidle" });
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
