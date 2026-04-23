# Testing Rules

## Storybook stories (primary testing surface)

Stories live in `apps/docs/src/stories/<component-name>/` and serve as the visual test suite.

### Every story file must cover
- All size variants (`sm`, `md`, `lg`, `xl` where applicable)
- All color variants (`primary`, `secondary`, `tertiary`, `destructive`, etc.)
- All meaningful states: `isDisabled`, `isLoading`, `isInvalid`, `isRequired`
- Icon variants: with and without leading/trailing icons where the component supports it

### Story conventions
- Story ID slugs follow `base-components-*` pattern
- Story files are kebab-case and live alongside an `index.ts` barrel if needed
- No hardcoded layout hacks inside story files — use Storybook decorators or parameters

## Build verification
Before marking any component work done:
```bash
npm run build --workspace=@opus2-platform/codex
```
Type errors must be zero.

## Visual verification
Always start Storybook and visually confirm the golden path before reporting complete:
```bash
npm run dev --workspace=docs
```
Check: renders correctly, no console errors, states work, icons display.

## Demo assets in stories
Use `codexDemoAvatar()` and `codexDemoFlagUrl()` from `@/constants/demo-asset-urls` for any placeholder images or flags in stories — never hardcode picsum/flagcdn URLs directly or import from third-party CDNs:

```ts
import { codexDemoAvatar, codexDemoFlagUrl } from "@/constants/demo-asset-urls";

// ✅ Correct
src={codexDemoAvatar("olivia")}
src={codexDemoFlagUrl("US")}

// ❌ Wrong
src="https://picsum.photos/seed/olivia/128/128"
```

## Hidden stories
The following are intentionally hidden from Storybook via `apps/docs/.storybook/manager-head.html` and excluded from the overview grid — do not re-add without confirming they are ready:
- credit-cards
- mobile-app-store-buttons
- qr-codes
- rating-badge-and-stars
- verification-code-inputs
- video-players
