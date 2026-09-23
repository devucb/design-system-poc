import { Box } from '../../Box/Box';
import type { DotsProps } from './Dots.props';

function clampStep(value: number, max: number) {
  if (!Number.isFinite(value) || max <= 0) {
    return 0;
  }
  return Math.min(max, Math.max(0, Math.floor(value)));
}

/** Page-indicator dots. Same 1-based contract as ProgressBar. */
export function Dots({ activeStep, stepCount, testID }: DotsProps) {
  const count = clampStep(stepCount, Number.MAX_SAFE_INTEGER);
  const active = clampStep(activeStep, count);
  const dots = [];

  for (let index = 0; index < count; index += 1) {
    dots.push(
      <Box
        key={index}
        width="$sm"
        height="$sm"
        borderRadius="$md"
        backgroundColor={
          index + 1 === active
            ? '$buttonPrimaryBackground'
            : '$buttonSecondaryBackground'
        }
      />,
    );
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap="$sm"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: count, now: active }}
      testID={testID}
    >
      {dots}
    </Box>
  );
}
