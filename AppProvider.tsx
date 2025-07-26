import { ReactNode, useEffect } from 'react';
import useStore from '@state/store.ts';
import { useColorSchemes } from '@src/utils/color-schemes.ts';
import { useConnectivity } from '@src/utils/connectivity.ts';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const setAppReadyStatus = useStore(state => state.app.setAppReadyStatus);


  useColorSchemes(); // Initialize and subscribe to color scheme updates
  useConnectivity(); // Subscribe to network/internet connection updates

  /**
   * This is where we initialize the app. When everything is ready, we set isReady true and hide the SplashScreen and start rendering the app.
   */
  useEffect(() => {
    const bootstrap = async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // mock delay
      setAppReadyStatus(true);
    };

    bootstrap();
  }, []);

  return <>{children}</>;
};
