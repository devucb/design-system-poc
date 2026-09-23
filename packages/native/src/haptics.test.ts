import NativeHaptics from './NativeHaptics';
import {haptic} from './haptics';

const trigger = NativeHaptics?.trigger as jest.Mock | undefined;

describe('haptic', () => {
  beforeEach(() => {
    trigger?.mockClear();
  });

  it.each(['selection', 'impact', 'success', 'error'] as const)(
    'forwards %s to the native module',
    kind => {
      haptic(kind);
      expect(trigger).toHaveBeenCalledWith(kind);
    },
  );
});
