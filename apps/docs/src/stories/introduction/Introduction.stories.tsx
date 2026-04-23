import type { Meta, StoryObj } from "@storybook/react";
import { ComponentsOverview } from "./components-overview";

const meta: Meta<typeof ComponentsOverview> = {
  title: "Overview",
  component: ComponentsOverview,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <ComponentsOverview />,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: "Overview",
};
