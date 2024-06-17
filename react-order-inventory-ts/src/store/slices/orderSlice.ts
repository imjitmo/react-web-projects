import { StateCreator } from 'zustand';

export type OrderState = {
  orderId: string;
};

export type OrderAction = {
  setOrderId: (id: OrderState) => void;
  getOrderId: () => string;
  clearId: () => void;
};

export type OrderSlice = OrderState & OrderAction;

const orderInitialState: OrderState = {
  orderId: '',
};

export const createOrderSlice: StateCreator<
  OrderSlice,
  [['zustand/immer', never]],
  [['zustand/persist', unknown]],
  OrderSlice
> = (set, get) => ({
  ...orderInitialState,
  setOrderId: (data) => {
    if (data) {
      set((state) => {
        state.orderId = data.orderId;
      });
    }
  },
  getOrderId: () => {
    return get().orderId;
  },
  clearId: () => set(() => orderInitialState),
});
