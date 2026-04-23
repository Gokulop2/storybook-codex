import React, { useState } from "react";
import { Button } from "@opus2-platform/codex";
import type { Meta } from "@storybook/react";

import { APPLICATION_UI_OVERVIEW_CARDS } from "../_docs/application-ui-overview-data";
import { BASE_COMPONENT_OVERVIEW_CARDS } from "../_docs/base-components-overview-data";
import { storybookManagerAutodocsHref } from "../_docs/storybook-manager-urls";

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
      className="border-secondary bg-primary h-auto w-full max-w-64 rounded-lg border object-cover shadow-xs"
    />
  );
};

const CardPreviewPlaceholder = () => (
  <div className="border-secondary bg-primary/60 flex h-30 w-full max-w-64 items-center justify-center rounded-lg border border-dashed">
    <span className="text-quaternary text-xs font-medium">Preview</span>
  </div>
);

const ComponentCard = ({ href, name, variants, preview }: ComponentCardProps) => (
  <a
    href={href}
    className="group border-secondary bg-primary hover:border-primary flex flex-col overflow-hidden rounded-xl border p-1 shadow-xs transition-all duration-150 ease-out hover:shadow-md"
  >
    <div className="bg-secondary flex min-h-30 items-center justify-center">{preview}</div>
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
        <div className="text-tertiary mb-2 text-sm">
          <span className="text-secondary">Components</span>
          <span className="text-quaternary mx-1">/</span>
          <span className="text-secondary">Overview</span>
        </div>

        <header className="border-secondary mb-12 border-b pb-10">
          <h1 className="text-display-sm text-primary mb-3 font-semibold tracking-tight">Opus2 Codex UI components</h1>
          <p className="text-tertiary max-w-2xl text-lg leading-7">
            Opus2 Codex is a centralized collection of React components built with Tailwind CSS and React Aria. Everything you need to design and develop
            consistent, accessible interfaces across Opus2 products — ready to use.
          </p>
          <div className="mt-6">
            <Button href={storybookManagerAutodocsHref("base-components-button")} size="md" color="primary">
              Explore components
            </Button>
          </div>
        </header>

        <Section
          title="Base components"
          description="Buttons, inputs, avatars—everything you need to design modern and beautiful apps, dashboards and responsive web applications. Same catalog as the Base components group in the sidebar."
        >
          {BASE_COMPONENT_OVERVIEW_CARDS.map((c) => (
            <ComponentCard
              key={c.storyIdPrefix}
              href={storybookManagerAutodocsHref(c.storyIdPrefix)}
              name={c.name}
              variants={c.variants}
              preview={
                c.image ? (
                  <CardImage src={`/${encodeURIComponent(c.image)}`} alt={`${c.name} component previews`} />
                ) : (
                  <CardPreviewPlaceholder />
                )
              }
            />
          ))}
        </Section>

        <Section
          title="Application UI"
          description="Higher-level patterns—navigation, feeds, pickers, notifications, and more. Compose these with base components to build complete application screens."
        >
          {APPLICATION_UI_OVERVIEW_CARDS.map((c) => (
            <ComponentCard
              key={c.storyIdPrefix}
              href={storybookManagerAutodocsHref(c.storyIdPrefix)}
              name={c.name}
              variants={c.variants}
              preview={
                c.image ? (
                  <CardImage src={`/${encodeURIComponent(c.image)}`} alt={`${c.name} component previews`} />
                ) : (
                  <CardPreviewPlaceholder />
                )
              }
            />
          ))}
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
