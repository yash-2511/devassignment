import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Brand information
  brandTitle: 'Enterprise Design System',
  brandUrl: '#',
  brandTarget: '_self',
  
  // UI colors
  colorPrimary: '#2563EB',
  colorSecondary: '#7C3AED',

  // UI
  appBg: '#F9FAFB',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E5E7EB',
  appBorderRadius: 6,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#111827',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#6B7280',
  barSelectedColor: '#2563EB',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#D1D5DB',
  inputTextColor: '#111827',
  inputBorderRadius: 4,
});
