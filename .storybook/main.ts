import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../client/src/components/design-system/**/*.stories.@(js|jsx|ts|tsx)",
    "../client/src/components/design-system/**/*.mdx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-dark-mode",
    "@storybook/addon-styling-webpack",
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        postCss: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (config) => {
    // Add any custom Vite configuration
    return config;
  },
};

export default config;
