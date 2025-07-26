import { StateCreator } from 'zustand';
import { StoreState } from './store.ts';
import { produce } from 'immer';
import { DEFAULT_THEME } from '@src/constants.ts';
import { GeolocationResponse } from '@react-native-community/geolocation';

const sliceKey = 'app' as const;

export interface AppStateData {
  isReady: boolean;
  connectivity: {
    isConnected: boolean | null;
    isOnline: boolean | null;
  };
  system: {
    theme: string;
    colorScheme: 'light' | 'dark' | null;
  };
  device: {
    location: GeolocationResponse | null;
  }
}

export interface AppStateActions {
  setDeviceLocation: (location: GeolocationResponse) => void;
  setTheme: (theme: string) => void;
  setAppReadyStatus: (isReady: boolean) => void;
  set: (updater: (state: AppState) => void) => void;
}

export interface AppState {
  [sliceKey]: AppStateData & AppStateActions;
}

export const appSlice: StateCreator<StoreState, [], [], AppState> = (
  set,
  get,
) => ({
  [sliceKey]: {
    isReady: false,
    connectivity: {
      isConnected: null,
      isOnline: null,
    },
    system: {
      theme: DEFAULT_THEME,
      colorScheme: null,
    },
    device: {
      location: null,
    },
    setDeviceLocation: (location: GeolocationResponse) =>
      set(
        produce(state => {
          state.app.device.location = location;
        }),
      ),
    setTheme: (theme: string) =>
      set(
        produce(state => {
          state.app.system.theme = theme;
        }),
      ),
    setAppReadyStatus: isReady =>
      set(state => ({
        ...state,
        [sliceKey]: {
          ...state[sliceKey],
          isReady: isReady,
        },
      })),
    set: fn => set(produce(fn)),
  },
});
