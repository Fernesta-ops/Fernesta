import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const rootDir = process.cwd();
const caseStudiesPath = path.join(rootDir, "src", "data", "caseStudies.ts");
const downloadsDir = path.join(rootDir, "public", "downloads");
const defaultCoverImagePath = path.join(rootDir, "public", "images", "site", "seo", "default-share.jpg");
const logoWordmarkPath = path.join(rootDir, "public", "images", "site", "branding", "logo-wordmark-clean.png");
const monogramPath = path.join(rootDir, "public", "images", "site", "branding", "monogram-clean.png");

function loadCaseStudies() {
  const source = fs.readFileSync(caseStudiesPath, "utf8");
  const marker = "export const caseStudies";
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error("Could not locate `caseStudies` export in src/data/caseStudies.ts");
  }

  const arrayStart = source.indexOf("[", markerIndex);
  const arrayEnd = source.lastIndexOf("];");
  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error("Could not parse caseStudies array literal.");
  }

  const arrayLiteral = source.slice(arrayStart, arrayEnd + 1);
  const data = Function(`"use strict"; return (${arrayLiteral});`)();
  if (!Array.isArray(data)) {
    throw new Error("Parsed caseStudies is not an array.");
  }
  return data;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMetric(value, suffix) {
  return `${value}${suffix}`;
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

function renderChartSvg(study) {
  const width = 920;
  const height = 300;
  const left = 84;
  const right = 30;
  const top = 34;
  const bottom = 72;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;
  const points = study.chart.points;
  const maxValue = Math.max(...points.flatMap((point) => [point.before, point.after]), 1);
  const paddedMax = maxValue * 1.16;
  const groupWidth = innerWidth / points.length;
  const barWidth = Math.min(46, groupWidth / 3.2);
  const baselineY = top + innerHeight;

  const y = (value) => top + innerHeight - (value / paddedMax) * innerHeight;
  const xBefore = (index) => left + groupWidth * index + groupWidth * 0.25 - barWidth / 2;
  const xAfter = (index) => left + groupWidth * index + groupWidth * 0.55 - barWidth / 2;

  const axisYTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const value = paddedMax * ratio;
    const yPos = y(value);
    return `
      <line x1="${left}" y1="${yPos}" x2="${width - right}" y2="${yPos}" stroke="#d5ddd8" stroke-width="1"/>
      <text x="${left - 8}" y="${yPos + 4}" text-anchor="end" font-size="11" fill="#567265">${value.toFixed(1)}</text>
    `;
  });

  const bars = points
    .map((point, index) => {
      const beforeY = y(point.before);
      const afterY = y(point.after);
      const beforeHeight = baselineY - beforeY;
      const afterHeight = baselineY - afterY;
      const centerX = left + groupWidth * index + groupWidth * 0.4;
      return `
        <rect x="${xBefore(index)}" y="${beforeY}" width="${barWidth}" height="${beforeHeight}" rx="6" fill="#a7b6ad"/>
        <rect x="${xAfter(index)}" y="${afterY}" width="${barWidth}" height="${afterHeight}" rx="6" fill="#2f5a49"/>
        <text x="${xBefore(index) + barWidth / 2}" y="${beforeY - 8}" text-anchor="middle" font-size="11" fill="#4f6b5e">${escapeHtml(
          formatMetric(point.before, point.suffix)
        )}</text>
        <text x="${xAfter(index) + barWidth / 2}" y="${afterY - 8}" text-anchor="middle" font-size="11" fill="#15372b">${escapeHtml(
          formatMetric(point.after, point.suffix)
        )}</text>
        <text x="${centerX}" y="${baselineY + 20}" text-anchor="middle" font-size="12" fill="#20372d">${escapeHtml(
          point.label
        )}</text>
      `;
    })
    .join("");

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(
      study.chart.title
    )}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="#f8faf9" rx="14"/>
      ${axisYTicks.join("")}
      <line x1="${left}" y1="${baselineY}" x2="${width - right}" y2="${baselineY}" stroke="#8ba497" stroke-width="1.5"/>
      ${bars}
    </svg>
  `;
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderTimeline(items) {
  return items
    .map(
      (step) => `
        <li class="timeline-item">
          <p class="timeline-phase">${escapeHtml(step.phase)}</p>
          <p class="timeline-window">${escapeHtml(step.window)}</p>
          <p>${escapeHtml(step.focus)}</p>
        </li>
      `
    )
    .join("");
}

function buildHtml(study, coverImageDataUri, logoWordmarkDataUri, monogramDataUri) {
  const chartSvg = renderChartSvg(study);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(study.client)} Case Study</title>
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
        padding: 16mm 14mm;
      }
      .cover {
        color: #f0f3ef;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 14mm;
        background:
          linear-gradient(130deg, rgba(23, 48, 39, 0.84), rgba(27, 61, 49, 0.66)),
          url("${coverImageDataUri}") center / cover no-repeat;
      }
      .brand {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(235, 243, 238, 0.35);
        padding-bottom: 6mm;
      }
      .brand-lockup {
        align-items: center;
        display: inline-flex;
        gap: 2.2mm;
      }
      .brand-mark-shell {
        align-items: center;
        background: rgba(241, 244, 236, 0.92);
        border-radius: 999px;
        display: inline-flex;
        height: 10.4mm;
        justify-content: center;
        padding: 1mm;
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
        text-transform: uppercase;
        letter-spacing: 0.5mm;
        font-size: 3.3mm;
      }
      .cover-main {
        align-self: center;
        max-width: 150mm;
        display: grid;
        gap: 4mm;
      }
      .cover-kicker {
        font-size: 3.2mm;
        text-transform: uppercase;
        letter-spacing: 0.5mm;
        opacity: 0.9;
      }
      .cover h1 {
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 16mm;
        line-height: 1.04;
        margin: 0;
      }
      .cover-intro {
        font-size: 4.4mm;
        line-height: 1.45;
        margin: 0;
        color: #e3ece7;
      }
      .cover-metric {
        display: inline-flex;
        gap: 3mm;
        align-items: baseline;
        margin-top: 2mm;
        background: rgba(228, 239, 232, 0.14);
        border: 1px solid rgba(233, 241, 236, 0.34);
        border-radius: 8px;
        padding: 3mm 4mm;
      }
      .cover-metric strong {
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 8mm;
        line-height: 1;
      }
      .cover-metric span {
        font-size: 3.4mm;
        letter-spacing: 0.3mm;
        text-transform: uppercase;
      }
      .cover-foot {
        display: flex;
        justify-content: space-between;
        font-size: 3.2mm;
        text-transform: uppercase;
        letter-spacing: 0.3mm;
        opacity: 0.94;
      }
      .content {
        background: #f4f5ef;
        color: #172a22;
      }
      .grid {
        display: grid;
        gap: 6mm;
        grid-template-columns: 1fr 1fr;
      }
      .panel {
        background: #ffffff;
        border: 1px solid #cfd8d1;
        border-radius: 10px;
        padding: 5mm;
      }
      h2 {
        margin: 0 0 3mm;
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 7mm;
        color: #1b4336;
      }
      h3 {
        margin: 0 0 2.5mm;
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 5.4mm;
        color: #204b3d;
      }
      p {
        margin: 0;
        font-size: 3.7mm;
        line-height: 1.5;
        color: #243b32;
      }
      ul {
        margin: 0;
        padding-left: 4.8mm;
        display: grid;
        gap: 2mm;
      }
      li {
        font-size: 3.55mm;
        line-height: 1.46;
        color: #263f35;
      }
      .kpi-strip {
        margin: 0 0 6mm;
        display: grid;
        gap: 4mm;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .kpi {
        border: 1px solid #c2d1c8;
        border-radius: 10px;
        padding: 4mm;
        background: linear-gradient(180deg, #f8fbf9, #edf3ef);
      }
      .kpi-label {
        margin: 0 0 2mm;
        color: #3a5f50;
        font-size: 3.1mm;
        letter-spacing: 0.2mm;
        text-transform: uppercase;
      }
      .kpi-value {
        margin: 0;
        font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 6.8mm;
        color: #173a2e;
        line-height: 1.02;
      }
      .timeline {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 2.5mm;
      }
      .timeline-item {
        background: #f7faf8;
        border: 1px solid #cfdbd3;
        border-radius: 8px;
        padding: 3.2mm 3.5mm;
      }
      .timeline-phase {
        font-weight: 700;
        color: #1f4b3b;
        margin-bottom: 0.8mm;
      }
      .timeline-window {
        color: #3d6959;
        font-size: 3.2mm;
        margin-bottom: 1.2mm;
        text-transform: uppercase;
        letter-spacing: 0.2mm;
      }
      .chart-wrap {
        margin-top: 6mm;
        border: 1px solid #c6d2cb;
        border-radius: 12px;
        background: #ffffff;
        padding: 4mm;
      }
      .chart-head {
        margin: 0 0 3mm;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
      .legend {
        display: flex;
        gap: 3.5mm;
        font-size: 2.9mm;
        text-transform: uppercase;
        letter-spacing: 0.16mm;
      }
      .legend-item {
        display: inline-flex;
        gap: 1.2mm;
        align-items: center;
      }
      .legend-swatch {
        width: 3mm;
        height: 3mm;
        border-radius: 99px;
      }
      .footnote {
        margin-top: 4mm;
        font-size: 2.8mm;
        color: #577566;
      }
      .page-break {
        break-before: page;
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
        <div class="brand-sub">Digital Growth Systems</div>
      </header>
      <div class="cover-main">
        <p class="cover-kicker">Case Study | ${escapeHtml(study.category)}</p>
        <h1>${escapeHtml(study.client)}</h1>
        <p class="cover-intro">${escapeHtml(study.detail)}</p>
        <div class="cover-metric">
          <strong>${escapeHtml(study.metric)}</strong>
          <span>${escapeHtml(study.result)}</span>
        </div>
      </div>
      <footer class="cover-foot">
        <span>Engagement Timeline: ${escapeHtml(study.timeline)}</span>
        <span>www.fernesta.com</span>
      </footer>
    </section>

    <section class="page content page-break">
      <div class="kpi-strip">
        <article class="kpi">
          <p class="kpi-label">Category</p>
          <p class="kpi-value">${escapeHtml(study.category)}</p>
        </article>
        <article class="kpi">
          <p class="kpi-label">Timeline</p>
          <p class="kpi-value">${escapeHtml(study.timeline)}</p>
        </article>
        <article class="kpi">
          <p class="kpi-label">Headline Result</p>
          <p class="kpi-value">${escapeHtml(study.metric)}</p>
        </article>
      </div>

      <div class="grid">
        <article class="panel">
          <h2>Objective</h2>
          <p>${escapeHtml(study.objective)}</p>
        </article>
        <article class="panel">
          <h2>Engagement Scope</h2>
          <ul>${renderList(study.services)}</ul>
        </article>
      </div>

      <div class="grid" style="margin-top: 6mm;">
        <article class="panel">
          <h2>Approach</h2>
          <ul>${renderList(study.approach)}</ul>
        </article>
        <article class="panel">
          <h2>Execution Timeline</h2>
          <ol class="timeline">${renderTimeline(study.executionTimeline)}</ol>
        </article>
      </div>

      <div class="grid" style="margin-top: 6mm;">
        <article class="panel">
          <h2>Before</h2>
          <ul>${renderList(study.before)}</ul>
        </article>
        <article class="panel">
          <h2>After</h2>
          <ul>${renderList(study.after)}</ul>
        </article>
      </div>

      <article class="panel" style="margin-top: 6mm;">
        <h2>Business Impact</h2>
        <ul>${renderList(study.businessImpact)}</ul>
      </article>

      <section class="chart-wrap">
        <div class="chart-head">
          <h3>${escapeHtml(study.chart.title)}</h3>
          <div class="legend">
            <span class="legend-item"><span class="legend-swatch" style="background:#a7b6ad"></span> Before</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#2f5a49"></span> After</span>
          </div>
        </div>
        ${chartSvg}
        <p class="footnote">Indexed values use baseline = 100 where noted, to show directional improvement in business performance.</p>
      </section>
    </section>
  </body>
</html>`;
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

async function generate() {
  const caseStudies = loadCaseStudies();
  const coverImageDataUri = asDataUri(defaultCoverImagePath);
  const logoWordmarkDataUri = asDataUri(logoWordmarkPath);
  const monogramDataUri = asDataUri(monogramPath);
  const executablePath = resolveBrowserExecutable();

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ["--disable-gpu", "--font-render-hinting=none"],
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1240, height: 1754 },
      deviceScaleFactor: 1.5,
    });

    for (const study of caseStudies) {
      const page = await context.newPage();
      const html = buildHtml(study, coverImageDataUri, logoWordmarkDataUri, monogramDataUri);
      await page.setContent(html, { waitUntil: "networkidle" });

      const outputPath = path.join(downloadsDir, path.basename(study.download));
      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
      });
      await page.close();

      const size = fs.statSync(outputPath).size;
      console.log(`Generated ${path.basename(outputPath)} (${size} bytes)`);
    }

    await context.close();
  } finally {
    await browser.close();
  }
}

generate().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
