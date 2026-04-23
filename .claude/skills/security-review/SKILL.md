---
name: security-review
description: Auto-review changed files for security issues before commit or PR
---

Run a security review on the current branch changes.

## Scope

Focus on the Opus2 Codex monorepo:
- `packages/ui/src/` — component library
- `packages/icons/src/` — icon library
- `apps/docs/` — Storybook docs app

## What to check

### XSS risks
- No use of `dangerouslySetInnerHTML` without sanitization
- User-controlled strings not injected into DOM directly
- SVG content (especially in `packages/icons`) doesn't include executable attributes

### Dependency risks
- No new `npm install` of unvetted packages
- `package.json` peer deps pinned appropriately
- No packages pulling in known vulnerable versions

### Secrets & sensitive data
- No API keys, tokens, or credentials committed
- No `.env` files staged
- `settings.local.json` is gitignored and not staged

### Build & config
- `apps/docs/.storybook/manager-head.html` — only CSS overrides, no scripts injected
- No eval, Function constructor, or dynamic code execution

### Component-level
- No `href` or `src` props accepting unvalidated user input
- Icon SVGs don't include `<script>` tags or event handlers

## Output
List findings as:
- ✅ Clean
- ⚠️ Worth reviewing
- ❌ Must fix before merge

End with an overall risk rating: **Low / Medium / High**.
