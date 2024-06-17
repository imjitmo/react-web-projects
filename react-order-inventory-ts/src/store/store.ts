import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from './slices/cartSlice';
import { createOrderSlice } from './slices/orderSlice';
import { Store } from './types/store';

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createCartSlice(...a),
          ...createOrderSlice(...a),
        }))
      ),
      {
        name: 'store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
