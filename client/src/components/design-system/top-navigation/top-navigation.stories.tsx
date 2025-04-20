import type { Meta, StoryObj } from '@storybook/react';
import { TopNavigation } from './top-navigation';
import { ThemeToggle } from '../color-system/color-palette';
import { CircleUserRound, Bell, Search } from 'lucide-react';

const meta: Meta<typeof TopNavigation> = {
  title: 'Design System/Navigation/TopNavigation',
  component: TopNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Top Navigation Component

The top navigation bar is a primary navigation component that provides access to main sections of the application. It typically appears at the top of every page.

## Accessibility Features

- Mobile responsive with a proper toggle for smaller screens
- Keyboard navigable
- Clear indication of current/active page
- Proper ARIA attributes for screen readers

## Usage Guidelines

### When to use
- Use as the primary navigation for your application
- When users need to navigate between different major sections
- For consistent global navigation across the app

### When not to use
- Avoid using for minor sections or subsections (use tabs or secondary navigation)
- Don't overload with too many navigation items (keep it under 7 items)
`
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The application or site title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Enterprise DS' },
      }
    },
    items: {
      control: 'object',
      description: 'Navigation items to display',
      table: {
        type: { summary: 'NavItem[]' },
      }
    },
    logo: {
      control: { type: null },
      description: 'Custom logo component',
      table: {
        type: { summary: 'React.ReactNode' },
      }
    },
    actions: {
      control: { type: null },
      description: 'Custom action components for the right side',
      table: {
        type: { summary: 'React.ReactNode' },
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      }
    },
  },
  args: {
    title: 'Enterprise DS',
    items: [
      { label: 'Home', href: '#', isActive: true },
      { label: 'Components', href: '#' },
      { label: 'Guidelines', href: '#' },
      { label: 'Resources', href: '#' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = {};

export const WithCustomLogo: Story = {
  args: {
    logo: (
      <div className="flex-shrink-0 flex items-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="8" fill="currentColor" className="text-primary" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C20.418 24 24 20.418 24 16C24 11.582 20.418 8 16 8ZM16 20C13.791 20 12 18.209 12 16C12 13.791 13.791 12 16 12C18.209 12 20 13.791 20 16C20 18.209 18.209 20 16 20Z"
            fill="white"
          />
        </svg>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    actions: (
      <div className="flex items-center space-x-3">
        <button
          className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <ThemeToggle />
        <button
          className="p-1 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="User profile"
        >
          <CircleUserRound className="h-6 w-6" />
        </button>
      </div>
    ),
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: 'Home', href: '#', isActive: true },
      { label: 'Components', href: '#' },
      { label: 'Guidelines', href: '#' },
      { label: 'Resources', href: '#' },
      { label: 'Premium', href: '#', disabled: true },
    ],
  },
};

export const CustomStyling: Story = {
  args: {
    className: 'bg-gradient-to-r from-primary-600 to-primary-800 text-white border-none shadow-md',
    items: [
      { label: 'Home', href: '#', isActive: true },
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#' },
    ],
  },
  render: (args) => (
    <TopNavigation
      {...args}
      logo={
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M5.33333 24H26.6667V8H5.33333V24ZM16 20H10.6667V16H16V20ZM16 14.6667H10.6667V10.6667H16V14.6667ZM21.3333 20H17.3333V10.6667H21.3333V20Z"
            fill="currentColor"
          />
        </svg>
      }
    />
  ),
};
