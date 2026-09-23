import type {Meta, StoryObj} from '@storybook/react-native';
import {fn} from 'storybook/test';
import {Header} from './Header';

const meta = {
  title: 'Catalog/Header',
  component: Header,
  args: {
    title: 'Home',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {};

export const WithBack: Story = {
  args: {
    title: 'Register',
    onBack: fn(),
    backAccessibilityLabel: 'Back',
  },
};

export const Crumbs: Story = {
  args: {
    title: 'Wallet',
    crumbs: [
      {label: 'Home', onPress: fn()},
      {label: 'Wallet'},
    ],
  },
};

export const TokenOverrides: Story = {
  args: {
    title: 'Wallet',
    backgroundColor: '$cardBackground',
    paddingHorizontal: '$md',
    paddingVertical: '$sm',
    gap: '$md',
  },
};
