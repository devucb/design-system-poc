import { completeSplash } from '@ds/store';
import { Splash } from '@ds/views';

export function SplashScreen() {
  return <Splash onComplete={completeSplash} />;
}
