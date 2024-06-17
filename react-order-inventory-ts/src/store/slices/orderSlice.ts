import { StateCreator } from 'zustand';

export type OrderState = {
  id: string;
};

export type OrderAction = {
  setOrderId: (id: OrderState) => void;
  clearId: () => void;
};

export type OrderSlice = OrderState & OrderAction;

const orderInitialState: OrderState = {
  id: '',
};

export const createOrderSlice: StateCreator<
  OrderSlice,
  [['zustand/immer', never]],
  [['zustand/persist', unknown]],
  OrderSlice
> = (set) => ({
  ...orderInitialState,
  setOrderId: (data) => {
    if (data) {
      set((state) => {
        state.id = data.id;
      });
    }
  },
  clearId: () => set(() => orderInitialState),
});
