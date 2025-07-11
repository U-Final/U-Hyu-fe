import type { Meta, StoryObj } from "@storybook/react-vite";
import BottomNavigation from "../BottomNavigation";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof BottomNavigation> = {
  title: "UI/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "하단에 고정된 네비게이션 바 컴포넌트입니다. 탭 전환과 바코드 모달을 포함합니다.",
      },
    },
    viewport: {
      defaultViewport: "iphone6",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  render: () => (
    <BrowserRouter>
      <BottomNavigation />
    </BrowserRouter>
  ),
};
