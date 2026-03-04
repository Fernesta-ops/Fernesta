import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const caseStudiesPath = path.join(rootDir, "src", "data", "caseStudies.ts");
const downloadsDir = path.join(rootDir, "public", "downloads");

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

function toAscii(value) {
  return value.normalize("NFKD").replace(/[^\x20-\x7E]/g, "");
}

function escapePdfText(value) {
  return toAscii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text, maxChars = 90, firstPrefix = "", nextPrefix = firstPrefix) {
  const words = toAscii(text).split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return [firstPrefix.trimEnd()];
  }

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

  if (current.trim().length > 0) {
    lines.push(current);
  }
  return lines;
}

function bulletLines(items) {
  return items.flatMap((item) => wrapText(item, 90, "- ", "  "));
}

function sectionLines(title, bodyLines) {
  return ["", title, ...bodyLines];
}

function buildCaseStudyLines(study) {
  const timelineLines = study.executionTimeline.flatMap((step) => [
    ...wrapText(`${step.phase} (${step.window})`, 90, "- ", "  "),
    ...wrapText(step.focus, 90, "  ", "  "),
  ]);

  return [
    "Fernesta Case Study",
    "",
    ...wrapText(`Client: ${study.client}`),
    ...wrapText(`Category: ${study.category}`),
    ...wrapText(`Primary Outcome: ${study.metric} ${study.result}`),
    ...wrapText(`Engagement Timeline: ${study.timeline}`),
    ...sectionLines("Objective", wrapText(study.objective)),
    ...sectionLines("Engagement Scope", bulletLines(study.services)),
    ...sectionLines("Approach", bulletLines(study.approach)),
    ...sectionLines("Execution Timeline", timelineLines),
    ...sectionLines("Before", bulletLines(study.before)),
    ...sectionLines("After", bulletLines(study.after)),
    ...sectionLines("Business Impact", bulletLines(study.businessImpact)),
    "",
    "Source: fernesta.com case-study content",
  ];
}

function buildPdfTextPages(lines, maxLinesPerPage = 48) {
  const pages = [];
  for (let i = 0; i < lines.length; i += maxLinesPerPage) {
    pages.push(lines.slice(i, i + maxLinesPerPage));
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
    const linesWithPageNumber = [...pageLines, "", pageNumberLine];
    const streamLines = [
      "BT",
      "/F1 10 Tf",
      "14 TL",
      "50 760 Td",
      ...linesWithPageNumber.flatMap((line, index) => {
        const command = `(${escapePdfText(line)}) Tj`;
        if (index === linesWithPageNumber.length - 1) {
          return [command];
        }
        return [command, "T*"];
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

function generateCaseStudyPdf(study) {
  const lines = buildCaseStudyLines(study);
  const pages = buildPdfTextPages(lines);
  const pdf = linesToPdf(pages);
  const outputPath = path.join(downloadsDir, `${study.slug}.pdf`);
  fs.writeFileSync(outputPath, pdf);
  return outputPath;
}

function main() {
  const caseStudies = loadCaseStudies();
  const generated = caseStudies.map(generateCaseStudyPdf);
  for (const file of generated) {
    const stat = fs.statSync(file);
    console.log(`Generated ${path.basename(file)} (${stat.size} bytes)`);
  }
}

main();
