import {act, render} from '@testing-library/react-native';
import {composeStories} from '@storybook/react';
import * as stories from './Hud.stories';
import {hideHud, showHud} from './hudStore';

const composed = composeStories(stories);

describe('Hud', () => {
  afterEach(() => {
    act(() => {
      hideHud();
    });
  });

  it.each(Object.entries(composed))('%s matches snapshot', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });

  it('showHud mounts the overlay and hideHud removes it', () => {
    const {getByTestId, queryByTestId} = render(<composed.Controls />);
    expect(queryByTestId('hud')).toBeNull();
    act(() => {
      showHud();
    });
    expect(getByTestId('hud')).toBeTruthy();
    expect(getByTestId('hud-loading')).toBeTruthy();
    act(() => {
      hideHud();
    });
    expect(queryByTestId('hud')).toBeNull();
  });
});
