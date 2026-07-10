import { groq } from "next-sanity";

import { getSanityClient } from "./client";
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

export const imageProjection = groq`{
  _key,
  asset,
  alt,
  caption
}`;

/** Reusable GROQ fragment for seoMetadata fields (embedded in singletons and collections). */
export const seoProjection = groq`{
  title,
  description,
  ogImage${imageProjection},
  noIndex
}`;

const productMediaProjection = groq`{
  _key,
  type,
  alt,
  caption,
  asset${imageProjection}
}`;

const cmsFetchOptions = {
  next: {
    revalidate: 3600,
  },
};

async function fetchCms<T>(
  query: string,
  params: Record<string, string> = {}
): Promise<T | null> {
  const client = getSanityClient();

  if (!client) {
    return null;
  }

  try {
    return await client.fetch<T | null>(query, params, cmsFetchOptions);
  } catch (error) {
    console.error("Sanity CMS fetch failed; using typed fallback content.", error);
    return null;
  }
}

export function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchCms<SiteSettings>(groq`*[_type == "siteSettings"][0]{
    _type,
    siteName,
    tagline,
    publicEmail,
    socialLinks,
    defaultSeo${seoProjection},
    globalCtas,
    footerText
  }`);
}

export function getHomePage(): Promise<HomePage | null> {
  return fetchCms<HomePage>(groq`*[_type == "homePage"][0]{
    _type,
    title,
    blocks[]{
      _type == "hero" => {
        _type,
        headline,
        subheadline,
        ctaLabel,
        ctaHref,
        image${imageProjection}
      },
      _type == "mission" => {
        _type,
        title,
        body
      },
      _type == "featuredWork" => {
        _type,
        title,
        body,
        "featuredProductSlugs": featuredProducts[]->slug.current,
        "featuredCaseStudySlugs": featuredCaseStudies[]->slug.current
      },
      _type == "highlights" => {
        _type,
        title,
        items[]{
          _key,
          title,
          description,
          icon
        }
      },
      _type == "ctaBanner" => {
        _type,
        title,
        body,
        ctaLabel,
        ctaHref
      }
    },
    seo${seoProjection}
  }`);
}

export function getAboutPage(): Promise<AboutPage | null> {
  return fetchCms<AboutPage>(groq`*[_type == "aboutPage"][0]{
    _type,
    title,
    storySections,
    mission,
    vision,
    motto,
    values,
    cultureSummary,
    teamIntro,
    seo${seoProjection}
  }`);
}

export function getContactPage(): Promise<ContactPage | null> {
  return fetchCms<ContactPage>(groq`*[_type == "contactPage"][0]{
    _type,
    headline,
    intro,
    channels,
    ctaNote,
    faq,
    seo${seoProjection}
  }`);
}

export function getTeamMembers(): Promise<TeamMember[] | null> {
  return fetchCms<TeamMember[]>(groq`*[_type == "teamMember"] | order(order asc) {
    _type,
    name,
    role,
    bio,
    photo${imageProjection},
    order,
    isPlaceholder
  }`);
}

export function getServiceCategories(): Promise<ServiceCategory[] | null> {
  return fetchCms<ServiceCategory[]>(
    groq`*[_type == "serviceCategory"] | order(order asc) {
      _type,
      title,
      slug,
      description,
      order
    }`
  );
}

export function getServices(): Promise<Service[] | null> {
  return fetchCms<Service[]>(groq`*[_type == "service"] | order(order asc) {
    _type,
    title,
    slug,
    "categorySlug": category->slug.current,
    summary,
    body,
    outcomes,
    "relatedIndustries": coalesce(relatedIndustries, []),
    icon,
    order,
    isPlaceholder,
    seo${seoProjection}
  }`);
}

export function getServiceBySlug(slug: string): Promise<Service | null> {
  return fetchCms<Service>(
    groq`*[_type == "service" && slug.current == $slug][0] {
      _type,
      title,
      slug,
      "categorySlug": category->slug.current,
      summary,
      body,
      outcomes,
      "relatedIndustries": coalesce(relatedIndustries, []),
      icon,
      order,
      isPlaceholder,
      seo${seoProjection}
    }`,
    { slug }
  );
}

export function getProducts(): Promise<Product[] | null> {
  return fetchCms<Product[]>(groq`*[_type == "product"] | order(order asc) {
    _type,
    title,
    slug,
    tagline,
    genre,
    status,
    developmentStatus,
    overview,
    goals,
    features,
    platforms,
    media[]${productMediaProjection},
    trailerUrl,
    isPlaceholder,
    order,
    seo${seoProjection}
  }`);
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return fetchCms<Product>(
    groq`*[_type == "product" && slug.current == $slug][0] {
      _type,
      title,
      slug,
      tagline,
      genre,
      status,
      developmentStatus,
      overview,
      goals,
      features,
      platforms,
      media[]${productMediaProjection},
      trailerUrl,
      isPlaceholder,
      order,
      seo${seoProjection}
    }`,
    { slug }
  );
}

export function getCaseStudies(): Promise<CaseStudy[] | null> {
  return fetchCms<CaseStudy[]>(groq`*[_type == "caseStudy"] | order(featured desc, publishedAt desc) {
    _type,
    title,
    slug,
    clientName,
    industry,
    challenge,
    solution,
    impact,
    lessonsLearned,
    coverImage${imageProjection},
    gallery[]${imageProjection},
    featured,
    isPlaceholder,
    publishedAt,
    seo${seoProjection}
  }`);
}

export function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return fetchCms<CaseStudy>(
    groq`*[_type == "caseStudy" && slug.current == $slug][0] {
      _type,
      title,
      slug,
      clientName,
      industry,
      challenge,
      solution,
      impact,
      lessonsLearned,
      coverImage${imageProjection},
      gallery[]${imageProjection},
      featured,
      isPlaceholder,
      publishedAt,
      seo${seoProjection}
    }`,
    { slug }
  );
}

export function getCommunityItems(): Promise<CommunityItem[] | null> {
  return fetchCms<CommunityItem[]>(groq`*[_type == "communityItem"] | order(date desc, title asc) {
    _type,
    title,
    slug,
    type,
    summary,
    body,
    date,
    location,
    coverImage${imageProjection},
    externalUrl,
    isPlaceholder,
    seo${seoProjection}
  }`);
}
