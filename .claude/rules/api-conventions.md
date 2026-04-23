# API & Component Conventions

## Component structure

### Base components (`packages/ui/src/components/base/`)
Core UI primitives: Button, Input, Select, Checkbox, Avatar, Badge, Tooltip, etc.

### Application components (`packages/ui/src/components/application/`)
Complex patterns: DatePicker, Modal, Pagination, Table, Tabs, etc.

### Foundations (`packages/ui/src/components/foundations/`)
FeaturedIcon, logos, ratings, social icons.

### Shared assets (`packages/ui/src/components/shared-assets/`)
Reusable illustrations.

## Component props pattern
```typescript
interface ComponentProps {
  size?: "sm" | "md" | "lg" | "xl";
  isDisabled?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
}
```

## Icon props
- Accept as component reference: `iconLeading={ChevronDown}`
- Accept as JSX element (must include `data-icon`): `iconLeading={<ChevronDown data-icon />}`
- Size via Tailwind: `size-4` (16px), `size-5` (20px), `size-6` (24px)
- Color via semantic fg tokens: `text-fg-secondary`, `text-fg-brand-secondary`
- Decorative icons: `aria-hidden="true"`

## Compound components
```typescript
const Select = SelectComponent as typeof SelectComponent & {
  Item: typeof SelectItem;
  ComboBox: typeof ComboBox;
};
Select.Item = SelectItem;
Select.ComboBox = ComboBox;
```

## No Link component
Use Button with href and link color variants:
```tsx
<Button href="/path" color="link-color">Label</Button>
<Button href="/path" color="link-gray" iconLeading={Settings01}>Settings</Button>
```

## Build outputs
- `packages/ui` → ESM, CJS, type declarations in `dist/`, styles at `dist/styles.css`
- `packages/icons` → ESM, CJS, type declarations in `dist/`

## Package imports
```ts
import { Button } from "@opus2-platform/codex";
import { Home01 } from "@opus2-platform/icons";
```

## Available hooks (`packages/ui/src/hooks/`)
Prefer these over custom implementations:

| Hook | Purpose |
|---|---|
| `useBreakpoint(size)` | Returns boolean — whether the given Tailwind breakpoint (`sm`, `md`, `lg`, `xl`, `2xl`) is active |
| `useClipboard(timeout?)` | Copy-to-clipboard with copied state, default 2000ms reset |
| `useActiveItem(itemIds)` | Tracks which section is in view via `IntersectionObserver` — used for active nav highlighting |
| `useResizeObserver(ref, cb)` | Fires callback when a referenced element resizes |

Import from `@/hooks` or `@opus2-platform/codex`.

## ThemeProvider (`packages/ui/src/providers/theme-provider.tsx`)
Wraps the app to enable light/dark/system theming. Required at the app root.

```tsx
import { ThemeProvider } from "@opus2-platform/codex";

<ThemeProvider defaultTheme="system" storageKey="ui-theme" darkModeClass="dark-mode">
  <App />
</ThemeProvider>
```

- `darkModeClass` (default: `"dark-mode"`) — class toggled on `<html>` for dark mode
- `storageKey` (default: `"ui-theme"`) — localStorage key for persistence
- `useTheme()` hook — access or change theme from any child component

## Demo asset utilities (`packages/ui/src/constants/demo-asset-urls.ts`)
Use these in Storybook stories that need placeholder images — never hardcode URLs or use third-party CDNs directly:

```ts
import { codexDemoAvatar, codexDemoFlagUrl } from "@/constants/demo-asset-urls";

codexDemoAvatar("olivia")         // stable picsum avatar by seed
codexDemoFlagUrl("US")            // flag SVG via flagcdn (ISO 3166-1 alpha-2)
codexDemoFlagUrl("earth")         // fallback solid blue SVG
```
