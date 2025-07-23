import {create} from 'zustand';
import {appSlice, AppState} from './app.slice.ts';
import {immer} from 'zustand/middleware/immer';
import {subscribeWithSelector} from 'zustand/middleware';

export type StoreState = AppState;
export const useStore = create<StoreState>()(
    subscribeWithSelector(
        immer(
            (...a) => ({
                ...appSlice(...a),
            })
        ),
    ),
);

export default useStore;
