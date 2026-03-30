import type { ComponentProps, FC, ReactNode } from "react";
import { Fragment } from "react";
import { VideoPlayer } from "@opus2-platform/codex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPageBreadcrumb } from "../_docs/docs-page-breadcrumb";
import {
  DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT,
  DOCS_PREVIEW_P_MARGIN_RESET,
  DOCS_SECTION_HERO_CLASS,
  type DocsSectionProps,
  DocsSection,
  SectionTitle,
} from "../_docs/docs-preview-code";
import { OnThisPageNav, StorybookRootHeaderPortal, StorybookSbdocsTocPortal } from "../_docs/docs-scaffold";

/** Short Big Buck Bunny sample for docs previews ([test-videos.co.uk](https://test-videos.co.uk/)). */
const SAMPLE_VIDEO_SRC =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4";

const IMPORT = `import { VideoPlayer } from "@opus2-platform/codex";`;

const withImport = (body: string) => `${IMPORT}\n\n${body}`;

type VideoSize = NonNullable<ComponentProps<typeof VideoPlayer>["size"]>;

const snippet = (size: VideoSize) =>
  withImport(`<VideoPlayer
  src="${SAMPLE_VIDEO_SRC}"
  size="${size}"
/>`);

const VIDEO_SIZES: readonly VideoSize[] = ["sm", "md", "lg"];

const CODE_MD = snippet("md");

const CODE = {
  /** Hero matches default/md showcase layout. */
  example: CODE_MD,
  sm: snippet("sm"),
  md: CODE_MD,
  lg: snippet("lg"),
} as const;

const PREVIEW_WELL = `${DOCS_PREVIEW_HERO_SURFACE_CLASS_STACK_TIGHT} ${DOCS_PREVIEW_P_MARGIN_RESET} items-center! justify-center!`.trim();

const VideoDocsSection: FC<DocsSectionProps> = ({ previewClassName, ...rest }) => (
  <DocsSection {...rest} previewClassName={previewClassName ?? PREVIEW_WELL} />
);

const TOC = [
  { id: "video-player-example", label: "Video player example" },
  { id: "video-player-examples", label: "Video player examples" },
  { id: "video-player-sm", label: "Video player sm" },
  { id: "video-player-md", label: "Video player md" },
  { id: "video-player-lg", label: "Video player lg" },
] as const;

const INTRO_BEFORE_SECTION_ID = "video-player-sm";

type VideoDocSection = {
  id: string;
  title: string;
  code: string;
  hero?: boolean;
  render: () => ReactNode;
};

const videoPreview = (size: VideoSize) => () => <VideoPlayer src={SAMPLE_VIDEO_SRC} size={size} />;

const VIDEO_DOC_SECTIONS: VideoDocSection[] = [
  {
    id: "video-player-example",
    title: "Video player example",
    code: CODE.example,
    hero: true,
    render: videoPreview("md"),
  },
  ...VIDEO_SIZES.map((size) => ({
    id: `video-player-${size}`,
    title: `Video player ${size}`,
    code: CODE[size],
    render: videoPreview(size),
  })),
];

const ExamplesIntro: FC = () => (
  <section id="video-player-examples" className="scroll-mt-20 pb-2">
    <h2 className="text-primary text-lg font-semibold md:text-xl">
      <SectionTitle className="text-lg font-semibold md:text-xl">Video player examples</SectionTitle>
    </h2>
    <p className="text-md text-tertiary mt-2 max-w-3xl">Below are examples and variations of this video player component:</p>
  </section>
);

const VideoPlayersDocsPage: FC = () => (
  <div className="bg-primary min-h-screen font-sans" data-codex-docs-video-players>
    <StorybookRootHeaderPortal>
      <DocsPageBreadcrumb currentLabel="Video players" />
    </StorybookRootHeaderPortal>
    <StorybookSbdocsTocPortal>
      <OnThisPageNav items={TOC} />
    </StorybookSbdocsTocPortal>

    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col">
      <div className="text-tertiary w-full min-w-0">
        <div className="mb-10">
          <div className="pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold">Video player components</h1>
          </div>
          <p className="text-md text-tertiary mt-0 max-w-3xl whitespace-pre-line">
            Powerful and customizable React video player components built for modern applications and websites. These video players are built using React and styled with Tailwind CSS.
          </p>
        </div>

        {VIDEO_DOC_SECTIONS.map((section) => (
          <Fragment key={section.id}>
            {section.id === INTRO_BEFORE_SECTION_ID ? <ExamplesIntro /> : null}
            <VideoDocsSection
              id={section.id}
              title={section.title}
              code={section.code}
              sectionClassName={section.hero ? DOCS_SECTION_HERO_CLASS : undefined}
              dataPreview={section.hero}
            >
              {section.render()}
            </VideoDocsSection>
          </Fragment>
        ))}
      </div>
    </main>
  </div>
);

const meta = {
  title: "Base components/Video players",
  component: VideoPlayer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: VideoPlayersDocsPage,
    },
  },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!dev"],
  name: "Video players",
  args: {
    src: SAMPLE_VIDEO_SRC,
    size: "md",
  },
};
