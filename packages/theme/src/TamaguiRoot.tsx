import { type ReactNode } from 'react';
import { Platform } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';
import type { ColorScheme } from './preferences';
import config from './tamagui.config';
import { useThemePreference } from './themePreference';

/** Tamagui still needs a provider. Preference itself is a Zustand store. */
export function TamaguiRoot({
  children,
  scheme,
}: {
  children: ReactNode;
  /** Override the stored preference (Storybook). App leaves this unset. */
  scheme?: ColorScheme;
}) {
  const { resolvedScheme } = useThemePreference();
  const themeName = scheme ?? resolvedScheme;

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={themeName}
      disableInjectCSS={Platform.OS !== 'web'}
    >
      <Theme name={themeName}>{children}</Theme>
    </TamaguiProvider>
  );
}
