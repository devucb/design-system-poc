import { barLayout } from './BarGraph.layout';

const sample = [
  { label: 'Mon', value: 10 },
  { label: 'Tue', value: 20 },
];

describe('BarGraph.layout', () => {
  it('places bars left to right inside the plot', () => {
    const [mon, tue] = barLayout(sample, 200, 100);
    expect(mon.x).toBeLessThan(tue.x);
    expect(tue.height).toBeGreaterThan(mon.height);
    expect(tue.height).toBeGreaterThan(0);
  });
});
