import {Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@shopify/restyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box} from '@components/Box/Box';
import {Text} from '@components/Text/Text';
import {Theme} from '@theme/theme';
import type {HeaderProps} from './Header.props';


/**
 * Design-system header. Rendered by React Navigation via `options.header`.
 * Owns the top Safe Area. Screens must not inset top again.
 */
export function Header({title, onBack, backAccessibilityLabel}: HeaderProps) {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const iconSize = theme.textVariants.heading.lineHeight;

  return (
    <Box
      width="100%"
      backgroundColor="backgroundBase"
      style={{paddingTop: insets.top}}>
      <Box
        width="100%"
        paddingHorizontal="lg"
        paddingVertical="mdl"
        flexDirection="row"
        alignItems="center"
        gap="sm">
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={backAccessibilityLabel}
            hitSlop={theme.spacing.sm}>
            <Ionicons
              name="chevron-back"
              color={theme.colors.textPrimary}
              size={iconSize}
            />
          </Pressable>
        ) : null}
        <Box flex={1}>
          <Text variant="heading" color="primary">
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
