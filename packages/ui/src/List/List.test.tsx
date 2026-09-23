import type { ReactElement } from 'react';
import { act, render } from '@testing-library/react-native';
import { composeStories } from '@storybook/react';
import * as stories from './List.stories';

const composed = composeStories(stories);

/** FlashList reports its first layout on a timer, so let that land first. */
async function mount(story: ReactElement) {
  const result = render(story);
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
  return result;
}

describe('List', () => {
  it('mounts a window of rows instead of the whole data set', async () => {
    const { queryByText } = await mount(<composed.Long />);
    expect(queryByText('Row 1')).not.toBeNull();
    expect(queryByText('Row 900')).toBeNull();
  });

  it('renders the empty slot when there is no data', async () => {
    const { queryByText } = await mount(<composed.Empty />);
    expect(queryByText('Nothing here yet')).not.toBeNull();
  });

  it('renders header and footer slots', async () => {
    const { queryByText } = await mount(<composed.Padded />);
    expect(queryByText('1000 rows')).not.toBeNull();
    expect(queryByText('End of list')).not.toBeNull();
  });
});
