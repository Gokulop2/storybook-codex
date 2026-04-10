import { ColorPicker } from "@opus2-platform/codex";
import { parseColor } from "react-aria-components";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK,
  DOCS_SECTION_HERO_CLASS,
  DocsSection,
} from "../_docs/docs-preview-code";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";
import { ApplicationUiOverview } from "../_docs/application-ui-overview";

const COLOR_PICKER_TOC = [
  { id: "color-picker-overview", label: "Overview" },
  { id: "full", label: "Full" },
  { id: "minimal", label: "Minimal" },
  { id: "area", label: "Area" },
  { id: "hue-slider", label: "Hue slider" },
  { id: "alpha-slider", label: "Alpha slider" },
  { id: "swatch", label: "Swatch" },
  { id: "swatch-grid", label: "Swatch grid" },
  { id: "hex-input", label: "Hex input" },
  { id: "wheel", label: "Color wheel" },
] as const;

const PRESET_COLORS = [
  "#F04438", "#F79009", "#FCCD34", "#17B26A", "#0BA5EC",
  "#6172F3", "#9E77ED", "#EE46BC", "#667085", "#344054",
];

const ColorPickerDocsPage = () => {
  return (
    <div className="docs-sbdocs-with-toc-layout">
      <StorybookRootHeaderPortal>
        <DocsPageBreadcrumb catalog="application" currentLabel="Color picker" />
      </StorybookRootHeaderPortal>
      <StorybookSbdocsTocPortal>
        <OnThisPageNav items={COLOR_PICKER_TOC} />
      </StorybookSbdocsTocPortal>

      <main className="docs-sbdocs-content typography">
        <div id="color-picker-overview" className={DOCS_SECTION_HERO_CLASS}>
          <h1 className="docs-h1">Color picker</h1>
          <p>
            Color selection and adjustment. The compound <code className="text-sm">ColorPicker</code> from <code className="text-sm">@opus2-platform/codex</code> wraps
            React Aria color primitives — compose <code className="text-sm">Full</code>, sliders, swatches, inputs, and wheel subcomponents for each layout.
          </p>
          <ApplicationUiOverview
            items={[
              {
                label: "Value model",
                children: (
                  <>
                    Initialise with <code className="text-xs">parseColor(...)</code> from <code className="text-xs">react-aria-components</code>; support HSLA when
                    using the alpha slider.
                  </>
                ),
              },
              {
                label: "Layout",
                children: (
                  <>
                    Full vs minimal shells: same root <code className="text-xs">ColorPicker</code>, swap inner composition to control density and padding.
                  </>
                ),
              },
              {
                label: "Swatches & wheel",
                children: (
                  <>
                    Preset grids and eye-dropper-style flows use <code className="text-xs">Swatch</code> / <code className="text-xs">SwatchGrid</code> /{" "}
                    <code className="text-xs">ColorWheel</code> with design-token rings and radii.
                  </>
                ),
              },
            ]}
          />
          <div className={DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK}>
            <div className="w-full max-w-xs">
              <ColorPicker defaultValue={parseColor("hsl(240, 80%, 60%)")}>
                <ColorPicker.Full />
              </ColorPicker>
            </div>
          </div>
        </div>

        <div className="docs-sections-wrap">
          <DocsSection
            id="full"
            title="Full"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("hsl(240, 80%, 60%)")}>\n  <ColorPicker.Full />\n</ColorPicker>`}
          >
            <div className="w-full max-w-xs">
              <ColorPicker defaultValue={parseColor("hsl(240, 80%, 60%)")}>
                <ColorPicker.Full />
              </ColorPicker>
            </div>
          </DocsSection>

          <DocsSection
            id="minimal"
            title="Minimal"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("hsl(120, 70%, 50%)")}>\n  <ColorPicker.Minimal />\n</ColorPicker>`}
          >
            <div className="w-full max-w-xs">
              <ColorPicker defaultValue={parseColor("hsl(120, 70%, 50%)")}>
                <ColorPicker.Minimal />
              </ColorPicker>
            </div>
          </DocsSection>

          <DocsSection
            id="area"
            title="Area"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("hsl(0, 80%, 60%)")}>\n  <ColorPicker.Area />\n</ColorPicker>`}
          >
            <div className="w-full max-w-xs">
              <ColorPicker defaultValue={parseColor("hsl(0, 80%, 60%)")}>
                <ColorPicker.Area />
              </ColorPicker>
            </div>
          </DocsSection>

          <DocsSection
            id="hue-slider"
            title="Hue slider"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("hsl(200, 80%, 60%)")}>\n  <ColorPicker.HueSlider />\n</ColorPicker>`}
          >
            <div className="w-full max-w-xs">
              <ColorPicker defaultValue={parseColor("hsl(200, 80%, 60%)")}>
                <ColorPicker.HueSlider />
              </ColorPicker>
            </div>
          </DocsSection>

          <DocsSection
            id="alpha-slider"
            title="Alpha slider"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("hsla(200, 80%, 60%, 0.7)")}>\n  <ColorPicker.AlphaSlider />\n</ColorPicker>`}
          >
            <div className="w-full max-w-xs">
              <ColorPicker defaultValue={parseColor("hsla(200, 80%, 60%, 0.7)")}>
                <ColorPicker.AlphaSlider />
              </ColorPicker>
            </div>
          </DocsSection>

          <DocsSection
            id="swatch"
            title="Swatch"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("hsl(280, 70%, 55%)")}>\n  <ColorPicker.Swatch className="size-10" />\n</ColorPicker>`}
          >
            <ColorPicker defaultValue={parseColor("hsl(280, 70%, 55%)")}>
              <ColorPicker.Swatch className="size-10" />
            </ColorPicker>
          </DocsSection>

          <DocsSection
            id="swatch-grid"
            title="Swatch grid"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\nconst PRESET_COLORS = ["#F04438", "#F79009", ...];\n\n<ColorPicker defaultValue={parseColor("#9E77ED")}>\n  <ColorPicker.SwatchGrid colors={PRESET_COLORS} />\n</ColorPicker>`}
          >
            <ColorPicker defaultValue={parseColor("#9E77ED")}>
              <ColorPicker.SwatchGrid colors={PRESET_COLORS} />
            </ColorPicker>
          </DocsSection>

          <DocsSection
            id="hex-input"
            title="Hex input"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("#9E77ED")}>\n  <ColorPicker.Input channel="hex" label="HEX" />\n</ColorPicker>`}
          >
            <div className="w-40">
              <ColorPicker defaultValue={parseColor("#9E77ED")}>
                <ColorPicker.Input channel="hex" label="HEX" />
              </ColorPicker>
            </div>
          </DocsSection>

          <DocsSection
            id="wheel"
            title="Color wheel"
            code={`import { ColorPicker } from "@opus2-platform/codex";\nimport { parseColor } from "react-aria-components";\n\n<ColorPicker defaultValue={parseColor("hsl(240, 70%, 60%)")}>\n  <ColorPicker.Wheel size={180} />\n</ColorPicker>`}
          >
            <ColorPicker defaultValue={parseColor("hsl(240, 70%, 60%)")}>
              <ColorPicker.Wheel size={180} />
            </ColorPicker>
          </DocsSection>
        </div>
      </main>
    </div>
  );
};

const meta = {
  title: "Application UI/Color picker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: ColorPickerDocsPage,
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Color picker",
  args: {
    children: <ColorPicker.Full />,
    defaultValue: parseColor("hsl(240, 80%, 60%)"),
  },
};
