import { unstable_cache } from "next/cache";

import {
  mapAboutPage,
  mapCaseStudy,
  mapCommunityItem,
  mapContactPage,
  mapHomePage,
  mapProduct,
  mapService,
  mapServiceCategory,
  mapSiteSettings,
  mapTeamMember,
} from "./adapters/mappers";
import { getPayloadClient } from "./client";
import type {
  AboutPage,
  CaseStudy,
  CommunityItem,
  ContactPage,
  HomePage,
  Product,
  Service,
  ServiceCategory,
  SiteSettings,
  TeamMember,
} from "./types";

/** Legacy projection identifiers kept for API stability after the Sanity → Payload swap. */
export const imageProjection = "{ alt, caption, url, asset }" as const;
export const seoProjection = "{ title, description, ogImage, noIndex }" as const;

const CMS_REVALIDATE_SECONDS = 3600;

async function fetchPayload<T>(
  cacheKey: string,
  loader: () => Promise<T | null>
): Promise<T | null> {
  const payload = await getPayloadClient();

  if (!payload) {
    return null;
  }

  try {
    return await unstable_cache(loader, [cacheKey], {
      revalidate: CMS_REVALIDATE_SECONDS,
    })();
  } catch (error) {
    console.error("Payload CMS fetch failed; using typed fallback content.", error);
    return null;
  }
}

function nullIfEmpty<T>(items: T[]): T[] | null {
  return items.length > 0 ? items : null;
}

export function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchPayload("payload:site-settings", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const doc = await payload.findGlobal({
      slug: "site-settings",
      depth: 2,
    });

    return mapSiteSettings(doc as Record<string, unknown>);
  });
}

export function getHomePage(): Promise<HomePage | null> {
  return fetchPayload("payload:home-page", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const doc = await payload.findGlobal({
      slug: "home-page",
      depth: 2,
    });

    return mapHomePage(doc as Record<string, unknown>);
  });
}

export function getAboutPage(): Promise<AboutPage | null> {
  return fetchPayload("payload:about-page", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const doc = await payload.findGlobal({
      slug: "about-page",
      depth: 1,
    });

    return mapAboutPage(doc as Record<string, unknown>);
  });
}

export function getContactPage(): Promise<ContactPage | null> {
  return fetchPayload("payload:contact-page", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const doc = await payload.findGlobal({
      slug: "contact-page",
      depth: 1,
    });

    return mapContactPage(doc as Record<string, unknown>);
  });
}

export function getTeamMembers(): Promise<TeamMember[] | null> {
  return fetchPayload("payload:team-members", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "team-members",
      depth: 2,
      limit: 100,
      sort: "order",
    });

    return nullIfEmpty(
      result.docs.map((doc) => mapTeamMember(doc as Record<string, unknown>))
    );
  });
}

export function getServiceCategories(): Promise<ServiceCategory[] | null> {
  return fetchPayload("payload:service-categories", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "service-categories",
      depth: 0,
      limit: 100,
      sort: "order",
    });

    return nullIfEmpty(
      result.docs.map((doc) => mapServiceCategory(doc as Record<string, unknown>))
    );
  });
}

export function getServices(): Promise<Service[] | null> {
  return fetchPayload("payload:services", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "services",
      depth: 2,
      limit: 100,
      sort: "order",
    });

    return nullIfEmpty(
      result.docs.map((doc) => mapService(doc as Record<string, unknown>))
    );
  });
}

export function getServiceBySlug(slug: string): Promise<Service | null> {
  return fetchPayload(`payload:service:${slug}`, async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "services",
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const doc = result.docs[0];
    return doc ? mapService(doc as Record<string, unknown>) : null;
  });
}

export function getProducts(): Promise<Product[] | null> {
  return fetchPayload("payload:products", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "products",
      depth: 2,
      limit: 100,
      sort: "order",
    });

    return nullIfEmpty(
      result.docs.map((doc) => mapProduct(doc as Record<string, unknown>))
    );
  });
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return fetchPayload(`payload:product:${slug}`, async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "products",
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const doc = result.docs[0];
    return doc ? mapProduct(doc as Record<string, unknown>) : null;
  });
}

export function getCaseStudies(): Promise<CaseStudy[] | null> {
  return fetchPayload("payload:case-studies", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "case-studies",
      depth: 2,
      limit: 100,
      sort: ["-featured", "-publishedAt"],
    });

    return nullIfEmpty(
      result.docs.map((doc) => mapCaseStudy(doc as Record<string, unknown>))
    );
  });
}

export function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return fetchPayload(`payload:case-study:${slug}`, async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "case-studies",
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const doc = result.docs[0];
    return doc ? mapCaseStudy(doc as Record<string, unknown>) : null;
  });
}

export function getCommunityItems(): Promise<CommunityItem[] | null> {
  return fetchPayload("payload:community-items", async () => {
    const payload = await getPayloadClient();
    if (!payload) return null;

    const result = await payload.find({
      collection: "community-items",
      depth: 2,
      limit: 100,
      sort: ["-date", "title"],
    });

    return nullIfEmpty(
      result.docs.map((doc) => mapCommunityItem(doc as Record<string, unknown>))
    );
  });
}
