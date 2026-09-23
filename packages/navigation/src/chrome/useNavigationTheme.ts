import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useTheme} from 'tamagui';
import { useThemePreference } from '@ds/theme';

export function useNavigationTheme() {
  const theme = useTheme();
  const {resolvedScheme} = useThemePreference();
  const base = resolvedScheme === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      background: theme.backgroundBase!.val,
      card: theme.cardBackground!.val,
      text: theme.textPrimary!.val,
      primary: theme.buttonPrimaryBackground!.val,
      border: theme.cardBackground!.val,
    },
  };
}
