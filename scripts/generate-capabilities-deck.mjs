import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const outputPath = path.join(rootDir, "public", "downloads", "fernesta-capabilities-deck.pdf");

function toAscii(value) {
  return value.normalize("NFKD").replace(/[^\x20-\x7E]/g, "");
}

function escapePdfText(value) {
  return toAscii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text, maxChars = 90, firstPrefix = "", nextPrefix = firstPrefix) {
  const words = toAscii(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [firstPrefix.trimEnd()];

  const lines = [];
  let current = firstPrefix;
  for (const word of words) {
    const candidate = current.trim().length === 0 ? `${current}${word}` : `${current} ${word}`;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = `${nextPrefix}${word}`;
  }
  if (current.trim()) lines.push(current);
  return lines;
}

function section(title, paragraphs) {
  const lines = ["", title];
  for (const paragraph of paragraphs) {
    lines.push(...wrapText(paragraph));
  }
  return lines;
}

function buildDeckLines() {
  return [
    "Fernesta Capabilities Deck",
    "Digital Marketing Growth Systems for Jaipur Businesses",
    "",
    ...wrapText("This deck summarizes the service architecture, operating model, and execution cadence used in Fernesta engagements."),
    ...section("Core Service Lines", [
      "Search Engine Optimization (on-page, off-page, technical).",
      "Performance Marketing across Google Ads and Meta Ads.",
      "Social Media Management with content and paid support.",
      "Website and Conversion Systems for lead and sales journeys.",
      "Branding, Graphic Design, and PR or Influencer programs.",
    ]),
    ...section("How Engagement Starts", [
      "Step 1: Discovery and baseline audit of existing channel performance.",
      "Step 2: Growth architecture with KPI-linked channel priorities.",
      "Step 3: Execution sprint with weekly governance and reporting.",
    ]),
    ...section("Reporting and Governance", [
      "Clients receive weekly decision-oriented reports, transparent KPIs, and next-action priorities.",
      "Each campaign is mapped to a commercial objective with accountable ownership.",
    ]),
    ...section("Recommended Next Step", [
      "Book a strategy consultation at https://www.fernesta.com/contact-us to receive a tailored growth roadmap.",
    ]),
    "",
    "Prepared by Fernesta (Updated March 2026)",
  ];
}

function paginate(lines, maxLines = 46) {
  const pages = [];
  for (let i = 0; i < lines.length; i += maxLines) {
    pages.push(lines.slice(i, i + maxLines));
  }
  return pages;
}

function linesToPdf(pages) {
  const objects = [];
  const addObject = (value) => {
    objects.push(value);
    return objects.length;
  };

  const pagesObjectId = addObject("");
  const fontObjectId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageObjectIds = [];

  for (const [pageIndex, pageLines] of pages.entries()) {
    const pageNumberLine = `Page ${pageIndex + 1} of ${pages.length}`;
    const linesWithFooter = [...pageLines, "", pageNumberLine];
    const streamLines = [
      "BT",
      "/F1 10 Tf",
      "14 TL",
      "50 760 Td",
      ...linesWithFooter.flatMap((line, idx) => {
        const cmd = `(${escapePdfText(line)}) Tj`;
        return idx === linesWithFooter.length - 1 ? [cmd] : [cmd, "T*"];
      }),
      "ET",
    ];
    const stream = `${streamLines.join("\n")}\n`;
    const contentObjectId = addObject(
      `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}endstream`
    );
    const pageObjectId = addObject(
      `<< /Type /Page /Parent ${pagesObjectId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`
    );
    pageObjectIds.push(pageObjectId);
  }

  objects[pagesObjectId - 1] = `<< /Type /Pages /Kids [${pageObjectIds
    .map((id) => `${id} 0 R`)
    .join(" ")}] /Count ${pageObjectIds.length} >>`;

  const catalogObjectId = addObject(`<< /Type /Catalog /Pages ${pagesObjectId} 0 R >>`);

  let output = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i += 1) {
    offsets[i + 1] = Buffer.byteLength(output, "utf8");
    output += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(output, "utf8");
  output += `xref\n0 ${objects.length + 1}\n`;
  output += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i += 1) {
    output += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  output += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObjectId} 0 R >>\n`;
  output += `startxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(output, "utf8");
}

function main() {
  const lines = buildDeckLines();
  const pages = paginate(lines);
  const pdf = linesToPdf(pages);
  fs.writeFileSync(outputPath, pdf);
  const size = fs.statSync(outputPath).size;
  console.log(`Generated ${path.basename(outputPath)} (${size} bytes)`);
}

main();
