import { useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';
import { useTheme } from 'tamagui';
import { haptic } from '@ds/native';
import { FontFamily } from '@ds/theme';
import { Box } from '../../Box/Box';
import {
  graphColor,
  graphSummary,
  lineDot,
  lineStroke,
  plotPadding,
} from '../graph';
import type { LineGraphProps } from './LineGraph.props';

type Size = { width: number; height: number };

/** Web catalog line graph. SVG via recharts. */
export function LineGraph({
  data,
  color = '$buttonPrimaryBackground',
  accessibilityLabel,
}: LineGraphProps) {
  const theme = useTheme();
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const lastIndex = useRef<number | null>(null);
  const stroke = graphColor(theme, color);
  const labelColor = graphColor(theme, '$textSecondary');
  const summary = accessibilityLabel ?? graphSummary(data);

  function scrub(index: unknown) {
    const next = Number(index);
    if (!Number.isInteger(next) || lastIndex.current === next) {
      return;
    }
    lastIndex.current = next;
    haptic('selection');
  }

  function endScrub() {
    lastIndex.current = null;
  }

  function onLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setSize(prev => {
      if (prev.width === width && prev.height === height) {
        return prev;
      }
      return { width, height };
    });
  }

  return (
    <Box
      alignSelf="stretch"
      flexGrow={1}
      onLayout={onLayout}
      accessibilityRole="image"
      accessibilityLabel={summary}
    >
      {size.height > 0 ? (
        <ResponsiveContainer width="100%" height={size.height}>
          <LineChart
            data={data}
            margin={{
              top: plotPadding.top,
              right: plotPadding.right,
              left: plotPadding.left,
              bottom: plotPadding.bottom,
            }}
            onMouseMove={state => {
              scrub(state.activeTooltipIndex);
            }}
            onMouseLeave={endScrub}
          >
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: labelColor,
                fontSize: 12,
                fontFamily: FontFamily.medium,
              }}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke={stroke}
              strokeWidth={lineStroke}
              dot={{ r: lineDot, fill: stroke, strokeWidth: 0 }}
              activeDot={{ r: lineDot * 2, fill: stroke, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </Box>
  );
}
