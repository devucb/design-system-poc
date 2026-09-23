import { Pressable } from 'react-native';
import { useTheme } from 'tamagui';
import { space } from '@ds/theme';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import type { HeaderProps } from './Header.props';

/**
 * Design-system header. Owns the top Safe Area.
 * Screens must not inset top again.
 */
export function Header({
  title,
  onBack,
  backAccessibilityLabel,
  gap = '$sm',
}: HeaderProps) {
  const theme = useTheme();
  const iconSize = 24;
  const iconColor = theme.textPrimary!.val;

  return (
    <Box backgroundColor="$backgroundBase">
      <Box flexDirection="row" alignItems="center" gap={gap}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={backAccessibilityLabel}
            hitSlop={space.sm}
          >
            <Icon name="chevron-back" color={iconColor} size={iconSize} />
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
