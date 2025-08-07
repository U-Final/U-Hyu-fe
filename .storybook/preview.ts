import type { Preview } from "@storybook/react-vite";
import { createElement } from "react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    docs: {
      autodocs: "tag",
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0a0a0a",
        },
        {
          name: "gray",
          value: "#f5f5f5",
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      return createElement(
        "div",
        {
          className: `min-h-screen p-4 ${
            theme === "dark" ? "dark bg-background text-foreground" : "bg-[#454545] text-foreground"
          }`,
          "data-theme": theme,
        },
        createElement(Story)
      );
    },
  ],
};

export default preview;
