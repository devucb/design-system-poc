import type {Meta, StoryObj} from '@storybook/react-native';
import {fn} from 'storybook/test';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';
import {Container} from './Container';

const meta = {
  title: 'Catalog/Container',
  component: Container,
  args: {
    children: <Text variant="heading">Default container</Text>,
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Text variant="heading">Default container</Text>,
  },
};

export const WithFooter: Story = {
  args: {
    useSafeArea:true,
    children: <Text variant="medium">Body</Text>,
    footer: (
      <Button variant="primary" onPress={fn()}>
        Continue
      </Button>
    ),
  },
};

export const WithTopAndFooter: Story = {
  args: {
    top: (
      <Text variant="heading" color="primary">
        Sticky top
      </Text>
    ),
    children: <Text variant="medium">Middle grows</Text>,
    paddingBottom: '$lg',
    footer: (
      <Button variant="primary" onPress={fn()}>
        Continue
      </Button>
    ),
  },
};

export const Scrolling: Story = {
  args: {
    scroll: true,
    edges: ['bottom'],
    children: <Text variant="medium">Scroll body</Text>,
  },
};

export const WithoutSafeArea: Story = {
  args: {
    useSafeArea: false,
    children: <Text variant="medium">Tab screen</Text>,
  },
};

export const TokenOverrides: Story = {
  args: {
    backgroundColor: '$cardBackground',
    paddingHorizontal: '$md',
    paddingVertical: '$lg',
    children: <Text variant="medium">Token gutter and fill</Text>,
  },
};
