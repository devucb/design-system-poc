import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getAppEnv(): string;
}

/** Null when the native module is not linked (Jest, missing pods). */
export default TurboModuleRegistry.get<Spec>('NativeAppEnv');
