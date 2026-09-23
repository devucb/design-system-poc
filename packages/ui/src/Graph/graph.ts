import { space, type ColorToken } from '@ds/theme';

export type GraphDatum = {
  label: string;
  value: number;
};

/** Fills the parent. The host must give the graph a height. */
export type GraphProps = {
  data: GraphDatum[];
  /** Stroke / fill token. Default `$buttonPrimaryBackground`. */
  color?: ColorToken;
  accessibilityLabel?: string;
};

export const plotPadding = {
  top: space.md,
  right: space.md,
  bottom: space.lg,
  left: space.md,
};

export const graphHost = { height: 300, alignSelf: 'stretch' as const };

export const lineStroke = space.sm / 4;
export const lineDot = space.sm / 2;

export function graphColor(
  theme: { [name: string]: { val?: unknown } | undefined },
  token: ColorToken,
) {
  return String(theme[token.slice(1)]?.val ?? '');
}

export function maxGraphValue(data: GraphDatum[]) {
  return data.reduce((max, item) => Math.max(max, item.value), 0);
}

export function graphSummary(data: GraphDatum[]) {
  return data.map(item => `${item.label} ${item.value}`).join(', ');
}

export function graphInnerSize(width: number, height: number) {
  return {
    innerWidth: Math.max(0, width - plotPadding.left - plotPadding.right),
    innerHeight: Math.max(0, height - plotPadding.top - plotPadding.bottom),
  };
}
