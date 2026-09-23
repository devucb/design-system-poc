import {create} from 'zustand';

type SplashState = {
  hasCompleted: boolean
  complete: () => void
  reset: () => void
};

export const useSplashStore = create<SplashState>(set => ({
  hasCompleted: false,
  complete: () => set({hasCompleted: true}),
  reset: () => set({hasCompleted: false}),
}));

export function useHasCompletedSplash() {
  return useSplashStore(state => state.hasCompleted);
}

export function completeSplash() {
  useSplashStore.getState().complete();
}

export function resetSplash() {
  useSplashStore.getState().reset();
}
