import Svg, {Path} from 'react-native-svg';
import {GLYPHS} from './glyphs';
import type {IconProps} from './Icon.props';

export function Icon({name, color, size = 24}: IconProps) {
  const glyph = GLYPHS[name];

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {glyph.map((path, index) => (
        <Path
          key={index}
          d={path.d}
          fill={path.fill ? color : 'none'}
          stroke={path.stroke ? color : undefined}
          strokeWidth={path.stroke ? 2 : undefined}
          strokeLinecap={path.stroke ? 'round' : undefined}
          strokeLinejoin={path.stroke ? 'round' : undefined}
        />
      ))}
    </Svg>
  );
}
