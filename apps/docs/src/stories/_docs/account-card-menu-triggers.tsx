/**
 * Shared Untitled-style account-card menu triggers for the Dropdowns docs page.
 * Keeps avatar/gloss/online-indicator markup in one place; stories import triggers + `CODEX_DOCS_AVATAR_SRC`.
 */
import type { CSSProperties, FC } from "react";
import { useId } from "react";
import { ChevronDown } from "@opus2-platform/icons";
import { Button as AriaButton } from "react-aria-components";
import { CODEX_DOCS_AVATAR_SRC } from "./docs-assets";
import { DOCS_PREVIEW_SURFACE_CLASS } from "./untitled-docs-preview-code";

export { CODEX_DOCS_AVATAR_SRC };

export const ACCOUNT_CARD_DOCS_PREVIEW_CLASS =
  `${DOCS_PREVIEW_SURFACE_CLASS} not-typography !m-0 [&_p]:!m-0` as const;

const ONLINE_STATUS_GLOSS: CSSProperties = {
  backgroundImage:
    "radial-gradient(43.75% 43.75% at 50% 28.75%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(50% 50%, rgba(255, 255, 255, 0) 74.66%, rgba(255, 255, 255, 0.18) 100%), radial-gradient(75% 75% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.08) 99%, rgba(255, 255, 255, 0) 100%)",
};

/** Inner image stack for ringed sm/md avatars (Untitled gloss mask). */
const AVATAR_GLOSS_INNER =
  "relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/32 before:mask-[linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)]";

/** Compact xs avatar inner (no ring / no gloss). */
const AVATAR_XS_INNER =
  "relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:inset-[0.5px] rounded-full";

const CHEVRON = "!size-4 shrink-0 stroke-[2.25px]! text-fg-quaternary";

const TriggerChevron: FC<{ offset: "tight" | "md" }> = ({ offset }) => (
  <div
    className={
      offset === "tight"
        ? "absolute top-1 right-1 flex !size-7 items-center justify-center rounded-md"
        : "absolute top-2 right-2 flex !size-7 items-center justify-center rounded-md"
    }
  >
    <ChevronDown aria-hidden="true" className={CHEVRON} />
  </div>
);

const AvatarReflectionSvg: FC<{ gradientId: string }> = ({ gradientId }) => (
  <svg viewBox="0 0 7.2 2.85" fill="none" className="mt-[10%] h-[20%] w-[60%]" aria-hidden="true">
    <path
      d="M7.2 1.83107C7.2 2.84235 5.58823 2.19729 3.6 2.19729C1.61177 2.19729 0 2.84235 0 1.83107C0 0.8198 1.61177 0 3.6 0C5.58823 0 7.2 0.8198 7.2 1.83107Z"
      fill={`url(#${gradientId})`}
      fillOpacity={0.4}
    />
    <defs>
      <linearGradient id={gradientId} x1="3.6" y1="0" x2="3.6" y2="2.4" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity={0.1} />
      </linearGradient>
    </defs>
  </svg>
);

type RingedAvatarProps = { ringSize: "!size-8" | "!size-10"; dot: "!size-2" | "!size-2.5" };

const RingedAvatarWithOnline: FC<RingedAvatarProps> = ({ ringSize, dot }) => {
  const gid = useId().replace(/:/g, "");
  return (
    <div data-avatar="true" className={`relative inline-flex shrink-0 rounded-full p-px ring-1 ring-secondary_alt ${ringSize}`}>
      <div className={AVATAR_GLOSS_INNER}>
        <img data-avatar-img="true" className="!size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
      </div>
      <span
        className={`absolute right-0 bottom-0 flex justify-center rounded-full bg-fg-success-secondary ring-[1.5px] ring-bg-primary ${dot}`}
        style={ONLINE_STATUS_GLOSS}
      >
        <AvatarReflectionSvg gradientId={gid} />
      </span>
    </div>
  );
};

export const AccountCardXsSmTrigger: FC = () => (
  <AriaButton
    type="button"
    className="relative flex w-38 cursor-pointer items-center gap-1.5 rounded-lg bg-primary_alt p-2 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 outline-focus-ring"
  >
    <div data-avatar="true" className="relative inline-flex shrink-0 rounded-full !size-5">
      <div className={AVATAR_XS_INNER}>
        <img data-avatar-img="true" className="!size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
      </div>
    </div>
    <p className="!text-sm !font-semibold !text-primary">Olivia Rhye</p>
    <TriggerChevron offset="tight" />
  </AriaButton>
);

export const AccountCardSmTrigger: FC = () => (
  <AriaButton
    type="button"
    className="relative flex w-42 cursor-pointer items-center gap-2 rounded-lg bg-primary_alt p-1.5 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 outline-focus-ring"
  >
    <RingedAvatarWithOnline ringSize="!size-8" dot="!size-2" />
    <p className="!text-sm !font-semibold !text-primary">Olivia Rhye</p>
    <TriggerChevron offset="md" />
  </AriaButton>
);

export const AccountCardMdTrigger: FC = () => (
  <AriaButton
    type="button"
    className="relative w-60 cursor-pointer rounded-lg bg-primary_alt p-2 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 outline-focus-ring"
  >
    <figure className="group flex min-w-0 flex-1 items-center gap-2">
      <RingedAvatarWithOnline ringSize="!size-10" dot="!size-2.5" />
      <figcaption className="min-w-0 flex-1">
        <p className="!text-sm !font-semibold !text-primary">Olivia Rhye</p>
        <p className="!truncate !text-sm !text-tertiary">olivia@codex.io</p>
      </figcaption>
    </figure>
    <TriggerChevron offset="md" />
  </AriaButton>
);
