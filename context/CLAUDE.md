## Application Building Context

**Primary source of truth for website build decisions:**
`context/WEBSITE-ESSENTIAL-CONTEXT.md`
(Sanity + Cloudflare target stack, IA, performance budgets,
motion policy, migration roadmap). Prefer it over older
Payload-era notes in `architecture.md` / `progress-tracker.md`.

Then read as needed (do not load archives unless tracing history):

1. `context/WEBSITE-ESSENTIAL-CONTEXT.md` — locked target
   architecture, content model, budgets, open questions
2. `context/ui-context.md` — theme, colors, typography,
   and component conventions (until fully merged above)
3. `context/code-standards.md` — implementation rules
   (adapt CMS env sections to Sanity/R2 when implementing)
4. `context/ai-workflow-rules.md` — development workflow,
   scoping rules, and delivery approach
5. `context/progress-tracker.md` — current phase notes
   (may lag the essential context during CMS migration)
6. `context/project-overview.md` — product definition
   (supplementary; essential context wins on stack)
7. `context/completed/README.md` — archived milestones only

Update `context/progress-tracker.md` after each
meaningful implementation change.

### Archival process (when closing a phase)

When a task/phase is marked complete:

1. Create `context/completed/YYYY-MM-DD-<slug>.md` with
   the finished context (goal, decisions, checklist,
   verification results, session notes)
2. Add a row/link in `context/completed/README.md`
3. Remove the bulky finished block from
   `progress-tracker.md`; leave at most a one-line
   “Done — see completed/…” pointer if needed
4. Do not delete historical detail — relocate it

`context/completed-work.md` is a stub that points at
`context/completed/README.md` (legacy path only).

If implementation changes the architecture, scope, or
standards documented in the context files, update the
relevant file before continuing.
