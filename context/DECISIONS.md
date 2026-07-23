# Architecture Decision Records (ADR)

> **Append-only.** Record locked decisions and major refactors here.  
> Operational build context: [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md).  
> Company facts: [`docs/`](../docs/).

---

## ADR-001 — Locked production stack (2026-07-21)

**Status:** Accepted

**Context:** Website build decisions consolidated in essential context §3.

**Decision:**

- CMS: **Sanity** (new project) + embedded Studio at `/studio`
- Hosting: **OpenNext** on Cloudflare Pages/Workers (free tier)
- Media: **Cloudflare R2** only; Sanity holds references
- Contact: form + external links via **Resend**
- Motion (main site): **GSAP + ScrollTrigger** only
- Motion Lab: public `/motion-lab`, **noindex**
- Fonts: **Geologica** (display/UI) + **Montserrat** (body)
- Brand colors: `#FF7998`, `#E9C080`, `#201013`, `#F8F8F8`
- Analytics: **Cloudflare Web Analytics** only
- Primary nav: Home, About, Services, Products, Portfolio, Community, Blog, Contact

**Consequences:** Payload, Vercel-as-default, Framer Motion, Lenis, Beaufort, and Poppins are not production targets.

---

## ADR-002 — Payload retirement; fallbacks-first interim (2026-07-21)

**Status:** Accepted

**Context:** Repo migrated Sanity → Payload (2026-07-11). Target reverted to Sanity. Full Sanity scaffold is Phase B; public site must stay up during cleanup.

**Decision:**

- Remove Payload runtime (config, collections, admin routes, deps)
- Keep `lib/cms` **public API shape** (`getHomePage`, etc.)
- Query functions return `null`; pages use `resolveWithFallback()` + typed fallbacks
- Keep `PortableText` renderer and domain types for Sanity swap
- Do **not** half-implement Sanity/R2/OpenNext/Resend in the cleanup PR

**Consequences:** No `/admin`; no Postgres CMS env. Editors use fallbacks until Sanity Phase B–C.

---

## ADR-003 — Preserve docs/ as company canon (2026-07-21)

**Status:** Accepted

**Decision:** Never delete or gut `docs/` for token savings. Website engineering SoT is `context/WEBSITE-ESSENTIAL-CONTEXT.md`; company facts remain in `docs/`.

**Consequences:** Older font/color lists in docs may differ from locked website tokens — essential context §8 wins for the site.

---

## ADR-004 — graphify-out is generated artifact (2026-07-21)

**Status:** Accepted

**Decision:** Remove `graphify-out/` from the repo; add to `.gitignore`. Regenerate locally with:

```bash
graphify update .
```

**Consequences:** Dependency graphs are on-demand, not committed.

---

## ADR-005 — Repo hygiene cleanup completed (2026-07-21)

**Status:** Accepted

**Decision:** Holistic cleanup applied: Payload removed, GSAP-only main site, Geologica/Montserrat + brand hex tokens, Products/Community in nav, agent docs aligned.

**Follow-ups (not in cleanup):** T1 Sanity scaffold, T3–T6 data layer + webhooks, T5 OpenNext deploy, T4 R2, T8 Resend contact form, T9 blog UI, T14 CF Analytics.

---

## ADR-006 — Phase C Sanity GROQ data layer (2026-07-23)

**Status:** Accepted

**Context:** Phase B delivered Studio + schemas. Public site still used null stubs + typed fallbacks.

**Decision:**

- Wire `lib/cms/queries.ts` to Sanity via GROQ (`lib/cms/groq.ts`) and `safeSanityFetch`
- Return `null` when Sanity is unset, empty, or errors — pages keep `resolveWithFallback`
- Resolve media with `getMediaUrl` / `r2Asset` (`url` or `key` + `NEXT_PUBLIC_R2_PUBLIC_BASE_URL`)
- Expose blog getters (`getPosts`, `getPostBySlug`) ahead of blog UI (T9)
- Cache with `next.revalidate` + tags; webhook invalidation deferred to Phase E

**Consequences:** Empty dataset or missing env still serves fallbacks. Live content appears once Studio is configured and documents are published.

---

## ADR-007 — Hosted Sanity Studio (Workers Free size) (2026-07-24)

**Status:** Accepted

**Context:** OpenNext staging upload was ~5.5 MiB gzip because embedded `/studio` (`NextStudio` + `sanity`) landed in `handler.mjs`, exceeding Workers Free **3 MiB**. Workers Paid was declined for this phase.

**Decision:**

- Remove embedded Studio from the Next.js Worker; keep schemas + `sanity.config.ts` for CLI
- Host Studio via `pnpm sanity:deploy` at `https://{SANITY_STUDIO_HOSTNAME}.sanity.studio` (default `kamiyon`)
- Worker `/studio` **redirects** to hosted Studio (`NEXT_PUBLIC_SANITY_STUDIO_URL`)
- Studio media uploads call absolute `{SANITY_STUDIO_API_ORIGIN}/api/media/upload` with CORS allowlist for the Studio origin
- Marketing site remains on Cloudflare Workers Free; do not enable Workers Paid solely for Studio size

**Consequences:** Editors use `*.sanity.studio` (or `pnpm sanity:dev` locally). Sanity project CORS must allow the Studio host. Upload secret + API origin must be set for hosted Studio → R2. ADR-001 “embedded Studio at `/studio`” is superseded for deploy topology; `/studio` path retained as redirect.

---

## ADR-008 — Kinetic overlay nav replaces CardNav (2026-07-24)

**Status:** Accepted

**Context:** Production chrome used React Bits `CardNav`. Product direction requested a GSAP full-screen kinetic menu (sterling-gate) site-wide with Kamiyon branding.

**Decision:**

- Ship `SterlingGateKineticNavigation` in `components/ui/`; `SiteHeader` wraps it
- Use shell `navItems` / `contactCta` / `siteName` (full primary IA including Products + Community)
- Scoped CSS mapped to Kamiyon tokens — do not import demo indigo/purple globals
- Honor `prefers-reduced-motion`, Escape-to-close, `aria-expanded`

**Consequences:** CardNav remains in repo unused by the shell until cleaned up; header tests target the kinetic menu.
