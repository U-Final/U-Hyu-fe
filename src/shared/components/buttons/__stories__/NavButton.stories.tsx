import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavButton } from "../NavButton";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof NavButton> = {
  title: "Buttons/NavButton",
  component: NavButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavButton>;

export const Default: Story = {
  args: {
    size: "md",
    children: "Nav Button",
  },
  parameters: {
    docs: {
      source: {
        code: `<NavButton size="md">Nav Button</NavButton>`,
      },
    },
  },
};
