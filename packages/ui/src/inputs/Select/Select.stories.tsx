import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Select } from './Select';

type City = {
  label: string;
  value: string;
};

const cities: City[] = [
  { label: 'Istanbul', value: 'ist' },
  { label: 'Ankara', value: 'ank' },
  { label: 'Izmir', value: 'izm' },
];

/** Long enough that the options sheet switches to the virtualized List. */
const districts: City[] = Array.from({ length: 200 }, (_, index) => ({
  label: `District ${index + 1}`,
  value: String(index + 1),
}));

function cityKey(city: City) {
  return city.value;
}

function cityLabel(city: City) {
  return city.label;
}

const meta = {
  title: 'Catalog/Inputs/Select',
  component: Select<City>,
  args: {
    label: 'City',
    options: cities,
    placeholder: 'Select a city',
    keyExtractor: cityKey,
    labelExtractor: cityLabel,
    onChange: fn(),
    testID: 'select',
  },
} satisfies Meta<typeof Select<City>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Selected: Story = {
  args: {
    value: cities[1],
  },
};

export const Interactive: Story = {
  render: function InteractiveSelect(args) {
    const [value, setValue] = useState(args.value);
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

export const ManyOptions: Story = {
  args: {
    label: 'District',
    placeholder: 'Select a district',
    options: districts,
  },
  render: function VirtualizedSelect(args) {
    const [value, setValue] = useState(args.value);
    return <Select {...args} value={value} onChange={setValue} />;
  },
};
