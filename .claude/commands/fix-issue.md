---
name: fix-issue
description: Investigate and fix a bug or issue in the Opus2 Codex monorepo
---

Fix the following issue: $ARGUMENTS

## Process

### 1. Understand the issue
- Read the issue description carefully
- Identify which package is affected: `packages/ui`, `packages/icons`, or `apps/docs`
- Locate the relevant component in:
  - `packages/ui/src/components/base/` — core primitives
  - `packages/ui/src/components/application/` — complex patterns
  - `packages/ui/src/components/foundations/` — featured icons, logos, ratings
  - `packages/ui/src/components/shared-assets/` — illustrations

### 2. Reproduce & diagnose
- Read the affected file(s) before making any changes
- Identify root cause — don't patch symptoms
- Check if the issue exists in the Storybook story at `apps/docs/src/stories/`

### 3. Fix
- Follow all conventions:
  - Kebab-case filenames
  - `Aria*` prefix for React Aria Components that collide with local names
  - Semantic color tokens (`text-primary`, `fg-secondary`, `bg-brand-solid`)
  - `sortCx()` for style objects, `cx()` for merging
  - `transition duration-100 ease-linear` for default transitions
- Do not introduce unrelated changes or refactors
- Do not add error handling for scenarios that can't happen

### 4. Verify
- Check that the fix doesn't break related components
- If the issue was visible in Storybook, confirm the story reflects the fix
- Run type check if types were changed: `npm run build --workspace=@opus2-platform/codex`

### 5. Commit
- Write a clear, concise commit message focused on WHY, not what
- Format: `fix: <short description>`

## Key files to be aware of
- Theme tokens: `packages/ui/src/styles/theme.css`
- Package styles entrypoint: `packages/ui/src/styles/index.css`
- Component exports: `packages/ui/src/`
- Hooks: `packages/ui/src/hooks/` — `useBreakpoint`, `useClipboard`, `useActiveItem`, `useResizeObserver`
- Providers: `packages/ui/src/providers/theme-provider.tsx` — `ThemeProvider`, `useTheme`
- Demo asset helpers: `packages/ui/src/constants/demo-asset-urls.ts` — `codexDemoAvatar`, `codexDemoFlagUrl`
- Storybook config: `apps/docs/.storybook/`
- Storybook sidebar CSS overrides: `apps/docs/.storybook/manager-head.html`
