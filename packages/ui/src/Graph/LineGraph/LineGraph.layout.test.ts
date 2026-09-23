import { lineLayout, linePath, nearestLineIndex } from './LineGraph.layout';

const sample = [
  { label: 'Mon', value: 10 },
  { label: 'Tue', value: 20 },
  { label: 'Wed', value: 5 },
];

describe('LineGraph.layout', () => {
  it('places points left to right with higher values nearer the top', () => {
    const [mon, tue, wed] = lineLayout(sample, 200, 100);
    expect(mon.x).toBeLessThan(tue.x);
    expect(tue.x).toBeLessThan(wed.x);
    expect(tue.y).toBeLessThan(mon.y);
    expect(wed.y).toBeGreaterThan(mon.y);
  });

  it('builds an SVG path from the points', () => {
    expect(linePath([{ x: 0, y: 10 }, { x: 4, y: 2 }])).toBe('M 0 10 L 4 2');
    expect(linePath([])).toBe('');
  });

  it('picks the nearest point when scrubbing between them', () => {
    const points = lineLayout(sample, 200, 100);
    expect(nearestLineIndex(points, points[0].x + 1)).toBe(0);
    expect(nearestLineIndex(points, (points[0].x + points[1].x) / 2 + 1)).toBe(
      1,
    );
    expect(nearestLineIndex([], 10)).toBeNull();
  });
});
