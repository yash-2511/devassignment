import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { Check, AlertTriangle, Info, Heart, X } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Badge Component

Badges are small visual indicators used to highlight information, status, or counts. They're ideal for displaying categories, statuses, or notifications.

## Accessibility Features

- Text contrast meets WCAG AA standards
- Interactive badges (removable) are keyboard navigable
- Contains proper aria-labels for screen readers

## Usage Guidelines

### When to use
- Use badges to highlight status, category, or other metadata
- Use for filtering or categorization
- Display counts or numerical indicators

### When not to use
- Avoid using badges for primary actions
- Don't use too many badges in a single view
- Avoid using badges for long text content
`
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'success', 'warning', 'error', 'neutral'],
      description: 'The visual style of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'sm' },
      }
    },
    label: {
      control: 'text',
      description: 'The text content of the badge',
      table: {
        type: { summary: 'string' },
      }
    },
    withIcon: {
      control: 'boolean',
      description: 'Whether to show an icon before the label',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    removable: {
      control: 'boolean',
      description: 'Whether the badge is removable with an X button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    onRemove: {
      action: 'removed',
      description: 'Callback when the remove button is clicked',
      table: {
        type: { summary: '() => void' },
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
    label: 'Badge',
    variant: 'default',
    size: 'sm',
    withIcon: false,
    removable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Default',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Badge {...args} variant="default" label="Primary" />
      <Badge {...args} variant="secondary" label="Secondary" />
      <Badge {...args} variant="success" label="Success" />
      <Badge {...args} variant="warning" label="Warning" />
      <Badge {...args} variant="error" label="Error" />
      <Badge {...args} variant="neutral" label="Neutral" />
      <Badge {...args} variant="outline" label="Outline" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge {...args} size="sm" label="Small" />
      <Badge {...args} size="md" label="Medium" />
      <Badge {...args} size="lg" label="Large" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Badge {...args} variant="default" label="Active" withIcon={true} />
      <Badge 
        {...args}
        variant="success" 
        label="Completed" 
        withIcon={true} 
        icon={<Check className="h-3 w-3 mr-0.5" />} 
      />
      <Badge 
        {...args}
        variant="warning" 
        label="Attention" 
        withIcon={true} 
        icon={<AlertTriangle className="h-3 w-3 mr-0.5" />} 
      />
      <Badge 
        {...args}
        variant="error" 
        label="Error" 
        withIcon={true} 
        icon={<X className="h-3 w-3 mr-0.5" />} 
      />
      <Badge 
        {...args}
        variant="info" 
        label="Info" 
        withIcon={true} 
        icon={<Info className="h-3 w-3 mr-0.5" />} 
      />
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tags, setTags] = useState(['React', 'TypeScript', 'TailwindCSS']);
    
    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };
    
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={tag === 'React' ? 'default' : tag === 'TypeScript' ? 'secondary' : 'neutral'}
            label={tag}
            size="md"
            removable
            onRemove={() => removeTag(tag)}
          />
        ))}
        {tags.length === 0 && (
          <span className="text-sm text-neutral-500">All tags removed! Refresh to reset.</span>
        )}
      </div>
    );
  },
};

export const InteractiveExample: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [liked, setLiked] = useState(false);
    
    return (
      <Badge
        variant={liked ? 'error' : 'neutral'}
        label={liked ? 'Liked' : 'Like'}
        withIcon
        icon={<Heart className={`h-3 w-3 mr-0.5 ${liked ? 'fill-error-500' : ''}`} />}
        className="cursor-pointer hover:opacity-90 transition-opacity select-none"
        onClick={() => setLiked(!liked)}
      />
    );
  },
};
