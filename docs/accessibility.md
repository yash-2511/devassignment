# Accessibility Guidelines

The Enterprise Design System is built with accessibility as a core principle. All components are designed to comply with WCAG 2.1 AA standards and to provide an inclusive experience for all users.

## General Principles

### Perceivable

1. **Text Alternatives**: All non-text content has text alternatives
   - Images have appropriate alt text
   - Icons used for functionality have accessible labels
   - Decorative elements use `aria-hidden="true"`

2. **Time-based Media**: Audio and video content has alternatives
   - Videos include captions and transcripts
   - Audio content has transcripts

3. **Adaptable**: Content can be presented in different ways
   - Semantic HTML is used for proper structure
   - Reading order matches visual order
   - Interface is usable in portrait and landscape orientations

4. **Distinguishable**: Content is easy to see and hear
   - Color is not the only means of conveying information
   - Text has sufficient contrast with its background
   - Text can be resized up to 200% without loss of functionality
   - Images have sufficient contrast

### Operable

1. **Keyboard Accessible**: All functionality is available from a keyboard
   - All interactive elements are keyboard focusable
   - Keyboard traps are avoided
   - Keyboard shortcuts are documented
   - Focus is visible and enhanced

2. **Enough Time**: Users have enough time to read and use content
   - Auto-advancing carousels can be paused
   - Animations can be disabled via `prefers-reduced-motion`
   - Session timeouts warn users before expiring

3. **Navigable**: Users can navigate, find content, and determine where they are
   - Pages have descriptive titles
   - Focus order is logical and meaningful
   - Link purpose is clear from text or context

4. **Input Modalities**: Users can operate functionality through various inputs
   - Touch targets are at least 44×44 pixels
   - Gestures have simpler alternatives
   - Motion-based interactions can be disabled

### Understandable

1. **Readable**: Text content is readable and understandable
   - Language is identified programmatically
   - Unusual words and abbreviations are defined
   - Reading level is appropriate for the audience

2. **Predictable**: Pages appear and operate in predictable ways
   - Components behave consistently throughout the application
   - Navigation is consistent across pages
   - Changes of context are initiated only by user request

3. **Input Assistance**: Users are helped to avoid and correct mistakes
   - Error identification is clear
   - Labels and instructions are provided for forms
   - Error suggestion helps users recover
   - Critical forms can be reviewed, confirmed, or canceled

### Robust

1. **Compatible**: Content is compatible with current and future tools
   - HTML is valid and well-formed
   - ARIA is used correctly
   - Custom controls have appropriate roles and states
   - Status messages are announced to screen readers

## Component-Specific Guidelines

### Interactive Elements

#### Buttons

- Use native `<button>` elements for all button interactions
- Ensure buttons have accessible names
- Maintain minimum touch target size (44×44px)
- Disable buttons only when necessary, and communicate why
- Use visually distinct styles for different button types

```jsx
// Good
<Button aria-label="Add to cart">
  <ShoppingCartIcon /> Add
</Button>

// Avoid
<div onClick={handleClick} className="button">
  <ShoppingCartIcon /> Add
</div>
```

#### Links

- Use native `<a>` elements for navigation
- Provide descriptive link text (avoid "click here" or "read more")
- Style links to be visually distinct from surrounding text
- Indicate when links open in new windows or download files

```jsx
// Good
<a href="policy.pdf" download>Download our privacy policy (PDF, 500KB)</a>

// Avoid
<a href="policy.pdf">Click here</a>
```

### Form Controls

#### Inputs

- Associate labels with inputs using `for`/`id` or nesting
- Group related inputs with `<fieldset>` and `<legend>`
- Provide clear validation messages for errors
- Use descriptive placeholder text as a supplement, not a replacement for labels

```jsx
// Good
<div className="form-group">
  <label htmlFor="username">Username</label>
  <input 
    id="username" 
    type="text" 
    aria-describedby="username-hint"
  />
  <p id="username-hint" className="hint">
    Choose a username with at least 5 characters
  </p>
</div>

// Avoid
<div className="form-group">
  <input 
    type="text" 
    placeholder="Username (5+ characters)"
  />
</div>
```

### Content Regions

#### Accordions

- Use appropriate ARIA roles and states
- Ensure keyboard navigability (Enter/Space to toggle)
- Make expand/collapse icons decorative
- Provide visible indication beyond just color for expanded state

```jsx
// Implemented correctly in our Accordion component
<AccordionItem id="1">
  <AccordionTrigger id="1">Section Title</AccordionTrigger>
  <AccordionContent id="1">
    Content here
  </AccordionContent>
</AccordionItem>
```

#### Tabs

- Use correct ARIA roles (tablist, tab, tabpanel)
- Allow arrow key navigation between tabs
- Set initial focus appropriately
- Connect tabs and panels programmatically

```jsx
// Implemented correctly in our Tabs component
<Tabs defaultIndex="0">
  <TabList>
    <Tab id="0">First Tab</Tab>
    <Tab id="1">Second Tab</Tab>
  </TabList>
  <TabPanel id="0">
    First panel content
  </TabPanel>
  <TabPanel id="1">
    Second panel content
  </TabPanel>
</Tabs>
```

### Navigation

- Provide consistent navigation patterns
- Include a skip link for screen reader users
- Ensure dropdown menus are keyboard accessible
- Consider using landmarks for main navigation regions

```jsx
// Skip link (place at the beginning of the page)
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Main content
<main id="main-content">
  Page content here
</main>
```

## Testing for Accessibility

### Automated Testing

Use automated tools to catch common issues:

1. **Lighthouse**: Run accessibility audits in Chrome DevTools
2. **axe DevTools**: Browser extension for detailed accessibility testing
3. **ESLint plugins**: Use eslint-plugin-jsx-a11y to catch issues during development
4. **jest-axe**: Add accessibility tests to component test suites

### Manual Testing

Beyond automated tests, perform regular manual testing:

1. **Keyboard navigation**: Test all functionality using only a keyboard
2. **Screen readers**: Test with NVDA, JAWS, or VoiceOver
3. **High contrast mode**: Test in Windows High Contrast Mode or similar
4. **Zoom**: Test at 200% zoom level
5. **Reduced motion**: Test with prefers-reduced-motion enabled

### User Testing

The most valuable accessibility testing comes from real users:

1. Include users with disabilities in user testing sessions
2. Test with users who rely on assistive technology
3. Test with users who have different types of disabilities (visual, motor, cognitive)

## Resources

### Standards and Guidelines

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Inclusive Components](https://inclusive-components.design/)

### Testing Tools

- [WebAIM WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/)
- [Color Contrast Analyzer](https://developer.paciellogroup.com/resources/contrastanalyser/)
- [Accessibility Insights](https://accessibilityinsights.io/)

### Learning Resources

- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Deque University](https://dequeuniversity.com/)
- [WebAIM Articles](https://webaim.org/articles/)