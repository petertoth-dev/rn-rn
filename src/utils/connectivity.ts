import { useEffect } from 'react';
import useStore from '@state/store.ts';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useConnectivity = () => {
  const set = useStore((state) => state.app.set);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((connectivityState: NetInfoState) => {
      set(state=>{
        state.app.connectivity = {
          isConnected: connectivityState.isConnected,
          isOnline: connectivityState.isInternetReachable,
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

}
