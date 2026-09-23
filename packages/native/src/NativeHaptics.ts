import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  trigger(kind: string): void;
}

/** Null when the native module is not linked (Jest, missing pods). */
export default TurboModuleRegistry.get<Spec>('NativeHaptics');
