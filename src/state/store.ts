import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { appSlice, AppState } from '@state/app.slice.ts';

export type StoreState = AppState;
export const useStore = create<StoreState>()(
  subscribeWithSelector(
    immer((...a) => ({
      ...appSlice(...a),
    })),
  ),
);

export default useStore;
