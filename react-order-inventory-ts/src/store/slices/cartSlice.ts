import { StateCreator } from 'zustand';

import { useStore } from '../store';
import { CartDishes } from '../types/cartProduct';
import { Dishes } from '../types/dishes';

type CartState = {
  dishes: CartDishes[];
  totalPrice: number;
  totalQuantity: number;
};

type CartActions = {
  addToCart: (dish: Dishes) => void;
  removeFromCart: (dishId: string) => void;
  increaseQuantity: (dishId: string) => void;
  decreaseQuantity: (prdishIdductId: string) => void;
  getProductById: (dishId: string) => CartDishes | undefined;
  setTotal: (total: number) => void;
  setTotalQuantity: (totalQuantity: number) => void;
  clearCart: () => void;
};

const cartInitialState: CartState = {
  dishes: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export type CartSlice = CartState & CartActions;

export const createCartSlice: StateCreator<
  CartSlice,
  [['zustand/immer', never]],
  [['zustand/persist', unknown]],
  CartSlice
> = (set, get) => ({
  ...cartInitialState,
  increaseQuantity: (dishId) =>
    set((state) => {
      const foundProduct = state.dishes.find((dish) => dish.id === dishId);
      if (foundProduct) {
        foundProduct.quantity += 1;
      }
    }),
  decreaseQuantity: (dishId) =>
    set((state) => {
      const foundIndex = state.dishes.findIndex((dish) => dish.id === dishId);
      if (foundIndex !== -1) {
        if (state.dishes[foundIndex].quantity === 1) {
          state.dishes.splice(foundIndex, 1);
        } else {
          state.dishes[foundIndex].quantity -= 1;
        }
      }
    }),
  addToCart: (dish) =>
    set((state) => {
      const orderId = useStore.getState().orderId;
      state.dishes.push({ ...dish, quantity: 1, orderId: orderId });
    }),
  removeFromCart: (dishId) =>
    set((state) => {
      state.dishes = state.dishes.filter((dish) => dish.id !== dishId);
    }),
  getProductById: (dishId) => get().dishes.find((dish) => dish.id === dishId),
  setTotal: (total) =>
    set((state) => {
      state.totalPrice = total;
    }),
  setTotalQuantity: (totalQuantity) =>
    set((state) => {
      state.totalQuantity = totalQuantity;
    }),
  clearCart: () => set(() => cartInitialState),
});
