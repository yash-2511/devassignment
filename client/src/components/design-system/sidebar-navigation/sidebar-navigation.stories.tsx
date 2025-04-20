import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNavigation } from './sidebar-navigation';
import { Home, Settings, Users, FileText, Layers, HelpCircle, Mail, Database } from 'lucide-react';

const meta: Meta<typeof SidebarNavigation> = {
  title: 'Design System/Navigation/SidebarNavigation',
  component: SidebarNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Sidebar Navigation Component

The sidebar navigation provides hierarchical navigation for complex applications. It typically appears on the left side of the application and can contain nested navigation items.

## Accessibility Features

- Proper ARIA attributes for expandable sections
- Keyboard navigable
- Distinct visual indication for active/selected items
- Focus management for interactive elements

## Usage Guidelines

### When to use
- For applications with complex navigation hierarchies
- When users need persistent access to multiple sections
- For admin dashboards and enterprise applications

### When not to use
- For simple websites with minimal navigation needs
- On mobile screens where space is limited (consider using a hamburger menu instead)
`
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed at the top of the sidebar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Components' },
      }
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle displayed below the title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Browse the complete library' },
      }
    },
    items: {
      control: 'object',
      description: 'Navigation items to display in the sidebar',
      table: {
        type: { summary: 'SidebarItem[]' },
      }
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the sidebar can be collapsed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is collapsed by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
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
    title: 'Components',
    subtitle: 'Browse the complete library',
    collapsible: false,
    defaultCollapsed: false,
    items: [
      {
        label: 'Foundation',
        items: [
          { label: 'Colors', href: '#colors', isActive: true },
          { label: 'Typography', href: '#typography' },
          { label: 'Layout', href: '#layout' },
          { label: 'Icons', href: '#icons' }
        ]
      },
      {
        label: 'Data Display',
        items: [
          { label: 'Accordion', href: '#accordion' },
          { label: 'Badges & Tags', href: '#badges' },
          { label: 'Tooltip', href: '#tooltip' },
          { label: 'Progress', href: '#progress' }
        ]
      },
      {
        label: 'Navigation',
        items: [
          { label: 'Top Navigation', href: '#navbar' },
          { label: 'Sidebar', href: '#sidebar' },
          { label: 'Tabs', href: '#tabs', isActive: true },
          { label: 'Breadcrumbs', href: '#breadcrumbs' }
        ]
      }
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {
  render: (args) => (
    <div className="h-[500px] border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
      <SidebarNavigation {...args} />
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Dashboard',
        icon: <Home className="h-5 w-5" />,
        href: '#',
        isActive: true
      },
      {
        label: 'Team',
        icon: <Users className="h-5 w-5" />,
        href: '#'
      },
      {
        label: 'Projects',
        icon: <Layers className="h-5 w-5" />,
        items: [
          { label: 'Overview', href: '#' },
          { label: 'Active Projects', href: '#' },
          { label: 'Archived', href: '#' }
        ]
      },
      {
        label: 'Reports',
        icon: <FileText className="h-5 w-5" />,
        href: '#'
      },
      {
        label: 'Settings',
        icon: <Settings className="h-5 w-5" />,
        href: '#'
      },
      {
        label: 'Help',
        icon: <HelpCircle className="h-5 w-5" />,
        href: '#',
        disabled: true
      }
    ],
  },
  render: (args) => (
    <div className="h-[500px] border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
      <SidebarNavigation {...args} />
    </div>
  ),
};

export const Collapsible: Story = {
  args: {
    collapsible: true,
    defaultCollapsed: false,
    items: [
      {
        label: 'Dashboard',
        icon: <Home className="h-5 w-5" />,
        href: '#',
        isActive: true
      },
      {
        label: 'Inbox',
        icon: <Mail className="h-5 w-5" />,
        href: '#'
      },
      {
        label: 'Database',
        icon: <Database className="h-5 w-5" />,
        href: '#'
      },
      {
        label: 'Team',
        icon: <Users className="h-5 w-5" />,
        href: '#'
      },
      {
        label: 'Settings',
        icon: <Settings className="h-5 w-5" />,
        href: '#'
      }
    ],
  },
  render: (args) => (
    <div className="h-[500px] border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
      <SidebarNavigation {...args} />
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    className: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-900',
    title: 'Admin Console',
    subtitle: 'Manage your application',
    items: [
      {
        label: 'Overview',
        icon: <Home className="h-5 w-5" />,
        href: '#',
        isActive: true
      },
      {
        label: 'Users & Permissions',
        icon: <Users className="h-5 w-5" />,
        items: [
          { label: 'All Users', href: '#' },
          { label: 'Roles', href: '#' },
          { label: 'Permissions', href: '#' }
        ]
      },
      {
        label: 'Configuration',
        icon: <Settings className="h-5 w-5" />,
        href: '#'
      }
    ],
  },
  render: (args) => (
    <div className="h-[500px] border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
      <SidebarNavigation {...args} />
    </div>
  ),
};
