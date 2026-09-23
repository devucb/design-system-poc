import { ActivityIndicator } from 'react-native';
import { useTheme } from 'tamagui';
import { Box } from '../Box/Box';
import type { LoadingProps } from './Loading.props';

/**
 * Cross-platform spinner. Uses React Native `ActivityIndicator`
 * (native + react-native-web). Color comes from the theme token.
 */
export function Loading({
  overlay = false,
  accessibilityLabel = 'Loading',
  testID,
}: LoadingProps) {
  const theme = useTheme();
  const color = String(
    theme.buttonPrimaryBackground?.val ?? theme.buttonPrimaryBackground,
  );
  const spinner = (
    <ActivityIndicator
      color={color}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    />
  );

  if (!overlay) {
    return spinner;
  }

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$backgroundBase"
      testID={testID ? `${testID}-overlay` : undefined}
    >
      {spinner}
    </Box>
  );
}
