---
name: deploy
description: Prepare and validate the Opus2 Codex monorepo for deployment or release
---

Prepare for deployment: $ARGUMENTS

## Pre-deploy checklist

### 1. Verify build passes
Run the full monorepo build and confirm no errors:
```bash
npm run build
```

Check each package builds cleanly:
- `packages/icons` — ESM, CJS, and type declarations in `dist/`
- `packages/ui` (`@opus2-platform/codex`) — ESM, CJS, type declarations, and `dist/styles.css`
- `apps/docs` — Storybook static build

### 2. Check for uncommitted changes
```bash
git status
git diff
```
- Confirm no unintended changes are staged or unstaged
- The following are expected to be intentionally hidden in Storybook (via `manager-head.html`):
  - credit-cards, mobile-app-store-buttons, qr-codes, rating-badge-and-stars, verification-code-inputs, video-players

### 3. Review changed files
```bash
git diff master...HEAD
```
- All changed files follow kebab-case naming
- No raw palette color classes — only semantic tokens (`text-primary`, `fg-secondary`, `bg-brand-solid`)
- No inline styles or hardcoded values outside of theme config
- No `Aria*` aliasing violations

### 4. Storybook smoke check
Start Storybook and verify key stories render correctly:
```bash
npm run dev --workspace=docs
```
- Base components overview grid loads
- No broken imports or missing icons
- All visible stories display without console errors

### 5. Package version & exports
- Confirm `packages/ui/src/` exports are up to date
- Confirm `packages/icons/src/components/` exports are up to date
- Check `package.json` version numbers if this is a version bump release

### 6. Branch & PR readiness
- Current branch: `sb-base-components` (Storybook docs for base components)
- Target branch for merge: `master`
- Ensure branch is up to date with master:
  ```bash
  git fetch origin
  git log origin/master..HEAD
  ```
- Write a PR description covering: what changed, what stories were added/updated, and any items still intentionally hidden

## Post-deploy notes
- After merge to master, confirm Storybook deployment reflects updated stories
- Update `MEMORY.md` if any new components or patterns were introduced
