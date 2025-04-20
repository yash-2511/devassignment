import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import '../client/src/index.css';

// Ensure tailwind styles are loaded in Storybook
import { withThemeByDataAttribute } from '@storybook/addon-styling';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F9FAFB',
        },
        {
          name: 'dark',
          value: '#111827',
        },
      ],
    },
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.normal },
      stylePreview: true,
    },
    docs: {
      toc: true, // Enable table of contents
    },
  },
  decorators: [
    // Theme decorator to handle light/dark theme
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    // Decorator to ensure components have proper padding and background
    (Story) => (
      <div className="p-6 w-full max-w-full">
        <Story />
      </div>
    ),
  ],
};

export default preview;
