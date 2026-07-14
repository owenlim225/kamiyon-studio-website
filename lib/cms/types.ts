/** Shared primitives */

export type CtaVariant = "primary" | "secondary" | "ghost";

export type Slug = {
  current: string;
};

export type CmsImage = {
  _key?: string;
  /** Payload media URL when populated by the CMS adapter. */
  url?: string;
  alt?: string | null;
  caption?: string | null;
};

export type PortableTextBlock = {
  _key?: string;
  _type: "block";
  style?: string;
  children: Array<{
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<Record<string, unknown>>;
};

/** Spec 02 — seoMetadata, cta, socialLink */

export type SeoMetadata = {
  title: string;
  description: string;
  ogImage?: CmsImage;
  noIndex?: boolean;
};

export type Cta = {
  label: string;
  href: string;
  variant?: CtaVariant;
};

export type SocialLink = {
  platform: "facebook" | "linkedin" | "email";
  url: string;
  label: string;
  isPlaceholder?: boolean;
};

/** Spec 02 — siteSettings (singleton) */

export type SiteSettings = {
  _type: "siteSettings";
  siteName: string;
  tagline: string;
  publicEmail?: string;
  socialLinks: SocialLink[];
  defaultSeo: SeoMetadata;
  globalCtas: Cta[];
  footerText?: string;
};

/** Spec 03 — homePage blocks */

export type HomeMission = {
  _type: "mission";
  title: string;
  body: string;
};

/** GROQ projects featuredProducts/featuredCaseStudies refs → slug arrays */
export type HomeFeaturedWork = {
  _type: "featuredWork";
  title: string;
  body: string;
  featuredProductSlugs: string[];
  featuredCaseStudySlugs: string[];
};

export type HomeHighlight = {
  _key?: string;
  title: string;
  description: string;
  icon?: string;
};

export type HomeHighlights = {
  _type: "highlights";
  title: string;
  items: HomeHighlight[];
};

export type HomeCtaBanner = {
  _type: "ctaBanner";
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HomeBlock =
  | HomeMission
  | HomeFeaturedWork
  | HomeHighlights
  | HomeCtaBanner;

export type HomePage = {
  _type: "homePage";
  title: string;
  blocks: HomeBlock[];
  seo: SeoMetadata;
};

/** Spec 03 — aboutPage embedded objects */

export type StorySection = {
  title: string;
  body: string;
};

export type CoreValue = {
  name: string;
  description: string;
};

export type AboutPage = {
  _type: "aboutPage";
  title: string;
  storySections: StorySection[];
  mission: string;
  vision: string;
  motto: string;
  values: CoreValue[];
  cultureSummary: string;
  teamIntro?: string;
  seo: SeoMetadata;
};

/** Spec 03 — contactPage embedded objects */

export type ContactChannel = {
  type: "facebook" | "linkedin" | "email";
  label: string;
  value: string;
  isPlaceholder?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactPage = {
  _type: "contactPage";
  headline: string;
  intro: string;
  channels: ContactChannel[];
  ctaNote?: string;
  faq: FaqItem[];
  seo: SeoMetadata;
};

/** Spec 04 — teamMember */

export type TeamMember = {
  _type: "teamMember";
  name: string;
  role: string;
  bio: string;
  photo?: CmsImage;
  order: number;
  isPlaceholder: boolean;
};

/** Spec 04 — serviceCategory, service */

export type ServiceCategory = {
  _type: "serviceCategory";
  title: string;
  slug: Slug;
  description: string;
  order: number;
};

/** GROQ projects category ref → categorySlug */
export type Service = {
  _type: "service";
  title: string;
  slug: Slug;
  categorySlug: string;
  summary: string;
  body: PortableTextBlock[];
  outcomes: string[];
  relatedIndustries: string[];
  icon?: string;
  order: number;
  isPlaceholder: boolean;
  seo: SeoMetadata;
};

/** Spec 05 — productMedia, product */

export type ProductStatus = "original-ip";

export type ProductDevelopmentStatus =
  | "in-development"
  | "prototype"
  | "released"
  | "tbd";

export type ProductMedia = {
  _key?: string;
  type: "image" | "video";
  asset?: CmsImage;
  alt?: string | null;
  caption?: string | null;
};

export type Product = {
  _type: "product";
  title: string;
  slug: Slug;
  tagline: string;
  genre: string;
  status: ProductStatus;
  developmentStatus: ProductDevelopmentStatus;
  overview: string;
  goals: string[];
  features: string[];
  platforms: string[];
  media: ProductMedia[];
  trailerUrl?: string;
  isPlaceholder: boolean;
  order: number;
  seo: SeoMetadata;
};

/** Spec 05 — caseStudy */

export type CaseStudy = {
  _type: "caseStudy";
  title: string;
  slug: Slug;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  lessonsLearned?: string;
  coverImage?: CmsImage;
  gallery: CmsImage[];
  featured: boolean;
  isPlaceholder: boolean;
  publishedAt?: string;
  seo: SeoMetadata;
};

/** Spec 05 — communityItem */

export type CommunityItemType =
  | "workshop"
  | "hackathon"
  | "game-jam"
  | "speaking"
  | "education"
  | "partnership"
  | "other";

export type CommunityItem = {
  _type: "communityItem";
  title: string;
  slug: Slug;
  type: CommunityItemType;
  summary: string;
  body: PortableTextBlock[];
  date?: string;
  location?: string;
  coverImage?: CmsImage;
  externalUrl?: string;
  isPlaceholder: boolean;
  seo: SeoMetadata;
};
