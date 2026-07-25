const app = document.querySelector("[data-app]");
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const dialog = document.querySelector("[data-case-dialog]");
const dialogContent = document.querySelector("[data-dialog-content]");
const routeTransition = document.querySelector(".route-transition");

const projects = [
  {
    id: "education",
    number: "01",
    category: "Growth",
    title: "An education brand becomes discoverable",
    short: "Growth strategy · Search · Performance",
    metric: "3.2×",
    metricLabel: "qualified enquiries",
    image: "./assets/growth-performance-v1.webp",
    imageAlt:
      "A symmetrical performance marketing workspace with growth charts, media planning sheets, and a conversion funnel",
    results: [
      ["3.2×", "qualified enquiries"],
      ["−41%", "cost per lead"],
      ["6 mo.", "to a durable search engine"],
    ],
    story:
      "The problem was not a lack of activity; it was a fragmented path from discovery to enquiry. Fernesta rebuilt the search architecture, editorial system, and conversion journey as one operating model—giving the internal team a clearer cadence and the audience a more useful experience.",
  },
  {
    id: "consumer",
    number: "02",
    category: "Brand",
    title: "A consumer brand finds its sharpest story",
    short: "Brand strategy · Identity · Commerce",
    metric: "+68%",
    metricLabel: "repeat purchase",
    image: "./assets/brand-creative-v1.webp",
    imageAlt:
      "A symmetrical brand identity system with aligned print specimens, packaging, color swatches, and typography sheets",
    results: [
      ["+68%", "repeat purchase"],
      ["2.1×", "email-led revenue"],
      ["1", "coherent brand system"],
    ],
    story:
      "We clarified the proposition before redesigning the expression. A tighter verbal identity, disciplined visual system, and retention-led commerce journey helped the brand move from promotion-dependent growth toward stronger recognition and repeat behavior.",
  },
  {
    id: "b2b",
    number: "03",
    category: "Strategy",
    title: "A B2B service turns expertise into momentum",
    short: "Go-to-market strategy · Journey · Enablement",
    metric: "−36%",
    metricLabel: "sales cycle",
    image: "./assets/strategy-direction-v1.webp",
    imageAlt:
      "A symmetrical strategy workspace with a customer journey map, audience cards, market matrix, and research sheets",
    results: [
      ["−36%", "sales cycle"],
      ["4", "automated handoffs"],
      ["100%", "pipeline visibility"],
    ],
    story:
      "The expertise was credible but hard to navigate. Fernesta reorganized the offer, built a proof-led acquisition journey, and connected marketing and sales handoffs. The result was a simpler buyer experience and a more accountable internal system.",
  },
  {
    id: "hospitality",
    number: "04",
    category: "Social",
    title: "A hospitality launch earns cultural relevance",
    short: "Social strategy · Creator launch · PR",
    metric: "4.6×",
    metricLabel: "earned reach",
    image: "./assets/social-content-v1.webp",
    imageAlt:
      "A symmetrical social content production system with camera, microphone, smartphone, storyboard, and crop guides",
    results: [
      ["4.6×", "earned reach"],
      ["82%", "positive sentiment"],
      ["7 wk.", "launch runway"],
    ],
    story:
      "Instead of treating launch as a media burst, Fernesta built a coherent cultural story across brand, creator partnerships, press, and guest experience. Every touchpoint carried the same point of view, creating recognition before the doors opened.",
  },
];

const practices = [
  {
    number: "01",
    title: "Strategy & Direction",
    summary:
      "Find the commercial problem, audience truth, and choices that should direct the entire marketing system.",
    services: [
      "Market & audience research",
      "Growth diagnosis",
      "Positioning & proposition",
      "Customer journey design",
      "Go-to-market planning",
      "Measurement architecture",
    ],
  },
  {
    number: "02",
    title: "Brand & Creative",
    summary:
      "Turn the strategy into a distinctive brand people can recognize, understand, and choose.",
    services: [
      "Brand strategy",
      "Verbal identity",
      "Visual identity systems",
      "Campaign platforms",
      "Creative direction",
      "Brand governance",
    ],
  },
  {
    number: "03",
    title: "Growth & Performance",
    summary:
      "Create measurable demand through performance marketing, search, conversion, and lifecycle growth.",
    services: [
      "Performance marketing",
      "Media strategy & buying",
      "Search strategy & SEO",
      "Conversion optimization",
      "CRM & lifecycle growth",
      "Growth analytics",
    ],
  },
  {
    number: "04",
    title: "Social Media & Content",
    summary:
      "Build an always-on social presence that earns attention, creates community, and feeds the growth engine.",
    services: [
      "Social media strategy",
      "Content systems",
      "Creative production",
      "Community management",
      "Influencer & creator programs",
      "Social reporting",
    ],
  },
];

const workCards = (items = projects) =>
  items
    .map(
      (project) => `
        <article class="work-card" data-category="${project.category}">
          <button type="button" data-case="${project.id}" aria-label="Open case study: ${project.title}">
            <div class="work-image">
              <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" />
              <span class="work-number">${project.number}</span>
            </div>
            <div class="work-meta">
              <div>
                <h3>${project.title}</h3>
                <p>${project.short}</p>
              </div>
              <div class="work-metric">
                <strong>${project.metric}</strong>
                <span>${project.metricLabel}</span>
              </div>
            </div>
          </button>
        </article>
      `,
    )
    .join("");

const homePage = () => `
  <div class="page page-home">
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Creative marketing agency · New Delhi</p>
          <h1 class="display-xl">Growth,<br /><em>considered.</em></h1>
        </div>
        <div class="hero-aside">
          <p class="lede">
            We build connected marketing systems: strategy, branding, performance, and social
            working together to create demand and compound growth.
          </p>
          <a class="button button-primary" href="#/work">
            Explore selected work <span aria-hidden="true">↗</span>
          </a>
          <div class="hero-index" aria-label="Fernesta capabilities">
            <span>Strategy</span><span>Brand</span><span>Growth</span><span>Social</span>
          </div>
        </div>
      </div>
    </section>

    <section class="hero-visual" aria-label="Fernesta brand world">
      <div class="hero-image" role="img" aria-label="Fernesta visual moodboard"></div>
      <div class="visual-manifesto">
        <span>Our point of view</span>
        <p>Calm is<br />a competitive<br /><em>advantage.</em></p>
        <span>01 / Quiet authority</span>
      </div>
    </section>

    <section class="section">
      <div class="wrap statement-grid">
        <p class="eyebrow">The premise</p>
        <p class="body-large">
          Customers experience one brand, not a collection of agencies.
          <strong>Fernesta designs the complete marketing system:</strong> strategy sets direction,
          branding creates meaning, performance creates demand, and social compounds attention.
        </p>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <p class="eyebrow">Selected work</p>
        <h2 class="display-lg">Proof before<br /><em>promises.</em></h2>
        <div class="work-grid">${workCards(projects.slice(0, 3))}</div>
      </div>
    </section>

    <section class="section dark-section">
      <div class="wrap">
        <p class="eyebrow eyebrow-light">The Fernesta marketing system</p>
        <h2 class="display-lg">Four disciplines.<br />One customer journey.</h2>
        <div class="practice-list">
          ${practices
            .map(
              (practice) => `
                <a class="practice-row" href="#/capabilities">
                  <span>${practice.number}</span>
                  <h3>${practice.title}</h3>
                  <p>${practice.summary}</p>
                </a>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <p class="eyebrow">How we work</p>
        <h2 class="display-md">Rigorous enough to be accountable.<br /><em>Flexible enough to move.</em></h2>
        <div class="method-grid">
          <article class="method-step">
            <span>01 / Diagnose</span>
            <div><h3>Find the real constraint.</h3><p>Evidence before activity. We map the customer journey, commercial model, and operating friction.</p></div>
          </article>
          <article class="method-step">
            <span>02 / Design</span>
            <div><h3>Make the choices visible.</h3><p>We turn strategy into a focused system of messages, experiences, channels, and measures.</p></div>
          </article>
          <article class="method-step">
            <span>03 / Build</span>
            <div><h3>Create with the operators.</h3><p>Cross-functional teams work in short, testable cycles with clear ownership and useful documentation.</p></div>
          </article>
          <article class="method-step">
            <span>04 / Compound</span>
            <div><h3>Leave a stronger engine.</h3><p>We measure, refine, automate, and transfer the system so progress continues beyond the engagement.</p></div>
          </article>
        </div>
      </div>
    </section>
  </div>
`;

const workPage = () => `
  <div class="page page-work">
    <section class="page-hero">
      <div class="wrap page-hero-grid">
        <div>
          <p class="eyebrow">Selected work</p>
          <h1 class="display-lg">Outcomes with<br /><em>a point of view.</em></h1>
        </div>
        <p class="lede">
          A prototype case-study library organized by the business problem solved—not by a list of
          disconnected deliverables.
        </p>
      </div>
    </section>
    <div class="wrap">
      <div class="filter-bar" aria-label="Filter case studies">
        ${["All", "Strategy", "Brand", "Growth", "Social"]
          .map(
            (filter, index) => `
              <button class="filter-button" type="button" data-filter="${filter}" aria-pressed="${index === 0}">
                ${filter}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
    <section class="section-tight">
      <div class="wrap">
        <div class="work-grid" data-work-grid>${workCards()}</div>
      </div>
    </section>
  </div>
`;

const practicesPage = () => `
  <div class="page page-practices">
    <section class="page-hero">
      <div class="wrap page-hero-grid">
        <div>
          <p class="eyebrow">Capabilities</p>
          <h1 class="display-lg">One system,<br /><em>four disciplines.</em></h1>
        </div>
        <p class="lede">
          We rarely sell these as isolated services. We assemble them around the customer journey,
          then add the supporting capabilities the system genuinely needs.
        </p>
      </div>
    </section>
    <section class="section-tight">
      <div class="wrap">
        <div class="accordion">
          ${practices
            .map(
              (practice, index) => `
                <article class="accordion-item">
                  <h2>
                    <button class="accordion-trigger" type="button" aria-expanded="${index === 0}" aria-controls="practice-${index}">
                      <span>${practice.number}</span>
                      <span class="accordion-title">${practice.title}</span>
                      <span class="accordion-symbol" aria-hidden="true">${index === 0 ? "−" : "+"}</span>
                    </button>
                  </h2>
                  <div class="accordion-panel" id="practice-${index}" ${index === 0 ? "" : "hidden"}>
                    <p>${practice.summary}</p>
                    <ul class="service-list">
                      ${practice.services.map((service) => `<li>${service}</li>`).join("")}
                    </ul>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
    <section class="section dark-section">
      <div class="wrap statement-grid">
        <p class="eyebrow eyebrow-light">The integrated engagement model</p>
        <p class="body-large">
          Strategy is the entry point. Brand, performance, and social are designed around it.
          Website experience, commerce, PR, creator partnerships, automation, analytics, and
          production plug in where they strengthen the same system—not as disconnected add-ons.
        </p>
      </div>
    </section>
  </div>
`;

const aboutPage = () => `
  <div class="page page-about">
    <section class="page-hero">
      <div class="wrap page-hero-grid">
        <div>
          <p class="eyebrow">About Fernesta</p>
          <h1 class="display-lg">Built for the space<br />between <em>thinking</em><br />and doing.</h1>
        </div>
        <p class="lede">
          Fernesta is a creative marketing agency for businesses that have outgrown fragmented
          agencies and disconnected vendors, but still value specialist craft.
        </p>
      </div>
    </section>
    <div class="about-image" role="img" aria-label="A calm creative studio workspace"></div>
    <section class="section">
      <div class="wrap statement-grid">
        <p class="eyebrow">Why we exist</p>
        <p class="body-large">
          The best strategy is useful on Monday morning. We work close enough to the business to
          understand the constraint, and far enough away to challenge the assumptions around it.
        </p>
      </div>
    </section>
    <section class="section-tight">
      <div class="wrap">
        <p class="eyebrow">Working principles</p>
        <h2 class="display-md">Small rules.<br /><em>Large consequences.</em></h2>
        <div class="principles-grid">
          <article class="principle"><span>01</span><h3>Clarity earns speed.</h3><p>Make the important decisions explicit, then let teams move.</p></article>
          <article class="principle"><span>02</span><h3>Proof changes minds.</h3><p>Opinions begin the conversation; evidence decides the next step.</p></article>
          <article class="principle"><span>03</span><h3>Craft builds trust.</h3><p>Details are not decoration. They signal how carefully the whole system was considered.</p></article>
          <article class="principle"><span>04</span><h3>Systems should teach.</h3><p>Every engagement should leave the client more capable than before.</p></article>
          <article class="principle"><span>05</span><h3>Calm is operational.</h3><p>Fewer priorities and cleaner handoffs create space for better judgment.</p></article>
          <article class="principle"><span>06</span><h3>Growth is connected.</h3><p>Strategy, brand, performance, and social compound when they share one logic.</p></article>
        </div>
      </div>
    </section>
  </div>
`;

const contactPage = () => `
  <div class="page page-contact">
    <section class="section">
      <div class="wrap contact-grid">
        <aside class="contact-aside">
          <p class="eyebrow">Start a conversation</p>
          <h1 class="display-md">Tell us what<br />is <em>not moving.</em></h1>
          <address>
            <a href="mailto:hello@fernesta.com">hello@fernesta.com</a>
            <span>New Delhi, India</span>
            <span>Replies within two working days</span>
          </address>
        </aside>
        <form class="contact-form" data-contact-form>
          <div class="form-row">
            <div class="field">
              <label for="name">Your name</label>
              <input id="name" name="name" autocomplete="name" placeholder="Name" required />
            </div>
            <div class="field">
              <label for="email">Work email</label>
              <input id="email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required />
            </div>
          </div>
          <div class="field">
            <label for="company">Company</label>
            <input id="company" name="company" autocomplete="organization" placeholder="Company or brand" />
          </div>
          <div class="field">
            <label for="challenge">What should move?</label>
            <textarea id="challenge" name="challenge" placeholder="A little context about the challenge, ambition, or change you are navigating…" required></textarea>
          </div>
          <div class="field">
            <label for="timing">When would you like to begin?</label>
            <select id="timing" name="timing">
              <option>Within 4 weeks</option>
              <option>Within 2–3 months</option>
              <option>Later this year</option>
              <option>Still exploring</option>
            </select>
          </div>
          <div>
            <button class="button button-primary" type="submit">
              Send the brief <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p class="form-status" role="status" data-form-status></p>
        </form>
      </div>
    </section>
  </div>
`;

const notFoundPage = () => `
  <div class="page">
    <section class="hero">
      <div class="wrap">
        <p class="eyebrow">404 / Wrong turn</p>
        <h1 class="display-xl">This page<br /><em>is resting.</em></h1>
        <p class="lede" style="margin-top: 48px">Return to the prototype home and continue exploring.</p>
        <a class="button button-primary" href="#/" style="margin-top: 32px">Go home <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </div>
`;

const routes = {
  "": homePage,
  "/": homePage,
  "/work": workPage,
  "/capabilities": practicesPage,
  "/practices": practicesPage,
  "/about": aboutPage,
  "/contact": contactPage,
};

function currentPath() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function routeName(path) {
  return path.split("/").filter(Boolean)[0] || "home";
}

function render() {
  const path = currentPath();
  const page = routes[path] || notFoundPage;
  app.innerHTML = page();
  document.title = `Fernesta — ${routeName(path) === "home" ? "Growth, considered." : routeName(path)[0].toUpperCase() + routeName(path).slice(1)}`;
  updateNavigation(path);
  bindPageInteractions();
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

function updateNavigation(path) {
  const active = routeName(path);
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function transitionToRoute() {
  routeTransition.classList.remove("is-active");
  void routeTransition.offsetWidth;
  routeTransition.classList.add("is-active");
  window.setTimeout(render, 285);
}

function bindPageInteractions() {
  document.querySelectorAll("[data-case]").forEach((button) => {
    button.addEventListener("click", () => openCase(button.dataset.case));
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      document.querySelectorAll(".work-card").forEach((card) => {
        card.hidden = filter !== "All" && card.dataset.category !== filter;
      });
    });
  });

  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(!expanded));
      trigger.querySelector(".accordion-symbol").textContent = expanded ? "+" : "−";
      panel.hidden = expanded;
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = contactForm.querySelector("[data-form-status]");
      status.textContent =
        "Prototype complete: this would now send securely to the Fernesta enquiry workflow.";
      contactForm.querySelector("button[type='submit']").textContent = "Brief ready ✓";
    });
  }
}

function openCase(id) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  dialogContent.innerHTML = `
    <div class="dialog-hero">
      <img src="${project.image}" alt="${project.imageAlt}" />
      <div class="dialog-title">
        <p class="eyebrow eyebrow-light">${project.category} case / ${project.number}</p>
        <h2>${project.title}</h2>
        <p>${project.short}</p>
      </div>
    </div>
    <div class="dialog-results">
      ${project.results
        .map(
          ([value, label]) => `
            <div class="dialog-result">
              <strong>${value}</strong>
              <span>${label}</span>
            </div>
          `,
        )
        .join("")}
    </div>
    <div class="dialog-story">
      <p class="eyebrow eyebrow-light">The intervention</p>
      <p>${project.story}</p>
    </div>
  `;
  dialog.showModal();
}

menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.hidden = expanded;
  document.body.classList.toggle("menu-open", !expanded);
});

document.querySelectorAll("[data-mobile-link]").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  });
});

document.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

window.addEventListener("hashchange", transitionToRoute);
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
render();
