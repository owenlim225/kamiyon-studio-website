import {
  aboutPageFallback,
  caseStudiesFallback,
  communityItemsFallback,
  contactPageFallback,
  homePageFallback,
  productsFallback,
  serviceCategoriesFallback,
  servicesFallback,
  siteSettingsFallback,
  teamMembersFallback,
} from "../../lib/cms/fallbacks";

type SeedDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

type SeedRecord = Record<string, unknown>;

const ref = (_ref: string) => ({
  _type: "reference",
  _ref,
});

const documentId = (type: string, slug: string) => `${type}.${slug}`;

function isSeedRecord(value: unknown): value is SeedRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stableKey(input: string): string {
  let hash = 0;

  for (const character of input) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return `key_${hash.toString(36)}`;
}

function isString(value: string | null): value is string {
  return typeof value === "string";
}

function withArrayKeys<T>(value: T, path = "seed"): T {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      const itemPath = `${path}.${index}`;

      if (!isSeedRecord(item)) {
        return withArrayKeys(item, itemPath);
      }

      return {
        _key: typeof item._key === "string" ? item._key : stableKey(itemPath),
        ...withArrayKeys(item, itemPath),
      };
    }) as T;
  }

  if (!isSeedRecord(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      withArrayKeys(item, `${path}.${key}`),
    ])
  ) as T;
}

const serviceCategoryDocuments: SeedDocument[] = serviceCategoriesFallback.map(
  (category) => ({
    _id: documentId("serviceCategory", category.slug.current),
    ...category,
  })
);

const serviceDocuments: SeedDocument[] = servicesFallback.map(
  ({ categorySlug, ...service }) => ({
    _id: documentId("service", service.slug.current),
    ...service,
    category: ref(documentId("serviceCategory", categorySlug)),
  })
);

const productDocuments: SeedDocument[] = productsFallback.map((product) => ({
  _id: documentId("product", product.slug.current),
  ...product,
}));

const caseStudyDocuments: SeedDocument[] = caseStudiesFallback.map((caseStudy) => ({
  _id: documentId("caseStudy", caseStudy.slug.current),
  ...caseStudy,
}));

const communityDocuments: SeedDocument[] = communityItemsFallback.map((item) => ({
  _id: documentId("communityItem", item.slug.current),
  ...item,
}));

const teamDocuments: SeedDocument[] = teamMembersFallback.map((member) => ({
  _id: documentId(
    "teamMember",
    member.name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")
  ),
  ...member,
}));

const homeDocument: SeedDocument = {
  _id: "homePage",
  ...homePageFallback,
  blocks: homePageFallback.blocks.map((block) => {
    if (block._type !== "featuredWork") {
      return block;
    }

    return {
      _type: block._type,
      title: block.title,
      body: block.body,
      featuredProducts: block.featuredProductSlugs
        .filter(isString)
        .map((slug) => ref(documentId("product", slug))),
      featuredCaseStudies: block.featuredCaseStudySlugs
        .filter(isString)
        .map((slug) => ref(documentId("caseStudy", slug))),
    };
  }),
};

const seedDocumentsWithoutKeys: SeedDocument[] = [
  {
    _id: "siteSettings",
    ...siteSettingsFallback,
  },
  homeDocument,
  {
    _id: "aboutPage",
    ...aboutPageFallback,
  },
  ...teamDocuments,
  ...serviceCategoryDocuments,
  ...serviceDocuments,
  ...productDocuments,
  ...caseStudyDocuments,
  ...communityDocuments,
  {
    _id: "contactPage",
    ...contactPageFallback,
  },
];

export const placeholderDocuments: SeedDocument[] = seedDocumentsWithoutKeys.map(
  (document) => withArrayKeys(document, document._id)
);
