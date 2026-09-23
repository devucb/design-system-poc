import {
  graphInnerSize,
  maxGraphValue,
  plotPadding,
  type GraphDatum,
} from '../graph';
import { radius, space } from '@ds/theme';

export const barGap = space.sm;
export const barCorner = radius.md;
export { plotPadding };

export function barLayout(
  data: GraphDatum[],
  width: number,
  height: number,
) {
  const max = maxGraphValue(data);
  const { innerWidth, innerHeight } = graphInnerSize(width, height);
  const count = data.length;
  const totalGap = barGap * Math.max(0, count - 1);
  const barWidth = count === 0 ? 0 : (innerWidth - totalGap) / count;

  return data.map((item, index) => {
    const barHeight = max <= 0 ? 0 : (item.value / max) * innerHeight;
    const x = plotPadding.left + index * (barWidth + barGap);
    return {
      label: item.label,
      value: item.value,
      x,
      y: plotPadding.top + innerHeight - barHeight,
      width: barWidth,
      height: barHeight,
      labelX: x + barWidth / 2,
      labelY: height - space.sm,
    };
  });
}
