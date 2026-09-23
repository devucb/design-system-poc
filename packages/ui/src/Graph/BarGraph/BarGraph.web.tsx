import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';
import { useTheme } from 'tamagui';
import { FontFamily } from '@ds/theme';
import { Box } from '../../Box/Box';
import { graphColor, graphSummary, plotPadding } from '../graph';
import { barCorner } from './BarGraph.layout';
import type { BarGraphProps } from './BarGraph.props';

type Size = { width: number; height: number };

/** Web catalog bar graph. SVG via recharts. */
export function BarGraph({
  data,
  color = '$buttonPrimaryBackground',
  accessibilityLabel,
}: BarGraphProps) {
  const theme = useTheme();
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const fill = graphColor(theme, color);
  const labelColor = graphColor(theme, '$textSecondary');
  const summary = accessibilityLabel ?? graphSummary(data);

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
          <BarChart
            data={data}
            margin={{
              top: plotPadding.top,
              right: plotPadding.right,
              left: plotPadding.left,
              bottom: plotPadding.bottom,
            }}
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
            <Bar
              dataKey="value"
              fill={fill}
              radius={[barCorner, barCorner, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </Box>
  );
}
