# Contributing to the Enterprise Design System

This guide provides instructions for contributing to the Enterprise Design System. Whether you're fixing bugs, adding new components, or improving documentation, this guide will help you get started.

## Development Workflow

### Prerequisites

- Node.js 16+
- npm 7+

### Setting Up the Development Environment

1. Clone the repository:

```bash
git clone <repository-url>
cd enterprise-design-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to http://localhost:5000

## Project Structure

Understanding the project structure is essential for contributing effectively:

- `client/src/components/design-system/` - Core design system components
- `client/src/components/ui/` - shadcn/ui components
- `client/src/hooks/` - React hooks
- `client/src/lib/` - Utility functions and constants
- `client/src/pages/` - Application pages for testing and showcasing
- `docs/` - Documentation files

## Component Development Guidelines

### Component Architecture

1. **Component Structure**

Each component should be organized in its own directory with the following structure:

```
component-name/
├── component-name.tsx      # Main component implementation
├── component-name.stories.tsx    # Storybook stories (if applicable)
└── index.ts                # Re-export for easier imports
```

2. **Component Interface**

Every component must have well-defined props with TypeScript interfaces:

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
```

3. **Component Implementation**

Components should:
- Use CSS variables and Tailwind for styling
- Be responsive by default
- Support both light and dark themes
- Follow accessibility guidelines
- Use composition over inheritance

Example component:

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  footer,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {title && (
        <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          {footer}
        </div>
      )}
    </div>
  );
};
```

### Accessibility Standards

All components must meet WCAG 2.1 AA standards:

1. **Semantic HTML**: Use the appropriate HTML elements
2. **Keyboard Navigation**: Ensure all interactions are possible with keyboard
3. **ARIA Attributes**: Use correct ARIA roles and attributes
4. **Focus Management**: Maintain visible focus indicators
5. **Color Contrast**: Ensure sufficient contrast ratios
6. **Screen Reader Support**: Test with screen readers

### Testing Components

Test your components thoroughly:

1. **Visual Testing**: Ensure the component looks correct in all states
2. **Functional Testing**: Verify all interactions work as expected
3. **Responsive Testing**: Test across different screen sizes
4. **Cross-Browser Testing**: Verify in major browsers (Chrome, Firefox, Safari, Edge)
5. **Theme Testing**: Test in both light and dark modes
6. **Accessibility Testing**: Use tools like axe-core or Lighthouse

## Code Style and Conventions

### TypeScript Guidelines

- Use TypeScript for all components and utilities
- Define explicit return types for functions
- Use interfaces for complex objects
- Avoid using `any` and `unknown` types
- Use union types for props with finite options

### CSS Guidelines

- Use Tailwind CSS for styling when possible
- Follow the 'utility-first' approach
- Use CSS variables for theme-specific values
- Organize classes in a consistent order:
  1. Layout (display, position)
  2. Box model (width, height, margin, padding)
  3. Typography (font, text)
  4. Visual (color, background, border)
  5. Misc (cursor, pointer-events)

### Naming Conventions

- **Components**: PascalCase (e.g., `ButtonGroup`)
- **Props Interfaces**: PascalCase with Props suffix (e.g., `ButtonProps`)
- **Functions**: camelCase (e.g., `handleClick`)
- **CSS Classes**: kebab-case (if custom classes are needed)
- **Files**: kebab-case (e.g., `button-group.tsx`)

## Documentation Guidelines

### Component Documentation

Document your components thoroughly:

1. **Purpose**: Describe what the component is for
2. **Usage Examples**: Show basic and advanced usage
3. **Props API**: Document all props with types and descriptions
4. **Accessibility Features**: Note specific accessibility considerations
5. **Best Practices**: Provide guidance on when and how to use the component

Example documentation format:

```md
# Button Component

Buttons allow users to trigger actions or events with a single click.

## Usage

```jsx
import { Button } from '@/components/design-system/button';

// Basic button
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | Visual style of the button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the button |
| isLoading | boolean | false | Shows a loading spinner when true |

## Accessibility

- Uses native `<button>` element
- Includes focus styles for keyboard navigation
- Loading state is communicated to screen readers via aria-busy
```

## Pull Request Process

1. Create a feature branch from the `main` branch
2. Make your changes following the guidelines above
3. Update documentation as needed
4. Ensure all tests pass and there are no linting errors
5. Submit a pull request with a clear description of the changes

### PR Checklist

- [ ] Component follows design system patterns
- [ ] Component is accessible
- [ ] Component supports both light and dark themes
- [ ] Component is responsive
- [ ] Documentation is complete
- [ ] Tests are included (if applicable)
- [ ] Code passes linting

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward compatible manner
- PATCH version for backward compatible bug fixes

## Questions and Support

If you have questions or need support:

- Check existing documentation
- Search for similar issues in the issue tracker
- Ask questions in the appropriate channels

Thank you for contributing to the Enterprise Design System!