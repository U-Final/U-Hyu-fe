import type { Meta, StoryObj } from "@storybook/react-vite";
import PrimaryCheckbox from "../PrimaryCheckbox";


const meta: Meta<typeof PrimaryCheckbox> = {
  title: "Components/PrimaryCheckbox",
  component: PrimaryCheckbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "체크 상태 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PrimaryCheckbox>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

