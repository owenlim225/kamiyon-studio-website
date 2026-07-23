# Progress Tracker

Update this file after every meaningful implementation change.

## Archival process

When a task/phase is marked complete:

1. Create `context/completed/YYYY-MM-DD-<slug>.md` with the finished context.
2. Add a row/link in [`completed/README.md`](./completed/README.md).
3. Remove bulky finished blocks from this file; leave at most a one-line pointer.
4. Do not delete historical detail — relocate it.

**Historical completed work:** [`completed/README.md`](./completed/README.md)

---

## Current Phase

**Phase E — Wave 3 verified (2026-07-24):** Staging Worker + hosted Studio confirmed working. **Wave 4 (apex DNS cutover) is next**, run **in parallel** with QA polish streams (see below).

| Surface | URL | Status |
| --- | --- | --- |
| Staging site | https://kamiyon-studio-website-staging.limosnerosherwin.workers.dev | Live (Workers Free ~2.2 MiB gzip) |
| Hosted Studio | https://kamiyon.sanity.studio/ | Live (login + desk OK) |
| Staging `/studio` | same Worker → redirect | → hosted Studio |
| Media CDN (staging) | https://media-staging.kamiyonstudio.com | Active |
| Media CDN (prod) | https://media.kamiyonstudio.com | Active |
| Production site | https://kamiyonstudio.com | Still on prior host until Wave 4 |

**Source of truth:** [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md) · [`DECISIONS.md`](./DECISIONS.md) · [`deploy-runbook.md`](./deploy-runbook.md) · [`QA-Report.md`](./QA-Report.md)

---

## Locked product answers (2026-07-24)

| Topic | Decision |
| --- | --- |
| Interim contact CTA | External [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSeIefAWJu5FP9pwljLFz1wSUxU2ybR3--GdylUYUBsGHH0yaw/viewform) (linked button) |
| QA-001 | Out of app scope — Google Forms confirmation settings |
| Same-route nav | Smooth-scroll to top / target section |
| Scroll tip | Keep bounce UX; first scroll must count |
| QA-008 hamburger | Superseded by kinetic nav (ADR-008) |
| QA vs Wave 4 | Parallel |
| T8 (later) | Resend → studio inbox + visitor confirmation; confirm `CONTACT_TO_EMAIL` |

---

## Parallel workstreams (multitask fan-out)

```text
Batch 1 (now, no shared files):
  WS0 Context hygiene     ── done 2026-07-24
  WS1 Hero scroll/hint    ── QA-002, 009, 010
  WS2 Kinetic chrome QA   ── QA-003, 004 (+ new menu bugs only)
  WS4a Staging ops        ── webhook + Studio R2 origin
  WS6 Blog/Analytics      ── T9 / T14 (optional)

Batch 2 (after Batch 1 + policy locked):
  WS3 Same-route scroll   ── QA-005, 006, 007 + Google Form CTA wiring

Batch 3 (serial ops):
  WS4b Wave 4 DNS cutover

Batch 4:
  WS5 T8 Resend form (after inbox confirmed; prod secrets after WS4b)
  WS7 E2E T15 (after WS3 + WS5)
```

| Stream | Scope | Owns (avoid cross-edits) | Depends on | Status |
| --- | --- | --- | --- | --- |
| **WS0** | Context triage | `context/*` | — | **Done** |
| **WS1** | First scroll counts; × dismiss | `useHeroScrollBounce*`, `HeroScrollHelper*` | — | Next |
| **WS2** | Re-QA logo on kinetic; fix if repro | `sterling-gate-kinetic-navigation*`, `SiteHeader*` | Soft: WS1 if tip steals clicks | Next |
| **WS3** | Same-route → scroll; wire Google Form CTA | nav helpers, footer, contact CTAs, `lib/config/navigation`, channels/fallbacks | WS1/WS2 soft; answers locked | Ready after Batch 1 |
| **WS4a** | Staging webhook + Studio API origin / R2 smoke | CF/Sanity ops, `deploy-runbook` | — | Next |
| **WS4b** | Apex/www → prod Worker; pause Vercel | DNS + prod env | WS4a green | Blocked on WS4a |
| **WS5** | T8 Resend native form | contact API + UI | Inbox decision; prod after WS4b | Later |
| **WS6** | T9 blog UI / T14 CF Analytics | blog routes, analytics snippet | — | Optional parallel |
| **WS7** | T15 E2E expansion | `e2e/*` | WS3 + WS5 | Later |

**Conflict edge:** Hero tip `z-20` vs header logo clicks — WS1 owns tip stacking; WS2 re-tests logo after.

---

## Current Goal

1. Ship Batch 1: WS1 + WS2 + WS4a (and optional WS6).  
2. Then WS3 (same-route scroll + Google Form CTA).  
3. Then WS4b cutover → Phase F (WS5/WS7).

---

## Recently completed (2026-07-24)

- **WS0 context hygiene** — QA triage, workstreams, contact/Studio doc alignment (ADR-010).
- **Hosted Studio live** — `pnpm sanity:deploy` → https://kamiyon.sanity.studio/ (app id in `sanity.cli.ts`).
- **Studio env bake-in (ADR-009)** — static `SANITY_STUDIO_*` reads + defaults.
- **Sanity CORS** — credentials for Studio + staging Worker.
- **Kinetic nav (Track G / ADR-008)** — `SterlingGateKineticNavigation` in `SiteHeader`.
- **OpenNext staging** — R2 bindings, staging vars, secrets set.
- **Build fixes** — `next build --webpack` + `*.ttf.bin` loader; OG routes on node runtime.

---

## Completed earlier

- Phase C CMS swap — [`completed/2026-07-23-phase-c-sanity-cms-swap.md`](./completed/2026-07-23-phase-c-sanity-cms-swap.md)
- Cinematic footer — [`completed/2026-07-23-cinematic-footer.md`](./completed/2026-07-23-cinematic-footer.md)
- Phase B Studio schemas; ADR-005 hygiene; ADR-007 hosted Studio (not embedded)

---

## Next Up (resume here)

### Batch 1 (parallel)

1. **WS1** — Hero scroll bounce: first intent must scroll; stabilize tip × (QA-002/009/010)
2. **WS2** — Re-QA logo disappear/click on staging kinetic nav; fix only if repro (QA-003/004)
3. **WS4a** — Sanity webhook → staging `/api/revalidate`; Studio redeploy with `SANITY_STUDIO_API_ORIGIN` + upload secret; smoke R2 upload
4. **WS6 (optional)** — Blog UI (T9) / CF Analytics (T14)

### Batch 2

5. **WS3** — Same-route → scroll top/section; wire Google Form as interim primary contact CTA

### Batch 3–4

6. **WS4b** — Prod Worker; attach `kamiyonstudio.com` + `www`; pause Vercel; prod CORS + webhook
7. **WS5** — T8 Resend form (after `CONTACT_TO_EMAIL` confirmed)
8. **WS7** — Expanded E2E (T15); retire CardNav-era smoke comments
9. **GitHub Actions** — Confirm `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` for `staging`/`main`

**Done (pointers):** see [`completed/README.md`](./completed/README.md)

---

## Open Questions

- [ ] **`/news` route** — deferred
- [ ] **Press Kit** — deferred
- [ ] **Portfolio taxonomy filters** — deferred
- [ ] **README motto conflict** — update docs README to Create. Play. Inspire.?
- [x] **R2 public CDN hostname** — `media.kamiyonstudio.com` / `media-staging.kamiyonstudio.com` (active)
- [x] **Hosted Studio hostname** — `kamiyon.sanity.studio` live; env bake-in fixed (ADR-009)
- [x] **Interim contact** — Google Form URL (wire in repo; QA-001 = Forms settings)
- [ ] **Resend from-address / CONTACT_TO_EMAIL** — confirm production inbox before WS5
- [ ] **Retire Google Form** when T8 ships? (product call at WS5)

---

## Architecture Decisions (active)

See [`DECISIONS.md`](./DECISIONS.md) for locked stack and cleanup ADRs (incl. ADR-010 QA / contact interim).
