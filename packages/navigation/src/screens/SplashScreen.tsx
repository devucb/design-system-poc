import {completeSplash} from '@ds/session/splashStore';
import {Splash} from '@ds/views/Splash/Splash';

export function SplashScreen() {
  return <Splash onComplete={completeSplash} />;
}
