import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const rootDir = process.cwd();
const outputDir = path.join(rootDir, "output", "first-cut-qa");
const baseUrl = process.env.FERNESTA_PREVIEW_URL || "http://localhost:4176";

function resolveBrowserExecutable() {
  const candidates = [
    path.join(
      process.env["PROGRAMFILES(X86)"] || "",
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
    path.join(
      process.env.PROGRAMFILES || "",
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
    path.join(
      process.env["PROGRAMFILES(X86)"] || "",
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
    path.join(
      process.env.PROGRAMFILES || "",
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
  ].filter(Boolean);

  const executable = candidates.find((candidate) => fs.existsSync(candidate));
  if (!executable) {
    throw new Error("No Edge or Chrome executable was found for visual QA.");
  }
  return executable;
}

async function auditViewport(browser, name, viewport, reducedMotion = "no-preference") {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  let submittedLead = null;

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.route("**/api/lead", async (route) => {
    submittedLead = route.request().postDataJSON();
    await new Promise((resolve) => setTimeout(resolve, 240));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(reducedMotion === "reduce" ? 100 : 1600);

    const metrics = await page.evaluate(() => {
      const hero = document.querySelector(".hero-section");
      const title = document.querySelector(".hero-title");
      const heroPrimaryCta = document.querySelector(".primary-cta");
      const heroPrimaryCtaRect = heroPrimaryCta?.getBoundingClientRect();
      const approach = document.querySelector("#approach");
      const approachRect = approach?.getBoundingClientRect();
      const images = [...document.querySelectorAll("img")];
      const focusTarget = document.querySelector(".nav-cta");
      const focusBox = focusTarget?.getBoundingClientRect();
      const header = document.querySelector(".site-header");
      const styles = getComputedStyle(document.documentElement);
      const auditForm = document.querySelector(".audit-form");
      const contentEntries = [
        ...document.querySelectorAll("main h2, main h3, main p"),
      ]
        .map((element) => element.textContent?.trim().replace(/\s+/g, ""))
        .filter(Boolean);
      const duplicateMessages = [
        ...new Set(
          contentEntries.filter(
            (text, index) => contentEntries.indexOf(text) !== index,
          ),
        ),
      ];
      const sectionRects = [...document.querySelectorAll("main > section")].map(
        (section) => {
          const rect = section.getBoundingClientRect();
          return {
            id: section.id || section.className,
            top: Math.round(rect.top + window.scrollY),
            bottom: Math.round(rect.bottom + window.scrollY),
          };
        },
      );
      const sectionOverlaps = sectionRects
        .slice(1)
        .filter((section, index) => section.top < sectionRects[index].bottom - 1);

      return {
        title: document.title,
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        pageHeight: document.documentElement.scrollHeight,
        heroHeight: Math.round(hero?.getBoundingClientRect().height || 0),
        heroCtaFullyVisible: Boolean(
          heroPrimaryCtaRect &&
            heroPrimaryCtaRect.top >= 0 &&
            heroPrimaryCtaRect.bottom <= window.innerHeight,
        ),
        heroCtaBottom: Math.round(heroPrimaryCtaRect?.bottom || 0),
        approachHeight: Math.round(approachRect?.height || 0),
        titleVisible: Boolean(
          title &&
            getComputedStyle(title).visibility !== "hidden" &&
            title.getBoundingClientRect().height > 0,
        ),
        imagesLoaded: images.every(
          (image) => image.complete && image.naturalWidth > 0,
        ),
        imageCount: images.length,
        mainWordCount: (document.querySelector("main")?.innerText || "")
          .trim()
          .split(/\s+/)
          .filter(Boolean).length,
        proofNoteCount: document.querySelectorAll(".proof-notes-grid article")
          .length,
        questionCount: document.querySelectorAll(
          ".questions-list details",
        ).length,
        credentialLogoCount: document.querySelectorAll(
          ".credential-logo-frame img",
        ).length,
        journeyStageCount: document.querySelectorAll(".journey-stage").length,
        starterOptionCount: document.querySelectorAll(
          ".starter-options button",
        ).length,
        engagementBlockCount: document.querySelectorAll(
          ".system-step-engagements",
        ).length,
        engagementItemCounts: [
          ...document.querySelectorAll(".system-step-engagements"),
        ].map((block) => block.querySelectorAll("li").length),
        supportingCapabilityCount: document.querySelectorAll(
          ".system-support-grid article",
        ).length,
        contactActionCount: document.querySelectorAll(".inbound-actions a")
          .length,
        whatsappLinkCount: document.querySelectorAll(
          'a[href^="/go/whatsapp"]',
        ).length,
        footerColumnCount: document.querySelectorAll(
          ".site-footer .footer-column",
        ).length,
        officeMapExists: Boolean(
          document.querySelector(
            '.footer-location a[href*="maps.app.goo.gl/ZatXGy9xwzVFQFwo9"]',
          ),
        ),
        header: {
          position: header ? getComputedStyle(header).position : "",
          navLinks: document.querySelectorAll(".site-nav a").length,
        },
        credentialLogoFilterCount: new Set(
          [...document.querySelectorAll(".credential-logo-frame img")].map(
            (image) => getComputedStyle(image).filter,
          ),
        ).size,
        navCtaHeight: Math.round(focusBox?.height || 0),
        duplicateMessages,
        sectionOverlaps,
        audit: {
          ctaCount: document.querySelectorAll('a[href="#brand-audit"]').length,
          formExists: Boolean(auditForm),
          requiredFields: auditForm?.querySelectorAll("[required]").length || 0,
          challengeRequired:
            auditForm?.querySelector('[name="challenge"]')?.required || false,
          websiteExists: Boolean(auditForm?.querySelector('[name="website"]')),
          instagramExists: Boolean(
            auditForm?.querySelector('[name="instagram"]'),
          ),
          detailsExists: Boolean(auditForm?.querySelector('[name="details"]')),
          submitLabel:
            auditForm?.querySelector('button[type="submit"]')?.textContent?.trim() ||
            "",
        },
        brand: {
          cream: styles.getPropertyValue("--cream").trim(),
          brown: styles.getPropertyValue("--brown").trim(),
          signal: styles.getPropertyValue("--signal").trim(),
        },
      };
    });

    for (const selector of [
      "#approach",
      "#system",
      "#credentials",
      "#brand-audit",
      ".site-footer",
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(reducedMotion === "reduce" ? 40 : 160);
    }
    const imageBearingSystemSteps = page.locator(".system-step");
    for (
      let index = 0;
      index < (await imageBearingSystemSteps.count());
      index += 1
    ) {
      await imageBearingSystemSteps.nth(index).scrollIntoViewIfNeeded();
      await page.waitForTimeout(reducedMotion === "reduce" ? 40 : 120);
    }
    await page.locator("#top").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 80 : 450);
    Object.assign(
      metrics,
      await page.evaluate(() => {
        const images = [...document.querySelectorAll("img")];
        return {
          imagesLoaded: images.every(
            (image) => image.complete && image.naturalWidth > 0,
          ),
          imageCount: images.length,
          unloadedImages: images
            .filter((image) => !image.complete || image.naturalWidth < 1)
            .map((image) => image.currentSrc || image.src),
        };
      }),
    );

    const screenshotPath = path.join(outputDir, `${name}-full.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await page.locator("#start-here").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 60 : 220);
    await page.locator(".starter-options button").nth(4).click();
    await page.waitForTimeout(reducedMotion === "reduce" ? 40 : 180);
    const launchStarterState = await page.evaluate(() => ({
      recommendation:
        document.querySelector(".starter-response h3")?.textContent?.trim() ||
        "",
      challenge:
        document.querySelector('[name="challenge"]')?.value || "",
    }));
    await page.locator(".starter-options button").nth(2).click();
    await page.waitForTimeout(reducedMotion === "reduce" ? 40 : 180);
    const starterState = await page.evaluate(() => ({
      activeIndexes: [...document.querySelectorAll(".starter-options button")]
        .map((button, index) =>
          button.getAttribute("aria-pressed") === "true" ? index : -1,
        )
        .filter((index) => index >= 0),
      recommendation:
        document.querySelector(".starter-response h3")?.textContent?.trim() ||
        "",
      challenge:
        document.querySelector('[name="challenge"]')?.value || "",
    }));
    const starterPath = path.join(outputDir, `${name}-starter.png`);
    await page.screenshot({ path: starterPath, fullPage: false });

    await page.locator(".starter-actions a").click();
    await page.waitForTimeout(reducedMotion === "reduce" ? 60 : 320);
    starterState.auditPrefill =
      (await page.locator('[name="challenge"]').inputValue()) || "";

    await page.locator("#system").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 80 : 450);
    const systemPath = path.join(outputDir, `${name}-system.png`);
    await page.screenshot({ path: systemPath, fullPage: false });

    const systemStates = [];
    if (viewport.width > 720 && reducedMotion !== "reduce") {
      const steps = page.locator(".system-step");
      for (let index = 0; index < (await steps.count()); index += 1) {
        await steps.nth(index).evaluate((step) =>
          step.scrollIntoView({ block: "center", behavior: "instant" }),
        );
        await page.waitForTimeout(520);
        systemStates.push(
          await page.evaluate(() => ({
            current: document.querySelector(".system-current")?.textContent,
            activeSteps: [...document.querySelectorAll(".system-step")]
              .map((step, index) =>
                Number(getComputedStyle(step).opacity) > 0.9 ? index : -1,
              )
              .filter((index) => index >= 0),
          })),
        );
      }
    }

    await page.locator("#approach").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 80 : 450);
    const journeyTarget = page.locator(".journey-stage").nth(3);
    await journeyTarget.hover();
    await page.waitForTimeout(reducedMotion === "reduce" ? 40 : 360);
    const journeyState = await journeyTarget.evaluate((stage) => {
      const copy = stage.querySelector(".journey-stage-copy");
      const button = stage.querySelector("button");
      return {
        active: stage.classList.contains("is-active"),
        expanded: button?.getAttribute("aria-expanded"),
        copyHeight: Math.round(copy?.getBoundingClientRect().height || 0),
        copyOpacity: copy ? getComputedStyle(copy).opacity : "0",
      };
    });
    const approachPath = path.join(outputDir, `${name}-approach.png`);
    await page.screenshot({ path: approachPath, fullPage: false });

    await page.locator("#credentials").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 80 : 450);
    const credentialsPath = path.join(outputDir, `${name}-credentials.png`);
    await page.screenshot({ path: credentialsPath, fullPage: false });

    await page.locator("#questions").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 80 : 320);
    const questionState = {
      initialOpenCount: await page.locator(".questions-list details[open]").count(),
    };
    const firstQuestion = page.locator(".questions-list details").first();
    await firstQuestion.locator("summary").click();
    await page.waitForTimeout(reducedMotion === "reduce" ? 40 : 180);
    Object.assign(
      questionState,
      await firstQuestion.evaluate((details) => {
        const answer = details.querySelector("p");
        return {
          opened: details.open,
          openCount: document.querySelectorAll(
            ".questions-list details[open]",
          ).length,
          answerHeight: Math.round(answer?.getBoundingClientRect().height || 0),
          answerVisible: Boolean(
            answer &&
              getComputedStyle(answer).visibility !== "hidden" &&
              answer.getBoundingClientRect().height > 0,
          ),
        };
      }),
    );
    const questionsPath = path.join(outputDir, `${name}-questions.png`);
    await page.screenshot({ path: questionsPath, fullPage: false });
    await firstQuestion.locator("summary").click();
    await page.waitForTimeout(reducedMotion === "reduce" ? 30 : 120);
    questionState.finalOpenCount = await page
      .locator(".questions-list details[open]")
      .count();

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 80 : 450);
    const contactPath = path.join(outputDir, `${name}-contact.png`);
    await page.screenshot({ path: contactPath, fullPage: false });

    await page.locator("#brand-audit").scrollIntoViewIfNeeded();
    await page.waitForTimeout(reducedMotion === "reduce" ? 80 : 450);
    const auditPath = path.join(outputDir, `${name}-audit.png`);
    await page.screenshot({ path: auditPath, fullPage: false });

    await page.locator('[name="name"]').fill("Fernesta QA");
    await page.locator('[name="email"]').fill("qa@example.com");
    await page.locator('[name="website"]').fill("https://example.com");
    await page.locator('[name="instagram"]').fill("@fernestaqa");
    await page
      .locator('[name="details"]')
      .fill("Testing the complete audit registration path.");
    const auditSubmit = page.locator('.audit-form button[type="submit"]');
    await auditSubmit.click();
    await page.waitForTimeout(60);
    const auditPendingState = await page.evaluate(() => {
      const form = document.querySelector(".audit-form");
      const button = form?.querySelector('button[type="submit"]');
      return {
        busy: form?.getAttribute("aria-busy"),
        disabled: button?.disabled || false,
        label: button?.textContent?.trim() || "",
      };
    });
    await page.waitForFunction(() =>
      document
        .querySelector(".audit-status")
        ?.textContent?.includes("You are registered"),
    );
    const auditCompletedState = await page.evaluate(() => {
      const form = document.querySelector(".audit-form");
      const button = form?.querySelector('button[type="submit"]');
      return {
        busy: form?.getAttribute("aria-busy"),
        disabled: button?.disabled || false,
        status: document.querySelector(".audit-status")?.textContent?.trim() || "",
      };
    });

    const navStates = [];
    for (const [target, expected] of [
      ["#start-here", "Start here"],
      ["#system", "What we do"],
      ["#credentials", "Client experience"],
      ["#questions", "Client experience"],
      ["#contact", "Contact"],
      ["#brand-audit", "Contact"],
    ]) {
      await page.locator(target).scrollIntoViewIfNeeded();
      await page.waitForTimeout(reducedMotion === "reduce" ? 50 : 180);
      navStates.push({
        target,
        expected,
        current:
          (await page
            .locator('.site-nav a[aria-current="location"]')
            .textContent())?.trim() || "",
      });
    }

    return {
      name,
      reducedMotion,
      metrics,
      launchStarterState,
      starterState,
      systemStates,
      journeyState,
      questionState,
      auditPendingState,
      auditCompletedState,
      submittedLead,
      navStates,
      consoleErrors,
      pageErrors,
      screenshots: [
        screenshotPath,
        starterPath,
        systemPath,
        approachPath,
        credentialsPath,
        questionsPath,
        contactPath,
        auditPath,
      ],
    };
  } finally {
    await context.close();
  }
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: resolveBrowserExecutable(),
    headless: true,
    args: ["--disable-gpu", "--font-render-hinting=none"],
  });

  try {
    const results = [];
    results.push(
      await auditViewport(browser, "desktop", { width: 1440, height: 900 }),
    );
    results.push(
      await auditViewport(browser, "laptop", { width: 1366, height: 768 }),
    );
    results.push(
      await auditViewport(browser, "tablet", { width: 1024, height: 768 }),
    );
    results.push(
      await auditViewport(browser, "mobile", { width: 390, height: 844 }),
    );
    results.push(
      await auditViewport(browser, "narrow-mobile", { width: 360, height: 800 }),
    );
    results.push(
      await auditViewport(
        browser,
        "reduced-motion",
        { width: 1440, height: 900 },
        "reduce",
      ),
    );

    for (const result of results) {
      if (result.metrics.scrollWidth > result.metrics.viewportWidth + 1) {
        throw new Error(`${result.name} has horizontal overflow.`);
      }
      if (!result.metrics.titleVisible) {
        throw new Error(`${result.name} hero title is not visible.`);
      }
      if (!result.metrics.heroCtaFullyVisible) {
        throw new Error(
          `${result.name} hero CTA is below the initial viewport at ${result.metrics.heroCtaBottom}px.`,
        );
      }
      if (
        result.metrics.viewportWidth > 960 &&
        result.metrics.approachHeight > 672
      ) {
        throw new Error(
          `${result.name} point-of-view section is taller than one usable viewport.`,
        );
      }
      if (result.metrics.duplicateMessages.length) {
        throw new Error(
          `${result.name} repeats content: ${result.metrics.duplicateMessages.join(" | ")}`,
        );
      }
      if (result.metrics.sectionOverlaps.length) {
        throw new Error(`${result.name} has overlapping primary sections.`);
      }
      if (!result.metrics.imagesLoaded) {
        throw new Error(
          `${result.name} has unloaded images: ${result.metrics.unloadedImages.join(", ")}`,
        );
      }
      if (
        result.metrics.mainWordCount < 850 ||
        result.metrics.proofNoteCount !== 4 ||
        result.metrics.questionCount !== 5
      ) {
        throw new Error(`${result.name} is missing rich, decision-useful content.`);
      }
      if (
        result.metrics.credentialLogoCount !== 9 ||
        result.metrics.journeyStageCount !== 5 ||
        result.metrics.credentialLogoFilterCount !== 1
      ) {
        throw new Error(`${result.name} is missing journey or credential content.`);
      }
      if (
        result.metrics.starterOptionCount !== 5 ||
        !/launch planning/i.test(result.launchStarterState.recommendation) ||
        result.launchStarterState.challenge !== "Launch planning" ||
        result.starterState.activeIndexes.length !== 1 ||
        result.starterState.activeIndexes[0] !== 2 ||
        !/conversion path/i.test(result.starterState.recommendation) ||
        result.starterState.challenge !== "Conversion and growth" ||
        result.starterState.auditPrefill !== "Conversion and growth"
      ) {
        throw new Error(`${result.name} starting-point diagnostic is incomplete.`);
      }
      if (
        result.metrics.engagementBlockCount !== 4 ||
        result.metrics.engagementItemCounts.some((count) => count !== 5) ||
        result.metrics.supportingCapabilityCount !== 4
      ) {
        throw new Error(`${result.name} service detail is incomplete.`);
      }
      if (
        result.metrics.header.position !== "fixed" ||
        result.metrics.header.navLinks !== 4 ||
        result.metrics.contactActionCount !== 3 ||
        result.metrics.whatsappLinkCount < 2 ||
        result.metrics.footerColumnCount !== 3 ||
        !result.metrics.officeMapExists
      ) {
        throw new Error(`${result.name} persistent contact navigation is incomplete.`);
      }
      if (
        result.metrics.audit.ctaCount < 2 ||
        !result.metrics.audit.formExists ||
        result.metrics.audit.requiredFields !== 3 ||
        result.metrics.audit.challengeRequired ||
        !result.metrics.audit.websiteExists ||
        !result.metrics.audit.instagramExists ||
        !result.metrics.audit.detailsExists ||
        !/free audit/i.test(result.metrics.audit.submitLabel)
      ) {
        throw new Error(`${result.name} brand-audit registration is incomplete.`);
      }
      if (
        !result.journeyState.active ||
        result.journeyState.expanded !== "true" ||
        Number(result.journeyState.copyOpacity) < 0.99 ||
        result.journeyState.copyHeight < 1
      ) {
        throw new Error(`${result.name} journey expansion is not visible.`);
      }
      if (
        result.questionState.initialOpenCount !== 0 ||
        !result.questionState.opened ||
        result.questionState.openCount !== 1 ||
        !result.questionState.answerVisible ||
        result.questionState.answerHeight < 1 ||
        result.questionState.finalOpenCount !== 0
      ) {
        throw new Error(`${result.name} engagement questions are not interactive.`);
      }
      if (
        result.auditPendingState.busy !== "true" ||
        !result.auditPendingState.disabled ||
        !/registering your audit/i.test(result.auditPendingState.label) ||
        result.auditCompletedState.busy !== "false" ||
        result.auditCompletedState.disabled ||
        !/you are registered/i.test(result.auditCompletedState.status) ||
        result.submittedLead?.formName !== "Fernesta Free Brand Audit" ||
        result.submittedLead?.fields?.business_website !== "https://example.com" ||
        result.submittedLead?.fields?.instagram !== "@fernestaqa"
      ) {
        throw new Error(`${result.name} brand-audit submission path is incomplete.`);
      }
      if (
        result.navStates.some(
          (state) => state.current.toLowerCase() !== state.expected.toLowerCase(),
        )
      ) {
        throw new Error(`${result.name} section-aware navigation is inconsistent.`);
      }
      if (
        result.systemStates.length &&
        result.systemStates.some(
          (state, index) =>
            state.current !== String(index + 1).padStart(2, "0") ||
            state.activeSteps.length !== 1 ||
            state.activeSteps[0] !== index,
        )
      ) {
        throw new Error(`${result.name} system scroll state is inconsistent.`);
      }
      if (result.consoleErrors.length || result.pageErrors.length) {
        throw new Error(
          `${result.name} has browser errors: ${[
            ...result.consoleErrors,
            ...result.pageErrors,
          ].join(" | ")}`,
        );
      }
    }

    const reportPath = path.join(outputDir, "report.json");
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`Fernesta first-cut QA passed: ${reportPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
