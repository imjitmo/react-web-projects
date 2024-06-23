import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from './slices/cartSlice';
import { createOrderSlice } from './slices/orderSlice';
import { createUserSlice } from './slices/userSlice';
import { Store } from './types/store';

export const useStore = create<Store>()(
  persist(
    subscribeWithSelector(
      immer((...a) => ({
        ...createCartSlice(...a),
        ...createOrderSlice(...a),
        ...createUserSlice(...a),
      }))
    ),
    {
      name: 'store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
