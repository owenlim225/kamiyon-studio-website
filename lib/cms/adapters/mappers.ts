import type {
  AboutPage,
  CaseStudy,
  CommunityItem,
  ContactPage,
  Cta,
  HomeBlock,
  HomePage,
  Product,
  ProductMedia,
  SeoMetadata,
  Service,
  ServiceCategory,
  SiteSettings,
  Slug,
  SocialLink,
  TeamMember,
} from "../types";

import { lexicalToPortableText } from "./lexical";
import { mapMediaToCmsImage } from "./media";

type ValueRow = { value?: string | null; id?: string };
type PayloadCategory = { slug?: string | null };
type PayloadSlugDoc = { slug?: string | null };

function mapSlug(slug: string | null | undefined): Slug {
  return { current: slug ?? "" };
}

function mapStringArray(rows: ValueRow[] | null | undefined): string[] {
  return (rows ?? []).map((row) => row.value).filter((value): value is string => Boolean(value));
}

function mapSeo(seo: Record<string, unknown> | null | undefined): SeoMetadata {
  const source = seo ?? {};

  return {
    title: typeof source.title === "string" ? source.title : "",
    description: typeof source.description === "string" ? source.description : "",
    ogImage: mapMediaToCmsImage(source.ogImage),
    noIndex: Boolean(source.noIndex),
  };
}

function mapSocialLinks(links: Array<Record<string, unknown>> | null | undefined): SocialLink[] {
  return (links ?? []).map((link) => ({
    platform: link.platform as SocialLink["platform"],
    url: typeof link.url === "string" ? link.url : "",
    label: typeof link.label === "string" ? link.label : "",
    isPlaceholder: Boolean(link.isPlaceholder),
  }));
}

function mapCtas(ctas: Array<Record<string, unknown>> | null | undefined): Cta[] {
  return (ctas ?? []).map((cta) => ({
    label: typeof cta.label === "string" ? cta.label : "",
    href: typeof cta.href === "string" ? cta.href : "",
    variant: (cta.variant as Cta["variant"]) ?? undefined,
  }));
}

function getRelationshipSlug(doc: unknown): string | null {
  if (!doc || typeof doc !== "object") {
    return null;
  }

  const slug = (doc as PayloadSlugDoc).slug;
  return typeof slug === "string" && slug.length > 0 ? slug : null;
}

function mapHomeBlocks(blocks: Array<Record<string, unknown>> | null | undefined): HomeBlock[] {
  return (blocks ?? [])
    .map((block): HomeBlock | null => {
      const blockType = typeof block.blockType === "string" ? block.blockType : null;

      switch (blockType) {
        case "mission":
          return {
            _type: "mission",
            title: typeof block.title === "string" ? block.title : "",
            body: typeof block.body === "string" ? block.body : "",
          };
        case "featuredWork":
          return {
            _type: "featuredWork",
            title: typeof block.title === "string" ? block.title : "",
            body: typeof block.body === "string" ? block.body : "",
            featuredProductSlugs: (Array.isArray(block.featuredProducts) ? block.featuredProducts : [])
              .map(getRelationshipSlug)
              .filter((slug): slug is string => Boolean(slug)),
            featuredCaseStudySlugs: (Array.isArray(block.featuredCaseStudies)
              ? block.featuredCaseStudies
              : []
            )
              .map(getRelationshipSlug)
              .filter((slug): slug is string => Boolean(slug)),
          };
        case "highlights":
          return {
            _type: "highlights",
            title: typeof block.title === "string" ? block.title : "",
            items: (Array.isArray(block.items) ? block.items : []).map((item, index) => {
              const row = item as Record<string, unknown>;
              return {
                _key: typeof row.id === "string" ? row.id : `highlight-${index}`,
                title: typeof row.title === "string" ? row.title : "",
                description: typeof row.description === "string" ? row.description : "",
                icon: typeof row.icon === "string" ? row.icon : undefined,
              };
            }),
          };
        case "ctaBanner":
          return {
            _type: "ctaBanner",
            title: typeof block.title === "string" ? block.title : "",
            body: typeof block.body === "string" ? block.body : "",
            ctaLabel: typeof block.ctaLabel === "string" ? block.ctaLabel : "",
            ctaHref: typeof block.ctaHref === "string" ? block.ctaHref : "",
          };
        default:
          return null;
      }
    })
    .filter((block): block is HomeBlock => block !== null);
}

export function mapSiteSettings(doc: Record<string, unknown> | null | undefined): SiteSettings | null {
  if (!doc || typeof doc.siteName !== "string" || !doc.siteName.trim()) {
    return null;
  }

  return {
    _type: "siteSettings",
    siteName: doc.siteName,
    tagline: typeof doc.tagline === "string" ? doc.tagline : "",
    publicEmail: typeof doc.publicEmail === "string" ? doc.publicEmail : undefined,
    socialLinks: mapSocialLinks(doc.socialLinks as Array<Record<string, unknown>>),
    defaultSeo: mapSeo(doc.defaultSeo as Record<string, unknown>),
    globalCtas: mapCtas(doc.globalCtas as Array<Record<string, unknown>>),
    footerText: typeof doc.footerText === "string" ? doc.footerText : undefined,
  };
}

export function mapHomePage(doc: Record<string, unknown> | null | undefined): HomePage | null {
  if (!doc || typeof doc.title !== "string" || !Array.isArray(doc.blocks) || doc.blocks.length === 0) {
    return null;
  }

  return {
    _type: "homePage",
    title: doc.title,
    blocks: mapHomeBlocks(doc.blocks as Array<Record<string, unknown>>),
    seo: mapSeo(doc.seo as Record<string, unknown>),
  };
}

export function mapAboutPage(doc: Record<string, unknown> | null | undefined): AboutPage | null {
  if (!doc || typeof doc.title !== "string" || typeof doc.mission !== "string") {
    return null;
  }

  return {
    _type: "aboutPage",
    title: doc.title,
    storySections: (Array.isArray(doc.storySections) ? doc.storySections : []).map((section) => {
      const row = section as Record<string, unknown>;
      return {
        title: typeof row.title === "string" ? row.title : "",
        body: typeof row.body === "string" ? row.body : "",
      };
    }),
    mission: doc.mission,
    vision: typeof doc.vision === "string" ? doc.vision : "",
    motto: typeof doc.motto === "string" ? doc.motto : "",
    values: (Array.isArray(doc.values) ? doc.values : []).map((value) => {
      const row = value as Record<string, unknown>;
      return {
        name: typeof row.name === "string" ? row.name : "",
        description: typeof row.description === "string" ? row.description : "",
      };
    }),
    cultureSummary: typeof doc.cultureSummary === "string" ? doc.cultureSummary : "",
    teamIntro: typeof doc.teamIntro === "string" ? doc.teamIntro : undefined,
    seo: mapSeo(doc.seo as Record<string, unknown>),
  };
}

export function mapContactPage(doc: Record<string, unknown> | null | undefined): ContactPage | null {
  if (!doc || typeof doc.headline !== "string") {
    return null;
  }

  return {
    _type: "contactPage",
    headline: doc.headline,
    intro: typeof doc.intro === "string" ? doc.intro : "",
    channels: (Array.isArray(doc.channels) ? doc.channels : []).map((channel) => {
      const row = channel as Record<string, unknown>;
      return {
        type: row.type as ContactPage["channels"][number]["type"],
        label: typeof row.label === "string" ? row.label : "",
        value: typeof row.value === "string" ? row.value : "",
        isPlaceholder: Boolean(row.isPlaceholder),
      };
    }),
    ctaNote: typeof doc.ctaNote === "string" ? doc.ctaNote : undefined,
    faq: (Array.isArray(doc.faq) ? doc.faq : []).map((item) => {
      const row = item as Record<string, unknown>;
      return {
        question: typeof row.question === "string" ? row.question : "",
        answer: typeof row.answer === "string" ? row.answer : "",
      };
    }),
    seo: mapSeo(doc.seo as Record<string, unknown>),
  };
}

export function mapTeamMember(doc: Record<string, unknown>): TeamMember {
  return {
    _type: "teamMember",
    name: typeof doc.name === "string" ? doc.name : "",
    role: typeof doc.role === "string" ? doc.role : "",
    bio: typeof doc.bio === "string" ? doc.bio : "",
    photo: mapMediaToCmsImage(doc.photo),
    order: typeof doc.order === "number" ? doc.order : 0,
    isPlaceholder: Boolean(doc.isPlaceholder),
  };
}

export function mapServiceCategory(doc: Record<string, unknown>): ServiceCategory {
  return {
    _type: "serviceCategory",
    title: typeof doc.title === "string" ? doc.title : "",
    slug: mapSlug(typeof doc.slug === "string" ? doc.slug : null),
    description: typeof doc.description === "string" ? doc.description : "",
    order: typeof doc.order === "number" ? doc.order : 0,
  };
}

export function mapService(doc: Record<string, unknown>): Service {
  const category = doc.category as PayloadCategory | null | undefined;

  return {
    _type: "service",
    title: typeof doc.title === "string" ? doc.title : "",
    slug: mapSlug(typeof doc.slug === "string" ? doc.slug : null),
    categorySlug: typeof category?.slug === "string" ? category.slug : "",
    summary: typeof doc.summary === "string" ? doc.summary : "",
    body: lexicalToPortableText(doc.body),
    outcomes: mapStringArray(doc.outcomes as ValueRow[]),
    relatedIndustries: mapStringArray(doc.relatedIndustries as ValueRow[]),
    icon: typeof doc.icon === "string" ? doc.icon : undefined,
    order: typeof doc.order === "number" ? doc.order : 0,
    isPlaceholder: Boolean(doc.isPlaceholder),
    seo: mapSeo(doc.seo as Record<string, unknown>),
  };
}

function mapProductMedia(rows: Array<Record<string, unknown>> | null | undefined): ProductMedia[] {
  return (rows ?? []).map((row, index) => ({
    _key: typeof row.id === "string" ? row.id : `media-${index}`,
    type: row.type === "video" ? "video" : "image",
    asset: mapMediaToCmsImage(row.asset, {
      alt: typeof row.alt === "string" ? row.alt : null,
      caption: typeof row.caption === "string" ? row.caption : null,
    }),
    alt: typeof row.alt === "string" ? row.alt : null,
    caption: typeof row.caption === "string" ? row.caption : null,
  }));
}

export function mapProduct(doc: Record<string, unknown>): Product {
  return {
    _type: "product",
    title: typeof doc.title === "string" ? doc.title : "",
    slug: mapSlug(typeof doc.slug === "string" ? doc.slug : null),
    tagline: typeof doc.tagline === "string" ? doc.tagline : "",
    genre: typeof doc.genre === "string" ? doc.genre : "",
    status: "original-ip",
    developmentStatus:
      (doc.developmentStatus as Product["developmentStatus"] | undefined) ?? "tbd",
    overview: typeof doc.overview === "string" ? doc.overview : "",
    goals: mapStringArray(doc.goals as ValueRow[]),
    features: mapStringArray(doc.features as ValueRow[]),
    platforms: mapStringArray(doc.platforms as ValueRow[]),
    media: mapProductMedia(doc.media as Array<Record<string, unknown>>),
    trailerUrl: typeof doc.trailerUrl === "string" ? doc.trailerUrl : undefined,
    isPlaceholder: Boolean(doc.isPlaceholder),
    order: typeof doc.order === "number" ? doc.order : 0,
    seo: mapSeo(doc.seo as Record<string, unknown>),
  };
}

export function mapCaseStudy(doc: Record<string, unknown>): CaseStudy {
  return {
    _type: "caseStudy",
    title: typeof doc.title === "string" ? doc.title : "",
    slug: mapSlug(typeof doc.slug === "string" ? doc.slug : null),
    clientName: typeof doc.clientName === "string" ? doc.clientName : "",
    industry: typeof doc.industry === "string" ? doc.industry : "",
    challenge: typeof doc.challenge === "string" ? doc.challenge : "",
    solution: typeof doc.solution === "string" ? doc.solution : "",
    impact: typeof doc.impact === "string" ? doc.impact : "",
    lessonsLearned:
      typeof doc.lessonsLearned === "string" ? doc.lessonsLearned : undefined,
    coverImage: mapMediaToCmsImage(doc.coverImage),
    gallery: (Array.isArray(doc.gallery) ? doc.gallery : [])
      .map((item, index) => {
        const row = item as Record<string, unknown>;
        return mapMediaToCmsImage(row.image, {
          alt: typeof row.alt === "string" ? row.alt : null,
          caption: typeof row.caption === "string" ? row.caption : null,
          key: typeof row.id === "string" ? row.id : `gallery-${index}`,
        });
      })
      .filter((image): image is NonNullable<typeof image> => Boolean(image)),
    featured: Boolean(doc.featured),
    isPlaceholder: Boolean(doc.isPlaceholder),
    publishedAt: typeof doc.publishedAt === "string" ? doc.publishedAt : undefined,
    seo: mapSeo(doc.seo as Record<string, unknown>),
  };
}

export function mapCommunityItem(doc: Record<string, unknown>): CommunityItem {
  return {
    _type: "communityItem",
    title: typeof doc.title === "string" ? doc.title : "",
    slug: mapSlug(typeof doc.slug === "string" ? doc.slug : null),
    type: (doc.type as CommunityItem["type"] | undefined) ?? "other",
    summary: typeof doc.summary === "string" ? doc.summary : "",
    body: lexicalToPortableText(doc.body),
    date: typeof doc.date === "string" ? doc.date : undefined,
    location: typeof doc.location === "string" ? doc.location : undefined,
    coverImage: mapMediaToCmsImage(doc.coverImage),
    externalUrl: typeof doc.externalUrl === "string" ? doc.externalUrl : undefined,
    isPlaceholder: Boolean(doc.isPlaceholder),
    seo: mapSeo(doc.seo as Record<string, unknown>),
  };
}
