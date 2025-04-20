import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Design System/Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Accordion Component

Accordions allow users to expand and collapse sections of content, making interfaces more compact and scannable.

## Accessibility Features

- Implements ARIA attributes following the [WAI-ARIA Accordion Pattern](https://www.w3.org/TR/wai-aria-practices/#accordion)
- Full keyboard navigation (Enter and Space to toggle)
- Focus management for nested interactive elements
- Proper ARIA roles and states

## Usage Guidelines

### When to use
- Use accordions to organize related content into logical sections
- Helpful when users don't need to see all content at once
- Use when space is limited and content needs to be compact

### When not to use
- Avoid for critical content that should always be visible
- Don't use for short, simple content that could be displayed all at once
- Avoid deeply nested accordions (more than 2 levels)
`
      }
    }
  },
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple panels to be expanded at once',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    defaultIndex: {
      control: { type: null },
      description: 'Default expanded panel index(es)',
      table: {
        type: { summary: 'string | string[]' },
        defaultValue: { summary: '[]' },
      }
    },
    onChange: {
      action: 'changed',
      description: 'Callback when an accordion item is toggled',
      table: {
        type: { summary: '(expandedItems: string[]) => void' },
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
    allowMultiple: false,
    defaultIndex: [],
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const faqs = [
  {
    id: '1',
    question: 'What is a design system?',
    answer: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It contains visual elements, code components, and documentation.'
  },
  {
    id: '2',
    question: 'Why use TypeScript for components?',
    answer: 'TypeScript enhances component development by providing type safety, better documentation through interfaces, and improved developer experience with autocompletion and error checking.'
  },
  {
    id: '3',
    question: 'How to ensure accessibility in components?',
    answer: 'Ensure proper semantic HTML, ARIA roles, keyboard navigation, sufficient color contrast ratios, and focus management. Regular testing with assistive technologies and following WCAG guidelines is essential.'
  }
];

export const Default: Story = {
  render: (args) => (
    <div className="max-w-3xl border border-neutral-200 dark:border-neutral-700 rounded-lg divide-y divide-neutral-200 dark:divide-neutral-700">
      <Accordion {...args}>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} id={faq.id}>
            <AccordionTrigger id={faq.id}>{faq.question}</AccordionTrigger>
            <AccordionContent id={faq.id}>
              <p className="text-neutral-600 dark:text-neutral-300">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
};

export const WithMultipleExpanded: Story = {
  args: {
    allowMultiple: true,
    defaultIndex: ['1', '3'],
  },
  render: (args) => (
    <div className="max-w-3xl border border-neutral-200 dark:border-neutral-700 rounded-lg divide-y divide-neutral-200 dark:divide-neutral-700">
      <Accordion {...args}>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} id={faq.id}>
            <AccordionTrigger id={faq.id}>{faq.question}</AccordionTrigger>
            <AccordionContent id={faq.id}>
              <p className="text-neutral-600 dark:text-neutral-300">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
};

export const Nested: Story = {
  render: (args) => (
    <div className="max-w-3xl border border-neutral-200 dark:border-neutral-700 rounded-lg divide-y divide-neutral-200 dark:divide-neutral-700">
      <Accordion {...args}>
        <AccordionItem id="1">
          <AccordionTrigger id="1">Main Question 1</AccordionTrigger>
          <AccordionContent id="1">
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Main answer with a nested accordion below.
            </p>
            <Accordion allowMultiple className="border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <AccordionItem id="1-1">
                <AccordionTrigger id="1-1">Nested Question 1</AccordionTrigger>
                <AccordionContent id="1-1">
                  <p className="text-neutral-600 dark:text-neutral-300">Nested answer 1</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem id="1-2">
                <AccordionTrigger id="1-2">Nested Question 2</AccordionTrigger>
                <AccordionContent id="1-2">
                  <p className="text-neutral-600 dark:text-neutral-300">Nested answer 2</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="2">
          <AccordionTrigger id="2">Main Question 2</AccordionTrigger>
          <AccordionContent id="2">
            <p className="text-neutral-600 dark:text-neutral-300">Main answer 2</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

export const CustomStyling: Story = {
  render: (args) => (
    <div className="max-w-3xl">
      <Accordion {...args} className="space-y-4">
        {faqs.map((faq) => (
          <AccordionItem 
            key={faq.id} 
            id={faq.id}
            className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
          >
            <AccordionTrigger 
              id={faq.id}
              className="bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent id={faq.id}>
              <p className="text-neutral-600 dark:text-neutral-300">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
};
