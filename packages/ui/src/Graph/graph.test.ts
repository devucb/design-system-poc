import { graphSummary, maxGraphValue } from './graph';

const sample = [
  { label: 'Mon', value: 10 },
  { label: 'Tue', value: 20 },
];

describe('graph', () => {
  it('uses the largest value as the scale', () => {
    expect(maxGraphValue(sample)).toBe(20);
    expect(maxGraphValue([])).toBe(0);
  });

  it('summarizes values for accessibility', () => {
    expect(graphSummary(sample)).toBe('Mon 10, Tue 20');
  });
});
