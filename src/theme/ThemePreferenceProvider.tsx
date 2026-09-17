import {createContext, useContext, useState, type ReactNode} from 'react';
import {ThemeProvider as RestyleThemeProvider} from '@shopify/restyle';
import {useColorScheme, type ColorSchemeName} from 'react-native';
import {StorageKey} from '@storage/keys';
import {storage} from '@storage/mmkv';
import {
  ThemePreference,
  type ColorScheme,
  type ThemePreferenceValue,
} from './preferences';
import {darkTheme, theme as lightTheme} from './theme';

type ThemePreferenceContextValue = {
  preference: ThemePreferenceValue;
  resolvedScheme: ColorScheme;
  setPreference: (preference: ThemePreferenceValue) => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(
  null,
);

function resolveScheme(
  preference: ThemePreferenceValue,
  system: ColorSchemeName,
): ColorScheme {
  if (preference === ThemePreference.System) {
    return system === 'dark' ? 'dark' : 'light';
  }
  return preference;
}

function readStoredPreference(): ThemePreferenceValue {
  const stored = storage.getString(StorageKey.ThemePreference);
  if (
    stored === ThemePreference.Light ||
    stored === ThemePreference.Dark ||
    stored === ThemePreference.System
  ) {
    return stored;
  }
  return ThemePreference.System;
}

export function ThemePreferenceProvider({children}: {children: ReactNode}) {
  const system = useColorScheme();
  const [preference, setPreferenceState] =
    useState<ThemePreferenceValue>(readStoredPreference);

  const setPreference = (next: ThemePreferenceValue) => {
    setPreferenceState(next);
    storage.set(StorageKey.ThemePreference, next);
  };

  const resolvedScheme = resolveScheme(preference, system);
  const restyleTheme = resolvedScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemePreferenceContext.Provider
      value={{preference, resolvedScheme, setPreference}}>
      <RestyleThemeProvider theme={restyleTheme}>{children}</RestyleThemeProvider>
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error('useThemePreference must be used inside ThemePreferenceProvider');
  }
  return ctx;
}

export function useResolvedColorScheme(): ColorScheme {
  return useThemePreference().resolvedScheme;
}
