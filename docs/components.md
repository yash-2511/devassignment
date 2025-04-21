# Components Documentation

The Enterprise Design System includes a comprehensive set of UI components designed for consistency, accessibility, and flexibility.

## Data Display Components

### Accordion

**Purpose**: Accordions are used to organize and hide content until needed, allowing users to progressively disclose information.

**Usage**:

```jsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/design-system/accordion/accordion';

<Accordion allowMultiple defaultIndex={["0"]}>
  <AccordionItem id="1">
    <AccordionTrigger id="1">Section 1</AccordionTrigger>
    <AccordionContent id="1">
      Content for section 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem id="2">
    <AccordionTrigger id="2">Section 2</AccordionTrigger>
    <AccordionContent id="2">
      Content for section 2
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Props**:

- **Accordion**:
  - `allowMultiple`: Boolean to allow multiple items expanded simultaneously
  - `defaultIndex`: String or array of strings with IDs of initially expanded items
  - `className`: Optional CSS class for custom styling
  - `onChange`: Optional callback when expanded state changes

- **AccordionItem**:
  - `id`: Unique identifier for the item
  - `className`: Optional CSS class for custom styling

- **AccordionTrigger**:
  - `id`: ID matching parent AccordionItem
  - `className`: Optional CSS class for custom styling

- **AccordionContent**:
  - `id`: ID matching parent AccordionItem
  - `className`: Optional CSS class for custom styling

**Accessibility**:
- Uses correct ARIA attributes for accordion functionality
- Supports keyboard navigation (Enter/Space to toggle sections)
- Maintains focus management for keyboard users

### Badge

**Purpose**: Badges are used for labels, counts, and status indicators.

**Usage**:

```jsx
import { Badge } from '@/components/design-system/badge/badge';

// Default badge
<Badge label="New" />

// With variant
<Badge label="Warning" variant="warning" />

// With icon
<Badge 
  label="Github" 
  withIcon 
  icon={<GithubIcon className="h-3 w-3" />} 
/>

// Removable
<Badge 
  label="Remove me" 
  onRemove={() => console.log('Badge removed')} 
/>
```

**Props**:
- `label`: Text content of the badge
- `variant`: Visual style ('default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info')
- `size`: Size of the badge ('default', 'sm', 'lg')
- `withIcon`: Boolean to indicate if badge has an icon
- `icon`: React node for custom icon
- `onRemove`: Optional callback function for removable badges
- `className`: Optional CSS class for custom styling

**Accessibility**:
- Uses appropriate color contrast for all variants
- Icons include proper aria-hidden attributes
- Removable badges have accessible labels and keyboard support

## Navigation Components

### Tabs

**Purpose**: Tabs organize content into separate views within the same context, allowing users to switch between related content sections.

**Usage**:

```jsx
import { Tabs, TabList, Tab, TabPanel } from '@/components/design-system/tabs/tabs';

<Tabs defaultIndex="0">
  <TabList>
    <Tab id="0">Tab 1</Tab>
    <Tab id="1">Tab 2</Tab>
    <Tab id="2" disabled>Disabled Tab</Tab>
  </TabList>
  <TabPanel id="0">
    Content for Tab 1
  </TabPanel>
  <TabPanel id="1">
    Content for Tab 2
  </TabPanel>
  <TabPanel id="2">
    Content for Tab 3 (disabled)
  </TabPanel>
</Tabs>
```

**Props**:

- **Tabs**:
  - `defaultIndex`: String ID of initially selected tab
  - `onChange`: Optional callback when tab selection changes
  - `vertical`: Boolean to display tabs vertically instead of horizontally
  - `className`: Optional CSS class for custom styling

- **TabList**:
  - `className`: Optional CSS class for custom styling

- **Tab**:
  - `id`: Unique identifier for the tab
  - `disabled`: Boolean to disable the tab
  - `className`: Optional CSS class for custom styling

- **TabPanel**:
  - `id`: ID matching associated Tab
  - `className`: Optional CSS class for custom styling

**Accessibility**:
- Uses ARIA roles for tablist, tab, and tabpanel
- Supports keyboard navigation (arrow keys, Home/End)
- Focus management follows tab selection
- Selected tabs have visual indicators beyond just color

### Sidebar Navigation

**Purpose**: Provides vertical navigation for complex applications with hierarchical navigation structures.

**Usage**:

```jsx
import { SidebarNavigation } from '@/components/design-system/sidebar-navigation/sidebar-navigation';
import { HomeIcon, SettingsIcon } from 'lucide-react';

const navigationItems = [
  {
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
    isActive: true
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    items: [
      {
        label: 'Profile',
        href: '/settings/profile'
      },
      {
        label: 'Preferences',
        href: '/settings/preferences'
      }
    ]
  },
  {
    label: 'About',
    href: '/about'
  }
];

<SidebarNavigation 
  items={navigationItems}
  title="Application"
  subtitle="v1.0.0"
  collapsible
/>
```

**Props**:
- `items`: Array of navigation items with the SidebarItem type
- `title`: Optional title displayed at the top of the sidebar
- `subtitle`: Optional subtitle displayed under the title
- `className`: Optional CSS class for custom styling
- `collapsible`: Boolean to allow sidebar to collapse to icons only
- `defaultCollapsed`: Boolean to set initial collapsed state

**Item Types**:
- Regular link: `{ label, href, icon?, isActive?, disabled? }`
- Action item: `{ label, onClick, icon?, isActive?, disabled? }`
- Group with children: `{ label, icon?, items: Array<SidebarItem> }`

**Accessibility**:
- Uses semantic HTML elements for navigation
- Supports keyboard navigation
- Collapsible state is properly communicated to screen readers
- Icons have appropriate aria-labels

## Form Components

### Button

**Purpose**: Buttons are used to trigger actions and navigate between pages.

**Usage**:

```jsx
import { Button } from '@/components/ui/button';

// Default button
<Button>Click me</Button>

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Disabled button
<Button disabled>Disabled</Button>

// With icon
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add new
</Button>
```

**Props**:
- `variant`: Visual style ('default', 'primary', 'destructive', 'outline', 'ghost', 'link')
- `size`: Size of the button ('default', 'sm', 'lg', 'icon')
- `disabled`: Boolean to disable the button
- `asChild`: Boolean to render as child element
- All standard button HTML attributes are also supported

**Accessibility**:
- Uses native button element for proper accessibility
- Maintains focus styles for keyboard users
- Disabled state is properly communicated
- Icon-only buttons have accessible labels

## Feedback Components

### Toast

**Purpose**: Toasts provide brief notifications or feedback messages to users.

**Usage**:

```jsx
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const showToast = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
      variant: "success",
    });
  };
  
  return (
    <Button onClick={showToast}>Save changes</Button>
  );
}
```

**Toast Options**:
- `title`: Main heading for the toast
- `description`: Additional descriptive text
- `variant`: Visual style ('default', 'success', 'destructive')
- `duration`: How long the toast remains visible in milliseconds
- `action`: Optional action component (usually a button)

**Accessibility**:
- Uses the correct ARIA roles for notifications
- Automatically focuses for screen reader announcement
- Supports keyboard dismissal
- Timeout is sufficient for reading content

## Theming Components

### Theme Toggle

**Purpose**: Allows users to switch between light and dark themes.

**Usage**:

```jsx
import { ThemeToggle } from '@/components/design-system/color-system/color-palette';

<div className="flex justify-end p-4">
  <ThemeToggle />
</div>
```

**Props**:
- `className`: Optional CSS class for custom styling

**Accessibility**:
- Button includes proper aria-label
- Uses both icons and colors to indicate current theme
- Maintains focus styles for keyboard users

## Best Practices

### Component Usage Guidelines

1. **Consistency**: Use components consistently across the application
2. **Composition**: Compose complex UIs from simpler components
3. **Props**: Pass only necessary props; use defaults when appropriate
4. **Accessibility**: Don't override accessibility features
5. **Responsiveness**: Test components at different viewport sizes

### When to Use Which Component

- **Accordion** vs **Tabs**: Use accordions for content that can be consumed independently and doesn't need to be compared. Use tabs when users need to switch between related views and potentially compare content.

- **Badge** vs **Tag**: Use badges for status, counts, and labels. Use tags for categorization and filtering.

- **Button** vs **Link**: Use buttons for actions that change data or application state. Use links for navigation to different pages or views.

- **Toast** vs **Alert**: Use toasts for temporary notifications that don't require user action. Use alerts for important messages that should persist until dismissed.

### Extending Components

To extend existing components:

1. Wrap the component in a new component with additional functionality
2. Use the `className` prop to add custom styles
3. Create variants using the Tailwind CSS `cva` function
4. Document your extensions for team consistency

## Documentation Conventions

Component documentation follows these conventions:

- **Purpose**: Why the component exists and when to use it
- **Usage**: Code examples showing basic and advanced usage
- **Props**: All available props with types and descriptions
- **Accessibility**: Specific accessibility features and considerations
- **Best Practices**: Guidelines for effective component use