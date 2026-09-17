import type {Meta, StoryObj} from '@storybook/react-native';
import {Text} from './Text';

const meta = {
  title: 'Catalog/Text',
  component: Text,
  args: {
    children: 'The quick brown fox',
    variant: 'heading',
    color: 'primary',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading: Story = {};

export const HeadingSecondary: Story = {
  args: {color: 'secondary'},
};

export const SemiBold: Story = {
  args: {variant: 'semiBold'},
};

export const Medium: Story = {
  args: {variant: 'medium', color: 'secondary', textAlign: 'center'},
};
