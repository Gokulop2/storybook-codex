import type { FC, ReactNode } from "react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

type ButtonSize = "sm" | "md" | "lg" | "xl";
const sizes: ButtonSize[] = ["sm", "md", "lg", "xl"];

const ArrowRightIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 10h7.5M10 5l4.5 5L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DarkModeToggle: FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => {
  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      className="group outline-focus-ring disabled:text-fg-disabled_subtle text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
    >
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
        className="size-4"
      >
        <path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z" />
      </svg>
    </button>
  );
};

const DocsSection: FC<{ id: string; title: string; children: ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="group my-8 flex w-full scroll-mt-20 flex-col gap-3">
    <header className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        <h3 className="text-md text-primary font-semibold">
          <a className="outline-focus-ring rounded-xs focus:outline-2 focus:outline-offset-2" href={`#${id}`}>
            {title}
          </a>
        </h3>
      </div>
    </header>
    <div className="outline-focus-ring ring-secondary bg-primary relative flex max-w-full items-center justify-center rounded-[20px] px-6 py-10 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-130">
      {children}
    </div>
  </section>
);

const ButtonDocsPage: FC = () => {
  const [isPreviewDark, setIsPreviewDark] = useState(false);

  return (
    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col lg:flex-row">
      <div className="text-tertiary size-full">
        <div className="mb-10">
          <div className="flex items-center gap-2 pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Button components</h1>
          </div>

          <p className="typography text-md max-w-3xl whitespace-pre-line">
            Free and open-source React button components built for modern applications and websites. These buttons are built using React Aria and styled with
            Tailwind CSS.
          </p>
        </div>

        <section id="button-example" className="group not-typography my-8 flex w-full scroll-mt-20 flex-col gap-3">
          <header className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <h3 className="text-md text-primary font-semibold">
                <a className="outline-focus-ring rounded-xs focus:outline-2 focus:outline-offset-2" href="#button-example">
                  Button example
                </a>
              </h3>
            </div>

            <div className="flex items-center justify-between gap-3 md:h-9">
              <div className="flex">
                <DarkModeToggle isDark={isPreviewDark} onToggle={() => setIsPreviewDark((prev) => !prev)} />

                {/* Copy code (non-functional, visual only) */}
                <button
                  type="button"
                  aria-label="Copy"
                  className="group outline-focus-ring disabled:text-fg-disabled_subtle text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
                >
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
                    className="size-4"
                  >
                    <path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z" />
                  </svg>
                </button>
              </div>

              {/* Preview / Code tabs (visual only) */}
              <div className="group bg-secondary_alt ring-secondary order-first flex gap-0 rounded-lg ring-1 ring-inset md:order-last">
                <div className="outline-focus-ring bg-primary_alt text-secondary ring-primary z-10 flex h-max cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap shadow-xs ring-1 transition duration-100 ease-linear ring-inset">
                  Preview
                </div>
                <div className="text-quaternary outline-focus-ring z-10 flex h-max cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition duration-100 ease-linear">
                  Code
                </div>
              </div>
            </div>
          </header>

          <div
            className={`outline-focus-ring ring-secondary bg-primary relative flex min-h-80 max-w-full items-center justify-center gap-3 rounded-[20px] py-32 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-130 ${
              isPreviewDark ? "dark-mode" : ""
            }`}
          >
            <div className="flex flex-col items-start gap-3 md:flex-row">
              <Button color="primary-destructive">Delete project</Button>
              <Button color="secondary">Stage for publish</Button>
              <Button color="primary" iconLeading={ArrowRightIcon}>
                Publish now
              </Button>
            </div>
          </div>
        </section>

        <svg data-divider="true" width="100%" height="2" className="my-10 shrink-0 md:my-12">
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            className="stroke-border-secondary"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0,6"
          />
        </svg>

        <section id="installation" className="scroll-mt-20">
          <h2>
            <a href="#installation">Installation</a>
          </h2>
          <p className="mt-2">You can add this button component using our CLI or manually:</p>
          <div className="mt-6">
            <pre className="group/pre bg-primary ring-secondary_alt relative w-full max-w-xl overflow-hidden rounded-xl p-4 font-mono text-sm leading-6 font-medium shadow-lg ring-1">
              <code>npx untitledui@latest add button</code>
            </pre>
          </div>
        </section>

        <svg data-divider="true" width="100%" height="2" className="my-10 shrink-0 md:my-12">
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            className="stroke-border-secondary"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0,6"
          />
        </svg>

        <h2 id="button-examples" className="text-primary scroll-mt-20 text-lg font-semibold md:text-xl">
          <a href="#button-examples">Button examples</a>
        </h2>
        <p className="mt-2">Below are examples and variations of this button component:</p>

        <DocsSection id="primary-buttons" title="Primary buttons">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="primary">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="secondary-buttons" title="Secondary buttons">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="secondary">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="tertiary-buttons" title="Tertiary buttons">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="tertiary">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="link-color-buttons" title="Link color buttons">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="link-color">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="link-gray-buttons" title="Link gray buttons">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="link-gray">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="icon-leading-buttons" title="Icon leading buttons">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`primary-${size}`} size={size} color="primary" iconLeading={ArrowRightIcon}>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`secondary-${size}`} size={size} color="secondary" iconLeading={ArrowRightIcon}>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`tertiary-${size}`} size={size} color="tertiary" iconLeading={ArrowRightIcon}>
                  Button {size}
                </Button>
              ))}
            </div>
          </div>
        </DocsSection>

        <DocsSection id="icon-trailing-buttons" title="Icon trailing buttons">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`primary-${size}`} size={size} color="primary" iconTrailing={ArrowRightIcon}>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`secondary-${size}`} size={size} color="secondary" iconTrailing={ArrowRightIcon}>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`tertiary-${size}`} size={size} color="tertiary" iconTrailing={ArrowRightIcon}>
                  Button {size}
                </Button>
              ))}
            </div>
          </div>
        </DocsSection>

        <DocsSection id="icon-only-buttons" title="Icon only buttons">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="primary" iconLeading={ArrowRightIcon} aria-label={`Button ${size}`} />
            ))}
          </div>
        </DocsSection>

        <DocsSection id="loading-buttons" title="Loading buttons">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`primary-${size}`} size={size} color="primary" isLoading>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`secondary-${size}`} size={size} color="secondary" isLoading showTextWhileLoading>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`tertiary-${size}`} size={size} color="tertiary" isLoading showTextWhileLoading>
                  Button {size}
                </Button>
              ))}
            </div>
          </div>
        </DocsSection>

        <DocsSection id="disabled-buttons" title="Disabled buttons">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`primary-${size}`} size={size} color="primary" isDisabled>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`secondary-${size}`} size={size} color="secondary" isDisabled>
                  Button {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={`tertiary-${size}`} size={size} color="tertiary" isDisabled>
                  Button {size}
                </Button>
              ))}
            </div>
          </div>
        </DocsSection>

        <DocsSection id="primary-buttons-destructive" title="Primary buttons destructive">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="primary-destructive">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="secondary-buttons-destructive" title="Secondary buttons destructive">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="secondary-destructive">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>

        <DocsSection id="tertiary-buttons-destructive" title="Tertiary buttons destructive">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size} color="tertiary-destructive">
                Button {size}
              </Button>
            ))}
          </div>
        </DocsSection>
      </div>
    </main>
  );
};

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ButtonDocsPage,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButtons: Story = {
  name: "Primary buttons",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="primary">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const SecondaryButtons: Story = {
  name: "Secondary buttons",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="secondary">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const TertiaryButtons: Story = {
  name: "Tertiary buttons",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="tertiary">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const LinkColorButtons: Story = {
  name: "Link color buttons",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="link-color">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const LinkGrayButtons: Story = {
  name: "Link gray buttons",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="link-gray">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const IconLeadingButtons: Story = {
  name: "Icon leading buttons",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`primary-${size}`} size={size} color="primary" iconLeading={ArrowRightIcon}>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`secondary-${size}`} size={size} color="secondary" iconLeading={ArrowRightIcon}>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`tertiary-${size}`} size={size} color="tertiary" iconLeading={ArrowRightIcon}>
            Button {size}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const IconTrailingButtons: Story = {
  name: "Icon trailing buttons",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`primary-${size}`} size={size} color="primary" iconTrailing={ArrowRightIcon}>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`secondary-${size}`} size={size} color="secondary" iconTrailing={ArrowRightIcon}>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`tertiary-${size}`} size={size} color="tertiary" iconTrailing={ArrowRightIcon}>
            Button {size}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const IconOnlyButtons: Story = {
  name: "Icon only buttons",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="primary" iconLeading={ArrowRightIcon} aria-label={`Button ${size}`} />
      ))}
    </div>
  ),
};

export const LoadingButtons: Story = {
  name: "Loading buttons",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`primary-${size}`} size={size} color="primary" isLoading>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`secondary-${size}`} size={size} color="secondary" isLoading showTextWhileLoading>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`tertiary-${size}`} size={size} color="tertiary" isLoading showTextWhileLoading>
            Button {size}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const DisabledButtons: Story = {
  name: "Disabled buttons",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`primary-${size}`} size={size} color="primary" isDisabled>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`secondary-${size}`} size={size} color="secondary" isDisabled>
            Button {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={`tertiary-${size}`} size={size} color="tertiary" isDisabled>
            Button {size}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const PrimaryDestructiveButtons: Story = {
  name: "Primary buttons destructive",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="primary-destructive">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const SecondaryDestructiveButtons: Story = {
  name: "Secondary buttons destructive",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="secondary-destructive">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const TertiaryDestructiveButtons: Story = {
  name: "Tertiary buttons destructive",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} color="tertiary-destructive">
          Button {size}
        </Button>
      ))}
    </div>
  ),
};
