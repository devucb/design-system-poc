import {create} from 'zustand';
import {useColorScheme, type ColorSchemeName} from 'react-native';
import {StorageKey} from '@ds/storage/keys';
import {storage} from '@ds/storage/mmkv';
import {
  ThemePreference,
  type ColorScheme,
  type ThemePreferenceValue,
} from './preferences';

type ThemeState = {
  preference: ThemePreferenceValue
};

function resolveScheme(
  value: ThemePreferenceValue,
  system: ColorSchemeName,
): ColorScheme {
  if (value === ThemePreference.System) {
    return system === 'dark' ? 'dark' : 'light';
  }
  return value;
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

export const useThemeStore = create<ThemeState>(() => ({
  preference: ThemePreference.System,
}));

export function hydrateThemePreference() {
  useThemeStore.setState({preference: readStoredPreference()});
}

export function setPreference(next: ThemePreferenceValue) {
  if (useThemeStore.getState().preference === next) {
    return;
  }
  useThemeStore.setState({preference: next});
  storage.set(StorageKey.ThemePreference, next);
}

export function resetThemePreference() {
  useThemeStore.setState({preference: readStoredPreference()});
}

export function useThemePreference() {
  const preference = useThemeStore(state => state.preference);
  const system = useColorScheme();
  return {
    preference,
    resolvedScheme: resolveScheme(preference, system),
    setPreference,
  };
}

export function useResolvedColorScheme(): ColorScheme {
  return useThemePreference().resolvedScheme;
}
