import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './tabs';
import { Card } from '@/components/ui/card';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tabs Component

Tabs organize content into separate views where only one view is visible at a time. They're used for switching between different content sections within the same context.

## Accessibility Features

- Implements keyboard navigation (left/right arrows, home/end)
- Follows WAI-ARIA Tabs Pattern with appropriate roles and attributes
- Focus management for keyboard users
- Proper state indication (selected vs. unselected)

## Usage Guidelines

### When to use
- Use tabs to divide content into logical sections that users may want to navigate between
- Ideal for grouping related content into discrete sections within the same context
- When users need to switch between different views without leaving the current page

### When not to use
- Avoid using tabs for sequential process steps (use a stepper instead)
- Don't use tabs for navigation between entirely different sections of an application
- Avoid using too many tabs (more than 6-7) in a single component
`
      }
    }
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default selected tab value (for uncontrolled components)',
      table: {
        type: { summary: 'string' },
      }
    },
    value: {
      control: 'text',
      description: 'The controlled value of the selected tab',
      table: {
        type: { summary: 'string' },
      }
    },
    onValueChange: {
      action: 'tab changed',
      description: 'Callback when the tab changes',
      table: {
        type: { summary: '(value: string) => void' },
      }
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the tabs component',
      table: {
        type: { summary: 'string' },
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
    defaultValue: 'tab1',
    orientation: 'horizontal',
    ariaLabel: 'Tabs Example',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Tabs {...args}>
        <TabList>
          <Tab value="tab1">Usage</Tab>
          <Tab value="tab2">Accessibility</Tab>
          <Tab value="tab3">Implementation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-3">When to use Tabs</h3>
              <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-2">
                <li>Use tabs to divide content into logical sections that users may want to navigate between.</li>
                <li>Ideal for when you need to display multiple sections of related content within the same context.</li>
                <li>Best for moderate amounts of content that can be clearly divided into categories.</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Best Practices</h3>
              <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-2">
                <li>Keep tab labels short and descriptive.</li>
                <li>Use consistent tab styling throughout your application.</li>
                <li>Avoid deeply nested tabs or too many tabs in a single component.</li>
              </ul>
            </Card>
          </TabPanel>
          <TabPanel value="tab2">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-3">Accessibility Considerations</h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">The tabs component is built following the WAI-ARIA Tabs Pattern to ensure proper accessibility:</p>
              
              <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-2">
                <li>All tabs are properly associated with their panels using aria-controls and aria-labelledby</li>
                <li>Keyboard navigation is fully supported (← → ↓ ↑ Home End)</li>
                <li>Active tab is indicated with aria-selected="true"</li>
                <li>Content follows focus management best practices</li>
              </ul>
            </Card>
          </TabPanel>
          <TabPanel value="tab3">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-3">React Implementation</h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">Our Tab component is implemented with TypeScript and React:</p>
              
              <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md overflow-x-auto text-sm font-mono mb-4">
{`interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  ariaLabel: string;
}

export const Tabs: React.FC<TabsProps>`}
              </pre>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
};

export const DisabledTab: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Tabs {...args}>
        <TabList>
          <Tab value="tab1">Active Tab</Tab>
          <Tab value="tab2" disabled>Disabled Tab</Tab>
          <Tab value="tab3">Another Tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">
            <Card className="p-6">
              <p>This is the content for the first tab.</p>
            </Card>
          </TabPanel>
          <TabPanel value="tab2">
            <Card className="p-6">
              <p>This content should not be visible as the tab is disabled.</p>
            </Card>
          </TabPanel>
          <TabPanel value="tab3">
            <Card className="p-6">
              <p>This is the content for the third tab.</p>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
};

export const CustomStyling: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Tabs {...args}>
        <TabList className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded-t-lg border border-neutral-200 dark:border-neutral-700 border-b-0">
          <Tab 
            value="tab1" 
            className="bg-white dark:bg-neutral-900 rounded-t-md border-b-0 shadow-sm"
          >
            First Tab
          </Tab>
          <Tab 
            value="tab2"
            className="hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-t-md transition-colors"
          >
            Second Tab
          </Tab>
          <Tab 
            value="tab3"
            className="hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-t-md transition-colors"
          >
            Third Tab
          </Tab>
        </TabList>
        <TabPanels className="border border-neutral-200 dark:border-neutral-700 rounded-b-lg p-4 bg-white dark:bg-neutral-900">
          <TabPanel value="tab1">
            <p className="text-neutral-700 dark:text-neutral-300">
              Content for the first tab with custom styling.
            </p>
          </TabPanel>
          <TabPanel value="tab2">
            <p className="text-neutral-700 dark:text-neutral-300">
              Content for the second tab with custom styling.
            </p>
          </TabPanel>
          <TabPanel value="tab3">
            <p className="text-neutral-700 dark:text-neutral-300">
              Content for the third tab with custom styling.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
};

export const VerticalTabs: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Tabs {...args}>
        <TabList className="flex flex-col space-y-2 space-x-0 border-b-0 border-r border-neutral-200 dark:border-neutral-700 pr-4 w-48">
          <Tab 
            value="tab1" 
            className="justify-start border-b-0 border-r-2 py-2"
          >
            Dashboard
          </Tab>
          <Tab 
            value="tab2"
            className="justify-start border-b-0 border-r-2 py-2"
          >
            Settings
          </Tab>
          <Tab 
            value="tab3"
            className="justify-start border-b-0 border-r-2 py-2"
          >
            Reports
          </Tab>
        </TabList>
        <TabPanels className="flex-1">
          <TabPanel value="tab1">
            <Card className="p-6 h-full">
              <h3 className="text-lg font-medium mb-3">Dashboard</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                View your main dashboard metrics and KPIs here.
              </p>
            </Card>
          </TabPanel>
          <TabPanel value="tab2">
            <Card className="p-6 h-full">
              <h3 className="text-lg font-medium mb-3">Settings</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                Configure your application settings and preferences.
              </p>
            </Card>
          </TabPanel>
          <TabPanel value="tab3">
            <Card className="p-6 h-full">
              <h3 className="text-lg font-medium mb-3">Reports</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                View and export detailed reports and analytics.
              </p>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
};
