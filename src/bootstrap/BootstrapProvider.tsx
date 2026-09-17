import {createContext, useContext, useState, type ReactNode} from 'react';

type BootstrapContextValue = {
  /** In-memory only. Splash runs once per cold start, then we route on session. */
  hasCompletedSplash: boolean;
  completeSplash: () => void;
};

const BootstrapContext = createContext<BootstrapContextValue | null>(null);

export function BootstrapProvider({children}: {children: ReactNode}) {
  const [hasCompletedSplash, setHasCompletedSplash] = useState(false);

  const completeSplash = () => {
    setHasCompletedSplash(true);
  };

  return (
    <BootstrapContext.Provider value={{hasCompletedSplash, completeSplash}}>
      {children}
    </BootstrapContext.Provider>
  );
}

export function useBootstrap() {
  const ctx = useContext(BootstrapContext);
  if (!ctx) {
    throw new Error('useBootstrap must be used inside BootstrapProvider');
  }
  return ctx;
}
