## Application Building Context

Read the following files in order before implementing
or making any architectural decision:

1. `context/project-overview.md` — product definition,
   goals, features, and scope
2. `context/architecture.md` — system structure,
   boundaries, storage model, and invariants
3. `context/ui-context.md` — theme, colors, typography,
   and component conventions
4. `context/code-standards.md` — implementation rules
   and conventions
5. `context/ai-workflow-rules.md` — development workflow,
   scoping rules, and delivery approach
6. `context/progress-tracker.md` — current phase,
   open questions, next steps, and architecture decisions
7. `context/completed/README.md` — index of archived
   milestones (read when tracing history)

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
