import StorybookApp from './.rnstorybook';
import {DetoxHost} from './src/detox/DetoxHost';
import {readDetoxStory} from './src/detox/readDetoxStory';

export default function App(props: {detoxStory?: string}) {
  const story = readDetoxStory(props);
  if (story) {
    return <DetoxHost id={story} />;
  }
  return <StorybookApp />;
}
