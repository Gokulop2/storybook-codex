import { useMemo, useState, type FC } from "react";
import { Avatar, Button, Dropdown } from "@opus2-platform/codex";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Cube01,
  HelpCircle,
  LayersTwo01,
  LogOut01,
  Moon01,
  Plus,
  SearchLg,
  Settings01,
  Trash01,
  User01,
} from "@opus2-platform/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button as AriaButton,
  SubmenuTrigger as AriaSubmenuTrigger,
  type Selection,
} from "react-aria-components";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/untitled-docs-scaffold";
import {
  ACCOUNT_CARD_DOCS_PREVIEW_CLASS,
  CODEX_DOCS_AVATAR_SRC,
  AccountCardMdTrigger,
  AccountCardSmTrigger,
  AccountCardXsSmTrigger,
} from "../_docs/account-card-menu-triggers";
import { DOCS_PREVIEW_HERO_SURFACE_CLASS, DOCS_SECTION_HERO_CLASS, DocsSection, SectionTitle } from "../_docs/untitled-docs-preview-code";

type IntegrationsIconProps = { className?: string };

const IntegrationsViewAsMarkdownIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="m7 15 3-3-3-3m6 6h4m-9.2 6h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 18.72 21 17.88 21 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21Z" />
  </svg>
);

const IntegrationsCopyAsMarkdownIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" />
  </svg>
);

const IntegrationsV0Icon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      d="M11.7213 5.02356H16.4951C18.4308 5.02356 20 6.59277 20 8.52849V13.0812H18.0393V8.52849C18.0393 8.48185 18.0375 8.43554 18.0339 8.38965L13.2601 13.0804C13.2762 13.0809 13.2923 13.0812 13.3085 13.0812H18.0393V14.933H13.3085C11.3728 14.933 9.76054 13.3485 9.76054 11.4127V6.87216H11.7213V11.4127C11.7213 11.5002 11.7281 11.5866 11.7412 11.6713L16.6201 6.87731C16.5789 6.8739 16.5373 6.87216 16.4951 6.87216H11.7213V5.02356Z"
      fill="currentColor"
    />
    <path
      d="M6.89927 14.5917L0 6.87101H2.77565L6.82628 11.4038V6.87101H8.8959V13.8295C8.8959 14.8797 7.59905 15.3747 6.89927 14.5917Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsClaudeIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      d="M4.68092 12.639L7.83292 10.879L7.88092 10.719L7.83292 10.639H7.67292L7.14492 10.607L5.35292 10.559L3.78492 10.479L2.26492 10.399L1.88092 10.319L1.54492 9.83902L1.57692 9.59902L1.89692 9.39102L2.36092 9.42302L3.36892 9.50302L4.88892 9.59902L5.99292 9.66302L7.62492 9.85502H7.88092L7.91292 9.74302L7.83292 9.67902L7.76892 9.61502L6.18492 8.55902L4.48892 7.43902L3.59292 6.78302L3.11292 6.46302L2.87292 6.14302L2.77692 5.47102L3.20892 4.99102L3.80092 5.03902L3.94492 5.07102L4.53692 5.53502L5.81692 6.51102L7.46492 7.75902L7.70492 7.95102L7.80092 7.88702L7.81692 7.83902L7.70492 7.66302L6.82492 5.99902L5.86492 4.33502L5.43292 3.64702L5.32092 3.23102C5.27292 3.07102 5.25692 2.91102 5.25692 2.75102L5.73692 2.07902L6.02492 1.99902L6.69692 2.09502L6.95292 2.31902L7.36892 3.27902L8.02492 4.76702L9.06492 6.78302L9.38492 7.39102L9.54492 7.93502L9.59292 8.09502H9.70492V8.01502L9.78492 6.86302L9.94492 5.47102L10.1049 3.67902L10.1529 3.16702L10.4089 2.55902L10.8889 2.23902L11.3049 2.41502L11.6249 2.87902L11.5769 3.16702L11.4009 4.39902L10.9849 6.33502L10.7449 7.64702H10.8889L11.0489 7.47102L11.7049 6.60702L12.8089 5.23102L13.2889 4.67102L13.8649 4.07902L14.2329 3.79102H14.9209L15.4169 4.54302L15.1929 5.32702L14.4889 6.22302L13.8969 6.97502L13.0489 8.11102L12.5369 9.02302L12.5849 9.08702H12.6969L14.6169 8.67102L15.6409 8.49502L16.8569 8.28702L17.4169 8.54302L17.4809 8.79902L17.2569 9.34302L15.9449 9.66302L14.4089 9.98302L12.1209 10.511L12.0889 10.527L12.1209 10.575L13.1449 10.671L13.5929 10.703H14.6809L16.6969 10.863L17.2249 11.183L17.5289 11.615L17.4809 11.935L16.6649 12.351L15.5769 12.095L13.0169 11.487L12.1529 11.279H12.0249V11.343L12.7609 12.063L14.0889 13.263L15.7849 14.815L15.8649 15.199L15.6569 15.519L15.4329 15.487L13.9609 14.367L13.3849 13.887L12.1049 12.799H12.0249V12.911L12.3129 13.343L13.8809 15.695L13.9609 16.415L13.8489 16.639L13.4329 16.799L13.0009 16.703L12.0729 15.423L11.1129 13.983L10.3609 12.671L10.2809 12.735L9.81692 17.567L9.60892 17.807L9.12892 17.999L8.72892 17.679L8.50492 17.199L8.72892 16.207L8.98492 14.927L9.19292 13.903L9.38492 12.639L9.49692 12.223V12.191H9.38492L8.42492 13.519L6.98492 15.487L5.83292 16.703L5.56092 16.815L5.08092 16.575L5.12892 16.127L5.38492 15.759L6.98492 13.711L7.94492 12.447L8.58492 11.711L8.56892 11.631H8.52092L4.29692 14.383L3.54492 14.479L3.22492 14.159L3.25692 13.679L3.41692 13.519L4.69692 12.639H4.68092Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsBoltIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2 15.9872C10.075 15.9872 8.95 15.6122 8.35001 14.7122L8.12501 15.7622L4 17.9372L4.45 15.7622L7.44999 2.11218H11.125L10.075 6.91219C10.9 6.0122 11.725 5.63719 12.775 5.63719C15.025 5.63719 16.45 7.06219 16.45 9.7622C16.45 12.4622 14.725 15.9872 11.2 15.9872ZM12.625 10.5122C12.625 11.7872 11.725 12.7622 10.525 12.7622C9.32501 12.7622 9.25 12.5372 8.87499 12.0872L9.47501 9.61219C9.92499 9.16218 10.375 8.93717 10.975 8.93717C11.875 8.93717 12.625 9.61219 12.625 10.5872V10.5122Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsLovableIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <g clipPath="url(#lovable-clip)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.63094 2.5C9.91191 2.5 11.7619 4.35417 11.7619 6.64214V8.21643H13.1367C15.4178 8.21643 17.2677 10.0706 17.2677 12.3585C17.2677 14.6452 15.4185 16.5 13.1367 16.5H3.5V6.64144C3.5 4.35417 5.34927 2.5 7.63094 2.5Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="lovable-clip">
        <rect width="14" height="14" fill="white" transform="translate(3.5 2.5)" />
      </clipPath>
    </defs>
  </svg>
);

const IntegrationsCursorIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      d="M16.9301 5.52368L10.1245 1.59453C9.90599 1.46833 9.63633 1.46833 9.4178 1.59453L2.61256 5.52368C2.42885 5.62975 2.31543 5.82592 2.31543 6.03838V13.9615C2.31543 14.174 2.42885 14.3702 2.61256 14.4762L9.41812 18.4054C9.63665 18.5316 9.90631 18.5316 10.1248 18.4054L16.9304 14.4762C17.1141 14.3702 17.2275 14.174 17.2275 13.9615V6.03838C17.2275 5.82592 17.1141 5.62975 16.9304 5.52368H16.9301ZM16.5026 6.35596L9.93283 17.7351C9.88842 17.8118 9.77116 17.7805 9.77116 17.6916V10.2407C9.77116 10.0918 9.69161 9.95411 9.56253 9.87935L3.11001 6.15404C3.03333 6.10963 3.06465 5.99237 3.15346 5.99237H16.293C16.4796 5.99237 16.5962 6.19461 16.5029 6.35628H16.5026V6.35596Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsChatGPTIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      d="M11.2097 18C10.6764 18 10.1697 17.8987 9.68969 17.696C9.20969 17.4933 8.78302 17.2107 8.40969 16.848C8.00435 16.9867 7.58302 17.056 7.14569 17.056C6.43102 17.056 5.76969 16.88 5.16169 16.528C4.55369 16.176 4.06302 15.696 3.68969 15.088C3.32702 14.48 3.14569 13.8027 3.14569 13.056C3.14569 12.7467 3.18835 12.4107 3.27369 12.048C2.84702 11.6533 2.51635 11.2 2.28169 10.688C2.04702 10.1653 1.92969 9.62133 1.92969 9.056C1.92969 8.48 2.05235 7.92533 2.29769 7.392C2.54302 6.85867 2.88435 6.4 3.32169 6.016C3.76969 5.62133 4.28702 5.34933 4.87369 5.2C4.99102 4.592 5.23635 4.048 5.60969 3.568C5.99369 3.07733 6.46302 2.69333 7.01769 2.416C7.57235 2.13867 8.16435 2 8.79369 2C9.32702 2 9.83369 2.10133 10.3137 2.304C10.7937 2.50667 11.2204 2.78933 11.5937 3.152C11.999 3.01333 12.4204 2.944 12.8577 2.944C13.5724 2.944 14.2337 3.12 14.8417 3.472C15.4497 3.824 15.935 4.304 16.2977 4.912C16.671 5.52 16.8577 6.19733 16.8577 6.944C16.8577 7.25333 16.815 7.58933 16.7297 7.952C17.1564 8.34667 17.487 8.80533 17.7217 9.328C17.9564 9.84 18.0737 10.3787 18.0737 10.944C18.0737 11.52 17.951 12.0747 17.7057 12.608C17.4604 13.1413 17.1137 13.6053 16.6657 14C16.2284 14.384 15.7164 14.6507 15.1297 14.8C15.0124 15.408 14.7617 15.952 14.3777 16.432C14.0044 16.9227 13.5404 17.3067 12.9857 17.584C12.431 17.8613 11.839 18 11.2097 18Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsPerplexityIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      d="M17.5473 6.0119H15.6608V2.44739C15.6607 2.32801 15.6268 2.2111 15.563 2.11022C15.4992 2.00933 15.408 1.92862 15.3002 1.87743C15.1915 1.82854 15.0715 1.81046 14.9532 1.82517C14.835 1.83988 14.723 1.88681 14.6296 1.96084L10.6285 5.29066V1.62966C10.6285 1.28621 10.3439 1 9.99962 1C9.65617 1 9.36997 1.28621 9.36997 1.62966V5.29884L5.37042 1.96084C5.27905 1.88289 5.16683 1.83345 5.04765 1.81862C4.92847 1.8038 4.80756 1.82424 4.69988 1.87743C4.59203 1.92862 4.5009 2.00933 4.43707 2.11022C4.37324 2.2111 4.33932 2.32801 4.33926 2.44739V6.01272H2.4511C2.2848 6.01379 2.12559 6.08027 2.00792 6.1978C1.89024 6.31532 1.82355 6.47444 1.82227 6.64074V13.3503C1.82227 13.6937 2.10766 13.9799 2.45192 13.9799H4.33844V17.5444C4.33844 17.7873 4.48072 18.0138 4.69824 18.1144C4.78235 18.1548 4.87478 18.175 4.96809 18.1733C5.11413 18.1716 5.25543 18.1212 5.3696 18.0302L9.37078 14.7012V18.3703C9.37078 18.7138 9.65536 19 9.99962 19C10.3431 19 10.6293 18.7138 10.6293 18.3703V14.7012L14.6296 18.0302C14.744 18.1214 14.8856 18.1718 15.032 18.1733C15.1247 18.1748 15.2166 18.1546 15.3002 18.1144C15.408 18.0632 15.4992 17.9825 15.563 17.8816C15.6268 17.7807 15.6607 17.6638 15.6608 17.5444V13.9791H17.5481C17.8916 13.9791 18.177 13.6945 18.177 13.3503V6.64074C18.1757 6.47422 18.1089 6.31489 17.9911 6.19722C17.8733 6.07954 17.7138 6.01297 17.5473 6.0119Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsGeminiIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      d="M9.81623 1.00006C10.005 1.00006 10.1692 1.12898 10.2152 1.3121C10.3564 1.87222 10.5405 2.41856 10.7697 2.95003C11.3666 4.33676 12.1857 5.55055 13.2256 6.59048C14.266 7.63039 15.4794 8.44948 16.8661 9.04643C17.398 9.27557 17.9439 9.45971 18.504 9.60089C18.6871 9.64693 18.816 9.81114 18.816 9.99988C18.816 10.1886 18.6871 10.3528 18.504 10.3988C17.9439 10.54 17.3975 10.7242 16.8661 10.9533C15.4793 11.5503 14.2655 12.3694 13.2256 13.4093C12.1857 14.4497 11.3666 15.663 10.7697 17.0497C10.5405 17.5817 10.3564 18.1276 10.2152 18.6876C10.1692 18.8708 10.005 18.9997 9.81623 18.9997C9.62748 18.9997 9.46328 18.8708 9.41724 18.6876C9.27606 18.1276 9.09191 17.5812 8.86278 17.0497C8.26583 15.663 7.44723 14.4492 6.40683 13.4093C5.36637 12.3694 4.15311 11.5503 2.76637 10.9533C2.23439 10.7242 1.68856 10.54 1.12844 10.3988C0.945322 10.3528 0.816406 10.1886 0.816406 9.99988C0.81643 9.81114 0.945334 9.64693 1.12844 9.60089C1.68857 9.45971 2.2349 9.27559 2.76637 9.04643C4.15314 8.44946 5.3669 7.63042 6.40683 6.59048C7.44676 5.55055 8.2658 4.33679 8.86278 2.95003C9.09194 2.41804 9.27606 1.87222 9.41724 1.3121C9.46328 1.12899 9.62748 1.00009 9.81623 1.00006Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsFigmaIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.49967 3.33333C7.00867 3.33333 6.54071 3.52419 6.19799 3.8593C5.85577 4.19391 5.66634 4.64451 5.66634 5.11111C5.66634 5.57771 5.85577 6.02831 6.19799 6.36292C6.54071 6.69803 7.00867 6.88889 7.49967 6.88889H9.33301V3.33333H7.49967ZM10.6663 3.33333V6.88889H12.4997C12.7425 6.88889 12.9826 6.84211 13.2061 6.75157C13.4297 6.66105 13.6318 6.52874 13.8013 6.36292C13.9709 6.19714 14.1046 6.00114 14.1955 5.78651C14.2864 5.57192 14.333 5.34247 14.333 5.11111C14.333 4.87976 14.2864 4.6503 14.1955 4.43571C14.1046 4.22108 13.9709 4.02509 13.8013 3.8593C13.6318 3.69348 13.4297 3.56118 13.2061 3.47065C12.9826 3.38011 12.7425 3.33333 12.4997 3.33333H10.6663ZM14.4586 7.55556C14.5546 7.48127 14.6465 7.40141 14.7335 7.31627C15.0283 7.02807 15.2629 6.68513 15.4232 6.30661C15.5836 5.92805 15.6663 5.52177 15.6663 5.11111C15.6663 4.70045 15.5836 4.29417 15.4232 3.91561C15.2629 3.53709 15.0283 3.19415 14.7335 2.90596C14.4388 2.6178 14.0897 2.38999 13.7067 2.23483C13.3235 2.07967 12.9135 2 12.4997 2H7.49967C6.66459 2 5.86079 2.32422 5.26583 2.90596C4.67036 3.48819 4.33301 4.2811 4.33301 5.11111C4.33301 5.94113 4.67036 6.73403 5.26583 7.31627C5.35315 7.40165 5.44497 7.48148 5.54073 7.55555C5.44497 7.62963 5.35315 7.70947 5.26583 7.79485C4.67036 8.37708 4.33301 9.17 4.33301 10C4.33301 10.83 4.67036 11.6229 5.26583 12.2051C5.35315 12.2905 5.44497 12.3704 5.54073 12.4445C5.44497 12.5185 5.35315 12.5983 5.26583 12.6837C4.67036 13.266 4.33301 14.0589 4.33301 14.8889C4.33301 15.7189 4.67036 16.5118 5.26583 17.0941C5.86079 17.6758 6.66459 18 7.49967 18C8.33474 18 9.13854 17.6758 9.73354 17.0941C10.329 16.5118 10.6663 15.7189 10.6663 14.8889V12.5367C10.8611 12.6726 11.0712 12.7866 11.2927 12.8763C11.6758 13.0315 12.0859 13.1111 12.4997 13.1111C12.9135 13.1111 13.3235 13.0315 13.7067 12.8763C14.0897 12.7211 14.4388 12.4933 14.7335 12.2051C15.0283 11.9169 15.2629 11.574 15.4232 11.1955C15.5836 10.8169 15.6663 10.4107 15.6663 10C15.6663 9.58933 15.5836 9.18307 15.4232 8.80453C15.2629 8.42599 15.0283 8.08304 14.7335 7.79485C14.6465 7.70971 14.5546 7.62984 14.4586 7.55556Z"
      fill="currentColor"
    />
  </svg>
);

const IntegrationsGitHubIcon: FC<IntegrationsIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z"
      fill="currentColor"
    />
  </svg>
);

const SEARCH_SIMPLE_ITEMS = [
  { id: "olivia", label: "Olivia Rhye" },
  { id: "phoenix", label: "Phoenix Baker" },
  { id: "lana", label: "Lana Steiner" },
  { id: "demi", label: "Demi Wilkinson" },
  { id: "candice", label: "Candice Wu" },
  { id: "natali", label: "Natali Craig" },
  { id: "drew", label: "Drew Cano" },
  { id: "orlando", label: "Orlando Diggs" },
  { id: "andi", label: "Andi Lane" },
] as const;

const SEARCH_SIMPLE_DEFAULT_SELECTED_KEYS = ["olivia", "phoenix", "lana", "demi", "natali", "andi"] as const;
const SEARCH_ADVANCED_ITEMS = [
  { id: "codex", label: "Codex" },
  { id: "shutterframe", label: "Shutterframe" },
  { id: "warpspeed", label: "Warpspeed" },
  { id: "contrastai", label: "ContrastAI" },
  { id: "launchsimple", label: "LaunchSimple" },
  { id: "elasticware", label: "Elasticware" },
] as const;
const SEARCH_ADVANCED_DEFAULT_SELECTED_KEYS = ["codex", "shutterframe", "warpspeed", "launchsimple"] as const;

const CODEX_TEAM_MEMBER_IDS = ["olivia", "phoenix", "lana", "demi"] as const;

function selectionToKeySet(sel: Selection, allKeys: readonly string[]): Set<string> {
  if (sel === "all") return new Set(allKeys);
  return new Set([...sel].map(String));
}

const SearchSimpleDropdown: FC = () => {
  const [query, setQuery] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(() => new Set(SEARCH_SIMPLE_DEFAULT_SELECTED_KEYS));

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return SEARCH_SIMPLE_ITEMS;
    return SEARCH_SIMPLE_ITEMS.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const allIds = useMemo(() => SEARCH_SIMPLE_ITEMS.map((i) => i.id), []);
  const allFilteredSelected = useMemo(() => {
    if (filteredItems.length === 0) return false;
    const set = selectionToKeySet(selectedKeys, allIds);
    return filteredItems.every((item) => set.has(item.id));
  }, [filteredItems, selectedKeys, allIds]);

  return (
    <Dropdown.Root>
      <AriaButton className="text-secondary outline-focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
        {allFilteredSelected ? (
          <Check aria-hidden="true" className="text-fg-brand-primary size-4 shrink-0 stroke-[2.25px]" />
        ) : null}
        Manage access
        <ChevronDown data-icon className="text-fg-quaternary size-4" />
      </AriaButton>
      <Dropdown.Popover className="w-60">
        <div className="flex gap-3 border-b border-secondary p-3">
          <div className="group/input relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset">
            <SearchLg className="pointer-events-none absolute left-3 size-5 text-fg-quaternary" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="m-0 w-full bg-transparent px-3 py-2 pl-10 text-md text-primary outline-hidden placeholder:text-placeholder"
              placeholder="Search"
            />
          </div>
        </div>
        <Dropdown.Menu
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          items={filteredItems}
        >
          {(item) => <Dropdown.Item id={item.id}>{item.label}</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

const SearchAdvancedDropdown: FC = () => {
  const [query, setQuery] = useState("");
  const [teamMemberSelection, setTeamMemberSelection] = useState<Selection>(() => new Set(CODEX_TEAM_MEMBER_IDS));
  const [topLevelSelection, setTopLevelSelection] = useState<Selection>(() => new Set(SEARCH_ADVANCED_DEFAULT_SELECTED_KEYS));

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return SEARCH_ADVANCED_ITEMS;
    return SEARCH_ADVANCED_ITEMS.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const hasCodexRow = filteredItems.some((item) => item.id === "codex");

  const teamSet = selectionToKeySet(teamMemberSelection, CODEX_TEAM_MEMBER_IDS);
  const allTeamSelected = CODEX_TEAM_MEMBER_IDS.every((id) => teamSet.has(id));
  const someTeamSelected =
    !allTeamSelected && CODEX_TEAM_MEMBER_IDS.some((id) => teamSet.has(id));

  const advancedIds = useMemo(() => SEARCH_ADVANCED_ITEMS.map((i) => i.id), []);
  const allFilteredSelected = useMemo(() => {
    if (filteredItems.length === 0) return false;
    const set = selectionToKeySet(topLevelSelection, advancedIds);
    return filteredItems.every((item) => set.has(item.id));
  }, [filteredItems, topLevelSelection, advancedIds]);

  return (
    <Dropdown.Root>
      <AriaButton className="text-secondary outline-focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
        {allFilteredSelected ? (
          <Check aria-hidden="true" className="text-fg-brand-primary size-4 shrink-0 stroke-[2.25px]" />
        ) : null}
        Manage access
        <ChevronDown data-icon className="text-fg-quaternary size-4" />
      </AriaButton>

      <Dropdown.Popover className="w-60">
        <div className="flex gap-3 border-b border-secondary p-3">
          <div className="group/input relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset">
            <SearchLg className="pointer-events-none absolute left-3 size-5 text-fg-quaternary" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="m-0 w-full bg-transparent px-3 py-2 pl-10 text-md text-primary outline-hidden placeholder:text-placeholder"
              placeholder="Search"
            />
          </div>
        </div>

        <Dropdown.Menu
          selectionMode="multiple"
          selectedKeys={topLevelSelection}
          onSelectionChange={setTopLevelSelection}
        >
          {hasCodexRow ? (
            <AriaSubmenuTrigger>
              <Dropdown.Item id="codex" textValue="Codex" unstyled>
                {(state) => (
                  <div
                    className={`outline-focus-ring relative flex items-center rounded-md px-2.5 py-2 pr-1.5 transition duration-100 ease-linear ${
                      !state.isDisabled ? "group-hover:bg-primary_hover" : ""
                    } ${state.isFocused ? "bg-primary_hover" : ""} ${state.isFocusVisible ? "outline-2 -outline-offset-2" : ""}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`relative mr-2 flex size-4 shrink-0 items-center justify-center rounded ring-1 ring-inset ${
                        allTeamSelected || someTeamSelected ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`pointer-events-none absolute h-3 w-2.5 text-fg-white transition-inherit-all ${
                          someTeamSelected && !allTeamSelected ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`pointer-events-none absolute size-3 text-fg-white transition-inherit-all ${
                          allTeamSelected ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="grow truncate text-sm font-semibold text-secondary">Codex</span>
                    <ChevronRight aria-hidden="true" className="ml-auto size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
                  </div>
                )}
              </Dropdown.Item>
              <Dropdown.Popover placement="right" className="w-50">
                <Dropdown.Menu
                  selectionMode="multiple"
                  selectedKeys={teamMemberSelection}
                  onSelectionChange={setTeamMemberSelection}
                >
                  {[
                    { id: "olivia", label: "Olivia Rhye", src: CODEX_DOCS_AVATAR_SRC },
                    { id: "phoenix", label: "Phoenix Baker", src: CODEX_DOCS_AVATAR_SRC },
                    { id: "lana", label: "Lana Steiner", src: CODEX_DOCS_AVATAR_SRC },
                    { id: "demi", label: "Demi Wilkinson", src: CODEX_DOCS_AVATAR_SRC },
                  ].map((member) => (
                    <Dropdown.Item key={member.id} id={member.id} unstyled>
                      {(itemState) => (
                        <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                          <div
                            className={`relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover ${
                              itemState.isFocused ? "bg-primary_hover" : ""
                            } ${itemState.isFocusVisible ? "outline-2 -outline-offset-2" : ""}`}
                          >
                            <div className="mr-2 flex size-4 items-center justify-center">
                              <div className="relative inline-flex size-5 shrink-0 rounded-full">
                                <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                                  <img className="size-full object-cover" src={member.src} alt="" />
                                </div>
                              </div>
                            </div>
                            <span className="grow truncate text-sm font-semibold text-secondary">{member.label}</span>
                            <div
                              className={`relative ml-1 flex size-4 shrink-0 items-center justify-center rounded ring-1 ring-inset ${
                                itemState.isSelected ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                              }`}
                            >
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 14 14"
                                fill="none"
                                className={`pointer-events-none absolute size-3 text-fg-white transition-inherit-all ${
                                  itemState.isSelected ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="pointer-events-none absolute h-3 w-2.5 text-fg-white opacity-0 transition-inherit-all"
                              >
                                <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </AriaSubmenuTrigger>
          ) : null}
          {filteredItems
            .filter((item) => item.id !== "codex")
            .map((item) => (
              <Dropdown.Item key={item.id} id={item.id}>
                {item.label}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>

        <div className="flex flex-col gap-3 border-t border-secondary p-3">
          <Button color="secondary" iconLeading={Plus}>
            Create team
          </Button>
        </div>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

const AccountCardXsDropdown: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<"olivia" | "sienna">("sienna");

  return (
    <Dropdown.Root>
      <AccountCardXsSmTrigger />
      <Dropdown.Popover className="w-50 !flex !max-h-[min(100vh-8rem,26rem)] !flex-col !overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Dropdown.Menu selectionMode="none" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <Dropdown.Section>
            <Dropdown.Item icon={Settings01} addon="⌘S">
              Settings
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item id="dark-mode" textValue="Dark mode" unstyled onAction={() => setIsDarkMode((prev) => !prev)}>
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <Moon01 aria-hidden="true" className="mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
                  <span className="grow truncate text-sm font-semibold text-secondary">Dark mode</span>
                  <span
                    className={`ml-1 h-4 w-8 shrink-0 rounded-full ring-1 ring-inset transition duration-150 ease-linear ${
                      isDarkMode ? "bg-brand-solid ring-transparent" : "bg-tertiary ring-secondary"
                    }`}
                  >
                    <span
                      className={`block size-4 rounded-full border bg-fg-white shadow-xs transition-[transform,border-color] duration-150 ease-linear ${
                        isDarkMode ? "translate-x-4 border-toggle-slim-border_pressed" : "border-toggle-border"
                      }`}
                    />
                  </span>
                </div>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Switch Account</Dropdown.SectionHeader>
            <Dropdown.Item id="olivia" textValue="Olivia Rhye" unstyled onAction={() => setSelectedAccount("olivia")}>
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <div className="mr-2 flex size-4 items-center justify-center">
                    <div className="relative inline-flex size-5 shrink-0 rounded-full">
                      <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                        <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                      </div>
                    </div>
                  </div>
                  <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>
                  <div
                    className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                      selectedAccount === "olivia" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                    }`}
                  >
                    <div className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${selectedAccount === "olivia" ? "opacity-100" : "opacity-0"}`} />
                  </div>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item id="sienna" textValue="Sienna Hewitt" unstyled onAction={() => setSelectedAccount("sienna")}>
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <div className="mr-2 flex size-4 items-center justify-center">
                    <div className="relative inline-flex size-5 shrink-0 rounded-full">
                      <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                        <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                      </div>
                    </div>
                  </div>
                  <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>
                  <div
                    className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                      selectedAccount === "sienna" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                    }`}
                  >
                    <div className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${selectedAccount === "sienna" ? "opacity-100" : "opacity-0"}`} />
                  </div>
                </div>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Section>
            <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <AriaSubmenuTrigger>
              <Dropdown.Item icon={LogOut01}>Sign out</Dropdown.Item>
              <Dropdown.Popover placement="right" className="w-50">
                <Dropdown.Menu selectionMode="none">
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </AriaSubmenuTrigger>
          </Dropdown.Section>
        </Dropdown.Menu>
        </div>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

/** Account card (sm): PRO header + scrollable menu + footer — single `Dropdown.Menu` (RAC MenuTrigger). */
const AccountCardSmDropdown: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<"olivia" | "sienna">("olivia");

  return (
    <Dropdown.Root>
      <AccountCardSmTrigger />
      <Dropdown.Popover className="w-60 !flex !max-h-[min(100vh-8rem,26rem)] !flex-col !overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-secondary px-4 py-3">
            <p className="text-sm font-semibold text-primary">PRO account</p>
            <p className="text-sm text-tertiary">olivia@codex.io</p>
          </div>

          <Dropdown.Menu selectionMode="none" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
            <Dropdown.Section>
              <Dropdown.Item icon={User01} addon="⌘K-&gt;P">
                View profile
              </Dropdown.Item>
              <Dropdown.Item icon={Settings01} addon="⌘S">
                Settings
              </Dropdown.Item>
            </Dropdown.Section>

            <Dropdown.Section>
              <Dropdown.Item id="dark-mode-sm" textValue="Dark mode" unstyled onAction={() => setIsDarkMode((prev) => !prev)}>
                <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                  <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                    <Moon01 aria-hidden="true" className="mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
                    <span className="grow truncate text-sm font-semibold text-secondary">Dark mode</span>
                    <span
                      className={`ml-1 h-4 w-8 shrink-0 rounded-full ring-1 ring-inset transition duration-150 ease-linear ${
                        isDarkMode ? "bg-brand-solid ring-transparent" : "bg-tertiary ring-secondary"
                      }`}
                    >
                      <span
                        className={`block size-4 rounded-full border bg-fg-white shadow-xs transition-[transform,border-color] duration-150 ease-linear ${
                          isDarkMode ? "translate-x-4 border-toggle-slim-border_pressed" : "border-toggle-border"
                        }`}
                      />
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>

            <Dropdown.Section>
              <AriaSubmenuTrigger>
                <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                <Dropdown.Popover placement="right" className="w-50">
                  <Dropdown.Menu selectionMode="none">
                    <Dropdown.Item>Documentation</Dropdown.Item>
                    <Dropdown.Item>Contact support</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </AriaSubmenuTrigger>
            </Dropdown.Section>

            <Dropdown.Separator />

            <Dropdown.Section>
              <Dropdown.SectionHeader className="px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary">
                Switch Account
              </Dropdown.SectionHeader>
              <Dropdown.Item id="olivia-sm" textValue="Olivia Rhye" unstyled onAction={() => setSelectedAccount("olivia")}>
                <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                  <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                    <div className="mr-2 flex size-4 items-center justify-center">
                      <div className="relative inline-flex size-5 shrink-0 rounded-full">
                        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                          <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                        </div>
                      </div>
                    </div>
                    <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>
                    <div
                      className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                        selectedAccount === "olivia" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                      }`}
                    >
                      <div
                        className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${selectedAccount === "olivia" ? "opacity-100" : "opacity-0"}`}
                      />
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item id="sienna-sm" textValue="Sienna Hewitt" unstyled onAction={() => setSelectedAccount("sienna")}>
                <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                  <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                    <div className="mr-2 flex size-4 items-center justify-center">
                      <div className="relative inline-flex size-5 shrink-0 rounded-full">
                        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                          <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                        </div>
                      </div>
                    </div>
                    <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>
                    <div
                      className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                        selectedAccount === "sienna" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                      }`}
                    >
                      <div
                        className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${selectedAccount === "sienna" ? "opacity-100" : "opacity-0"}`}
                      />
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>

            <Dropdown.Section>
              <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
            </Dropdown.Section>

            <Dropdown.Separator />

            <Dropdown.Section>
              <AriaSubmenuTrigger>
                <Dropdown.Item icon={LogOut01}>Sign out</Dropdown.Item>
                <Dropdown.Popover placement="right" className="w-50">
                  <Dropdown.Menu selectionMode="none">
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </AriaSubmenuTrigger>
            </Dropdown.Section>
          </Dropdown.Menu>

          <div className="flex shrink-0 justify-between border-t border-secondary px-4 py-3">
            <span className="truncate text-sm text-quaternary">© Codex</span>
            <span className="text-sm text-quaternary">v12.6.8</span>
          </div>
        </div>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

const AccountCardMdDropdown: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [company, setCompany] = useState<"codex" | "sisyphus">("codex");

  return (
    <Dropdown.Root>
      <AccountCardMdTrigger />
      <Dropdown.Popover className="w-60 !flex !max-h-[min(100vh-8rem,26rem)] !flex-col !overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-secondary px-4 py-3">
            <p className="text-sm font-semibold text-primary">PRO account</p>
            <p className="text-sm text-tertiary">Renews 10 August 2028</p>
          </div>

          <Dropdown.Menu selectionMode="none" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <Dropdown.Section>
            <Dropdown.Item icon={User01} addon="⌘K-&gt;P">
              View profile
            </Dropdown.Item>
            <Dropdown.Item icon={Settings01} addon="⌘S">
              Settings
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Section>
            <Dropdown.Item id="dark-mode-md" textValue="Dark mode" unstyled onAction={() => setIsDarkMode((prev) => !prev)}>
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <Moon01 aria-hidden="true" className="mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
                  <span className="grow truncate text-sm font-semibold text-secondary">Dark mode</span>
                  <span
                    className={`ml-1 h-4 w-8 shrink-0 rounded-full ring-1 ring-inset transition duration-150 ease-linear ${
                      isDarkMode ? "bg-brand-solid ring-transparent" : "bg-tertiary ring-secondary"
                    }`}
                  >
                    <span
                      className={`block size-4 rounded-full border bg-fg-white shadow-xs transition-[transform,border-color] duration-150 ease-linear ${
                        isDarkMode ? "translate-x-4 border-toggle-slim-border_pressed" : "border-toggle-border"
                      }`}
                    />
                  </span>
                </div>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Section>
            <AriaSubmenuTrigger>
              <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
              <Dropdown.Popover placement="right" className="w-50">
                <Dropdown.Menu selectionMode="none">
                  <Dropdown.Item>Documentation</Dropdown.Item>
                  <Dropdown.Item>Contact support</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </AriaSubmenuTrigger>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Company</Dropdown.SectionHeader>
            <Dropdown.Item id="codex" textValue="Codex" unstyled onAction={() => setCompany("codex")}>
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <span className="grow truncate text-sm font-semibold text-secondary">Codex</span>
                  <div
                    className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                      company === "codex" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                    }`}
                  >
                    <div className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${company === "codex" ? "opacity-100" : "opacity-0"}`} />
                  </div>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item id="sisyphus" textValue="Sisyphus Ventures" unstyled onAction={() => setCompany("sisyphus")}>
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <span className="grow truncate text-sm font-semibold text-secondary">Sisyphus Ventures</span>
                  <div
                    className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                      company === "sisyphus" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                    }`}
                  >
                    <div className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${company === "sisyphus" ? "opacity-100" : "opacity-0"}`} />
                  </div>
                </div>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Section>
            <Dropdown.Item icon={Plus}>New company</Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <AriaSubmenuTrigger>
              <Dropdown.Item icon={LogOut01}>Sign out</Dropdown.Item>
              <Dropdown.Popover placement="right" className="w-50">
                <Dropdown.Menu selectionMode="none">
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </AriaSubmenuTrigger>
          </Dropdown.Section>
        </Dropdown.Menu>

          <div className="flex shrink-0 justify-between border-t border-secondary px-4 py-3">
            <span className="truncate text-sm text-quaternary">© Codex</span>
            <span className="text-sm text-quaternary">v12.6.8</span>
          </div>
        </div>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

const AccountButtonDropdown: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<"olivia" | "sienna">("olivia");

  return (
    <Dropdown.Root>
      <Button type="button" color="secondary" iconTrailing={ChevronDown}>
        Account
      </Button>
      <Dropdown.Popover className="w-60 rounded-b-xl bg-secondary_alt">
        <div className="flex flex-col overflow-hidden rounded-b-xl">
          {/* MenuTrigger requires a Menu inside the popover; plain divs + buttons break RAC and can white-screen the canvas. */}
          <Dropdown.Menu selectionMode="none" className="rounded-b-xl bg-primary ring-1 ring-secondary">
            <Dropdown.Item icon={User01} addon="⌘K-&gt;P">
              View profile
            </Dropdown.Item>
            <Dropdown.Item icon={Settings01} addon="⌘S">
              Settings
            </Dropdown.Item>

            <Dropdown.Item
              id="dark-mode"
              textValue="Dark mode"
              unstyled
              onAction={() => setIsDarkMode((prev) => !prev)}
            >
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <Moon01 aria-hidden="true" className="mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
                  <span className="grow truncate text-sm font-semibold text-secondary">Dark mode</span>
                  <span
                    className={`ml-1 h-4 w-8 shrink-0 rounded-full ring-1 ring-inset outline-focus-ring transition duration-150 ease-linear ${
                      isDarkMode ? "bg-brand-solid ring-transparent" : "bg-tertiary ring-secondary"
                    }`}
                  >
                    <span
                      className={`block size-4 rounded-full bg-fg-white shadow-xs border transition-[transform,border-color,background-color] duration-150 ease-linear ${
                        isDarkMode ? "translate-x-4 rtl:-translate-x-4 border-toggle-slim-border_pressed" : "border-toggle-border"
                      }`}
                    />
                  </span>
                </div>
              </div>
            </Dropdown.Item>

            <AriaSubmenuTrigger>
              <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
              <Dropdown.Popover placement="right" className="w-62">
                <Dropdown.Menu>
                  <Dropdown.Item>Help center</Dropdown.Item>
                  <Dropdown.Item>Contact support</Dropdown.Item>
                  <Dropdown.Item>Send feedback</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </AriaSubmenuTrigger>

            <Dropdown.Separator />

            <Dropdown.Section>
              <header className="px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary" role="presentation">
                Switch Account
              </header>
              <Dropdown.Item id="olivia" textValue="Olivia Rhye" unstyled onAction={() => setSelectedAccount("olivia")}>
                <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                  <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                    <div className="mr-2 flex size-4 items-center justify-center">
                      <div className="relative inline-flex size-5 shrink-0 rounded-full">
                        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                          <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                        </div>
                      </div>
                    </div>
                    <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>
                    <div
                      className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                        selectedAccount === "olivia" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                      }`}
                    >
                      <div className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${selectedAccount === "olivia" ? "opacity-100" : "opacity-0"}`} />
                    </div>
                  </div>
                </div>
              </Dropdown.Item>

              <Dropdown.Item id="sienna" textValue="Sienna Hewitt" unstyled onAction={() => setSelectedAccount("sienna")}>
                <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                  <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                    <div className="mr-2 flex size-4 items-center justify-center">
                      <div className="relative inline-flex size-5 shrink-0 rounded-full">
                        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                          <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                        </div>
                      </div>
                    </div>
                    <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>
                    <div
                      className={`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                        selectedAccount === "sienna" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"
                      }`}
                    >
                      <div className={`size-1.5 rounded-full bg-fg-white transition-inherit-all ${selectedAccount === "sienna" ? "opacity-100" : "opacity-0"}`} />
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>

            <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
          </Dropdown.Menu>

          <div className="flex flex-col gap-3 border-t border-secondary p-3">
            <Button type="button" color="secondary" iconLeading={LogOut01} className="w-full justify-center">
              Sign out
            </Button>
          </div>
        </div>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

/** Avatar trigger + account panel: Menu inside Popover (RAC MenuTrigger), flex layout so header/footer stay put and the menu scrolls (avoids tiny max-height clipping). */
const AvatarDropdown: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Dropdown.Root>
      <AriaButton
        type="button"
        className="outline-focus-ring flex cursor-pointer items-center gap-2 rounded-md p-1 transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Avatar size="sm" src={CODEX_DOCS_AVATAR_SRC} alt="" />
      </AriaButton>
      <Dropdown.Popover className="w-60 !flex !max-h-[min(100vh-8rem,26rem)] !flex-col !overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-secondary p-3">
            <figure className="group flex min-w-0 flex-1 items-center gap-2">
              <div className="relative inline-flex size-10 shrink-0 rounded-full ring-1 ring-secondary_alt p-px">
                <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                  <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                </div>
                <span
                  className="absolute right-0 bottom-0 flex size-2.5 justify-center rounded-full bg-fg-success-secondary ring-[1.5px] ring-bg-primary"
                  style={{
                    backgroundImage:
                      "radial-gradient(43.75% 43.75% at 50% 28.75%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(50% 50%, rgba(255, 255, 255, 0) 74.66%, rgba(255, 255, 255, 0.18) 100%), radial-gradient(75% 75% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.08) 99%, rgba(255, 255, 255, 0) 100%)",
                  }}
                />
              </div>
              <figcaption className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-primary">Olivia Rhye</p>
                <p className="truncate text-sm text-tertiary">olivia@codex.io</p>
              </figcaption>
            </figure>
          </div>

          <Dropdown.Menu selectionMode="none" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
            <Dropdown.Item icon={User01} addon="⌘K-&gt;P">
              View profile
            </Dropdown.Item>
            <Dropdown.Item icon={Settings01} addon="⌘S">
              Settings
            </Dropdown.Item>

            <Dropdown.Item
              id="dark-mode"
              textValue="Dark mode"
              unstyled
              onAction={() => setIsDarkMode((prev) => !prev)}
            >
              <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                  <Moon01 aria-hidden="true" className="mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
                  <span className="grow truncate text-sm font-semibold text-secondary">Dark mode</span>
                  <span
                    className={`ml-1 h-4 w-8 shrink-0 rounded-full ring-1 ring-inset outline-focus-ring transition duration-150 ease-linear ${
                      isDarkMode ? "bg-brand-solid ring-transparent" : "bg-tertiary ring-secondary"
                    }`}
                  >
                    <span
                      className={`block size-4 rounded-full bg-fg-white shadow-xs border transition-[transform,border-color,background-color] duration-150 ease-linear ${
                        isDarkMode ? "translate-x-4 rtl:-translate-x-4 border-toggle-slim-border_pressed" : "border-toggle-border"
                      }`}
                    />
                  </span>
                </div>
              </div>
            </Dropdown.Item>

            <Dropdown.Separator />

            <Dropdown.Item icon={LayersTwo01} addon="⌘S">
              Changelog
            </Dropdown.Item>

            <AriaSubmenuTrigger>
              <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
              <Dropdown.Popover placement="right" className="w-50">
                <Dropdown.Menu>
                  <Dropdown.Item>Documentation</Dropdown.Item>
                  <Dropdown.Item>Contact support</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </AriaSubmenuTrigger>

            <Dropdown.Item icon={Cube01}>API</Dropdown.Item>
          </Dropdown.Menu>

          <div className="shrink-0 border-t border-secondary p-3">
            <Button type="button" color="secondary" iconLeading={LogOut01} className="w-full justify-center">
              Sign out
            </Button>
          </div>
        </div>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

const CutCopyPasteMenu: FC = () => (
  <>
    <Dropdown.Section>
      <Dropdown.Item addon="⌘X">Cut</Dropdown.Item>
      <Dropdown.Item addon="⌘C">Copy</Dropdown.Item>
      <Dropdown.Item addon="⌘V">Paste</Dropdown.Item>
    </Dropdown.Section>
    <Dropdown.Separator />
    <Dropdown.Section>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item>Duplicate</Dropdown.Item>
      <Dropdown.Item>Delete</Dropdown.Item>
    </Dropdown.Section>
    <Dropdown.Separator />
    <Dropdown.Section>
      <AriaSubmenuTrigger>
        <Dropdown.Item>View details</Dropdown.Item>
        <Dropdown.Popover placement="right" className="w-50">
          <Dropdown.Menu>
            <Dropdown.Item>Share</Dropdown.Item>
            <AriaSubmenuTrigger>
              <Dropdown.Item>Save as</Dropdown.Item>
              <Dropdown.Popover placement="right" className="w-50">
                <Dropdown.Menu>
                  <Dropdown.Item>PDF</Dropdown.Item>
                  <Dropdown.Item>HTML</Dropdown.Item>
                  <Dropdown.Item>Markdown</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </AriaSubmenuTrigger>
            <Dropdown.Item>Archive</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </AriaSubmenuTrigger>
    </Dropdown.Section>
  </>
);

/** Codex docs — “Button advanced” stroke icons; forward `className` from Dropdown.Item for correct spacing/colors. */
type BtnAdvIconProps = { className?: string };

const BtnAdvIconBack: FC<BtnAdvIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
    <path d="M20 12H4m0 0 6 6m-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BtnAdvIconForward: FC<BtnAdvIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
    <path d="M4 12h16m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BtnAdvIconReload: FC<BtnAdvIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
    <path
      d="M2 10s.121-.85 3.636-4.364A9 9 0 0 1 20.776 10M2 10V4m0 6h6m14 4s-.121.85-3.636 4.364A9 9 0 0 1 3.224 14M22 14v6m0-6h-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const BtnAdvIconEditPage: FC<BtnAdvIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
    <path
      d="m21 18-1 1.094A2.71 2.71 0 0 1 18 20c-.75 0-1.47-.326-2-.906a2.716 2.716 0 0 0-2-.904c-.75 0-1.469.325-2 .904M3 20h1.675c.489 0 .733 0 .964-.055.204-.05.399-.13.578-.24.201-.123.374-.296.72-.642L19.5 6.5a2.121 2.121 0 0 0-3-3L3.937 16.063c-.346.346-.519.519-.642.72a2 2 0 0 0-.24.578c-.055.23-.055.475-.055.965V20Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const BtnAdvIconStar: FC<BtnAdvIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
    <path
      d="M11.283 3.453c.23-.467.345-.7.502-.775a.5.5 0 0 1 .43 0c.157.075.272.308.502.775l2.187 4.43c.068.138.102.207.152.26a.502.502 0 0 0 .155.114c.067.03.143.042.295.064l4.891.715c.515.075.773.113.892.238a.5.5 0 0 1 .133.41c-.023.172-.21.353-.582.716l-3.54 3.446c-.11.108-.165.162-.2.226a.5.5 0 0 0-.06.183c-.009.072.004.148.03.3l.835 4.867c.088.514.132.77.05.922a.5.5 0 0 1-.349.253c-.17.032-.4-.09-.862-.332l-4.373-2.3c-.136-.07-.204-.107-.276-.12a.498.498 0 0 0-.192 0c-.072.013-.14.05-.276.12l-4.373 2.3c-.461.243-.692.364-.862.332a.5.5 0 0 1-.348-.253c-.083-.152-.039-.409.05-.922l.834-4.867c.026-.152.039-.228.03-.3a.5.5 0 0 0-.06-.184c-.035-.063-.09-.117-.2-.225L3.16 10.4c-.373-.363-.56-.544-.582-.716a.5.5 0 0 1 .132-.41c.12-.125.377-.163.892-.238l4.891-.715c.152-.022.228-.034.295-.064a.5.5 0 0 0 .155-.113c.05-.054.084-.123.152-.26l2.187-4.43Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const BtnAdvIconPackage: FC<BtnAdvIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
    <path
      d="M20.5 7.278 12 12m0 0L3.5 7.278M12 12v9.5m9-5.441V7.942c0-.343 0-.514-.05-.667a1 1 0 0 0-.215-.364c-.109-.119-.258-.202-.558-.368l-7.4-4.111c-.284-.158-.425-.237-.575-.267a1 1 0 0 0-.403 0c-.15.03-.292.11-.576.267l-7.4 4.11c-.3.167-.45.25-.558.369a1 1 0 0 0-.215.364C3 7.428 3 7.599 3 7.942v8.117c0 .342 0 .514.05.666a1 1 0 0 0 .215.364c.109.119.258.202.558.368l7.4 4.111c.284.158.425.237.576.268.133.027.27.027.402 0 .15-.031.292-.11.576-.268l7.4-4.11c.3-.167.45-.25.558-.369a.999.999 0 0 0 .215-.364c.05-.152.05-.324.05-.666Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Codex docs — “More tools” flyout: Save as → nested, Cut/Copy, Developer → nested. */
const MoreToolsSubmenu: FC = () => (
  <Dropdown.Menu>
    <Dropdown.Section>
      <AriaSubmenuTrigger>
        <Dropdown.Item
          icon={({ className }) => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
              <path
                d="M21 15v1.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V15m14-5-5 5m0 0-5-5m5 5V3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        >
          Save as
        </Dropdown.Item>
        <Dropdown.Popover placement="right" className="w-50">
          <Dropdown.Menu>
            <Dropdown.Item>PDF</Dropdown.Item>
            <Dropdown.Item>HTML</Dropdown.Item>
            <Dropdown.Item>Markdown</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </AriaSubmenuTrigger>
      <Dropdown.Item
        addon="⌘X"
        icon={({ className }) => (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
            <path
              d="M20 4 8.5 15.5m0-7L20 20M6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      >
        Cut
      </Dropdown.Item>
      <Dropdown.Item
        addon="⌘C"
        icon={({ className }) => (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
            <path
              d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      >
        Copy
      </Dropdown.Item>
    </Dropdown.Section>
    <Dropdown.Separator />
    <Dropdown.Section>
      <AriaSubmenuTrigger>
        <Dropdown.Item
          icon={({ className }) => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}>
              <path
                d="m17 17 5-5-5-5M7 7l-5 5 5 5m7-14-4 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        >
          Developer
        </Dropdown.Item>
        <Dropdown.Popover placement="right" className="w-50">
          <Dropdown.Menu>
            <Dropdown.Item>Console</Dropdown.Item>
            <Dropdown.Item>Network</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </AriaSubmenuTrigger>
    </Dropdown.Section>
  </Dropdown.Menu>
);

/** Shared “advanced actions” menu (button + icon trigger variants). */
const AdvancedActionsMenu: FC = () => (
              <Dropdown.Menu selectionMode="none">
                <Dropdown.Section>
                  <Dropdown.Item icon={BtnAdvIconBack}>Back</Dropdown.Item>
                  <Dropdown.Item icon={BtnAdvIconForward}>Forward</Dropdown.Item>
                  <Dropdown.Item addon="⌘R" icon={BtnAdvIconReload}>
                    Reload
                  </Dropdown.Item>
                  <Dropdown.Item icon={BtnAdvIconEditPage}>Edit page</Dropdown.Item>
                  <Dropdown.Item icon={BtnAdvIconStar}>Add to favorites</Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section selectionMode="multiple" defaultSelectedKeys={["show-urls"]}>
                  <Dropdown.Item id="show-bookmarks" textValue="Show bookmarks" unstyled>
                    {(state) => (
                      <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                        <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                          <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            aria-hidden="true"
                            className={
                              state.isSelected
                                ? "size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2"
                                : "size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary invisible mr-2"
                            }
                          >
                            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="grow truncate text-sm font-semibold text-secondary">Show bookmarks</span>
                        </div>
                      </div>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item id="show-urls" textValue="Show full URLs" unstyled>
                    {(state) => (
                      <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                        <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                          <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            aria-hidden="true"
                            className={
                              state.isSelected
                                ? "size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2"
                                : "size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary invisible mr-2"
                            }
                          >
                            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="grow truncate text-sm font-semibold text-secondary">Show full URLs</span>
                        </div>
                      </div>
                    )}
                  </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section>
                  <Dropdown.Item id="olivia" textValue="Olivia Rhye" unstyled>
                    <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                      <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                        <span className="mr-2 inline-flex shrink-0 items-center justify-center p-[5px]">
                          <span className="inline-block size-1.5 rounded-full bg-fg-success-secondary" />
                        </span>
                        <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item id="sienna" textValue="Sienna Hewitt" unstyled>
                    <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                      <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                        <span className="mr-2 inline-flex shrink-0 items-center justify-center p-[5px]">
                          <span className="inline-block size-1.5 rounded-full bg-utility-neutral-300" />
                        </span>
                        <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>
                      </div>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section>
                  <AriaSubmenuTrigger>
                    <Dropdown.Item icon={BtnAdvIconPackage}>More tools</Dropdown.Item>
                    <Dropdown.Popover placement="right" className="w-50">
                      <MoreToolsSubmenu />
                    </Dropdown.Popover>
                  </AriaSubmenuTrigger>
                </Dropdown.Section>
              </Dropdown.Menu>
);

const TOC = [
  { id: "dropdown-example", label: "Dropdown example" },
  { id: "dropdown-examples", label: "Dropdown examples" },
  { id: "button-simple", label: "Button simple" },
  { id: "button-advanced", label: "Button advanced" },
  { id: "button-link", label: "Button link" },
  { id: "icon-simple", label: "Icon simple" },
  { id: "icon-advanced", label: "Icon advanced" },
  { id: "search-simple", label: "Search simple" },
  { id: "search-advanced", label: "Search advanced" },
  { id: "integrations", label: "Integrations" },
  { id: "account-button", label: "Account button" },
  { id: "avatar", label: "Avatar" },
  { id: "account-card-xs", label: "Account card (xs)" },
  { id: "account-card-sm", label: "Account card (sm)" },
  { id: "account-card-md", label: "Account card (md)" },
  { id: "account-breadcrumb", label: "Account breadcrumb" },
] as const;

const CODE = {
  hero: `import { Button, Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown } from "@opus2-platform/icons";\nimport { SubmenuTrigger } from "react-aria-components";\n\n<Dropdown.Root>\n  <Button color="secondary" iconTrailing={ChevronDown}>Account</Button>\n\n  <Dropdown.Popover>\n    <Dropdown.Menu>\n      <Dropdown.Section>\n        <Dropdown.Item addon="⌘X">Cut</Dropdown.Item>\n        <Dropdown.Item addon="⌘C">Copy</Dropdown.Item>\n        <Dropdown.Item addon="⌘V">Paste</Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <Dropdown.Item>Edit</Dropdown.Item>\n        <Dropdown.Item>Duplicate</Dropdown.Item>\n        <Dropdown.Item>Delete</Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <SubmenuTrigger>\n          <Dropdown.Item>View details</Dropdown.Item>\n          <Dropdown.Popover placement="right" className="w-50">\n            <Dropdown.Menu>\n              <Dropdown.Item>Share</Dropdown.Item>\n              <SubmenuTrigger>\n                <Dropdown.Item>Save as</Dropdown.Item>\n                <Dropdown.Popover placement="right" className="w-50">\n                  <Dropdown.Menu>\n                    <Dropdown.Item>PDF</Dropdown.Item>\n                    <Dropdown.Item>HTML</Dropdown.Item>\n                    <Dropdown.Item>Markdown</Dropdown.Item>\n                  </Dropdown.Menu>\n                </Dropdown.Popover>\n              </SubmenuTrigger>\n              <Dropdown.Item>Archive</Dropdown.Item>\n            </Dropdown.Menu>\n          </Dropdown.Popover>\n        </SubmenuTrigger>\n      </Dropdown.Section>\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  buttonSimple: `import { Button, Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown } from "@opus2-platform/icons";\nimport { SubmenuTrigger } from "react-aria-components";\n\n<Dropdown.Root>\n  <Button color="secondary" iconTrailing={ChevronDown}>Account</Button>\n\n  <Dropdown.Popover>\n    <Dropdown.Menu>\n      <Dropdown.Section>\n        <Dropdown.Item addon="⌘X">Cut</Dropdown.Item>\n        <Dropdown.Item addon="⌘C">Copy</Dropdown.Item>\n        <Dropdown.Item addon="⌘V">Paste</Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <Dropdown.Item>Edit</Dropdown.Item>\n        <Dropdown.Item>Duplicate</Dropdown.Item>\n        <Dropdown.Item>Delete</Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <SubmenuTrigger>\n          <Dropdown.Item>View details</Dropdown.Item>\n          <Dropdown.Popover placement="right" className="w-50">\n            <Dropdown.Menu>\n              <Dropdown.Item>Share</Dropdown.Item>\n              <SubmenuTrigger>\n                <Dropdown.Item>Save as</Dropdown.Item>\n                <Dropdown.Popover placement="right" className="w-50">\n                  <Dropdown.Menu>\n                    <Dropdown.Item>PDF</Dropdown.Item>\n                    <Dropdown.Item>HTML</Dropdown.Item>\n                    <Dropdown.Item>Markdown</Dropdown.Item>\n                  </Dropdown.Menu>\n                </Dropdown.Popover>\n              </SubmenuTrigger>\n              <Dropdown.Item>Archive</Dropdown.Item>\n            </Dropdown.Menu>\n          </Dropdown.Popover>\n        </SubmenuTrigger>\n      </Dropdown.Section>\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  buttonAdvanced: `import { Button, Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown } from "@opus2-platform/icons";\nimport { SubmenuTrigger } from "react-aria-components";\n\n<Dropdown.Root>\n  <Button color="secondary" iconTrailing={ChevronDown}>Actions</Button>\n\n  <Dropdown.Popover className="w-60">\n    <Dropdown.Menu selectionMode="none">\n      <Dropdown.Section>\n        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M20 12H4m0 0 6 6m-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Back</Dropdown.Item>\n        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Forward</Dropdown.Item>\n        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M2 10s.121-.85 3.636-4.364A9 9 0 0 1 20.776 10M2 10V4m0 6h6m14 4s-.121.85-3.636 4.364A9 9 0 0 1 3.224 14M22 14v6m0-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} addon="⌘R">Reload</Dropdown.Item>\n        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="m21 18-1 1.094A2.71 2.71 0 0 1 18 20c-.75 0-1.47-.326-2-.906a2.716 2.716 0 0 0-2-.904c-.75 0-1.469.325-2 .904M3 20h1.675c.489 0 .733 0 .964-.055.204-.05.399-.13.578-.24.201-.123.374-.296.72-.642L19.5 6.5a2.121 2.121 0 0 0-3-3L3.937 16.063c-.346.346-.519.519-.642.72a2 2 0 0 0-.24.578c-.055.23-.055.475-.055.965V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Edit page</Dropdown.Item>\n        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M11.283 3.453c.23-.467.345-.7.502-.775a.5.5 0 0 1 .43 0c.157.075.272.308.502.775l2.187 4.43c.068.138.102.207.152.26a.502.502 0 0 0 .155.114c.067.03.143.042.295.064l4.891.715c.515.075.773.113.892.238a.5.5 0 0 1 .133.41c-.023.172-.21.353-.582.716l-3.54 3.446c-.11.108-.165.162-.2.226a.5.5 0 0 0-.06.183c-.009.072.004.148.03.3l.835 4.867c.088.514.132.77.05.922a.5.5 0 0 1-.349.253c-.17.032-.4-.09-.862-.332l-4.373-2.3c-.136-.07-.204-.107-.276-.12a.498.498 0 0 0-.192 0c-.072.013-.14.05-.276.12l-4.373 2.3c-.461.243-.692.364-.862.332a.5.5 0 0 1-.348-.253c-.083-.152-.039-.409.05-.922l.834-4.867c.026-.152.039-.228.03-.3a.5.5 0 0 0-.06-.184c-.035-.063-.09-.117-.2-.225L3.16 10.4c-.373-.363-.56-.544-.582-.716a.5.5 0 0 1 .132-.41c.12-.125.377-.163.892-.238l4.891-.715c.152-.022.228-.034.295-.064a.5.5 0 0 0 .155-.113c.05-.054.084-.123.152-.26l2.187-4.43Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Add to favorites</Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section selectionMode="multiple" defaultSelectedKeys={["show-urls"]}>\n        <Dropdown.Item id="show-bookmarks" textValue="Show bookmarks" unstyled>\n          {(state) => (\n            <div className="group block cursor-pointer px-1.5 py-px outline-hidden">\n              <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n                <svg viewBox="0 0 24 24" fill="none" className={\`mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary \${state.isSelected ? "" : "invisible"}\`}>\n                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />\n                </svg>\n                <span className="grow truncate text-sm font-semibold text-secondary">Show bookmarks</span>\n              </div>\n            </div>\n          )}\n        </Dropdown.Item>\n        <Dropdown.Item id="show-urls" textValue="Show full URLs" unstyled>\n          {(state) => (\n            <div className="group block cursor-pointer px-1.5 py-px outline-hidden">\n              <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n                <svg viewBox="0 0 24 24" fill="none" className={\`mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary \${state.isSelected ? "" : "invisible"}\`}>\n                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />\n                </svg>\n                <span className="grow truncate text-sm font-semibold text-secondary">Show full URLs</span>\n              </div>\n            </div>\n          )}\n        </Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <Dropdown.Item id="olivia" textValue="Olivia Rhye" unstyled>\n          <div className="group block cursor-pointer px-1.5 py-px outline-hidden">\n            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n              <span className="mr-2 inline-flex shrink-0 items-center justify-center p-[5px]">\n                <span className="inline-block size-1.5 rounded-full bg-fg-success-secondary" />\n              </span>\n              <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>\n            </div>\n          </div>\n        </Dropdown.Item>\n        <Dropdown.Item id="sienna" textValue="Sienna Hewitt" unstyled>\n          <div className="group block cursor-pointer px-1.5 py-px outline-hidden">\n            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n              <span className="mr-2 inline-flex shrink-0 items-center justify-center p-[5px]">\n                <span className="inline-block size-1.5 rounded-full bg-utility-neutral-300" />\n              </span>\n              <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>\n            </div>\n          </div>\n        </Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <SubmenuTrigger>\n          <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M20.5 7.278 12 12m0 0L3.5 7.278M12 12v9.5m9-5.441V7.942c0-.343 0-.514-.05-.667a1 1 0 0 0-.215-.364c-.109-.119-.258-.202-.558-.368l-7.4-4.111c-.284-.158-.425-.237-.575-.267a1 1 0 0 0-.403 0c-.15.03-.292.11-.576.267l-7.4 4.11c-.3.167-.45.25-.558.369a1 1 0 0 0-.215.364C3 7.428 3 7.599 3 7.942v8.117c0 .342 0 .514.05.666a1 1 0 0 0 .215.364c.109.119.258.202.558.368l7.4 4.111c.284.158.425.237.576.268.133.027.27.027.402 0 .15-.031.292-.11.576-.268l7.4-4.11c.3-.167.45-.25.558-.369a.999.999 0 0 0 .215-.364c.05-.152.05-.324.05-.666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>More tools</Dropdown.Item>\n          <Dropdown.Popover placement="right" className="w-50"><Dropdown.Menu><Dropdown.Section><SubmenuTrigger><Dropdown.Item icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="M21 15v1.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V15m14-5-5 5m0 0-5-5m5 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Save as</Dropdown.Item><Dropdown.Popover placement="right" className="w-50"><Dropdown.Menu><Dropdown.Item>PDF</Dropdown.Item><Dropdown.Item>HTML</Dropdown.Item><Dropdown.Item>Markdown</Dropdown.Item></Dropdown.Menu></Dropdown.Popover></SubmenuTrigger><Dropdown.Item addon="⌘X" icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="M20 4 8.5 15.5m0-7L20 20M6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Cut</Dropdown.Item><Dropdown.Item addon="⌘C" icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Copy</Dropdown.Item></Dropdown.Section><Dropdown.Separator /><Dropdown.Section><SubmenuTrigger><Dropdown.Item icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="m17 17 5-5-5-5M7 7l-5 5 5 5m7-14-4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Developer</Dropdown.Item><Dropdown.Popover placement="right" className="w-50"><Dropdown.Menu><Dropdown.Item>Console</Dropdown.Item><Dropdown.Item>Network</Dropdown.Item></Dropdown.Menu></Dropdown.Popover></SubmenuTrigger></Dropdown.Section></Dropdown.Menu></Dropdown.Popover>\n        </SubmenuTrigger>\n      </Dropdown.Section>\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  buttonLink: `import { Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown, Trash01 } from "@opus2-platform/icons";\n\n<Dropdown.Root>\n  <button className="text-secondary outline-focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2">\n    Can edit\n    <ChevronDown data-icon className="text-fg-quaternary size-4" />\n  </button>\n\n  <Dropdown.Popover className="w-40">\n    <Dropdown.Menu selectionMode="single" defaultSelectedKeys={['can-edit']}>\n      <Dropdown.Item id="owner" unstyled>\n        {(state) => (\n          <div className="group block cursor-pointer px-1.5 py-px outline-hidden">\n            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n              <svg viewBox="0 0 24 24" fill="none" className={\`size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2 \${state.isSelected ? '' : 'invisible'}\`}>\n                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />\n              </svg>\n              <span className="grow truncate text-sm font-semibold text-secondary">Owner</span>\n            </div>\n          </div>\n        )}\n      </Dropdown.Item>\n      <Dropdown.Item id="can-edit" unstyled>\n        {(state) => (\n          <div className="group block cursor-pointer px-1.5 py-px outline-hidden">\n            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n              <svg viewBox="0 0 24 24" fill="none" className={\`size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2 \${state.isSelected ? '' : 'invisible'}\`}>\n                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />\n              </svg>\n              <span className="grow truncate text-sm font-semibold text-secondary">Can edit</span>\n            </div>\n          </div>\n        )}\n      </Dropdown.Item>\n      <Dropdown.Item id="can-view" unstyled>\n        {(state) => (\n          <div className="group block cursor-pointer px-1.5 py-px outline-hidden">\n            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n              <svg viewBox="0 0 24 24" fill="none" className={\`size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2 \${state.isSelected ? '' : 'invisible'}\`}>\n                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />\n              </svg>\n              <span className="grow truncate text-sm font-semibold text-secondary">Can view</span>\n            </div>\n          </div>\n        )}\n      </Dropdown.Item>\n    <Dropdown.Separator />\n      <Dropdown.Item icon={Trash01}>Delete</Dropdown.Item>\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  iconSimple: `import { Dropdown } from "@opus2-platform/codex";\nimport { SubmenuTrigger } from "react-aria-components";\n\n<Dropdown.Root>\n  <Dropdown.DotsButton />\n\n  <Dropdown.Popover>\n    <Dropdown.Menu>\n      <Dropdown.Section>\n        <Dropdown.Item addon="⌘X">Cut</Dropdown.Item>\n        <Dropdown.Item addon="⌘C">Copy</Dropdown.Item>\n        <Dropdown.Item addon="⌘V">Paste</Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <Dropdown.Item>Edit</Dropdown.Item>\n        <Dropdown.Item>Duplicate</Dropdown.Item>\n        <Dropdown.Item>Delete</Dropdown.Item>\n      </Dropdown.Section>\n      <Dropdown.Separator />\n      <Dropdown.Section>\n        <SubmenuTrigger>\n          <Dropdown.Item>View details</Dropdown.Item>\n          <Dropdown.Popover placement="right" className="w-50">\n            <Dropdown.Menu>\n              <Dropdown.Item>Share</Dropdown.Item>\n              <SubmenuTrigger>\n                <Dropdown.Item>Save as</Dropdown.Item>\n                <Dropdown.Popover placement="right" className="w-50">\n                  <Dropdown.Menu>\n                    <Dropdown.Item>PDF</Dropdown.Item>\n                    <Dropdown.Item>HTML</Dropdown.Item>\n                    <Dropdown.Item>Markdown</Dropdown.Item>\n                  </Dropdown.Menu>\n                </Dropdown.Popover>\n              </SubmenuTrigger>\n              <Dropdown.Item>Archive</Dropdown.Item>\n            </Dropdown.Menu>\n          </Dropdown.Popover>\n        </SubmenuTrigger>\n      </Dropdown.Section>\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  iconAdvanced: `import { Button, Dropdown } from "@opus2-platform/codex";
import { ChevronDown } from "@opus2-platform/icons";
import { SubmenuTrigger } from "react-aria-components";

<Dropdown.Root>
  <Button color="secondary" iconTrailing={ChevronDown}>Actions</Button>

  <Dropdown.Popover className="w-60">
    <Dropdown.Menu selectionMode="none">
      <Dropdown.Section>
        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M20 12H4m0 0 6 6m-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Back</Dropdown.Item>
        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Forward</Dropdown.Item>
        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M2 10s.121-.85 3.636-4.364A9 9 0 0 1 20.776 10M2 10V4m0 6h6m14 4s-.121.85-3.636 4.364A9 9 0 0 1 3.224 14M22 14v6m0-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} addon="⌘R">Reload</Dropdown.Item>
        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="m21 18-1 1.094A2.71 2.71 0 0 1 18 20c-.75 0-1.47-.326-2-.906a2.716 2.716 0 0 0-2-.904c-.75 0-1.469.325-2 .904M3 20h1.675c.489 0 .733 0 .964-.055.204-.05.399-.13.578-.24.201-.123.374-.296.72-.642L19.5 6.5a2.121 2.121 0 0 0-3-3L3.937 16.063c-.346.346-.519.519-.642.72a2 2 0 0 0-.24.578c-.055.23-.055.475-.055.965V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Edit page</Dropdown.Item>
        <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M11.283 3.453c.23-.467.345-.7.502-.775a.5.5 0 0 1 .43 0c.157.075.272.308.502.775l2.187 4.43c.068.138.102.207.152.26a.502.502 0 0 0 .155.114c.067.03.143.042.295.064l4.891.715c.515.075.773.113.892.238a.5.5 0 0 1 .133.41c-.023.172-.21.353-.582.716l-3.54 3.446c-.11.108-.165.162-.2.226a.5.5 0 0 0-.06.183c-.009.072.004.148.03.3l.835 4.867c.088.514.132.77.05.922a.5.5 0 0 1-.349.253c-.17.032-.4-.09-.862-.332l-4.373-2.3c-.136-.07-.204-.107-.276-.12a.498.498 0 0 0-.192 0c-.072.013-.14.05-.276.12l-4.373 2.3c-.461.243-.692.364-.862.332a.5.5 0 0 1-.348-.253c-.083-.152-.039-.409.05-.922l.834-4.867c.026-.152.039-.228.03-.3a.5.5 0 0 0-.06-.184c-.035-.063-.09-.117-.2-.225L3.16 10.4c-.373-.363-.56-.544-.582-.716a.5.5 0 0 1 .132-.41c.12-.125.377-.163.892-.238l4.891-.715c.152-.022.228-.034.295-.064a.5.5 0 0 0 .155-.113c.05-.054.084-.123.152-.26l2.187-4.43Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Add to favorites</Dropdown.Item>
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section selectionMode="multiple" defaultSelectedKeys={["show-urls"]}>
        <Dropdown.Item id="show-bookmarks" textValue="Show bookmarks" unstyled>
          {(state) => (
            <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
              <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                <svg viewBox="0 0 24 24" fill="none" className={\`mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary \${state.isSelected ? "" : "invisible"}\`}>
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="grow truncate text-sm font-semibold text-secondary">Show bookmarks</span>
              </div>
            </div>
          )}
        </Dropdown.Item>
        <Dropdown.Item id="show-urls" textValue="Show full URLs" unstyled>
          {(state) => (
            <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
              <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                <svg viewBox="0 0 24 24" fill="none" className={\`mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary \${state.isSelected ? "" : "invisible"}\`}>
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="grow truncate text-sm font-semibold text-secondary">Show full URLs</span>
              </div>
            </div>
          )}
        </Dropdown.Item>
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.Item id="olivia" textValue="Olivia Rhye" unstyled>
          <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
              <span className="mr-2 inline-flex shrink-0 items-center justify-center p-[5px]">
                <span className="inline-block size-1.5 rounded-full bg-fg-success-secondary" />
              </span>
              <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="sienna" textValue="Sienna Hewitt" unstyled>
          <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
              <span className="mr-2 inline-flex shrink-0 items-center justify-center p-[5px]">
                <span className="inline-block size-1.5 rounded-full bg-utility-neutral-300" />
              </span>
              <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>
            </div>
          </div>
        </Dropdown.Item>
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <SubmenuTrigger>
          <Dropdown.Item icon={() => <svg viewBox="0 0 24 24" fill="none"><path d="M20.5 7.278 12 12m0 0L3.5 7.278M12 12v9.5m9-5.441V7.942c0-.343 0-.514-.05-.667a1 1 0 0 0-.215-.364c-.109-.119-.258-.202-.558-.368l-7.4-4.111c-.284-.158-.425-.237-.575-.267a1 1 0 0 0-.403 0c-.15.03-.292.11-.576.267l-7.4 4.11c-.3.167-.45.25-.558.369a1 1 0 0 0-.215.364C3 7.428 3 7.599 3 7.942v8.117c0 .342 0 .514.05.666a1 1 0 0 0 .215.364c.109.119.258.202.558.368l7.4 4.111c.284.158.425.237.576.268.133.027.27.027.402 0 .15-.031.292-.11.576-.268l7.4-4.11c.3-.167.45-.25.558-.369a.999.999 0 0 0 .215-.364c.05-.152.05-.324.05-.666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>More tools</Dropdown.Item>
          <Dropdown.Popover placement="right" className="w-50"><Dropdown.Menu><Dropdown.Section><SubmenuTrigger><Dropdown.Item icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="M21 15v1.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V15m14-5-5 5m0 0-5-5m5 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Save as</Dropdown.Item><Dropdown.Popover placement="right" className="w-50"><Dropdown.Menu><Dropdown.Item>PDF</Dropdown.Item><Dropdown.Item>HTML</Dropdown.Item><Dropdown.Item>Markdown</Dropdown.Item></Dropdown.Menu></Dropdown.Popover></SubmenuTrigger><Dropdown.Item addon="⌘X" icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="M20 4 8.5 15.5m0-7L20 20M6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Cut</Dropdown.Item><Dropdown.Item addon="⌘C" icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Copy</Dropdown.Item></Dropdown.Section><Dropdown.Separator /><Dropdown.Section><SubmenuTrigger><Dropdown.Item icon={({ className }) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" className={className}><path d="m17 17 5-5-5-5M7 7l-5 5 5 5m7-14-4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}>Developer</Dropdown.Item><Dropdown.Popover placement="right" className="w-50"><Dropdown.Menu><Dropdown.Item>Console</Dropdown.Item><Dropdown.Item>Network</Dropdown.Item></Dropdown.Menu></Dropdown.Popover></SubmenuTrigger></Dropdown.Section></Dropdown.Menu></Dropdown.Popover>
        </SubmenuTrigger>
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  searchSimple: `import { useMemo, useState } from "react";\nimport { Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown, SearchLg } from "@opus2-platform/icons";\nimport { Button as AriaButton } from "react-aria-components";\n\nconst items = [\n  { id: "olivia", label: "Olivia Rhye" },\n  { id: "phoenix", label: "Phoenix Baker" },\n  { id: "lana", label: "Lana Steiner" },\n  { id: "demi", label: "Demi Wilkinson" },\n  { id: "candice", label: "Candice Wu" },\n  { id: "natali", label: "Natali Craig" },\n  { id: "drew", label: "Drew Cano" },\n  { id: "orlando", label: "Orlando Diggs" },\n  { id: "andi", label: "Andi Lane" },\n];\n\nconst defaultSelectedKeys = ["olivia", "phoenix", "lana", "demi", "natali", "andi"];\nconst [query, setQuery] = useState(\"\");\nconst filteredItems = useMemo(() => {\n  const normalized = query.trim().toLowerCase();\n  if (!normalized) return items;\n  return items.filter((item) => item.label.toLowerCase().includes(normalized));\n}, [query]);\n\n<Dropdown.Root>\n  <AriaButton className="text-secondary outline-focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2">\n    Manage access\n    <ChevronDown data-icon className="text-fg-quaternary size-4" />\n  </AriaButton>\n\n  <Dropdown.Popover className="w-60">\n    <div className="flex gap-3 border-b border-secondary p-3">\n      <div className="group/input relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset">\n        <SearchLg className="pointer-events-none absolute left-3 size-5 text-fg-quaternary" />\n        <input value={query} onChange={(e) => setQuery(e.target.value)} className="m-0 w-full bg-transparent px-3 py-2 pl-10 text-md text-primary outline-hidden placeholder:text-placeholder" placeholder="Search" />\n      </div>\n    </div>\n    <Dropdown.Menu selectionMode="multiple" defaultSelectedKeys={defaultSelectedKeys} items={filteredItems}>\n      {(item) => <Dropdown.Item id={item.id}>{item.label}</Dropdown.Item>}\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  searchAdvanced: `import { useMemo, useState } from "react";
import { Button, Dropdown } from "@opus2-platform/codex";
import { ChevronDown, Plus, SearchLg } from "@opus2-platform/icons";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";

const items = [
  { id: "codex", label: "Codex" },
  { id: "shutterframe", label: "Shutterframe" },
  { id: "warpspeed", label: "Warpspeed" },
  { id: "contrastai", label: "ContrastAI" },
  { id: "launchsimple", label: "LaunchSimple" },
  { id: "elasticware", label: "Elasticware" },
];

const [query, setQuery] = useState(\"\");
const filteredItems = useMemo(() => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((item) => item.label.toLowerCase().includes(normalized));
}, [query]);
const hasCodexRow = filteredItems.some((item) => item.id === "codex");

<Dropdown.Root>
  <AriaButton className="text-secondary outline-focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
    Manage access
    <ChevronDown data-icon className="text-fg-quaternary size-4" />
  </AriaButton>

  <Dropdown.Popover className="w-60">
    <div className="flex gap-3 border-b border-secondary p-3">
      <div className="group/input relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset">
        <SearchLg className="pointer-events-none absolute left-3 size-5 text-fg-quaternary" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="m-0 w-full bg-transparent px-3 py-2 pl-10 text-md text-primary outline-hidden placeholder:text-placeholder" placeholder="Search" />
      </div>
    </div>

    <Dropdown.Menu selectionMode="multiple" defaultSelectedKeys={["codex", "shutterframe", "warpspeed", "launchsimple"]}>
      {hasCodexRow ? (
        <SubmenuTrigger>
          <Dropdown.Item id="codex">Codex</Dropdown.Item>
          <Dropdown.Popover placement="right" className="w-50">
            <Dropdown.Menu>
              <Dropdown.Item>Olivia Rhye</Dropdown.Item>
              <Dropdown.Item>Phoenix Baker</Dropdown.Item>
              <Dropdown.Item>Lana Steiner</Dropdown.Item>
              <Dropdown.Item>Demi Wilkinson</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </SubmenuTrigger>
      ) : null}
      {filteredItems.filter((item) => item.id !== "codex").map((item) => (
        <Dropdown.Item key={item.id} id={item.id}>{item.label}</Dropdown.Item>
      ))}
    </Dropdown.Menu>

    <div className="flex flex-col gap-3 border-t border-secondary p-3">
      <Button color="secondary" iconLeading={Plus}>Create team</Button>
    </div>
  </Dropdown.Popover>
</Dropdown.Root>`,
  integrations: `import { Button, Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown } from "@opus2-platform/icons";\n\n<Dropdown.Root>\n  <Button\n    color="secondary"\n    iconTrailing={<ChevronDown data-icon className="size-4! stroke-[2.25px]!" />}\n  >\n    Copy\n  </Button>\n\n  <Dropdown.Popover>\n    <Dropdown.Menu>\n      <Dropdown.Section>\n        <Dropdown.Item>View as markdown</Dropdown.Item>\n        <Dropdown.Item>Copy as markdown</Dropdown.Item>\n      </Dropdown.Section>\n\n      <Dropdown.Separator />\n\n      <Dropdown.Section>\n        <Dropdown.Item>Open in v0</Dropdown.Item>\n        <Dropdown.Item>Open in Claude</Dropdown.Item>\n        <Dropdown.Item>Open in Bolt</Dropdown.Item>\n        <Dropdown.Item>Open in Lovable</Dropdown.Item>\n        <Dropdown.Item>Open in Cursor</Dropdown.Item>\n        <Dropdown.Item>Open in ChatGPT</Dropdown.Item>\n        <Dropdown.Item>Open in Perplexity</Dropdown.Item>\n        <Dropdown.Item>Open in Gemini</Dropdown.Item>\n        <Dropdown.Item>Open in Figma</Dropdown.Item>\n      </Dropdown.Section>\n\n      <Dropdown.Separator />\n\n      <Dropdown.Section>\n        <Dropdown.Item>Create GitHub Gist</Dropdown.Item>\n      </Dropdown.Section>\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  accountButton: `import { useState } from "react";\nimport { Button, Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown, HelpCircle, LogOut01, Moon01, Plus, Settings01, User01 } from "@opus2-platform/icons";\nimport { SubmenuTrigger } from "react-aria-components";\n\nconst [isDarkMode, setIsDarkMode] = useState(false);\nconst [selectedAccount, setSelectedAccount] = useState<"olivia" | "sienna">("olivia");\n\n<Dropdown.Root>\n  <Button color="secondary" iconTrailing={ChevronDown}>Account</Button>\n\n  <Dropdown.Popover className="w-60 rounded-b-xl bg-secondary_alt">\n    <div className="h-min overflow-y-auto py-1 outline-hidden select-none rounded-b-xl bg-primary ring-1 ring-secondary">\n      <Dropdown.Item icon={User01} addon="⌘K-&gt;P">View profile</Dropdown.Item>\n      <Dropdown.Item icon={Settings01} addon="⌘S">Settings</Dropdown.Item>\n\n      <button onClick={() => setIsDarkMode((prev) => !prev)} className="group block w-full cursor-pointer px-1.5 py-px outline-hidden">\n        <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n          <Moon01 className="mr-2 size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />\n          <span className="grow truncate text-sm font-semibold text-secondary">Dark mode</span>\n          <span className={\`ml-1 h-4 w-8 shrink-0 rounded-full ring-1 ring-inset transition duration-150 ease-linear \${isDarkMode ? "bg-brand-solid ring-transparent" : "bg-tertiary ring-secondary"}\`}>\n            <span className={\`block size-4 rounded-full bg-fg-white shadow-xs border transition-[transform,border-color] duration-150 ease-linear \${isDarkMode ? "translate-x-4 border-toggle-slim-border_pressed" : "border-toggle-border"}\`} />\n          </span>\n        </div>\n      </button>\n\n      <SubmenuTrigger>\n        <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>\n        <Dropdown.Popover placement="right" className="w-62">\n          <Dropdown.Menu>\n            <Dropdown.Item>Help center</Dropdown.Item>\n            <Dropdown.Item>Contact support</Dropdown.Item>\n            <Dropdown.Item>Send feedback</Dropdown.Item>\n          </Dropdown.Menu>\n        </Dropdown.Popover>\n      </SubmenuTrigger>\n\n      <div role="separator" className="my-1 h-px w-full bg-border-secondary" />\n\n      <header className="px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary" role="presentation">Switch Account</header>\n\n      <button onClick={() => setSelectedAccount("olivia")} className="group block w-full cursor-pointer px-1.5 py-px outline-hidden">\n        <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n          <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>\n          <div className={\`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset \${selectedAccount === "olivia" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"}\`}>\n            <div className={\`size-1.5 rounded-full bg-fg-white transition-inherit-all \${selectedAccount === "olivia" ? "opacity-100" : "opacity-0"}\`} />\n          </div>\n        </div>\n      </button>\n\n      <button onClick={() => setSelectedAccount("sienna")} className="group block w-full cursor-pointer px-1.5 py-px outline-hidden">\n        <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n          <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>\n          <div className={\`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset \${selectedAccount === "sienna" ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"}\`}>\n            <div className={\`size-1.5 rounded-full bg-fg-white transition-inherit-all \${selectedAccount === "sienna" ? "opacity-100" : "opacity-0"}\`} />\n          </div>\n        </div>\n      </button>\n\n      <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>\n    </div>\n\n    <div className="flex flex-col gap-3 p-3">\n      <Button color="secondary" iconLeading={LogOut01} className="w-full justify-center">Sign out</Button>\n    </div>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  avatar: `import { useState } from "react";
import { Avatar, Button, Dropdown } from "@opus2-platform/codex";
import { Cube01, HelpCircle, LayersTwo01, LogOut01, Moon01, Settings01, User01 } from "@opus2-platform/icons";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";

const CODEX_DOCS_AVATAR_SRC = "${CODEX_DOCS_AVATAR_SRC}";

const [isDarkMode, setIsDarkMode] = useState(false);

<Dropdown.Root>
  <AriaButton type="button" className="outline-focus-ring flex cursor-pointer items-center gap-2 rounded-md p-1 transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
    <Avatar size="sm" src={CODEX_DOCS_AVATAR_SRC} alt="" />
  </AriaButton>

  <Dropdown.Popover className="w-60 !flex !max-h-[min(100vh-8rem,26rem)] !flex-col !overflow-hidden">
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-secondary p-3">
        {/* figure: avatar (CODEX_DOCS_AVATAR_SRC), name, olivia@codex.io */}
      </div>

      <Dropdown.Menu selectionMode="none" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <Dropdown.Item icon={User01} addon="⌘K-&gt;P">View profile</Dropdown.Item>
        <Dropdown.Item icon={Settings01} addon="⌘S">Settings</Dropdown.Item>
        <Dropdown.Item id="dark-mode" textValue="Dark mode" unstyled onAction={() => setIsDarkMode((p) => !p)}>
          {/* Moon01 + toggle (see preview) */}
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item icon={LayersTwo01} addon="⌘S">Changelog</Dropdown.Item>
        <SubmenuTrigger>
          <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
          <Dropdown.Popover placement="right" className="w-50">
            <Dropdown.Menu>
              <Dropdown.Item>Documentation</Dropdown.Item>
              <Dropdown.Item>Contact support</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </SubmenuTrigger>
        <Dropdown.Item icon={Cube01}>API</Dropdown.Item>
      </Dropdown.Menu>

      <div className="shrink-0 border-t border-secondary p-3">
        <Button type="button" color="secondary" iconLeading={LogOut01} className="w-full justify-center">Sign out</Button>
      </div>
    </div>
  </Dropdown.Popover>
</Dropdown.Root>`,

  accountCardXs: `import { Dropdown } from "@opus2-platform/codex";\nimport { ChevronDown, LogOut01, Moon01, Plus, Settings01 } from "@opus2-platform/icons";\nimport { Button as AriaButton, SubmenuTrigger } from "react-aria-components";\n\n<Dropdown.Root>\n  <AriaButton type="button" className="relative flex w-38 cursor-pointer items-center gap-1.5 rounded-lg bg-primary_alt p-2 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 outline-focus-ring">\n    <div data-avatar="true" className="relative inline-flex shrink-0 rounded-full !size-5">\n      <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:inset-[0.5px] rounded-full">\n        <img data-avatar-img="true" className="!size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />\n      </div>\n    </div>\n    <p className="!text-sm !font-semibold !text-primary">Olivia Rhye</p>\n    <div className="absolute top-1 right-1 flex !size-7 items-center justify-center rounded-md">\n      <ChevronDown className="!size-4 shrink-0 stroke-[2.25px]! text-fg-quaternary" />\n    </div>\n  </AriaButton>\n\n  <Dropdown.Popover className="w-50">\n    <Dropdown.Menu>\n      <Dropdown.Item icon={Settings01} addon="⌘S">Settings</Dropdown.Item>\n    </Dropdown.Menu>\n\n    <Dropdown.Menu selectionMode="single" disallowEmptySelection={false}>\n      <Dropdown.Section>\n        <Dropdown.Item id="dark-mode" icon={Moon01}>\n          {(state) => (\n            <>\n              <span className="grow truncate text-sm font-semibold text-secondary">Dark mode</span>\n              <span className={\`ml-1 h-4 w-8 shrink-0 rounded-full ring-1 ring-inset transition duration-150 ease-linear \${state.isSelected ? "bg-brand-solid ring-transparent" : "bg-tertiary ring-secondary"}\`}>\n                <span className={\`block size-4 rounded-full border bg-fg-white shadow-xs transition-[transform,border-color] duration-150 ease-linear \${state.isSelected ? "translate-x-4 border-toggle-slim-border_pressed" : "border-toggle-border"}\`} />\n              </span>\n            </>\n          )}\n        </Dropdown.Item>\n      </Dropdown.Section>\n    </Dropdown.Menu>\n\n    <div role="separator" className="my-1 h-px w-full bg-border-secondary" />\n\n    <Dropdown.Menu selectionMode="single" defaultSelectedKeys={["sienna"]}>\n      <Dropdown.Section>\n        <Dropdown.SectionHeader>Switch Account</Dropdown.SectionHeader>\n        <Dropdown.Item id="olivia" unstyled>\n          {(state) => (\n            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n              <div className="mr-2 flex size-4 items-center justify-center">\n                <div className="relative inline-flex size-5 shrink-0 rounded-full">\n                  <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">\n                    <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />\n                  </div>\n                </div>\n              </div>\n              <span className="grow truncate text-sm font-semibold text-secondary">Olivia Rhye</span>\n              <div className={\`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset \${state.isSelected ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"}\`}>\n                <div className={\`size-1.5 rounded-full bg-fg-white transition-inherit-all \${state.isSelected ? "opacity-100" : "opacity-0"}\`} />\n              </div>\n            </div>\n          )}\n        </Dropdown.Item>\n        <Dropdown.Item id="sienna" unstyled>\n          {(state) => (\n            <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">\n              <div className="mr-2 flex size-4 items-center justify-center">\n                <div className="relative inline-flex size-5 shrink-0 rounded-full">\n                  <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">\n                    <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />\n                  </div>\n                </div>\n              </div>\n              <span className="grow truncate text-sm font-semibold text-secondary">Sienna Hewitt</span>\n              <div className={\`ml-1 flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset \${state.isSelected ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-primary"}\`}>\n                <div className={\`size-1.5 rounded-full bg-fg-white transition-inherit-all \${state.isSelected ? "opacity-100" : "opacity-0"}\`} />\n              </div>\n            </div>\n          )}\n        </Dropdown.Item>\n      </Dropdown.Section>\n    </Dropdown.Menu>\n\n    <Dropdown.Menu>\n      <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>\n    </Dropdown.Menu>\n\n    <div role="separator" className="my-1 h-px w-full bg-border-secondary" />\n\n    <Dropdown.Menu>\n      <SubmenuTrigger>\n        <Dropdown.Item icon={LogOut01}>Sign out</Dropdown.Item>\n        <Dropdown.Popover placement="right" className="w-50">\n          <Dropdown.Menu>\n            <Dropdown.Item>Sign out</Dropdown.Item>\n          </Dropdown.Menu>\n        </Dropdown.Popover>\n      </SubmenuTrigger>\n    </Dropdown.Menu>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
  accountCardSm: `import { Dropdown } from "@opus2-platform/codex";
import { ChevronDown, HelpCircle, LogOut01, Moon01, Plus, Settings01, User01 } from "@opus2-platform/icons";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";

<Dropdown.Root>
  <AriaButton
    type="button"
    className="relative flex w-42 cursor-pointer items-center gap-2 rounded-lg bg-primary_alt p-1.5 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 outline-focus-ring"
  >
    <div data-avatar="true" className="relative inline-flex shrink-0 rounded-full p-px ring-1 ring-secondary_alt size-8">
      <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/32 before:mask-[linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)]">
        <img data-avatar-img="true" className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
      </div>
      <span className="absolute right-0 bottom-0 flex size-2 justify-center rounded-full bg-fg-success-secondary ring-[1.5px] ring-bg-primary">
        {/* online dot: radial-gradient style + reflection SVG — see AccountCardSmTrigger */}
      </span>
    </div>
    <p className="text-sm font-semibold text-primary">Olivia Rhye</p>
    <div className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md">
      <ChevronDown className="size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
    </div>
  </AriaButton>

  <Dropdown.Popover className="w-60 !flex !max-h-[min(100vh-8rem,26rem)] !flex-col !overflow-hidden">
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-secondary px-4 py-3">
        <p className="text-sm font-semibold text-primary">PRO account</p>
        <p className="text-sm text-tertiary">olivia@codex.io</p>
      </div>

      <Dropdown.Menu selectionMode="none" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <Dropdown.Item icon={User01} addon="⌘K-&gt;P">View profile</Dropdown.Item>
        <Dropdown.Item icon={Settings01} addon="⌘S">Settings</Dropdown.Item>
        <Dropdown.Item id="dark-mode-sm" textValue="Dark mode" unstyled onAction={toggleDarkMode}>
          {/* Moon01 + toggle pill */}
        </Dropdown.Item>
        <SubmenuTrigger>
          <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
          <Dropdown.Popover placement="right" className="w-50">
            <Dropdown.Menu selectionMode="none">
              <Dropdown.Item>Documentation</Dropdown.Item>
              <Dropdown.Item>Contact support</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </SubmenuTrigger>
        <Dropdown.Separator />
        <Dropdown.Section>
          <Dropdown.SectionHeader className="px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary">Switch Account</Dropdown.SectionHeader>
          {/* unstyled account rows + radio dots */}
        </Dropdown.Section>
        <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
        <Dropdown.Separator />
        <SubmenuTrigger>
          <Dropdown.Item icon={LogOut01}>Sign out</Dropdown.Item>
          <Dropdown.Popover placement="right" className="w-50">
            <Dropdown.Menu selectionMode="none">
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </SubmenuTrigger>
      </Dropdown.Menu>

      <div className="flex shrink-0 justify-between border-t border-secondary px-4 py-3">
        <span className="truncate text-sm text-quaternary">© Codex</span>
        <span className="text-sm text-quaternary">v12.6.8</span>
      </div>
    </div>
  </Dropdown.Popover>
</Dropdown.Root>`,
  accountCardMd: `import { Dropdown } from "@opus2-platform/codex";
import { ChevronDown, HelpCircle, LogOut01, Moon01, Plus, Settings01, User01 } from "@opus2-platform/icons";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";

<Dropdown.Root>
  <AriaButton
    type="button"
    className="relative w-60 cursor-pointer rounded-lg bg-primary_alt p-2 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 outline-focus-ring"
  >
    <figure className="group flex min-w-0 flex-1 items-center gap-2">
      <div data-avatar="true" className="relative inline-flex shrink-0 rounded-full p-px ring-1 ring-secondary_alt size-10">
        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/32 before:mask-[linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)]">
          <img data-avatar-img="true" className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
        </div>
        <span className="absolute right-0 bottom-0 flex size-2.5 justify-center rounded-full bg-fg-success-secondary ring-[1.5px] ring-bg-primary">
          {/* gloss + reflection SVG — see AccountCardMdTrigger */}
        </span>
      </div>
      <figcaption className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-primary">Olivia Rhye</p>
        <p className="truncate text-sm text-tertiary">olivia@codex.io</p>
      </figcaption>
    </figure>
    <div className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md">
      <ChevronDown className="size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
    </div>
  </AriaButton>

  <Dropdown.Popover className="w-60 !flex !max-h-[min(100vh-8rem,26rem)] !flex-col !overflow-hidden">
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-secondary px-4 py-3">
        <p className="text-sm font-semibold text-primary">PRO account</p>
        <p className="text-sm text-tertiary">Renews 10 August 2028</p>
      </div>

      <Dropdown.Menu selectionMode="none" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <Dropdown.Item icon={User01} addon="⌘K-&gt;P">View profile</Dropdown.Item>
        <Dropdown.Item icon={Settings01} addon="⌘S">Settings</Dropdown.Item>
        <Dropdown.Item id="dark-mode-md" textValue="Dark mode" unstyled onAction={toggleDarkMode}>
          {/* Moon01 + toggle */}
        </Dropdown.Item>
        <SubmenuTrigger>
          <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
          <Dropdown.Popover placement="right" className="w-50">
            <Dropdown.Menu selectionMode="none">
              <Dropdown.Item>Documentation</Dropdown.Item>
              <Dropdown.Item>Contact support</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </SubmenuTrigger>
        <Dropdown.Separator />
        <Dropdown.Section>
          <Dropdown.SectionHeader>Company</Dropdown.SectionHeader>
          {/* unstyled Codex / Sisyphus rows + radio dots */}
        </Dropdown.Section>
        <Dropdown.Item icon={Plus}>New company</Dropdown.Item>
        <Dropdown.Separator />
        <SubmenuTrigger>
          <Dropdown.Item icon={LogOut01}>Sign out</Dropdown.Item>
          <Dropdown.Popover placement="right" className="w-50">
            <Dropdown.Menu selectionMode="none">
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </SubmenuTrigger>
      </Dropdown.Menu>

      <div className="flex shrink-0 justify-between border-t border-secondary px-4 py-3">
        <span className="truncate text-sm text-quaternary">© Codex</span>
        <span className="text-sm text-quaternary">v12.6.8</span>
      </div>
    </div>
  </Dropdown.Popover>
</Dropdown.Root>`,
  accountBreadcrumb: `import { Dropdown } from "@opus2-platform/codex";\n\n<Dropdown.Root>\n  <button className="flex cursor-pointer items-center gap-1.5 rounded-lg outline-0 outline-offset-2 outline-focus-ring">\n    <div className="flex rounded-lg bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">\n      <div className="relative inline-flex size-6 shrink-0 rounded-full shadow-md">\n        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:hidden">\n          <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />\n        </div>\n      </div>\n    </div>\n    <span className="text-sm font-semibold text-primary">Sienna Hewitt</span>\n    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-3 shrink-0 stroke-3 text-fg-quaternary">\n      <path d="m7 15 5 5 5-5M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />\n    </svg>\n  </button>\n\n  <Dropdown.Popover className="w-62">\n    <div className="h-min overflow-y-auto outline-hidden select-none flex flex-col gap-1 px-1.5 py-1.5">\n      <button className="relative w-full cursor-pointer rounded-md px-2 py-2 text-left outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover">\n        <figure className="group flex min-w-0 flex-1 items-center gap-1.5">\n          <div className="flex rounded-[10px] bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">\n            <div className="relative inline-flex size-8 shrink-0 rounded-full shadow-md">\n              <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">\n                <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />\n              </div>\n            </div>\n          </div>\n          <figcaption className="min-w-0 flex-1">\n            <p className="text-sm font-semibold text-primary">Caitlyn King</p>\n            <p className="truncate text-sm text-tertiary">caitlyn@codex.io</p>\n          </figcaption>\n        </figure>\n        <div className="absolute top-2 right-2 flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-primary ring-1 ring-inset ring-primary">\n          <div className="size-1.5 rounded-full bg-fg-white opacity-0 transition-inherit-all" />\n        </div>\n      </button>\n\n      <button className="relative w-full cursor-pointer rounded-md bg-primary_hover px-2 py-2 text-left outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover">\n        <figure className="group flex min-w-0 flex-1 items-center gap-1.5">\n          <div className="flex rounded-[10px] bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">\n            <div className="relative inline-flex size-8 shrink-0 rounded-full shadow-md">\n              <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">\n                <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />\n              </div>\n            </div>\n          </div>\n          <figcaption className="min-w-0 flex-1">\n            <p className="text-sm font-semibold text-primary">Sienna Hewitt</p>\n            <p className="truncate text-sm text-tertiary">sienna@codex.io</p>\n          </figcaption>\n        </figure>\n        <div className="absolute top-2 right-2 flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-brand-solid ring-1 ring-inset ring-brand-solid">\n          <div className="size-1.5 rounded-full bg-fg-white opacity-100 transition-inherit-all" />\n        </div>\n      </button>\n    </div>\n  </Dropdown.Popover>\n</Dropdown.Root>`,
} as const;

const PageHeader: FC = () => (
  <>
    <div className="bg-primary border-secondary fixed inset-x-0 top-0 z-30 w-full border-b">
      <div className="mx-auto flex size-full flex-1 items-center py-3 pr-3 pl-4 md:py-3 lg:px-5 lg:py-2.5">
        <nav aria-label="Breadcrumbs" className="min-w-0 max-lg:hidden">
          <ol aria-label="Breadcrumbs" className="relative flex gap-0.5 lg:gap-1">
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Base components</span>
              </a>
              <div className="text-fg-quaternary shrink-0">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <a className="group outline-focus-ring hover:bg-primary_hover inline-flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 lg:p-1.5">
                <span className="text-quaternary group-hover:text-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Components</span>
              </a>
              <div className="text-fg-quaternary shrink-0">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </li>
            <li className="flex items-center gap-0.5 lg:gap-1">
              <button type="button" className="bg-primary_hover cursor-default rounded-md p-1 lg:p-1.5">
                <span className="text-fg-tertiary_hover px-1 text-sm font-semibold whitespace-nowrap">Dropdowns</span>
              </button>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div className="mb-10 h-14 shrink-0 md:mb-12" aria-hidden="true" />
  </>
);

const DropdownsDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-dropdowns>
    <StorybookRootHeaderPortal>
      <PageHeader />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Dropdown components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            React dropdown components built for modern applications and websites. These dropdowns are built using React Aria and styled with Tailwind CSS.
          </p>
        </div>

        <DocsSection
          id="dropdown-example"
          title="Dropdown example"
          code={CODE.hero}
          sectionClassName={DOCS_SECTION_HERO_CLASS}
          dataPreview
          previewClassName={DOCS_PREVIEW_HERO_SURFACE_CLASS}
        >
          <Dropdown.Root>
            <Button color="secondary" iconTrailing={ChevronDown}>
              Account
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu>
                <CutCopyPasteMenu />
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>

        <section id="dropdown-examples" className="scroll-mt-20 pb-2">
          <h2 className="text-primary text-lg font-semibold md:text-xl">
            <SectionTitle className="text-lg font-semibold md:text-xl">Dropdown examples</SectionTitle>
          </h2>
          <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this dropdown component:</p>
        </section>

        <DocsSection id="button-simple" title="Button simple" code={CODE.buttonSimple}>
          <Dropdown.Root>
            <Button color="secondary" iconTrailing={ChevronDown}>
              Account
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu>
                <CutCopyPasteMenu />
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>

        <DocsSection id="button-advanced" title="Button advanced" code={CODE.buttonAdvanced}>
          <Dropdown.Root>
            <Button color="secondary" iconTrailing={ChevronDown}>
              Actions
            </Button>
            <Dropdown.Popover className="w-60">
              <AdvancedActionsMenu />
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>

        <DocsSection id="button-link" title="Button link" code={CODE.buttonLink}>
          <Dropdown.Root>
            <AriaButton className="text-secondary outline-focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
              Can edit
              <ChevronDown data-icon className="text-fg-quaternary size-4" />
            </AriaButton>
            <Dropdown.Popover className="w-40">
              <Dropdown.Menu selectionMode="single" defaultSelectedKeys={["can-edit"]}>
                <Dropdown.Item id="owner" unstyled>
                  {(state) => (
                    <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                      <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                        <svg viewBox="0 0 24 24" fill="none" className={`size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2 ${state.isSelected ? "" : "invisible"}`}>
                          <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="grow truncate text-sm font-semibold text-secondary">Owner</span>
                      </div>
                    </div>
                  )}
                </Dropdown.Item>
                <Dropdown.Item id="can-edit" unstyled>
                  {(state) => (
                    <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                      <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                        <svg viewBox="0 0 24 24" fill="none" className={`size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2 ${state.isSelected ? "" : "invisible"}`}>
                          <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="grow truncate text-sm font-semibold text-secondary">Can edit</span>
                      </div>
                    </div>
                  )}
                </Dropdown.Item>
                <Dropdown.Item id="can-view" unstyled>
                  {(state) => (
                    <div className="group block cursor-pointer px-1.5 py-px outline-hidden">
                      <div className="relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear group-hover:bg-primary_hover">
                        <svg viewBox="0 0 24 24" fill="none" className={`size-4 shrink-0 stroke-[2.25px] text-fg-brand-primary mr-2 ${state.isSelected ? "" : "invisible"}`}>
                          <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="grow truncate text-sm font-semibold text-secondary">Can view</span>
                      </div>
                    </div>
                  )}
                </Dropdown.Item>
                <Dropdown.Separator />
                <Dropdown.Item icon={Trash01}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>

        <DocsSection id="icon-simple" title="Icon simple" code={CODE.iconSimple}>
          <Dropdown.Root>
            <Dropdown.DotsButton />
            <Dropdown.Popover>
              <Dropdown.Menu>
                <CutCopyPasteMenu />
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>

        <DocsSection id="icon-advanced" title="Icon advanced" code={CODE.iconAdvanced}>
          <Dropdown.Root>
            <Dropdown.DotsButton />
            <Dropdown.Popover className="w-60">
              <AdvancedActionsMenu />
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>

        <DocsSection id="search-simple" title="Search simple" code={CODE.searchSimple}>
          <SearchSimpleDropdown />
        </DocsSection>

        <DocsSection id="search-advanced" title="Search advanced" code={CODE.searchAdvanced}>
          <SearchAdvancedDropdown />
        </DocsSection>

        <DocsSection id="integrations" title="Integrations" code={CODE.integrations}>
          <Dropdown.Root>
            <Button
              color="secondary"
              iconTrailing={<ChevronDown data-icon className="size-4! stroke-[2.25px]!" />}
            >
              Copy
            </Button>
            <Dropdown.Popover className="w-54">
              <Dropdown.Menu>
                <Dropdown.Section>
                  <Dropdown.Item icon={IntegrationsViewAsMarkdownIcon}>View as markdown</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsCopyAsMarkdownIcon}>Copy as markdown</Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section>
                  <Dropdown.Item icon={IntegrationsV0Icon}>Open in v0</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsClaudeIcon}>Open in Claude</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsBoltIcon}>Open in Bolt</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsLovableIcon}>Open in Lovable</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsCursorIcon}>Open in Cursor</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsChatGPTIcon}>Open in ChatGPT</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsPerplexityIcon}>Open in Perplexity</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsGeminiIcon}>Open in Gemini</Dropdown.Item>
                  <Dropdown.Item icon={IntegrationsFigmaIcon}>Open in Figma</Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section>
                  <Dropdown.Item icon={IntegrationsGitHubIcon}>Create GitHub Gist</Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>

        <DocsSection id="account-button" title="Account button" code={CODE.accountButton}>
          <AccountButtonDropdown />
        </DocsSection>

        <DocsSection id="avatar" title="Avatar" code={CODE.avatar}>
          <AvatarDropdown />
        </DocsSection>

        <DocsSection
          id="account-card-xs"
          title="Account card (xs)"
          code={CODE.accountCardXs}
          previewClassName={ACCOUNT_CARD_DOCS_PREVIEW_CLASS}
        >
          <AccountCardXsDropdown />
        </DocsSection>

        <DocsSection
          id="account-card-sm"
          title="Account card (sm)"
          code={CODE.accountCardSm}
          previewClassName={ACCOUNT_CARD_DOCS_PREVIEW_CLASS}
        >
          <AccountCardSmDropdown />
        </DocsSection>

        <DocsSection
          id="account-card-md"
          title="Account card (md)"
          code={CODE.accountCardMd}
          previewClassName={ACCOUNT_CARD_DOCS_PREVIEW_CLASS}
        >
          <AccountCardMdDropdown />
        </DocsSection>

        <DocsSection id="account-breadcrumb" title="Account breadcrumb" code={CODE.accountBreadcrumb}>
          <Dropdown.Root>
            <AriaButton className="flex cursor-pointer items-center gap-1.5 rounded-lg outline-0 outline-offset-2 outline-focus-ring">
              <div className="flex rounded-lg bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">
                <div className="relative inline-flex size-6 shrink-0 rounded-full shadow-md">
                  <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16 before:hidden">
                    <img
                      className="size-full object-cover"
                      src={CODEX_DOCS_AVATAR_SRC}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <span className="text-sm font-semibold text-primary">Sienna Hewitt</span>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true" className="size-3 shrink-0 stroke-3 text-fg-quaternary">
                <path d="m7 15 5 5 5-5M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </AriaButton>
            <Dropdown.Popover className="w-62">
              <div className="h-min overflow-y-auto outline-hidden select-none flex flex-col gap-1 px-1.5 py-1.5">
                <button
                  type="button"
                  className="relative w-full cursor-pointer rounded-md px-2 py-2 text-left outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover"
                >
                  <figure className="group flex min-w-0 flex-1 items-center gap-1.5">
                    <div className="flex rounded-[10px] bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">
                      <div className="relative inline-flex size-8 shrink-0 rounded-full shadow-md">
                        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                          <img className="size-full object-cover" src={CODEX_DOCS_AVATAR_SRC} alt="" />
                        </div>
                      </div>
                    </div>
                    <figcaption className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-primary">Caitlyn King</p>
                      <p className="truncate text-sm text-tertiary">caitlyn@codex.io</p>
                    </figcaption>
                  </figure>
                  <div className="absolute top-2 right-2 flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-primary ring-1 ring-inset ring-primary">
                    <div className="size-1.5 rounded-full bg-fg-white opacity-0 transition-inherit-all" />
                  </div>
                </button>

                <button
                  type="button"
                  className="relative w-full cursor-pointer rounded-md bg-primary_hover px-2 py-2 text-left outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover"
                >
                  <figure className="group flex min-w-0 flex-1 items-center gap-1.5">
                    <div className="flex rounded-[10px] bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">
                      <div className="relative inline-flex size-8 shrink-0 rounded-full shadow-md">
                        <div className="relative inline-flex size-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-tertiary outline-[0.5px] -outline-offset-[0.5px] outline-black/16">
                          <img
                            className="size-full object-cover"
                            src={CODEX_DOCS_AVATAR_SRC}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <figcaption className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-primary">Sienna Hewitt</p>
                      <p className="truncate text-sm text-tertiary">sienna@codex.io</p>
                    </figcaption>
                  </figure>
                  <div className="absolute top-2 right-2 flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-brand-solid ring-1 ring-inset ring-brand-solid">
                    <div className="size-1.5 rounded-full bg-fg-white opacity-100 transition-inherit-all" />
                  </div>
                </button>
              </div>
            </Dropdown.Popover>
          </Dropdown.Root>
        </DocsSection>
      </div>
    </main>
  </div>
);

const meta = {
  title: "Dropdowns",
  component: Dropdown.Root,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: DropdownsDocsPage,
    },
  },
} satisfies Meta<typeof Dropdown.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Dropdowns",
  args: {
    children: null,
  },
  render: () => <></>,
};

