import { useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Canvas,
  Circle,
  Path,
  Text as SkiaText,
} from '@shopify/react-native-skia';
import { useTheme } from 'tamagui';
import { haptic } from '@ds/native';
import { Box } from '../../Box/Box';
import { graphColor, graphSummary, lineDot, lineStroke } from '../graph';
import { useGraphFont } from '../useGraphFont';
import { lineLayout, linePath, nearestLineIndex } from './LineGraph.layout';
import type { LineGraphProps } from './LineGraph.props';

type Size = { width: number; height: number };

/** Native catalog line graph. The series is drawn with Skia. */
export function LineGraph({
  data,
  color = '$buttonPrimaryBackground',
  accessibilityLabel,
}: LineGraphProps) {
  const theme = useTheme();
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastIndex = useRef<number | null>(null);
  const stroke = graphColor(theme, color);
  const labelColor = graphColor(theme, '$textSecondary');
  const font = useGraphFont(12);
  const points = lineLayout(data, size.width, size.height);
  const series = linePath(points);
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

  function scrub(x: number) {
    const next = nearestLineIndex(points, x);
    if (next == null || lastIndex.current === next) {
      return;
    }
    lastIndex.current = next;
    haptic('impact');
    setActiveIndex(next);
  }

  function endScrub() {
    lastIndex.current = null;
    setActiveIndex(null);
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(event => {
      scrub(event.x);
    })
    .onUpdate(event => {
      scrub(event.x);
    })
    .onFinalize(() => {
      endScrub();
    });

  return (
    <GestureDetector gesture={pan}>
      <Box
        alignSelf="stretch"
        flexGrow={1}
        onLayout={onLayout}
        accessibilityRole="image"
        accessibilityLabel={summary}
      >
        {size.width > 0 && size.height > 0 ? (
          <Canvas style={{ width: size.width, height: size.height }}>
            {points.length > 1 ? (
              <Path
                path={series}
                color={stroke}
                style="stroke"
                strokeWidth={lineStroke}
                strokeJoin="round"
                strokeCap="round"
              />
            ) : null}
            {points.map((point, index) => (
              <Circle
                key={point.label}
                cx={point.x}
                cy={point.y}
                r={activeIndex === index ? lineDot * 2 : lineDot}
                color={stroke}
              />
            ))}
            {font
              ? points.map(point => (
                  <SkiaText
                    key={`${point.label}-label`}
                    x={point.labelX - font.measureText(point.label).width / 2}
                    y={point.labelY}
                    text={point.label}
                    font={font}
                    color={labelColor}
                  />
                ))
              : null}
          </Canvas>
        ) : null}
      </Box>
    </GestureDetector>
  );
}
