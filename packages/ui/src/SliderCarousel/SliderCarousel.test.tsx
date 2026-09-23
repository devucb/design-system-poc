import { render } from '@testing-library/react-native';
import { composeStories } from '@storybook/react';
import * as stories from './SliderCarousel.stories';

const composed = composeStories(stories);

describe('SliderCarousel', () => {
  it.each(Object.entries(composed))('%s matches snapshot', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });
});
