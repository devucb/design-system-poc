import type {Meta, StoryObj} from '@storybook/react-native';
import {ICON_NAMES} from './Icon.props';
import {Icon} from './Icon';

const meta = {
  title: 'Catalog/Icon',
  component: Icon,
  args: {
    name: 'home',
    color: '#13241C',
    size: 24,
  },
  argTypes: {
    name: {control: 'select', options: [...ICON_NAMES]},
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {};

export const Menu: Story = {
  args: {name: 'menu'},
};

export const Explore: Story = {
  args: {name: 'explore'},
};

export const Activity: Story = {
  args: {name: 'activity'},
};

export const Profile: Story = {
  args: {name: 'profile'},
};

export const ChevronBack: Story = {
  args: {name: 'chevron-back'},
};
