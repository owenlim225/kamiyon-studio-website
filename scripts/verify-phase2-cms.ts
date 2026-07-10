/**
 * Phase 2 — CMS ↔ app verification (one-off audit script).
 * Run: npx tsx scripts/verify-phase2-cms.ts
 */
import "../sanity/load-env";

import {
  aboutPageFallback,
  caseStudiesFallback,
  communityItemsFallback,
  contactPageFallback,
  homePageFallback,
  productsFallback,
  serviceCategoriesFallback,
  servicesFallback,
  teamMembersFallback,
} from "../lib/cms/fallbacks";
import { getSanityClient, isSanityConfigured } from "../lib/cms/client";
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

async function fetchCmsId(type: string, singleton = false): Promise<string | null> {
  const client = getSanityClient();
  if (!client) return null;

  const query = singleton
    ? `*[_type == $type][0]{ _id }`
    : `*[_type == $type]{ _id }`;

  const result = singleton
    ? await client.fetch<{ _id: string } | null>(query, { type })
    : await client.fetch<{ _id: string }[]>(query, { type });

  if (singleton) {
    return (result as { _id: string } | null)?._id ?? null;
  }

  const ids = result as { _id: string }[];
  return ids.length > 0 ? ids.map((d) => d._id).join(",") : null;
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
  console.log("=== Phase 2 CMS ↔ App Verification ===\n");
  console.log(`Sanity configured: ${isSanityConfigured}`);
  console.log(`Base URL: ${BASE_URL}\n`);

  // --- Per-route CMS fetch layer ---
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
      fetches: [{ key: "getHomePage", source: resolveSource(homeCms), cmsId: await fetchCmsId("homePage", true) }],
    },
    {
      route: "/about",
      name: "About",
      fetches: [
        { key: "getAboutPage", source: resolveSource(aboutCms), cmsId: await fetchCmsId("aboutPage", true) },
        { key: "getTeamMembers", source: resolveSource(teamCms), cmsId: await fetchCmsId("teamMember") },
      ],
    },
    {
      route: "/services",
      name: "Services",
      fetches: [
        {
          key: "getServiceCategories",
          source: resolveSource(categoriesCms),
          cmsId: await fetchCmsId("serviceCategory"),
        },
        { key: "getServices", source: resolveSource(servicesCms), cmsId: await fetchCmsId("service") },
      ],
    },
    {
      route: "/products",
      name: "Products",
      fetches: [
        { key: "getProducts", source: resolveSource(productsCms), cmsId: await fetchCmsId("product") },
      ],
    },
    {
      route: "/portfolio",
      name: "Portfolio",
      fetches: [
        { key: "getCaseStudies", source: resolveSource(caseStudiesCms), cmsId: await fetchCmsId("caseStudy") },
      ],
    },
    {
      route: "/community",
      name: "Community",
      fetches: [
        {
          key: "getCommunityItems",
          source: resolveSource(communityCms),
          cmsId: await fetchCmsId("communityItem"),
        },
      ],
    },
    {
      route: "/contact",
      name: "Contact",
      fetches: [
        { key: "getContactPage", source: resolveSource(contactCms), cmsId: await fetchCmsId("contactPage", true) },
      ],
    },
  ];

  console.log("--- Per-route CMS vs fallback (fetch layer) ---");
  for (const row of routeResults) {
    const allCms = row.fetches.every((f) => f.source === "cms");
    const ids = row.fetches.map((f) => `${f.key}=${f.source}${f.cmsId ? ` (_id: ${f.cmsId})` : ""}`).join("; ");
    console.log(`${row.route.padEnd(12)} ${allCms ? "CMS" : "FALLBACK"} | ${ids}`);
  }

  // --- HTTP status ---
  console.log("\n--- HTTP status ---");
  const httpResults = await Promise.all(
    ROUTES.map(async (r) => {
      const { status, ok } = await checkHttpRoute(r.path);
      console.log(`${r.path.padEnd(12)} ${status} ${ok ? "OK" : "FAIL"}`);
      return { path: r.path, status, ok };
    })
  );

  // --- Featured work resolution ---
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

  // --- Service grouping ---
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

  // --- Placeholder badges (HTML) ---
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

  // --- Summary ---
  const allCmsRoutes = routeResults.every((r) => r.fetches.every((f) => f.source === "cms"));
  const allHttpOk = httpResults.every((r) => r.ok);

  console.log("\n=== SUMMARY ===");
  console.log(`CMS fetch layer (all routes): ${allCmsRoutes ? "PASS" : "FAIL"}`);
  console.log(`HTTP 200 (all routes): ${allHttpOk ? "PASS" : "FAIL"}`);
  console.log(`Featured work resolution: ${featuredPass ? "PASS" : "FAIL"}`);
  console.log(`Service grouping: ${groupingPass ? "PASS" : "FAIL"}`);
  console.log(`Placeholder badges: ${badgesPass ? "PASS" : "FAIL"}`);

  const allPass = allCmsRoutes && allHttpOk && featuredPass && groupingPass && badgesPass;
  process.exit(allPass ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
