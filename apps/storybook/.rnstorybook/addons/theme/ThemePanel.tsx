import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED, UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { Button } from '@storybook/react-native-ui-common';
import type { ColorScheme } from '@ds/theme';

const OPTIONS: ColorScheme[] = ['light', 'dark'];

export type ThemePanelApi = {
  store: () => {
    getSelection: () => { storyId?: string } | undefined;
    fromId: (id?: string) => { globals?: { theme?: string } } | null;
  };
};

function themeFromGlobals(globals?: { theme?: string }): ColorScheme {
  return globals?.theme === 'dark' ? 'dark' : 'light';
}

export function ThemePanel({ api }: { api: ThemePanelApi }) {
  const store = api.store();
  const storyId = store.getSelection()?.storyId;
  const story = storyId ? store.fromId(storyId) : null;
  const [theme, setTheme] = useState<ColorScheme>(() =>
    themeFromGlobals(story?.globals),
  );

  useEffect(() => {
    const channel = addons.getChannel();
    const onUpdated = (payload: { globals?: { theme?: string } }) => {
      setTheme(themeFromGlobals(payload.globals));
    };
    channel.on(GLOBALS_UPDATED, onUpdated);
    return () => {
      channel.off(GLOBALS_UPDATED, onUpdated);
    };
  }, []);

  return (
    <View style={styles.row}>
      {OPTIONS.map(option => (
        <Button
          key={option}
          text={option}
          active={theme === option}
          onPress={() => {
            addons.getChannel().emit(UPDATE_GLOBALS, {
              globals: { theme: option },
            });
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
});
