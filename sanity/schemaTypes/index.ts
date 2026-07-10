import {
  aboutPage,
  caseStudy,
  communityItem,
  contactPage,
  homePage,
  product,
  service,
  serviceCategory,
  siteSettings,
  teamMember,
} from "./documents";
import {
  contactChannel,
  coreValue,
  cta,
  faqItem,
  productMedia,
  seoMetadata,
  socialLink,
  storySection,
} from "./objects";

export const schemaTypes = [
  // 1. Shared objects (no dependencies)
  seoMetadata,
  cta,
  socialLink,
  storySection,
  coreValue,
  productMedia,
  contactChannel,
  faqItem,
  // 2. Singleton documents
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  // 3. Collection documents
  teamMember,
  serviceCategory,
  service,
  product,
  caseStudy,
  communityItem,
];
