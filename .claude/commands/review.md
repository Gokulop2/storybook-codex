---
name: review
description: Review a component or story for conventions, accessibility, and code quality
---

Review the file or component specified: $ARGUMENTS

## What to check

### File & naming conventions
- All files are kebab-case (e.g. `date-picker.tsx`, not `DatePicker.tsx`)
- Component files live in the correct folder:
  - `packages/ui/src/components/base/` — core primitives
  - `packages/ui/src/components/application/` — complex patterns
  - `packages/ui/src/components/foundations/` — featured icons, logos, ratings
  - `packages/ui/src/components/shared-assets/` — illustrations

### Imports & aliasing
- React Aria Components primitives that collide with local names must use `Aria*` prefix:
  ```ts
  import { Button as AriaButton, TextField as AriaTextField } from "react-aria-components";
  ```
- Icons imported from `@opus2-platform/icons` using named imports

### Component patterns
- Built on React Aria Components for accessibility
- Compound component pattern used where appropriate (`Select.Item`, `Select.ComboBox`)
- Common props present where applicable: `size`, `isDisabled`, `isLoading`, `isInvalid`, `isRequired`
- Icons accepted as component reference (`iconLeading={ChevronDown}`) or JSX element with `data-icon`
- No dedicated `Link` component — uses `<Button href="..." color="link-color">` instead

### Styling
- Tailwind CSS v4.1 only — no inline styles or raw CSS
- Style objects use `sortCx()` for organization, `cx()` for merging
- Semantic color tokens used (e.g. `text-primary`, `fg-secondary`, `bg-brand-solid`) — not raw palette values
- Size variants follow: `sm`, `md`, `lg`, `xl`
- Default transitions: `transition duration-100 ease-linear`

### Storybook stories (if reviewing a story file)
- Story file lives in `apps/docs/src/stories/<component-name>/`
- Stories cover all size and color variants
- Stories cover disabled, loading, invalid states where applicable
- No hardcoded colors or layout hacks unless inside `manager-head.html`

### Accessibility
- Proper ARIA attributes present
- Keyboard navigation supported (via React Aria)
- Decorative icons have `aria-hidden="true"`

## Output format
Report findings as:
- ✅ Passing checks
- ⚠️ Warnings (non-breaking but should fix)
- ❌ Issues (must fix before merge)

End with a short summary and recommended next steps.
