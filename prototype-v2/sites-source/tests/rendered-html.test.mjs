import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Fernesta first cut", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Creative Marketing Agency: Strategy to Growth \| Fernesta<\/title>/i,
  );
  assert.match(html, /rel="canonical" href="https:\/\/www\.fernesta\.com\/?"/i);
  assert.match(
    html,
    /independent creative marketing agency connecting strategy/i,
  );
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"legalName":"Fernesta Digital Private Limited"/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /Creative marketing/);
  assert.match(html, /built to move/);
  assert.match(html, /Four disciplines\. One connected way forward\./);
  assert.match(html, /Strategy &amp; Launch Planning/);
  assert.match(html, /Branding &amp; Creative/);
  assert.match(html, /Growth &amp; Performance/);
  assert.match(html, /Social Media &amp; Content/);
  assert.match(html, /Specialist capabilities that carry the core work into market\./);
  assert.match(html, /Digital experiences/);
  assert.match(html, /Campaign delivery/);
  assert.match(html, /Influence and distribution/);
  assert.match(html, /Intelligence and operations/);
  assert.match(html, /Experience earned across brands people choose\./);
  assert.match(html, /Selected anonymized work notes/);
  assert.match(html, /3\.2x/);
  assert.match(html, /Increase in returning customer rate/);
  assert.match(html, /Increase in qualified event enquiries/);
  assert.match(html, /Faster lead-to-quote turnaround/);
  assert.match(html, /href="\/work\/d2c-skincare-performance-turnaround"/);
  assert.match(html, /href="\/work\/consumer-retail-brand-retention"/);
  assert.match(html, /href="\/work\/boutique-hospitality-social-pr-launch"/);
  assert.match(html, /href="\/work\/distribution-workflow-automation-reset"/);
  assert.match(html, /Useful answers before the first conversation\./);
  assert.match(html, /What does independent mean at Fernesta\?/);
  assert.match(html, /Can we begin with one discipline\?/);
  assert.match(html, /What happens in the free brand audit\?/);
  assert.match(html, /What needs to move first\?/);
  assert.match(html, /Our position is unclear/);
  assert.match(html, /The brand feels inconsistent/);
  assert.match(html, /Growth is not converting/);
  assert.match(html, /Content lacks momentum/);
  assert.match(html, /A launch needs direction/);
  assert.match(html, /Angel One/);
  assert.doesNotMatch(html, /Pendula/);
  assert.match(html, /Register for a free/);
  assert.match(html, /brand audit\./);
  assert.match(html, /class="audit-form"/);
  assert.match(html, /Find the signal worth acting on\./);
  assert.match(html, /What you leave with/);
  assert.match(html, /Start a direct conversation\./);
  assert.match(html, /Fernesta Digital Private Limited/);
  assert.match(html, /tel:\+918209458984/);
  assert.match(html, /Instagram handle/);
  assert.match(html, /Anything else we should know\?/);
  assert.match(html, /Choose your country or market/);
  assert.match(html, /United Arab Emirates/);
  assert.match(html, /Europe/);
  assert.match(html, /United States/);
  assert.match(html, /Market entry and GCC launch/);
  assert.match(html, /International market entry/i);
  assert.match(html, /privacy_acknowledgement/);
  assert.match(html, /Read the privacy notice/);
  assert.doesNotMatch(html, /Senior marketing minds|The core team/);
  assert.doesNotMatch(html, /Everything we do|First cut \/ 2026/);
  assert.equal((html.match(/Strategy &amp; Launch Planning/g) ?? []).length, 1);
  assert.equal((html.match(/Branding &amp; Creative/g) ?? []).length, 1);
  assert.match(html, /mailto:tarun@fernesta\.com/);
  assert.match(html, /WhatsApp Business/);
  assert.match(html, /maps\.app\.goo\.gl\/ZatXGy9xwzVFQFwo9/);
  assert.match(html, /215, Padmavati B Colony/);
  assert.match(html, /linkedin\.com\/company\/fernesta/);
  assert.match(html, /instagram\.com\/fernesta\.co/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("server-renders the privacy notice", async () => {
  const response = await render("/privacy");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Privacy Notice \| Fernesta<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/www\.fernesta\.com\/privacy"/i);
  assert.match(html, /Privacy,<br\/>stated plainly\./i);
  assert.match(html, /Who is responsible for your information/);
  assert.match(html, /Information we collect/);
  assert.match(html, /Our basis for processing/);
  assert.match(html, /How long we keep it/);
  assert.match(html, /Your choices and rights/);
  assert.match(html, /info@fernesta\.com/);
  assert.match(html, /Choose your country or market/);
});

test("server-renders the UAE-first GCC market entry page", async () => {
  const response = await render("/gcc?market=ae");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<title>GCC Brand Strategy &amp; Market Entry Partner \| Fernesta<\/title>/i,
  );
  assert.match(html, /rel="canonical" href="https:\/\/www\.fernesta\.com\/gcc"/i);
  assert.match(html, /Building between/);
  assert.match(html, /India and/);
  assert.match(html, /the Gulf\./);
  assert.match(html, /UAE first\.<br\/>Saudi next\./);
  assert.match(html, /Market-entry signal audit/);
  assert.match(html, /GCC launch readiness sprint/);
  assert.match(html, /Brand adaptation and launch system/);
  assert.match(html, /Creative testing and growth/);
  assert.match(html, /Review selected anonymized work/);
  assert.match(html, /not presented as GCC-specific proof/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Choose your country or market/);
});

test("server-renders the evidence-led Jaipur marketing agency page", async () => {
  const response = await render("/jaipur");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<title>Marketing Agency in Jaipur: Strategy to Growth \| Fernesta<\/title>/i,
  );
  assert.match(
    html,
    /rel="canonical" href="https:\/\/www\.fernesta\.com\/jaipur"/i,
  );
  assert.match(
    html,
    /name="twitter:title" content="A connected marketing agency based in Jaipur \| Fernesta"/i,
  );
  assert.match(html, /Jaipur roots\./);
  assert.match(html, /Connected growth\./);
  assert.match(html, /What does a connected marketing agency in Jaipur do\?/);
  assert.match(html, /Comparing the best marketing companies in Jaipur\?/);
  assert.match(html, /Strategic depth/);
  assert.match(html, /Connected execution/);
  assert.match(html, /Visible evidence/);
  assert.match(html, /Is Fernesta based in Jaipur\?/);
  assert.match(html, /215, Padmavati B Colony/);
  assert.match(html, /"ProfessionalService"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /application\/ld\+json/);
});

test("server-renders selective Europe and US market entry content", async () => {
  const response = await render("/international?market=us");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<title>International Brand Strategy &amp; Market Entry \| Fernesta<\/title>/i,
  );
  assert.match(
    html,
    /rel="canonical" href="https:\/\/www\.fernesta\.com\/international"/i,
  );
  assert.match(html, /Build where the/);
  assert.match(html, /market/);
  assert.match(html, /earns it\./);
  assert.match(html, /International is<br\/>not a market/);
  assert.match(html, /Europe or the US,<br\/>with a reason/);
  assert.match(html, /Country-specific, never one-size-fits-all/);
  assert.match(html, /Focused category entry/);
  assert.match(html, /This page is an entry proposition, not a claim of a local office/);
  assert.match(html, /Review selected anonymized work/);
  assert.match(html, /not presented as local Europe or United States proof/);
  assert.match(html, /International market entry/i);
  assert.match(html, /Choose your country or market/);
  assert.match(html, /application\/ld\+json/);
});

test("server-renders the connected services hub", async () => {
  const response = await render("/services");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<title>Creative Marketing Services: Strategy to Growth \| Fernesta<\/title>/i,
  );
  assert.match(html, /rel="canonical" href="https:\/\/www\.fernesta\.com\/services"/i);
  assert.match(html, /Four disciplines\./);
  assert.match(html, /One direction\./);
  assert.match(html, /Strategy &amp; Launch Planning/);
  assert.match(html, /Branding &amp; Creative/);
  assert.match(html, /Growth &amp; Performance/);
  assert.match(html, /Social Media &amp; Content/);
  assert.match(html, /One strategic thread/);
  assert.match(html, /application\/ld\+json/);
});

const renderedServiceRoutes = [
  {
    path: "/services/strategy-launch-planning",
    title: /Brand Strategy &amp; Launch Planning Agency/,
    hero: /should do next\./,
    engagement: /Go-to-market strategy/,
  },
  {
    path: "/services/branding-creative",
    title: /Branding &amp; Creative Agency/,
    hero: /recognisable\./,
    engagement: /Campaign platforms/,
  },
  {
    path: "/services/growth-performance",
    title: /Growth Marketing &amp; Performance Strategy Agency/,
    hero: /useful growth\./,
    engagement: /Conversion optimisation/,
  },
  {
    path: "/services/social-media-content",
    title: /Social Media &amp; Content Strategy Agency/,
    hero: /keeps moving\./,
    engagement: /Editorial systems/,
  },
];

for (const serviceRoute of renderedServiceRoutes) {
  test(`server-renders rich service content for ${serviceRoute.path}`, async () => {
    const response = await render(serviceRoute.path);
    assert.equal(response.status, 200);
    const html = await response.text();

    assert.match(html, serviceRoute.title);
    assert.match(html, serviceRoute.hero);
    assert.match(html, serviceRoute.engagement);
    assert.match(html, /Signals this work/);
    assert.match(html, /Focused scopes\./);
    assert.match(html, /Evidence to/);
    assert.match(html, /What connected/);
    assert.match(html, /Results are context-specific/);
    assert.match(html, /Read the case study/);
    assert.match(html, /Connected disciplines/);
    assert.match(html, /Register for a free brand audit/);
    assert.match(html, /Choose your country or market/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /name="twitter:title"/);
    assert.doesNotMatch(
      html,
      /name="twitter:title" content="Creative Marketing Agency: Strategy to Growth \| Fernesta"/i,
    );
  });
}

test("server-renders the selected work hub", async () => {
  const response = await render("/work");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Selected Marketing Case Studies &amp; Outcomes \| Fernesta<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/www\.fernesta\.com\/work"/i);
  assert.match(html, /Decisions made/);
  assert.match(html, /visible\./);
  assert.match(html, /3\.2x/);
  assert.match(html, /42%/);
  assert.match(html, /3\.6x/);
  assert.match(html, /72%/);
  assert.match(html, /anonymized engagement records/i);
  assert.match(html, /do not promise equivalent results/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /Choose your country or market/);
});

const renderedWorkRoutes = [
  {
    path: "/work/d2c-skincare-performance-turnaround",
    title: /D2C Performance Marketing Case Study: 3\.2x ROAS/,
    metric: /3\.2x/,
    baseline: /1\.1x/,
    evidence: /Checkout conversion/,
  },
  {
    path: "/work/consumer-retail-brand-retention",
    title: /Retail Brand &amp; Retention Case Study: 42% Increase/,
    metric: /42%/,
    baseline: /100 index/,
    evidence: /Lifecycle campaign revenue/,
  },
  {
    path: "/work/boutique-hospitality-social-pr-launch",
    title: /Hospitality Launch Case Study: 3\.6x Enquiries/,
    metric: /3\.6x/,
    baseline: /2\.1%/,
    evidence: /Creator-assisted visits/,
  },
  {
    path: "/work/distribution-workflow-automation-reset",
    title: /B2B Marketing Operations Case Study: 72% Faster/,
    metric: /72%/,
    baseline: /58%/,
    evidence: /Status visibility/,
  },
];

for (const workRoute of renderedWorkRoutes) {
  test(`server-renders evidence-led work content for ${workRoute.path}`, async () => {
    const response = await render(workRoute.path);
    assert.equal(response.status, 200);
    const html = await response.text();

    assert.match(html, workRoute.title);
    assert.match(html, workRoute.metric);
    assert.match(html, workRoute.baseline);
    assert.match(html, workRoute.evidence);
    assert.match(html, /The objective/);
    assert.match(html, /The connected response/);
    assert.match(html, /Before and.*after/s);
    assert.match(html, /not a guarantee of future performance/);
    assert.match(html, /"@type":"CreativeWork"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /Register for a free brand audit/);
    assert.match(html, /Choose your country or market/);
    assert.match(html, /name="twitter:title"/);
    assert.doesNotMatch(
      html,
      /name="twitter:title" content="Creative Marketing Agency: Strategy to Growth \| Fernesta"/i,
    );
  });
}

test("redirects the stale indexed PDF to its live case study", async () => {
  const response = await render(
    "/downloads/d2c-skincare-performance-turnaround.pdf",
  );
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "http://localhost/work/d2c-skincare-performance-turnaround",
  );
});

test("preserves Fernesta brand, SEO, and accessible motion contracts", async () => {
  const [
    component,
    css,
    layout,
    page,
    robots,
    sitemap,
    manifest,
    llms,
    packageJson,
    leadRouting,
    envExample,
    marketSelector,
    privacyPage,
    gccPage,
    internationalPage,
  ] =
    await Promise.all([
    readFile(new URL("../app/FernestaExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/fernesta.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../worker/lead-routing.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
    readFile(new URL("../app/MarketSelector.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/gcc/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/international/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(component, /@gsap\/react/);
  assert.match(component, /ScrollTrigger/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(component, /className="skip-link"/);
  assert.match(component, /aria-label="Primary navigation"/);
  assert.match(component, /aria-current=\{activeNav/);
  assert.match(component, /fernesta-lockup-red-transparent\.webp/);
  assert.match(component, /strategy-direction-editorial\.webp/);
  assert.match(component, /brand-creative-editorial\.webp/);
  assert.match(component, /growth-performance-editorial\.webp/);
  assert.match(component, /social-content-production\.webp/);
  assert.match(component, /hero-connected-editorial\.webp/);
  assert.match(component, /credentials\/angel-one\.png/);
  assert.doesNotMatch(component, /className="connection-field"/);
  assert.doesNotMatch(component, /className="reel-section"/);
  assert.doesNotMatch(component, /id="team"/);
  assert.match(component, /id="start-here"/);
  assert.match(component, /id="contact"/);
  assert.match(component, /className="starter-options"/);
  assert.match(component, /aria-pressed=\{starterIndex === index\}/);
  assert.match(component, /value=\{auditChallenge\}/);
  assert.match(component, /name="website"/);
  assert.match(component, /name="instagram"/);
  assert.match(component, /name="details"/);
  assert.match(component, /name="company_fax"/);
  assert.match(component, /tel:\+918209458984/);
  assert.match(component, /\/go\/whatsapp\?pipeline=fernesta/);
  assert.match(component, /maps\.app\.goo\.gl\/ZatXGy9xwzVFQFwo9/);
  assert.match(component, /className="strategy-journey"/);
  assert.match(component, /className="system-map"/);
  assert.match(component, /className="system-step-engagements"/);
  assert.match(component, /className="system-step-link"/);
  assert.match(component, /\/services\/strategy-launch-planning/);
  assert.match(component, /\/services\/branding-creative/);
  assert.match(component, /\/services\/growth-performance/);
  assert.match(component, /\/services\/social-media-content/);
  assert.match(component, /Customer and category insight/);
  assert.match(component, /Brand story and voice/);
  assert.match(component, /Conversion optimisation/);
  assert.match(component, /Editorial systems/);
  assert.match(component, /className="system-support"/);
  assert.match(component, /className="proof-notes"/);
  assert.match(component, /className="proof-note-link"/);
  assert.match(component, /className="questions-section"/);
  assert.match(component, /<details key=\{question\.title\}>/);
  assert.match(component, /disabled=\{isSubmitting\}/);
  assert.match(component, /role="status"/);
  assert.doesNotMatch(component, /Strategy to scale/);
  assert.match(component, /fetch\("\/api\/lead"/);
  assert.match(component, /https:\/\/api\.web3forms\.com\/submit/);
  assert.match(component, /name="access_key"/);
  assert.match(component, /value=\{web3FormsAccessKey\}/);
  assert.match(component, /mailto:tarun@fernesta\.com/);
  assert.doesNotMatch(component, /className="marquee"/);
  assert.match(packageJson, /"@gsap\/react"/);
  assert.match(packageJson, /"gsap"/);
  assert.match(layout, /metadataBase:\s*new URL\(siteUrl\)/);
  assert.match(layout, /canonical:\s*"\/"/);
  assert.match(layout, /lang="en"/);
  assert.match(layout, /max-image-preview/);
  assert.match(layout, /\/og\.jpg/);
  assert.match(layout, /\/fernesta-fe-favicon\.ico/);
  assert.match(layout, /\/fernesta-fe-favicon\.png/);
  assert.doesNotMatch(layout, /\/favicon\.svg/);
  assert.match(page, /"@type": "WebSite"/);
  assert.match(page, /"@type": \["Organization", "ProfessionalService"\]/);
  assert.match(page, /legalName: "Fernesta Digital Private Limited"/);
  assert.match(page, /"@type": "PostalAddress"/);
  assert.match(page, /streetAddress:/);
  assert.match(page, /postalCode: "302019"/);
  assert.match(page, /hasMap:/);
  assert.match(page, /linkedin\.com\/company\/fernesta/);
  assert.match(page, /"@type": "Service"/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot/);
  assert.match(robots, /User-agent: GPTBot/);
  assert.match(robots, /User-agent: Google-Extended/);
  assert.match(robots, /User-agent: PerplexityBot/);
  assert.match(robots, /Sitemap: https:\/\/www\.fernesta\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/www\.fernesta\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.fernesta\.com\/jaipur<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.fernesta\.com\/services<\/loc>/);
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/services\/strategy-launch-planning<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/services\/branding-creative<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/services\/growth-performance<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/services\/social-media-content<\/loc>/,
  );
  assert.match(sitemap, /<loc>https:\/\/www\.fernesta\.com\/work<\/loc>/);
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/work\/d2c-skincare-performance-turnaround<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/work\/consumer-retail-brand-retention<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/work\/boutique-hospitality-social-pr-launch<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.fernesta\.com\/work\/distribution-workflow-automation-reset<\/loc>/,
  );
  assert.equal(JSON.parse(manifest).name, "Fernesta");
  assert.match(llms, /Fernesta Digital Private Limited/);
  assert.match(llms, /Strategy and Launch Planning/);
  assert.match(llms, /https:\/\/www\.fernesta\.com\/#brand-audit/);
  assert.match(llms, /Selected anonymized outcomes/);
  assert.match(llms, /215, Padmavati B Colony/);
  assert.match(llms, /info@fernesta\.com/);
  assert.match(llms, /WhatsApp Business/);
  assert.match(llms, /GCC market entry/);
  assert.match(llms, /Jaipur marketing agency/);
  assert.match(llms, /https:\/\/www\.fernesta\.com\/jaipur/);
  assert.match(llms, /Europe or the United States/);
  assert.match(llms, /Service hub: https:\/\/www\.fernesta\.com\/services/);
  assert.match(llms, /services\/strategy-launch-planning/);
  assert.match(llms, /services\/branding-creative/);
  assert.match(llms, /services\/growth-performance/);
  assert.match(llms, /services\/social-media-content/);
  assert.match(llms, /Selected work hub: https:\/\/www\.fernesta\.com\/work/);
  assert.match(llms, /work\/d2c-skincare-performance-turnaround/);
  assert.match(llms, /figures describe specific recorded contexts/);

  assert.match(marketSelector, /United Arab Emirates/);
  assert.match(marketSelector, /Saudi Arabia/);
  assert.match(marketSelector, /Europe/);
  assert.match(marketSelector, /United States/);
  assert.match(marketSelector, /fernesta-market/);
  assert.match(privacyPage, /Effective 24 July 2026/);
  assert.match(privacyPage, /MarketSelector/);
  assert.match(gccPage, /UAE first/);
  assert.match(gccPage, /GCC launch readiness sprint/);
  assert.match(internationalPage, /Europe or the US/);
  assert.match(internationalPage, /not a claim of a local office/);

  assert.match(leadRouting, /DEFAULT_LEAD_EMAIL = "tarun@fernesta\.com"/);
  assert.match(leadRouting, /DEFAULT_WEB3FORMS_ACCESS_KEY/);
  assert.match(leadRouting, /https:\/\/api\.web3forms\.com\/submit/);
  assert.match(leadRouting, /https:\/\/api\.resend\.com\/emails/);
  assert.match(leadRouting, /business_website/);
  assert.match(leadRouting, /company_fax/);
  assert.match(leadRouting, /handleWhatsAppRedirect/);
  assert.match(leadRouting, /https:\/\/wa\.me\/\$\{WHATSAPP_NUMBER\}/);
  assert.match(envExample, /LEAD_TO_EMAIL=tarun@fernesta\.com/);
  assert.match(envExample, /WEB3FORMS_ACCESS_KEY=/);
  assert.match(envExample, /LEAD_WEBHOOK_URL=/);

  assert.match(css, /--cream:\s*#f5e9db/i);
  assert.match(css, /--brown:\s*#4d3d2c/i);
  assert.match(css, /--signal:\s*#81191a/i);
  assert.match(css, /font-family:\s*"Playfair Display"/);
  assert.match(css, /font-family:\s*"Jost"/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(
    css,
    /\.hero-section\s*\{[^}]*background:\s*var\(--cream\)/s,
  );
  assert.match(css, /\.signal-dot\s*\{[^}]*color:\s*var\(--signal\)/s);
  assert.match(css, /\.starter-section\s*\{/);
  assert.match(css, /\.starter-options button\s*\{/);
  assert.match(css, /\.system-step-engagements\s*\{/);
  assert.match(css, /\.system-support-grid\s*\{/);
  assert.match(css, /\.proof-notes-grid\s*\{/);
  assert.match(css, /\.questions-list summary\s*\{/);
  assert.match(css, /a\[aria-current="location"\]/);
  assert.match(css, /\.inbound-contact\s*\{/);
  assert.match(
    css,
    /\.site-header\s*\{[^}]*position:\s*fixed/s,
  );
  assert.match(css, /\.credential-logo-frame img\s*\{[^}]*filter:/s);
  assert.match(css, /\.credential-tile--mamaearth/);
  assert.match(css, /\.footer-location/);
  assert.doesNotMatch(css, /\.marquee/);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient/);
  assert.ok(
    [...css.matchAll(/border-radius:\s*([^;]+);/g)].every(
      (match) => match[1].trim() === "0",
    ),
  );

  await access(new URL("../public/fonts/jost.woff2", import.meta.url));
  await access(new URL("../public/fonts/playfair.woff2", import.meta.url));
  await access(new URL("../public/og.jpg", import.meta.url));
  await access(new URL("../public/favicon.ico", import.meta.url));
  await access(new URL("../public/favicon.png", import.meta.url));
  await access(new URL("../public/fernesta-fe-favicon.ico", import.meta.url));
  await access(new URL("../public/fernesta-fe-favicon.png", import.meta.url));
  await access(new URL("../public/apple-touch-icon.png", import.meta.url));
  await access(new URL("../public/icon-192.png", import.meta.url));
  await access(new URL("../public/icon-512.png", import.meta.url));
  await access(
    new URL(
      "../public/prototype/assets/fernesta-lockup-red-transparent.webp",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/prototype/assets/strategy-direction-editorial.webp",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/prototype/assets/brand-creative-editorial.webp",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/prototype/assets/growth-performance-editorial.webp",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/prototype/assets/social-content-production.webp",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/prototype/assets/hero-connected-editorial.webp",
      import.meta.url,
    ),
  );
  for (const asset of [
    "fernesta-lockup-red-transparent.webp",
    "hero-connected-editorial.webp",
    "strategy-direction-editorial.webp",
    "brand-creative-editorial.webp",
    "growth-performance-editorial.webp",
    "social-content-production.webp",
  ]) {
    const assetStats = await stat(
      new URL(`../public/prototype/assets/${asset}`, import.meta.url),
    );
    assert.ok(assetStats.size < 180 * 1024, `${asset} is not web optimized`);
  }
  assert.ok(
    (await stat(new URL("../public/og.jpg", import.meta.url))).size <
      180 * 1024,
    "og.jpg is not web optimized",
  );
  for (const logo of [
    "neora.png",
    "mamaearth.png",
    "avacara-jaipur.png",
    "cine-yatri.png",
    "unilever.png",
    "sola.png",
    "angel-one.png",
    "colgate.png",
    "toastd.png",
  ]) {
    await access(
      new URL(`../public/prototype/assets/credentials/${logo}`, import.meta.url),
    );
  }
});
