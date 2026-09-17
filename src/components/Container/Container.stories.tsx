import type {Meta, StoryObj} from '@storybook/react-native';
import {fn} from 'storybook/test';
import {Button} from '@components/Button/Button';
import {Text} from '@components/Text/Text';
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

export const Default: Story = {};

export const WithFooter: Story = {
  args: {
    children: <Text variant="medium">Body</Text>,
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
