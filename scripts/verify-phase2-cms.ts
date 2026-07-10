/**
 * CMS ↔ app verification (audit script).
 * Run: npx tsx scripts/verify-phase2-cms.ts
 */
import {
  caseStudiesFallback,
  homePageFallback,
  productsFallback,
  serviceCategoriesFallback,
  servicesFallback,
} from "../lib/cms/fallbacks";
import { getPayloadClient, isPayloadConfigured } from "../lib/cms/client";
import {
  getAboutPage,
  getCaseStudies,
  getCommunityItems,
  getContactPage,
  getHomePage,
  getProducts,
  getServiceCategories,
  getServices,
  getTeamMembers,
} from "../lib/cms/queries";
import { groupServicesByCategory } from "../lib/services/group-by-category";
import type { HomeFeaturedWork } from "../lib/cms/types";

const BASE_URL = process.env.VERIFY_BASE_URL ?? "http://localhost:3000";

const ROUTES = [
  { path: "/", name: "Home", cmsCheck: "homePage" },
  { path: "/about", name: "About", cmsCheck: "aboutPage+teamMembers" },
  { path: "/services", name: "Services", cmsCheck: "serviceCategories+services" },
  { path: "/products", name: "Products", cmsCheck: "products" },
  { path: "/portfolio", name: "Portfolio", cmsCheck: "caseStudies" },
  { path: "/community", name: "Community", cmsCheck: "communityItems" },
  { path: "/contact", name: "Contact", cmsCheck: "contactPage" },
] as const;

type CmsSource = "cms" | "fallback";

function resolveSource<T>(cms: T | null | undefined): CmsSource {
  return cms != null ? "cms" : "fallback";
}

async function fetchPayloadDocCount(
  collection: string
): Promise<number | null> {
  const payload = await getPayloadClient();
  if (!payload) return null;

  const result = await payload.count({ collection });
  return result.totalDocs;
}

async function checkHttpRoute(path: string): Promise<{ status: number; ok: boolean }> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "text/html" },
    });
    return { status: response.status, ok: response.ok };
  } catch (error) {
    console.error(`HTTP fetch failed for ${path}:`, error);
    return { status: 0, ok: false };
  }
}

async function checkHtmlMarkers(
  path: string,
  markers: string[]
): Promise<{ found: string[]; missing: string[] }> {
  const response = await fetch(`${BASE_URL}${path}`);
  const html = await response.text();
  const found: string[] = [];
  const missing: string[] = [];

  for (const marker of markers) {
    if (html.includes(marker)) {
      found.push(marker);
    } else {
      missing.push(marker);
    }
  }

  return { found, missing };
}

async function main(): Promise<void> {
  console.log("=== CMS ↔ App Verification ===\n");
  console.log(`Payload configured: ${isPayloadConfigured}`);
  console.log(`Base URL: ${BASE_URL}\n`);

  const [
    homeCms,
    aboutCms,
    teamCms,
    categoriesCms,
    servicesCms,
    productsCms,
    caseStudiesCms,
    communityCms,
    contactCms,
  ] = await Promise.all([
    getHomePage(),
    getAboutPage(),
    getTeamMembers(),
    getServiceCategories(),
    getServices(),
    getProducts(),
    getCaseStudies(),
    getCommunityItems(),
    getContactPage(),
  ]);

  const routeResults = [
    {
      route: "/",
      name: "Home",
      fetches: [{ key: "getHomePage", source: resolveSource(homeCms), cmsId: homeCms ? "global:home-page" : null }],
    },
    {
      route: "/about",
      name: "About",
      fetches: [
        { key: "getAboutPage", source: resolveSource(aboutCms), cmsId: aboutCms ? "global:about-page" : null },
        {
          key: "getTeamMembers",
          source: resolveSource(teamCms),
          cmsId:
            teamCms != null
              ? `team-members:${await fetchPayloadDocCount("team-members")}`
              : null,
        },
      ],
    },
    {
      route: "/services",
      name: "Services",
      fetches: [
        {
          key: "getServiceCategories",
          source: resolveSource(categoriesCms),
          cmsId:
            categoriesCms != null
              ? `service-categories:${await fetchPayloadDocCount("service-categories")}`
              : null,
        },
        {
          key: "getServices",
          source: resolveSource(servicesCms),
          cmsId:
            servicesCms != null
              ? `services:${await fetchPayloadDocCount("services")}`
              : null,
        },
      ],
    },
    {
      route: "/products",
      name: "Products",
      fetches: [
        {
          key: "getProducts",
          source: resolveSource(productsCms),
          cmsId:
            productsCms != null
              ? `products:${await fetchPayloadDocCount("products")}`
              : null,
        },
      ],
    },
    {
      route: "/portfolio",
      name: "Portfolio",
      fetches: [
        {
          key: "getCaseStudies",
          source: resolveSource(caseStudiesCms),
          cmsId:
            caseStudiesCms != null
              ? `case-studies:${await fetchPayloadDocCount("case-studies")}`
              : null,
        },
      ],
    },
    {
      route: "/community",
      name: "Community",
      fetches: [
        {
          key: "getCommunityItems",
          source: resolveSource(communityCms),
          cmsId:
            communityCms != null
              ? `community-items:${await fetchPayloadDocCount("community-items")}`
              : null,
        },
      ],
    },
    {
      route: "/contact",
      name: "Contact",
      fetches: [
        {
          key: "getContactPage",
          source: resolveSource(contactCms),
          cmsId: contactCms ? "global:contact-page" : null,
        },
      ],
    },
  ];

  console.log("--- Per-route CMS vs fallback (fetch layer) ---");
  for (const row of routeResults) {
    const allCms = row.fetches.every((f) => f.source === "cms");
    const ids = row.fetches
      .map((f) => `${f.key}=${f.source}${f.cmsId ? ` (${f.cmsId})` : ""}`)
      .join("; ");
    console.log(`${row.route.padEnd(12)} ${allCms ? "CMS" : "FALLBACK"} | ${ids}`);
  }

  console.log("\n--- HTTP status ---");
  const httpResults = await Promise.all(
    ROUTES.map(async (r) => {
      const { status, ok } = await checkHttpRoute(r.path);
      console.log(`${r.path.padEnd(12)} ${status} ${ok ? "OK" : "FAIL"}`);
      return { path: r.path, status, ok };
    })
  );

  console.log("\n--- Featured work refs (home) ---");
  const home = homeCms ?? homePageFallback;
  const products = productsCms ?? productsFallback;
  const caseStudies = caseStudiesCms ?? caseStudiesFallback;
  const featuredBlock = home.blocks.find((b) => b._type === "featuredWork") as
    | HomeFeaturedWork
    | undefined;

  let featuredPass = false;
  const featuredDetails: string[] = [];

  if (!featuredBlock) {
    featuredDetails.push("FAIL: no featuredWork block on homePage");
  } else {
    const productSlugs = featuredBlock.featuredProductSlugs;
    const caseSlugs = featuredBlock.featuredCaseStudySlugs;
    featuredDetails.push(`Product slugs: [${productSlugs.join(", ")}]`);
    featuredDetails.push(`Case study slugs: [${caseSlugs.join(", ")}]`);

    const resolvedProducts = products.filter((p) => productSlugs.includes(p.slug.current));
    const resolvedCases = caseStudies.filter((c) => caseSlugs.includes(c.slug.current));

    featuredDetails.push(
      `Resolved products: ${resolvedProducts.length}/${productSlugs.length} — ${resolvedProducts.map((p) => p.slug.current).join(", ") || "none"}`
    );
    featuredDetails.push(
      `Resolved case studies: ${resolvedCases.length}/${caseSlugs.length} — ${resolvedCases.map((c) => c.slug.current).join(", ") || "none"}`
    );

    featuredPass =
      resolvedProducts.length === productSlugs.length &&
      resolvedCases.length === caseSlugs.length &&
      productSlugs.length > 0 &&
      caseSlugs.length > 0;
  }

  console.log(featuredPass ? "PASS" : "FAIL");
  featuredDetails.forEach((d) => console.log(`  ${d}`));

  console.log("\n--- Service category grouping (/services) ---");
  const categories = categoriesCms ?? serviceCategoriesFallback;
  const services = servicesCms ?? servicesFallback;
  const groups = groupServicesByCategory(categories, services);

  let groupingPass = true;
  const groupingDetails: string[] = [];

  for (const group of groups) {
    const slug = group.category.slug.current;
    const titles = group.services.map((s) => s.title).join(", ") || "(empty)";
    const wrongCategory = group.services.filter((s) => s.categorySlug !== slug);
    if (wrongCategory.length > 0) {
      groupingPass = false;
      groupingDetails.push(
        `FAIL: category "${group.category.title}" has mis-grouped services: ${wrongCategory.map((s) => s.slug.current).join(", ")}`
      );
    }
    groupingDetails.push(`${group.category.title} (${slug}): ${group.services.length} services — ${titles}`);
  }

  const orphanServices = services.filter(
    (s) => !categories.some((c) => c.slug.current === s.categorySlug)
  );
  if (orphanServices.length > 0) {
    groupingPass = false;
    groupingDetails.push(
      `FAIL: orphan services (no matching category): ${orphanServices.map((s) => s.slug.current).join(", ")}`
    );
  }

  console.log(groupingPass ? "PASS" : "FAIL");
  groupingDetails.forEach((d) => console.log(`  ${d}`));

  console.log("\n--- Placeholder badges (HTML markers) ---");
  const badgeChecks = [
    {
      route: "/",
      markers: ["Eclipse", "Coming soon"],
      label: "Featured work cards (product + badge)",
    },
    {
      route: "/about",
      markers: ["Sherwin Limosnero", "Placeholder"],
      label: "Team member cards",
    },
    {
      route: "/services",
      markers: ["Game Development", "Placeholder"],
      label: "Service cards",
    },
    {
      route: "/products",
      markers: ["Eclipse", "Coming soon"],
      label: "Product cards",
    },
    {
      route: "/portfolio",
      markers: ["Sample Client Project", "Placeholder"],
      label: "Portfolio cards",
    },
    {
      route: "/community",
      markers: ["Workshop — Details coming soon", "Coming soon"],
      label: "Community cards",
    },
    {
      route: "/contact",
      markers: ["Facebook", "kamiyonstudio@gmail.com"],
      label: "Contact channels",
    },
  ];

  let badgesPass = true;
  for (const check of badgeChecks) {
    const { found, missing } = await checkHtmlMarkers(check.route, check.markers);
    const pass = missing.length === 0;
    if (!pass) badgesPass = false;
    console.log(
      `${check.route.padEnd(12)} ${pass ? "PASS" : "FAIL"} | ${check.label}: found [${found.join(", ")}]${missing.length ? `; missing [${missing.join(", ")}]` : ""}`
    );
  }

  const allCmsRoutes = routeResults.every((r) => r.fetches.every((f) => f.source === "cms"));
  const allHttpOk = httpResults.every((r) => r.ok);

  console.log("\n=== SUMMARY ===");
  console.log(`CMS fetch layer (all routes): ${allCmsRoutes ? "PASS" : "FALLBACK (expected until Payload is seeded)"}`);
  console.log(`HTTP 200 (all routes): ${allHttpOk ? "PASS" : "FAIL"}`);
  console.log(`Featured work resolution: ${featuredPass ? "PASS" : "FAIL"}`);
  console.log(`Service grouping: ${groupingPass ? "PASS" : "FAIL"}`);
  console.log(`Placeholder badges: ${badgesPass ? "PASS" : "FAIL"}`);

  const allPass = allHttpOk && featuredPass && groupingPass && badgesPass;
  process.exit(allPass ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
