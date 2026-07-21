# Graph Report - .  (2026-07-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 987 nodes · 2270 edges · 52 communities (42 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d9fa778f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- queries.ts
- MotionLabClient.tsx
- payload.config.ts
- shell-props.ts
- Button.tsx
- SmoothScrollProvider.tsx
- dependencies
- page.tsx
- devDependencies
- HeroOpening.tsx
- CommunityFeed.tsx
- compilerOptions
- TiltedCard.tsx
- Container.tsx
- getCmsImageUrl
- HomeLineSidebar.tsx
- ProductDetail.tsx
- page.tsx
- ProjectsBento.tsx
- TeamMemberCard.tsx
- Badge.tsx
- services.ts
- types.ts
- ServiceDetail.tsx
- ServicesListing.tsx
- FeaturedWork.tsx
- CaseStudy
- ProductCard.tsx
- opening-items.ts
- Service
- lexical.ts
- PartnersMarquee.tsx
- ServiceCard.tsx
- carousel-a11y.ts
- ValuesGrid.tsx
- knip.json
- queries.test.ts
- smoke.spec.ts
- doubleLetters.ts
- next.config.ts
- eslint.config.mjs
- client.test.ts
- postcss.config.mjs
- contentType
- size
- contentType
- size

## God Nodes (most connected - your core abstractions)
1. `Container()` - 31 edges
2. `getCmsImageUrl()` - 23 edges
3. `CaseStudy` - 22 edges
4. `buildPageMetadata()` - 22 edges
5. `getPayloadClient()` - 19 edges
6. `resolveWithFallback()` - 19 edges
7. `Service` - 18 edges
8. `useGsapContext()` - 17 edges
9. `getCaseStudies()` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `PortableText()` --indirect_call--> `span()`  [INFERRED]
  components/ui/PortableText.tsx → lib/cms/fallbacks/services.ts
- `getAboutPageContent()` --calls--> `resolveWithFallback()`  [EXTRACTED]
  app/(frontend)/about/page.tsx → lib/cms/fallbacks/resolve.ts
- `getAboutPageContent()` --calls--> `getAboutPage()`  [EXTRACTED]
  app/(frontend)/about/page.tsx → lib/cms/queries.ts
- `getAboutPageContent()` --calls--> `getTeamMembers()`  [EXTRACTED]
  app/(frontend)/about/page.tsx → lib/cms/queries.ts
- `generateMetadata()` --calls--> `buildPageMetadata()`  [EXTRACTED]
  app/(frontend)/about/page.tsx → lib/seo/metadata.ts

## Import Cycles
- None detected.

## Communities (52 total, 10 thin omitted)

### Community 0 - "queries.ts"
Cohesion: 0.05
Nodes (93): CommunityPage(), metadata, MotionLabClient(), generateMetadata(), generateMetadata(), getHomePageContent(), Home(), toServiceStackSlides() (+85 more)

### Community 1 - "MotionLabClient.tsx"
Cohesion: 0.08
Nodes (57): DEMO_CARDS, MotionLabHero(), ParallaxBand(), ScrollTimelineDemo(), StaggerCards(), AnimatedImage(), AnimatedImageBaseProps, AnimatedImageProps (+49 more)

### Community 2 - "payload.config.ts"
Cohesion: 0.05
Nodes (45): anyone(), authenticated(), isAuthenticatedUser(), importMap, Args, Args, GET, POST (+37 more)

### Community 3 - "shell-props.ts"
Cohesion: 0.05
Nodes (49): Logo(), LogoProps, MainNav(), MainNavProps, items, PageShell(), PageShellProps, currentYear (+41 more)

### Community 4 - "Button.tsx"
Cohesion: 0.06
Nodes (37): metadata, ContactCTA(), ContactCTAProps, HomeContact(), HomeContactProps, ctaBanner, defaultProps, formatPublishedDate() (+29 more)

### Community 5 - "SmoothScrollProvider.tsx"
Cohesion: 0.07
Nodes (35): metadata, montserrat, poppins, RootLayout(), robots(), AnimationProviders(), AnimationProvidersProps, focusHashTarget() (+27 more)

### Community 6 - "dependencies"
Cohesion: 0.04
Nodes (47): clsx, framer-motion, graphql, gsap, @gsap/react, lenis, next, dependencies (+39 more)

### Community 7 - "page.tsx"
Cohesion: 0.08
Nodes (25): ContactPage(), generateMetadata(), getContactContent(), ContactFAQ(), ContactFAQProps, ContactHero(), ContactHeroProps, baseContactPage (+17 more)

### Community 8 - "devDependencies"
Cohesion: 0.06
Nodes (37): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+29 more)

### Community 9 - "HeroOpening.tsx"
Cohesion: 0.10
Nodes (19): OpengraphImage(), TwitterImage(), Hero(), HeroProps, baseHero, HeroOpening(), HeroOpeningProps, baseHero (+11 more)

### Community 10 - "CommunityFeed.tsx"
Cohesion: 0.12
Nodes (19): CommunityFeed(), CommunityFeedProps, items, EmptyState(), EmptyStateProps, CommunityCard(), CommunityCardProps, formatDate() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.06
Nodes (30): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+22 more)

### Community 12 - "TiltedCard.tsx"
Cohesion: 0.19
Nodes (10): Highlights(), HighlightsProps, OurStory(), OurStoryProps, marketingCardTiltProps, springValues, TiltedCard(), TiltedCardProps (+2 more)

### Community 13 - "Container.tsx"
Cohesion: 0.19
Nodes (7): metadata, CultureClosing(), CultureClosingProps, VisionBand(), VisionBandProps, Container(), ContainerProps

### Community 14 - "getCmsImageUrl"
Cohesion: 0.25
Nodes (9): CaseStudy(), CaseStudyProps, CaseStudySection, getSections(), baseCaseStudy, ProjectGallery(), ProjectGalleryProps, getCmsImageUrl() (+1 more)

### Community 15 - "HomeLineSidebar.tsx"
Cohesion: 0.20
Nodes (10): HomeLineSidebar(), SECTION_LABELS, MockIntersectionObserver, FALLOFF_CURVES, FalloffCurve, LineSidebar(), LineSidebarProps, HOME_SECTION_IDS (+2 more)

### Community 16 - "ProductDetail.tsx"
Cohesion: 0.20
Nodes (9): ProductDetail(), ProductDetailProps, baseProduct, ProductMedia(), ProductMediaProps, ProductDevelopmentStatus, ProductMedia, DEVELOPMENT_STATUS_LABELS (+1 more)

### Community 17 - "page.tsx"
Cohesion: 0.22
Nodes (10): AboutPage(), generateMetadata(), getAboutPageContent(), AboutHero(), AboutHeroProps, QUICK_LINKS, baseAboutPage, aboutPageFallback (+2 more)

### Community 18 - "ProjectsBento.tsx"
Cohesion: 0.22
Nodes (8): chunkSlots(), ProjectsBento(), ProjectsBentoProps, BentoLayout, BentoSlot, padSlots(), partitionBentoLayout(), sortForBento()

### Community 19 - "TeamMemberCard.tsx"
Cohesion: 0.24
Nodes (8): TeamGrid(), TeamGridProps, members, TeamMemberCard(), TeamMemberCardProps, baseMember, TeamMember, getInitials()

### Community 20 - "Badge.tsx"
Cohesion: 0.19
Nodes (8): Badge(), BadgeProps, BadgeVariant, variantClasses, BentoProjectCard(), BentoProjectCardProps, imageAspectClasses, caseStudy

### Community 21 - "services.ts"
Cohesion: 0.19
Nodes (8): BlockTag, PortableText(), PortableTextProps, renderSpan(), STYLE_TO_TAG, span(), SpanInput, PortableTextBlock

### Community 22 - "types.ts"
Cohesion: 0.23
Nodes (9): Mission(), MissionProps, CtaVariant, HomeBlock, HomeHighlight, HomeMission, ProductStatus, SeoMetadata (+1 more)

### Community 23 - "ServiceDetail.tsx"
Cohesion: 0.23
Nodes (8): ServiceDetail(), ServiceDetailProps, baseService, category, ServiceSidebar(), ServiceSidebarProps, baseService, ServiceCategory

### Community 24 - "ServicesListing.tsx"
Cohesion: 0.23
Nodes (6): ServicesListing(), ServicesListingProps, categories, services, groupServicesByCategory(), ServiceCategoryGroup

### Community 25 - "FeaturedWork.tsx"
Cohesion: 0.25
Nodes (9): FeaturedCard, FeaturedWork(), FeaturedWorkProps, baseFeaturedWork, caseStudies, products, toCaseStudyCards(), toProductCards() (+1 more)

### Community 26 - "CaseStudy"
Cohesion: 0.29
Nodes (7): PortfolioListing(), PortfolioListingProps, caseStudy, ProjectCard(), ProjectCardProps, baseCaseStudy, CaseStudy

### Community 27 - "ProductCard.tsx"
Cohesion: 0.29
Nodes (7): ProductGrid(), ProductGridProps, product, ProductCard(), ProductCardProps, baseProduct, Product

### Community 28 - "opening-items.ts"
Cohesion: 0.27
Nodes (7): buildOpeningItems(), BuildOpeningItemsInput, caseStudyImage(), formatOpeningIndex(), OpeningItem, orderByFeaturedSlugs(), productImage()

### Community 29 - "Service"
Cohesion: 0.36
Nodes (4): ServiceIndustries(), ServiceIndustriesProps, Service, getUniqueIndustries()

### Community 30 - "lexical.ts"
Cohesion: 0.31
Nodes (8): isTextNode(), LexicalElementNode, LexicalNode, LexicalRoot, LexicalTextNode, lexicalToPortableText(), mapElementNode(), mapTextNode()

### Community 31 - "PartnersMarquee.tsx"
Cohesion: 0.36
Nodes (5): PartnersMarquee(), PartnersMarqueeEyebrow, PartnersMarqueeProps, PARTNER_PLACEHOLDERS, PartnerPlaceholder

### Community 32 - "ServiceCard.tsx"
Cohesion: 0.38
Nodes (5): getIconGlyph(), ICON_GLYPHS, ServiceCard(), ServiceCardProps, baseService

### Community 33 - "carousel-a11y.ts"
Cohesion: 0.60
Nodes (4): clampCarouselIndex(), formatCarouselSlideLabel(), getRovingTabIndex(), wrapCarouselIndex()

### Community 34 - "ValuesGrid.tsx"
Cohesion: 0.50
Nodes (3): ValuesGrid(), ValuesGridProps, CoreValue

### Community 35 - "knip.json"
Cohesion: 0.50
Nodes (3): $schema, tags, -lintignore

### Community 36 - "queries.test.ts"
Cohesion: 0.50
Nodes (3): findGlobalMock, findMock, getPayloadClientMock

## Knowledge Gaps
- **308 isolated node(s):** `metadata`, `metadata`, `poppins`, `montserrat`, `metadata` (+303 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ScrollStack()` connect `Button.tsx` to `dependencies`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `lenis` connect `dependencies` to `Button.tsx`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `poppins` to the rest of the system?**
  _308 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `queries.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05037984806077569 - nodes in this community are weakly interconnected._
- **Should `MotionLabClient.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07592592592592592 - nodes in this community are weakly interconnected._
- **Should `payload.config.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05228105228105228 - nodes in this community are weakly interconnected._
- **Should `shell-props.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.051929824561403506 - nodes in this community are weakly interconnected._