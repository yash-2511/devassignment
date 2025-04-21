# Getting Started with the Enterprise Design System

This guide will help you set up and start using the Enterprise Design System in your projects.

## Installation

### Setting Up a New Project

1. **Clone the Repository**

Download the design system package and extract it to your project directory:

```bash
unzip design-system-project.zip -d my-design-system
cd my-design-system
```

2. **Install Dependencies**

Install all required packages:

```bash
npm install
```

3. **Start the Development Server**

Start the local development server:

```bash
npm run dev
```

This will start the server on port 5000 (http://localhost:5000) and serve both the backend API and the frontend application.

### Integrating into an Existing Project

To add the design system to an existing project:

1. **Copy Component Files**

Copy the following directories to your project:

- `client/src/components/design-system/` - The core design system components
- `client/src/lib/` - Utility functions and constants
- `client/src/hooks/` - React hooks used by components
- `client/src/index.css` - Styles including CSS variables

2. **Install Required Dependencies**

Add the necessary dependencies to your project:

```bash
npm install tailwindcss postcss autoprefixer clsx tailwind-merge class-variance-authority 
npm install lucide-react @radix-ui/react-accordion @radix-ui/react-tabs
```

3. **Configure Tailwind CSS**

Copy the Tailwind configuration from `tailwind.config.ts` to your project and update the content paths as needed.

4. **Setup Theme Support**

Add the `ThemeProvider` to your application's entry point:

```jsx
// main.tsx or App.tsx
import { ThemeProvider } from './components/design-system/color-system/color-palette';
import './index.css';

// Initialize theme on the document
const storedTheme = localStorage.getItem('enterprise-ds-ui-theme');
if (storedTheme) {
  document.documentElement.classList.add(storedTheme);
  document.documentElement.setAttribute('data-theme', storedTheme);
} else {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark" : "light";
  document.documentElement.classList.add(systemTheme);
  document.documentElement.setAttribute('data-theme', systemTheme);
}

// Render your application
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system">
    <App />
  </ThemeProvider>
);
```

## Project Structure

### Core Directories

- **`client/`**: Frontend code
  - **`src/components/design-system/`**: Design system components
    - **`accordion/`**: Accordion component
    - **`badge/`**: Badge component
    - **`color-system/`**: Color tokens and theme provider
    - **`sidebar-navigation/`**: Sidebar navigation component
    - **`tabs/`**: Tabs component
    - **`top-navigation/`**: Top navigation component
  - **`src/components/ui/`**: shadcn UI components
  - **`src/lib/`**: Utility functions and constants
  - **`src/hooks/`**: React hooks
  - **`src/pages/`**: Application pages

- **`server/`**: Backend server code
  - **`index.ts`**: Server entry point
  - **`routes.ts`**: API routes

- **`shared/`**: Shared code between client and server
  - **`schema.ts`**: Data schemas

- **`docs/`**: Documentation files
  - **`color-system.md`**: Color system documentation
  - **`components.md`**: Component documentation
  - **`themes.md`**: Theme system documentation
  - **`accessibility.md`**: Accessibility guidelines

### Key Configuration Files

- **`package.json`**: Dependencies and scripts
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`theme.json`**: Theme configuration for color, radius, and appearance
- **`tsconfig.json`**: TypeScript configuration
- **`vite.config.ts`**: Vite bundler configuration

## Using Components

### Basic Component Usage

Import and use components in your React files:

```jsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } 
  from '@/components/design-system/accordion/accordion';
import { Badge } from '@/components/design-system/badge/badge';
import { ThemeToggle } from '@/components/design-system/color-system/color-palette';

function MyPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Application</h1>
        <ThemeToggle />
      </header>
      
      <div className="mb-4">
        <Badge label="New Feature" variant="primary" />
        <Badge label="Beta" variant="warning" className="ml-2" />
      </div>
      
      <Accordion allowMultiple defaultIndex={["0"]}>
        <AccordionItem id="0">
          <AccordionTrigger id="0">First Section</AccordionTrigger>
          <AccordionContent id="0">
            Content for the first section goes here.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="1">
          <AccordionTrigger id="1">Second Section</AccordionTrigger>
          <AccordionContent id="1">
            Content for the second section goes here.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

### Styling Components

Components accept a `className` prop for custom styling:

```jsx
<Badge 
  label="Custom" 
  className="bg-purple-500 hover:bg-purple-600 text-white" 
/>

<AccordionItem 
  id="custom" 
  className="border-purple-200 dark:border-purple-800"
>
  {/* Accordion content */}
</AccordionItem>
```

Use the utility function to combine Tailwind classes:

```jsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-styles",
  condition && "conditional-styles",
  className
)}>
  Content
</div>
```

## Working with the Color System

### Using Color Tokens

Access color tokens through utility functions:

```jsx
import { getColorToken, getSemanticToken } from '@/components/design-system/color-system/color-tokens';

// Use in inline styles
<div style={{ backgroundColor: getColorToken('primary', 100) }}>
  Colored background
</div>

// Use in CSS-in-JS
const styles = {
  successText: {
    color: getSemanticToken('success', 500)
  }
};
```

### Using Theme-Aware Styles

Create components that adapt to both light and dark themes:

```jsx
// Using Tailwind's dark mode
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  This content adapts to the theme
</div>

// Using CSS variables
<div style={{ 
  backgroundColor: 'var(--background)',
  color: 'var(--foreground)'
}}>
  This also adapts to the theme
</div>
```

## Theme Configuration

### Customizing the Theme

Update the `theme.json` file to set your preferred theme options:

```json
{
  "variant": "professional",
  "primary": "hsl(221, 83%, 53%)",
  "appearance": "system",
  "radius": 0.5
}
```

Options:
- **variant**: 'professional', 'tint', or 'vibrant'
- **primary**: The primary color in HSL format
- **appearance**: 'light', 'dark', or 'system'
- **radius**: Border radius scale (0-1)

### Extending the Color System

To add new colors to the system, update `client/src/components/design-system/color-system/color-tokens.ts` and `client/src/index.css`:

1. Add new color definitions to the color tokens file
2. Add corresponding CSS variables to the index.css file
3. Use the new colors via the existing utility functions

## Best Practices

1. **Follow component documentation**: Each component has specific props and usage patterns
2. **Maintain accessibility**: Don't override accessibility features built into components
3. **Use semantic tokens**: Use color tokens instead of direct color values
4. **Test in both themes**: Always test your UI in both light and dark modes
5. **Use composition**: Build complex interfaces by composing simple components
6. **Keep responsive**: Test on mobile, tablet, and desktop viewports

## Troubleshooting

### Common Issues

- **Components not styled correctly**: Make sure you've imported the CSS and set up Tailwind correctly
- **Theme not switching**: Check if the ThemeProvider is properly initialized
- **TypeScript errors**: Ensure your TypeScript config includes the design system paths
- **Missing dependencies**: Check that all required packages are installed

### Getting Help

For detailed help, refer to:
- Component documentation in `/docs/components.md`
- Color system documentation in `/docs/color-system.md`
- Theme system documentation in `/docs/themes.md`
- Accessibility guidelines in `/docs/accessibility.md`

## Next Steps

1. **Explore component examples**: See each component in action on the design system showcase page
2. **Read component documentation**: Understand the full capabilities of each component
3. **Try the theming**: Test the theme toggle and see how components adapt
4. **Build a sample page**: Create a new page using the design system components