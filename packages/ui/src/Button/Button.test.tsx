import {render} from '@testing-library/react-native';
import {composeStories} from '@storybook/react';
import * as stories from './Button.stories';

const composed = composeStories(stories);

describe('Button', () => {
  it.each(Object.entries(composed))('%s matches snapshot', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });
});
