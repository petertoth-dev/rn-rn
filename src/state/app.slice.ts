import {StateCreator} from 'zustand';
import {StoreState} from './store.ts';
import {produce} from 'immer';

const sliceKey = 'app' as const;

export interface AppStateData {
    isReady: boolean,
    connectivity: {
        isConnected: boolean | null,
        isOnline: boolean | null,
    },
    system: {
        colorScheme: 'light' | 'dark' | null;
    },
}

export interface AppStateActions {
    setAppReadyStatus: (isReady: boolean) => void;
    set: (updater: (state: AppState) => void) => void;
}
export interface AppState {
    [sliceKey]:AppStateData & AppStateActions;
}

export  const appSlice: StateCreator<StoreState, [], [], AppState> = (set, get) => ({
    [sliceKey]:{
        isReady: false,
        connectivity: {
            isConnected: null,
            isOnline: null,
        },
        system: {
            colorScheme: null,
        },
        setAppReadyStatus: (isReady) =>
            set((state) => ({
                ...state,
                [sliceKey]: {
                    ...state[sliceKey],
                    isReady: isReady,
                },
            })),
        set: (fn) => set(produce(fn)),
    },
});
