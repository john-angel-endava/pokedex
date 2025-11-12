import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchInput from '../components/search/search-input';
import { action } from 'storybook/actions';
import { fn } from 'storybook/test';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  args: {
    placeholder: 'Search by name…',
    fullWidth: false,
    onDebouncedChange: action('debouncedChange')
  },
  argTypes: {
    placeholder: { control: 'text' },
    fullWidth: { control: 'boolean' },
    onDebouncedChange: fn()
  },
  parameters: {
    docs: {
      description: {
        component: 'Input with 300ms debounce; emits lowercased trimmed value.'
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};

export const FullWidth: Story = {
  args: {
    fullWidth: true
  }
};