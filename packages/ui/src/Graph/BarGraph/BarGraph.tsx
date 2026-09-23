import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  Canvas,
  RoundedRect,
  Text as SkiaText,
} from '@shopify/react-native-skia';
import { useTheme } from 'tamagui';
import { Box } from '../../Box/Box';
import { graphColor, graphSummary } from '../graph';
import { useGraphFont } from '../useGraphFont';
import { barCorner, barLayout } from './BarGraph.layout';
import type { BarGraphProps } from './BarGraph.props';

type Size = { width: number; height: number };

/** Native catalog bar graph. Bars are drawn with Skia. */
export function BarGraph({
  data,
  color = '$buttonPrimaryBackground',
  accessibilityLabel,
}: BarGraphProps) {
  const theme = useTheme();
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const fill = graphColor(theme, color);
  const labelColor = graphColor(theme, '$textSecondary');
  const font = useGraphFont(12);
  const bars = barLayout(data, size.width, size.height);
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
      {size.width > 0 && size.height > 0 ? (
        <Canvas style={{ width: size.width, height: size.height }}>
          {bars
            .filter(bar => bar.width > 0 && bar.height > 0)
            .map(bar => (
              <RoundedRect
                key={bar.label}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                r={barCorner}
                color={fill}
              />
            ))}
          {font
            ? bars.map(bar => (
                <SkiaText
                  key={`${bar.label}-label`}
                  x={bar.labelX - font.measureText(bar.label).width / 2}
                  y={bar.labelY}
                  text={bar.label}
                  font={font}
                  color={labelColor}
                />
              ))
            : null}
        </Canvas>
      ) : null}
    </Box>
  );
}
