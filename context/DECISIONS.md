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
