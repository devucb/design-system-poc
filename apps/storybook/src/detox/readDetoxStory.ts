import {NativeModules, Platform} from 'react-native';

type AppProps = {
  detoxStory?: string;
};

/** Android extras, then leftover SettingsManager. iOS uses App initial props. */
export function readDetoxStory(props?: AppProps) {
  if (props?.detoxStory) {
    return props.detoxStory;
  }
  if (Platform.OS === 'android') {
    const extras = NativeModules.PlatformConstants as
      | {LaunchArgs?: {detoxStory?: string}}
      | undefined;
    return extras?.LaunchArgs?.detoxStory;
  }
  const settings = NativeModules.SettingsManager?.settings as
    | {detoxStory?: string}
    | undefined;
  return settings?.detoxStory;
}
