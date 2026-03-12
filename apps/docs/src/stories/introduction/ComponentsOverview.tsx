import React, { useState } from "react";
import { Button } from "@opus2-platform/codex";
import type { Meta } from "@storybook/react";

// import { Toggle } from "@/components/base/toggle/toggle";
// import { Avatar } from "@/components/base/avatar/avatar";
// import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
// import { CheckCircle, X } from "@untitledui/icons";

interface ComponentCardProps {
  href: string;
  name: string;
  variants: string;
  preview: React.ReactNode;
}

const IMAGE_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"><rect width="320" height="200" fill="#f4f4f5" stroke="#e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">Image not found</text></svg>`
  );

const CardImage = ({ src, alt }: { src: string; alt: string }) => {
  const [source, setSource] = useState(src);
  return (
    <img
      src={source}
      alt={alt}
      onError={() => {
        if (source !== IMAGE_FALLBACK) setSource(IMAGE_FALLBACK);
      }}
      className="border-secondary bg-primary h-auto w-full max-w-[260px] rounded-lg border object-cover shadow-xs"
    />
  );
};

const ComponentCard = ({ href, name, variants, preview }: ComponentCardProps) => (
  <a
    href={href}
    className="group border-secondary bg-primary hover:border-primary flex flex-col overflow-hidden rounded-xl border p-1 shadow-xs transition-all duration-150 ease-out hover:shadow-md"
  >
    <div className="bg-secondary flex min-h-[120px] items-center justify-center">{preview}</div>
    <div className="flex flex-col justify-between gap-0.5 px-2 py-3">
      <span className="text-primary group-hover:text-brand-secondary min-w-0 truncate text-sm font-semibold">{name}</span>
      <span className="text-tertiary shrink-0 text-sm whitespace-nowrap">{variants}</span>
    </div>
  </a>
);

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <section className="pb-16 2xl:pb-20">
    <div className="mx-auto w-full max-w-376">
      <h2 className="text-primary mb-1 text-lg font-semibold">{title}</h2>
      <p className="text-tertiary mb-6 text-sm">{description}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
    </div>
  </section>
);

export const ComponentsOverview = () => {
  return (
    <div className="not-prose bg-primary min-h-screen w-full">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page header / breadcrumb */}
        <div className="text-tertiary mb-2 text-sm">
          <span className="text-secondary">Components</span>
          <span className="text-quaternary mx-1">/</span>
          <span className="text-secondary">Overview</span>
        </div>

        {/* Hero */}
        <header className="border-secondary mb-12 border-b pb-10">
          <h1 className="text-display-sm text-primary mb-3 font-semibold tracking-tight">Opus2 Codex UI components</h1>
          <p className="text-tertiary max-w-2xl text-lg leading-7">
            Opus2 Codex is a centralized collection of React components built with Tailwind CSS and React Aria. Everything you need to design and develop
            consistent, accessible interfaces across Opus2 products — ready to use.
          </p>
          <div className="mt-6">
            <Button href="?path=/story/base-button--primary" size="md" color="primary">
              Explore components
            </Button>
          </div>
        </header>

        {/* Base components */}
        <Section
          title="Base components"
          description="Buttons, inputs, avatars—everything you need to design modern and beautiful apps, dashboards and responsive web applications."
        >
          <ComponentCard
            href="?path=/story/foundations-featuredicon--default"
            name="Featured icons"
            variants="1 component + 6 variants"
            preview={<CardImage src="/Featured%20icons.png" alt="Featured icons component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-button--primary"
            name="Buttons"
            variants="1 component + 13 variants"
            preview={<CardImage src="/Buttons.png" alt="Buttons component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-button--primary"
            name="Button groups"
            variants="1 component + 6 variants"
            preview={<CardImage src="/Button%20groups.png" alt="Button groups component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-input--default"
            name="Inputs"
            variants="1 component + 10 variants"
            preview={<CardImage src="/Inputs.png" alt="Inputs component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-textarea--default"
            name="Textareas"
            variants="1 component + 3 variants"
            preview={<CardImage src="/Textarea.png" alt="Textareas component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-checkbox--default"
            name="Checkboxes"
            variants="1 component + 5 variants"
            preview={<CardImage src="/Checkboxes.png" alt="Checkboxes component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-toggle--default"
            name="Toggles"
            variants="1 component + 7 variants"
            preview={<CardImage src="/Toggles.png" alt="Toggles component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-radio-buttons--default"
            name="Radio buttons"
            variants="1 component + 5 variants"
            preview={<CardImage src="/Radio%20buttons.png" alt="Radio buttons component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-dropdown--default"
            name="Dropdowns"
            variants="1 component + 3 variants"
            preview={<CardImage src="/Dropdowns.png" alt="Dropdowns component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-input--default"
            name="Credit cards"
            variants="1 component + variants"
            preview={<CardImage src="/Credit%20cards.png" alt="Credit cards component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-tooltip--default"
            name="Tooltips"
            variants="1 component + 11 variants"
            preview={<CardImage src="/Tooltips.png" alt="Tooltips component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-badges--default"
            name="Badges"
            variants="1 component + 25 variants"
            preview={<CardImage src="/Badges.png" alt="Badges component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-badges--default"
            name="Badge groups"
            variants="1 component + 20 variants"
            preview={<CardImage src="/Badge%20groups.png" alt="Badge groups component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-tags--default"
            name="Tags"
            variants="1 component + variants"
            preview={<CardImage src="/Tags.png" alt="Tags component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-avatar--default"
            name="Avatars"
            variants="3 components + 11 variants"
            preview={<CardImage src="/Avatars.png" alt="Avatars component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-slider--default"
            name="Sliders"
            variants="1 component + 4 variants"
            preview={<CardImage src="/Sliders.png" alt="Sliders component previews" />}
          />
          <ComponentCard
            href="?path=/story/base-progress-indicators--default"
            name="Progress indicators"
            variants="2 components + 9 variants"
            preview={<CardImage src="/Progress%20indicators.png" alt="Progress indicators component previews" />}
          />
        </Section>

        {/* Application UI components */}
        <Section
          title="Application UI components"
          description="Modals, tables, alerts—everything you need to design modern and beautiful apps, dashboards and responsive web applications."
        >
          <ComponentCard
            href="?path=/story/application-modal--default"
            name="Modals"
            variants="46 components"
            preview={<div className="border-secondary h-16 w-24 rounded-lg border-2 border-dashed" />}
          />
          <ComponentCard
            href="?path=/story/application-tabs--default"
            name="Tabs"
            variants="10 components"
            preview={
              <div className="bg-secondary flex gap-1 rounded-lg p-1">
                <div className="bg-primary rounded-md px-2 py-1 text-xs font-medium shadow-xs">Tab 1</div>
                <div className="text-tertiary rounded-md px-2 py-1 text-xs font-medium">Tab 2</div>
              </div>
            }
          />
          <ComponentCard
            href="?path=/story/application-emptystate--default"
            name="Empty states"
            variants="Multiple layouts"
            preview={
              <div className="border-secondary bg-primary/60 flex h-16 w-24 flex-col items-center justify-center rounded-lg border">
                <div className="bg-secondary mb-2 size-8 rounded-full" />
                <div className="bg-tertiary/40 h-1.5 w-16 rounded" />
              </div>
            }
          />
          <ComponentCard
            href="?path=/story/application-fileupload--default"
            name="File upload"
            variants="Drag and drop + triggers"
            preview={
              <div className="border-secondary bg-primary/40 flex h-16 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <div className="bg-secondary mb-1 size-6 rounded-full" />
                <div className="bg-tertiary/40 h-1.5 w-20 rounded" />
              </div>
            }
          />
        </Section>

        {/* Foundations */}
        {/* <Section
                    title="Foundations"
                    description="Core design elements and building blocks."
                >
                    <ComponentCard
                        href="?path=/story/foundations-featuredicon--default"
                        name="Featured icons"
                        variants="1 component + 6 variants"
                        preview={
                            <FeaturedIcon
                                icon={CheckCircle}
                                color="brand"
                                theme="light"
                                size="md"
                            />
                        }
                    />
                    <ComponentCard
                        href="?path=/story/base-toggle--default"
                        name="Toggles"
                        variants="Brand, neutral, and destructive"
                        preview={
                            <div className="flex items-center gap-2">
                                <Toggle size="sm" aria-label="Toggle" defaultSelected />
                                <Toggle size="sm" aria-label="Toggle" />
                            </div>
                        }
                    />
                </Section> */}

        {/* Example stories */}
        <Section title="Example stories" description="Default Storybook example components.">
          <ComponentCard
            href="?path=/story/example-button--primary"
            name="Example Button"
            variants="Basic button"
            preview={<button className="bg-brand-solid rounded px-3 py-1.5 text-sm font-medium text-white">Button</button>}
          />
          <ComponentCard
            href="?path=/story/example-header--logged-in"
            name="Example Header"
            variants="Header with user state"
            preview={
              <div className="bg-secondary flex h-8 w-32 items-center justify-between rounded px-2">
                <div className="bg-tertiary/40 h-3 w-12 rounded" />
                <div className="bg-tertiary/30 h-3 w-8 rounded" />
              </div>
            }
          />
          <ComponentCard
            href="?path=/story/example-page--logged-out"
            name="Example Page"
            variants="Full page layout"
            preview={
              <div className="border-secondary h-12 w-24 rounded border">
                <div className="bg-tertiary/40 m-2 h-3 w-16 rounded" />
                <div className="bg-tertiary/30 mx-2 h-2 w-14 rounded" />
              </div>
            }
          />
          <ComponentCard
            href="#"
            name="Dismissible alert"
            variants="Success, warning, error"
            preview={
              <div className="border-success-primary bg-success-secondary flex items-start gap-2 rounded-lg border px-3 py-2">
                <span className="text-success-primary mt-0.5">
                  {/* <CheckCircle className="size-4" aria-hidden /> */}
                  Check
                </span>
                <div className="flex-1">
                  <p className="text-success-primary text-sm font-medium">Changes saved</p>
                  <p className="text-success-primary/80 text-xs">Your changes have been successfully saved.</p>
                </div>
                <button type="button" className="text-success-primary/80 hover:text-success-primary">
                  {/* <X className="size-3.5" aria-hidden /> */}X
                </button>
              </div>
            }
          />
        </Section>
      </div>
    </div>
  );
};

export default {
  title: "Overview",
  component: ComponentsOverview,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <ComponentsOverview />,
    },
  },
} satisfies Meta<typeof ComponentsOverview>;
