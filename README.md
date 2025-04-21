# Enterprise Design System

A comprehensive React + TypeScript design system with color tokens, data display, and navigation components. This project implements a modern, accessible user interface system with support for both light and dark modes.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Color System](#color-system)
- [Components](#components)
- [Theme Support](#theme-support)
- [Accessibility](#accessibility)
- [Project Structure](#project-structure)
- [Development](#development)
- [Documentation](#documentation)
- [License](#license)

## Features

- 🎨 Comprehensive color system with semantic tokens
- 🌗 Light and dark theme support with system preference detection
- 🧩 Reusable UI components with consistent styling
- 📱 Responsive design supporting mobile, tablet, and desktop viewports
- ♿ Accessible components following WCAG guidelines
- 🔧 Built with React, TypeScript, Tailwind CSS, and shadcn/ui

## Getting Started

### Installation

1. Clone this repository or extract the zip file to your preferred directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to http://localhost:5000 to see the design system in action

## Architecture

The design system is built on a component-based architecture with a focus on:

- **Reusability**: Components are designed to be reused across different applications
- **Consistency**: Shared design tokens ensure visual consistency
- **Flexibility**: Components accept customization props while maintaining design guidelines
- **Maintainability**: Well-organized file structure with clear separation of concerns

## Color System

The color system is built on token-based architecture with:

### Primary Colors

Primary colors are the main colors used throughout the interface, primarily for:
- Primary buttons and actions
- Active states
- Highlighted elements

### Secondary Colors

Secondary colors complement the primary colors and are used for:
- Secondary buttons and actions
- Alternate highlights
- Supporting elements

### Tertiary Colors

Tertiary colors provide additional palette options for:
- Decorative elements
- Charts and data visualizations
- Background accents

### Semantic Colors

Semantic colors convey specific meanings:
- **Success**: Green shades for positive actions and success states
- **Warning**: Amber/yellow for warnings and caution states
- **Error**: Red shades for errors and critical actions
- **Info**: Blue shades for informational content

Each color is available in multiple shades (50-900) to provide flexibility in creating hierarchies and ensuring accessibility.

## Components

The design system includes the following component categories:

### Data Display Components

- **Accordion**: Expandable content sections for progressive disclosure
- **Badge**: Small status indicators for labels, counts, and statuses
- **Card**: Container for related content and actions
- **Table**: Data tables for displaying structured information

### Navigation Components

- **Tabs**: Organize content into separate views within the same context
- **Top Navigation**: Main navigation header for site-wide navigation
- **Sidebar Navigation**: Vertical navigation menu for complex applications
- **Breadcrumbs**: Show hierarchical location within an application

### Form Components

- **Button**: Primary action elements in various styles and sizes
- **Input**: Text input fields with validation support
- **Select**: Dropdown selection menus
- **Checkbox**: Binary selection controls
- **Radio**: Single-selection option controls
- **Toggle**: On/off switches for binary settings

### Feedback Components

- **Alert**: Important messages for user attention
- **Toast**: Temporary notifications for user feedback
- **Dialog**: Modal windows for focused interactions
- **Progress**: Loading indicators and progress bars

## Theme Support

The design system supports both light and dark themes with:

- **System Preference Detection**: Automatically uses the user's preferred color scheme
- **Manual Toggle**: Users can override the system preference
- **Persistent Preference**: User theme choice is stored in localStorage
- **Smooth Transitions**: Theme changes include subtle transitions for a polished feel

To toggle themes, use the ThemeToggle component provided in the system:

```jsx
import { ThemeToggle } from '@/components/design-system/color-system/color-palette';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## Accessibility

All components are designed with accessibility in mind:

- **WCAG 2.1 AA Compliance**: Components meet Web Content Accessibility Guidelines
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Appropriate ARIA attributes and semantic HTML
- **Color Contrast**: All color combinations meet minimum contrast requirements
- **Focus Management**: Visible focus indicators for keyboard users

## Project Structure

```
├── client/                 # Frontend code
│   ├── src/                  
│   │   ├── components/       # UI components
│   │   │   ├── design-system/  # Design system components
│   │   │   │   ├── accordion/    
│   │   │   │   ├── badge/        
│   │   │   │   ├── color-system/ # Color tokens and theme
│   │   │   │   ├── sidebar-navigation/
│   │   │   │   ├── tabs/
│   │   │   │   └── top-navigation/
│   │   │   └── ui/           # shadcn components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and constants
│   │   │   ├── constants.ts  # Design tokens and constants
│   │   │   └── utils.ts      # Helper functions
│   │   └── pages/            # Application pages
│   └── index.html            # Entry HTML file
├── server/                 # Backend server code
│   ├── index.ts            # Server entry point
│   └── routes.ts           # API routes
├── shared/                 # Shared code between client and server
│   └── schema.ts           # Data schemas
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── theme.json              # Theme configuration
```

## Development

### Adding New Components

To add a new component to the design system:

1. Create a new directory in `client/src/components/design-system/`
2. Create the component file (e.g., `my-component.tsx`)
3. Follow the existing pattern with a clear interface and component implementation
4. Include proper documentation for props and usage
5. Add it to the appropriate documentation page

### Modifying the Color System

The color system is defined in `client/src/components/design-system/color-system/color-tokens.ts`. 
To modify or extend it:

1. Update the color variables in the appropriate section
2. Follow the naming convention of the existing tokens
3. Ensure new colors maintain appropriate contrast ratios
4. Test in both light and dark modes

### Building for Production

To build the project for production:

```bash
npm run build
```

This will create optimized assets in the `dist` directory.

## Documentation

Detailed documentation is available in the `docs/` directory:

- [Getting Started Guide](docs/getting-started.md) - Installation and setup instructions
- [Color System Documentation](docs/color-system.md) - Color tokens and usage
- [Components Documentation](docs/components.md) - Component API references
- [Theme System Documentation](docs/themes.md) - Theme configuration and usage
- [Accessibility Guidelines](docs/accessibility.md) - Accessibility best practices

Or browse the [Documentation Index](docs/index.md) for an overview of all documentation.

## License

This project is licensed under the MIT License - see the LICENSE file for details.