import type { Meta, StoryObj } from '@storybook/react-vite';
import OracleBadge from './OracleBadge';

const meta: Meta<typeof OracleBadge> = {
  title: 'Components/OracleBadge',
  component: OracleBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    verified: { control: 'boolean' },
    registryState: {
      control: {
        type: 'select',
        options: ['healthy', 'circuit_tripped', 'data_stale', 'unconfigured'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {
  args: {
    verified: true,
    registryState: 'healthy',
  },
};

export const Unverified: Story = {
  args: {
    verified: false,
    registryState: 'healthy',
  },
};

export const CircuitTripped: Story = {
  args: {
    verified: true,
    registryState: 'circuit_tripped',
  },
};

export const DataStale: Story = {
  args: {
    verified: false,
    registryState: 'data_stale',
  },
};

export const Unconfigured: Story = {
  args: {
    verified: false,
    registryState: 'unconfigured',
  },
};
