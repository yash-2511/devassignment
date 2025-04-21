# Component API Reference

This document provides detailed API information for all components in the Enterprise Design System.

## Table of Contents

- [Accordion](#accordion)
- [Badge](#badge)
- [Tabs](#tabs)
- [Sidebar Navigation](#sidebar-navigation)
- [Top Navigation](#top-navigation)
- [Theme Provider](#theme-provider)
- [Theme Toggle](#theme-toggle)

## Accordion

An expandable content container that allows users to show or hide sections of related content.

### Import

```jsx
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/design-system/accordion/accordion';
```

### Components

#### Accordion

The parent container for the accordion items.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | The accordion items to render |
| allowMultiple | boolean | false | Whether multiple items can be expanded at once |
| defaultIndex | string \| string[] | [] | The ID(s) of initially expanded item(s) |
| className | string | undefined | Additional CSS classes |
| onChange | (expandedItems: string[]) => void | undefined | Callback when expanded items change |

#### AccordionItem

The container for an individual accordion section.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | The trigger and content for this item |
| id | string | required | Unique identifier for this accordion item |
| className | string | undefined | Additional CSS classes |

#### AccordionTrigger

The clickable header that toggles the visibility of its content.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | The content of the trigger (typically a title) |
| id | string | required | Should match the parent AccordionItem's id |
| className | string | undefined | Additional CSS classes |

#### AccordionContent

The expandable content area.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | The content to display when expanded |
| id | string | required | Should match the parent AccordionItem's id |
| className | string | undefined | Additional CSS classes |

### Example Usage

```jsx
<Accordion allowMultiple defaultIndex={["panel1"]}>
  <AccordionItem id="panel1">
    <AccordionTrigger id="panel1">
      Section 1
    </AccordionTrigger>
    <AccordionContent id="panel1">
      Content for section 1
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem id="panel2">
    <AccordionTrigger id="panel2">
      Section 2
    </AccordionTrigger>
    <AccordionContent id="panel2">
      Content for section 2
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Accessibility

- Uses proper ARIA attributes for accordion UI pattern
- Keyboard navigable: Enter/Space to toggle expansion
- Focus management between accordion items

## Badge

A small visual indicator typically used for status, categories, or counts.

### Import

```jsx
import { Badge } from '@/components/design-system/badge/badge';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | required | Text content of the badge |
| variant | 'default' \| 'primary' \| 'secondary' \| 'outline' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | Visual style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the badge |
| withIcon | boolean | false | Whether to display an icon |
| icon | React.ReactNode | undefined | Icon element to display (requires withIcon=true) |
| onRemove | () => void | undefined | Callback for the remove button (adds a remove button when defined) |
| className | string | undefined | Additional CSS classes |

### Example Usage

```jsx
// Basic badge
<Badge label="New" />

// Badge with variant
<Badge label="Success" variant="success" />

// Badge with icon
<Badge 
  label="Warning" 
  variant="warning" 
  withIcon 
  icon={<AlertTriangleIcon size={12} />} 
/>

// Removable badge
<Badge 
  label="Removable" 
  variant="primary" 
  onRemove={() => console.log('Badge removed')} 
/>
```

### Accessibility

- Appropriate color contrast in all variants
- Includes appropriate aria-label when used with icons only
- Remove button has accessible name and focus state

## Tabs

A component that allows switching between different content sections.

### Import

```jsx
import { 
  Tabs,
  TabList,
  Tab,
  TabPanel
} from '@/components/design-system/tabs/tabs';
```

### Components

#### Tabs

The parent container for the tabs system.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Tab list and tab panels |
| defaultIndex | string | "0" | ID of the initially selected tab |
| onChange | (index: string) => void | undefined | Callback when tab selection changes |
| vertical | boolean | false | Whether tabs should be displayed vertically |
| className | string | undefined | Additional CSS classes |

#### TabList

The container for the tab buttons.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Tab components |
| className | string | undefined | Additional CSS classes |

#### Tab

An individual tab button.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Tab label content |
| id | string | required | Unique identifier for this tab |
| disabled | boolean | false | Whether this tab is disabled |
| className | string | undefined | Additional CSS classes |

#### TabPanel

The content displayed when its corresponding tab is active.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Content to display |
| id | string | required | Should match the corresponding Tab's id |
| className | string | undefined | Additional CSS classes |

### Example Usage

```jsx
<Tabs defaultIndex="0">
  <TabList>
    <Tab id="0">First Tab</Tab>
    <Tab id="1">Second Tab</Tab>
    <Tab id="2" disabled>Disabled Tab</Tab>
  </TabList>
  
  <TabPanel id="0">
    Content for the first tab
  </TabPanel>
  
  <TabPanel id="1">
    Content for the second tab
  </TabPanel>
  
  <TabPanel id="2">
    Content for the disabled tab (not accessible)
  </TabPanel>
</Tabs>
```

### Accessibility

- Uses proper ARIA roles (tablist, tab, tabpanel)
- Keyboard navigation via arrow keys
- Focus management between tabs
- Disabled state properly communicated to assistive technology

## Sidebar Navigation

A vertical navigation component for complex applications.

### Import

```jsx
import { SidebarNavigation } from '@/components/design-system/sidebar-navigation/sidebar-navigation';
```

### Types

```typescript
// Base properties for all sidebar items
interface SidebarItemBase {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

// Item with href (link)
interface SidebarItemWithHref extends SidebarItemBase {
  href: string;
  onClick?: never;
  isActive?: boolean;
  items?: never;
}

// Item with click handler
interface SidebarItemWithOnClick extends SidebarItemBase {
  href?: never;
  onClick: () => void;
  isActive?: boolean;
  items?: never;
}

// Item with children (nested navigation)
interface SidebarItemWithChildren extends SidebarItemBase {
  href?: never;
  onClick?: never;
  isActive?: boolean;
  items: (SidebarItemWithHref | SidebarItemWithOnClick)[];
}

// Combined type for any sidebar item
type SidebarItem = SidebarItemWithHref | SidebarItemWithOnClick | SidebarItemWithChildren;
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | SidebarItem[] | required | Navigation items to display |
| title | string | undefined | Optional title for the sidebar |
| subtitle | string | undefined | Optional subtitle |
| className | string | undefined | Additional CSS classes |
| collapsible | boolean | false | Whether the sidebar can be collapsed |
| defaultCollapsed | boolean | false | Initial collapsed state (if collapsible) |

### Example Usage

```jsx
import { SidebarNavigation } from '@/components/design-system/sidebar-navigation/sidebar-navigation';
import { HomeIcon, SettingsIcon, UsersIcon } from 'lucide-react';

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: <HomeIcon size={18} />,
    href: '/dashboard',
    isActive: true
  },
  {
    label: 'Users',
    icon: <UsersIcon size={18} />,
    items: [
      { label: 'All Users', href: '/users' },
      { label: 'Add User', href: '/users/new' }
    ]
  },
  {
    label: 'Settings',
    icon: <SettingsIcon size={18} />,
    href: '/settings'
  },
  {
    label: 'Help',
    onClick: () => window.open('https://help.example.com', '_blank')
  }
];

function App() {
  return (
    <div className="flex h-screen">
      <SidebarNavigation 
        items={sidebarItems} 
        title="Admin Portal" 
        subtitle="v1.0" 
        collapsible 
      />
      <div className="flex-1 p-4">
        {/* Main content */}
      </div>
    </div>
  );
}
```

### Accessibility

- Uses semantic HTML elements for navigation
- Keyboard navigable with proper focus management
- ARIA attributes for current page indication
- Collapsible functionality is properly announced to screen readers

## Top Navigation

A horizontal navigation component for main site navigation.

### Import

```jsx
import { TopNavigation } from '@/components/design-system/top-navigation/top-navigation';
```

### Types

```typescript
interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logo | React.ReactNode | undefined | Logo component or image |
| title | string | undefined | Site or application title |
| navItems | NavItem[] | [] | Main navigation links |
| actions | NavAction[] | [] | Action buttons for the right side |
| className | string | undefined | Additional CSS classes |
| mobileBreakpoint | 'sm' \| 'md' \| 'lg' | 'md' | When to switch to mobile menu |

### Example Usage

```jsx
import { TopNavigation } from '@/components/design-system/top-navigation/top-navigation';
import { Bell, User } from 'lucide-react';

function Header() {
  return (
    <TopNavigation
      logo={<img src="/logo.svg" alt="Company Logo" width={32} height={32} />}
      title="Enterprise App"
      navItems={[
        { label: 'Home', href: '/', isActive: true },
        { label: 'Products', href: '/products' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ]}
      actions={[
        { 
          label: 'Notifications', 
          icon: <Bell size={18} />, 
          onClick: () => console.log('Notifications clicked') 
        },
        { 
          label: 'Profile', 
          icon: <User size={18} />, 
          onClick: () => console.log('Profile clicked') 
        }
      ]}
    />
  );
}
```

### Accessibility

- Uses semantic HTML for navigation
- Mobile menu is accessible via keyboard and screen readers
- Active page is properly indicated for assistive technology
- Focus management for dropdown menus

## Theme Provider

Provides theme context and management for light/dark themes.

### Import

```jsx
import { ThemeProvider } from '@/components/design-system/color-system/color-palette';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Application content |
| defaultTheme | 'light' \| 'dark' \| 'system' | 'system' | Initial theme |
| storageKey | string | 'enterprise-ds-ui-theme' | localStorage key for theme persistence |

### Usage

```jsx
import { ThemeProvider } from '@/components/design-system/color-system/color-palette';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApplication />
    </ThemeProvider>
  );
}
```

### Hook

```jsx
import { useTheme } from '@/components/design-system/color-system/color-palette';

function ThemeAwareComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Switch to Dark</button>
      <button onClick={() => setTheme('light')}>Switch to Light</button>
      <button onClick={() => setTheme('system')}>Use System</button>
    </div>
  );
}
```

## Theme Toggle

A button component for toggling between light and dark themes.

### Import

```jsx
import { ThemeToggle } from '@/components/design-system/color-system/color-palette';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | undefined | Additional CSS classes |

### Usage

```jsx
import { ThemeToggle } from '@/components/design-system/color-system/color-palette';

function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Application Name</h1>
      <ThemeToggle />
    </header>
  );
}
```

### Accessibility

- Proper button role and keyboard interactions
- Includes ARIA label describing current action
- Focus styles for keyboard users