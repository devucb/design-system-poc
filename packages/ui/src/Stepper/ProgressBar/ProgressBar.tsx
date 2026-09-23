import { Box } from '../../Box/Box';
import type { ProgressBarProps } from './ProgressBar.props';

function clampStep(value: number, max: number) {
  if (!Number.isFinite(value) || max <= 0) {
    return 0;
  }
  return Math.min(max, Math.max(0, Math.floor(value)));
}

/**
 * Horizontal stepped progress. Segments share width (`flex: 1`) so the bar
 * grows and shrinks with its parent. Gap between steps is spacing `$sm` (8).
 */
export function ProgressBar({
  activeStep,
  stepCount,
  testID,
}: ProgressBarProps) {
  const count = clampStep(stepCount, Number.MAX_SAFE_INTEGER);
  const active = clampStep(activeStep, count);
  const steps = [];

  for (let index = 0; index < count; index += 1) {
    steps.push(
      <Box
        key={index}
        flex={1}
        height="$sm"
        borderRadius="$md"
        backgroundColor={
          index < active
            ? '$buttonPrimaryBackground'
            : '$buttonSecondaryBackground'
        }
      />,
    );
  }

  return (
    <Box
      flexDirection="row"
      alignSelf="stretch"
      gap="$sm"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: count, now: active }}
      testID={testID}
    >
      {steps}
    </Box>
  );
}
