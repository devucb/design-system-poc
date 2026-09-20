import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LiteUI} from '@storybook/react-native-ui-lite';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {view} from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  shouldPersistSelection: true,
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  CustomUIComponent: LiteUI,
});

export default function StorybookApp() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StorybookUIRoot />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
});
