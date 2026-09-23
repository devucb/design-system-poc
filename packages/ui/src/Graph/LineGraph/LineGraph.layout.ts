import {
  graphInnerSize,
  maxGraphValue,
  plotPadding,
  type GraphDatum,
} from '../graph';
import { space } from '@ds/theme';

export function lineLayout(
  data: GraphDatum[],
  width: number,
  height: number,
) {
  const max = maxGraphValue(data);
  const { innerWidth, innerHeight } = graphInnerSize(width, height);
  const count = data.length;
  const step = count <= 1 ? 0 : innerWidth / (count - 1);

  return data.map((item, index) => {
    const x =
      count === 1
        ? plotPadding.left + innerWidth / 2
        : plotPadding.left + index * step;
    const y =
      plotPadding.top +
      innerHeight -
      (max <= 0 ? 0 : (item.value / max) * innerHeight);
    return {
      label: item.label,
      value: item.value,
      x,
      y,
      labelX: x,
      labelY: height - space.sm,
    };
  });
}

export function linePath(points: { x: number; y: number }[]) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
}

/** Nearest plotted point for a scrub X. */
export function nearestLineIndex(points: { x: number }[], x: number) {
  if (points.length === 0) {
    return null;
  }

  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let index = 0; index < points.length; index += 1) {
    const dist = Math.abs(points[index].x - x);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  }
  return best;
}
