---
name: deploy
description: Auto-triggered pre-deploy validation — runs build checks, git hygiene, and Storybook readiness before any release
---

Run pre-deploy validation for the Opus2 Codex monorepo.

## Steps

### 1. Build
```bash
npm run build
```
Confirm zero errors across all packages:
- `packages/icons` — ESM, CJS, types in `dist/`
- `packages/ui` — ESM, CJS, types, and `dist/styles.css`
- `apps/docs` — Storybook static build

### 2. Git hygiene
```bash
git status
git diff origin/master..HEAD
```
- No unintended uncommitted changes
- Branch is up to date with `master`
- All changed files follow kebab-case naming

### 3. Convention check
Scan changed files for:
- Raw palette color classes (flag any `text-gray-*`, `bg-purple-*`, etc.)
- Missing `Aria*` aliases for colliding React Aria imports
- Inline styles outside of theme files

### 4. Exports check
- `packages/ui/src/` — all new components are exported
- `packages/icons/src/components/` — all new icons are exported

### 5. Hidden stories check
Confirm these are still excluded from Storybook (via `manager-head.html`):
- credit-cards, mobile-app-store-buttons, qr-codes, rating-badge-and-stars, verification-code-inputs, video-players

### 6. PR summary
Draft a PR description with:
- What components/stories were added or changed
- Any items still intentionally hidden and why
- Test plan checklist
