/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import {
  handleLeadRequest,
  handleWhatsAppRedirect,
  type LeadRoutingEnv,
} from "./lead-routing";

interface Env extends LeadRoutingEnv {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

// Legacy production URL preservation — mirrors public/_redirects, but done
// in-worker because Cloudflare Pages Advanced Mode ignores _redirects once a
// _worker.js is present (the worker handles every request itself).
const LEGACY_REDIRECTS: Record<string, string> = {
  "/about-us": "/#approach",
  "/contact-us": "/#contact",
  "/clientele": "/#credentials",
  "/case-studies": "/work",
  "/case-studies/d2c-skincare-performance-turnaround": "/work/d2c-skincare-performance-turnaround",
  "/case-studies/consumer-retail-brand-retention": "/work/consumer-retail-brand-retention",
  "/case-studies/boutique-hospitality-social-pr-launch": "/work/boutique-hospitality-social-pr-launch",
  "/case-studies/distribution-workflow-automation-reset": "/work/distribution-workflow-automation-reset",
  "/case-studies/education-seo-lead-engine": "/work",
  "/case-studies/b2b-services-cpl-optimization": "/work",
};

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    const legacyTarget = LEGACY_REDIRECTS[url.pathname];
    if (legacyTarget) {
      return Response.redirect(new URL(legacyTarget, url).toString(), 301);
    }

    // Static build output (hashed JS/CSS from Vite) always lives under
    // /assets/ and is never an app route, so serve it directly. On native
    // Cloudflare Workers this happens automatically before the worker runs;
    // Cloudflare Pages Advanced Mode (_worker.js) has no such platform
    // fallback, so without this the app router 404s these paths itself.
    if (url.pathname.startsWith("/assets/")) {
      return env.ASSETS.fetch(request);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/lead") {
      return handleLeadRequest(request, env);
    }

    if (url.pathname === "/go/whatsapp") {
      return handleWhatsAppRedirect(request, env, ctx);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
