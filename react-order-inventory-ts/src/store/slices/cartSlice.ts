import { StateCreator } from 'zustand';

import { useStore } from '../store';
import { CartDishes } from '../types/cartProduct';
import { Dishes } from '../types/dishes';

type CartState = {
  dishes: CartDishes[];
  totalPrice: number;
  totalQuantity: number;
  appliedReward: number;
  appliedDiscount: number;
  customerData: {
    email: string;
    points: number;
  };
};

type CartActions = {
  addToCart: (dish: Dishes) => void;
  removeFromCart: (dishId: string) => void;
  increaseQuantity: (dishId: string) => void;
  decreaseQuantity: (prdishIdductId: string) => void;
  getProductById: (dishId: string) => CartDishes | undefined;
  setTotal: (total: number) => void;
  setTotalQuantity: (totalQuantity: number) => void;
  setDiscountedPrice: (discountPercent: number) => void;
  setAppliedDiscount: (discount: number) => void;
  setDiscountDetails: (customerData: { email: string; points: number }) => void;
  setReward: (reward: number) => void;
  clearDiscount: () => void;
  clearCart: () => void;
};

const cartInitialState: CartState = {
  dishes: [],
  totalPrice: 0,
  totalQuantity: 0,
  appliedDiscount: 0,
  appliedReward: 0,
  customerData: {
    email: '',
    points: 0,
  },
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
      const foundProduct = state.dishes.find((dish) => dish.dishId === dishId);
      if (foundProduct) {
        foundProduct.quantity += 1;

        foundProduct.totalPrice = state.appliedDiscount
          ? foundProduct.dishPrice * foundProduct.quantity * (1 - state.appliedDiscount)
          : foundProduct.dishPrice * foundProduct.quantity;
      }
    }),
  decreaseQuantity: (dishId) =>
    set((state) => {
      const foundIndex = state.dishes.findIndex((dish) => dish.dishId === dishId);
      if (foundIndex !== -1) {
        if (state.dishes[foundIndex].quantity === 1) {
          state.dishes.splice(foundIndex, 1);
        } else {
          state.dishes[foundIndex].quantity -= 1;
          state.dishes[foundIndex].totalPrice = state.appliedDiscount
            ? state.dishes[foundIndex].dishPrice *
              state.dishes[foundIndex].quantity *
              (1 - state.appliedDiscount)
            : state.dishes[foundIndex].dishPrice * state.dishes[foundIndex].quantity;
        }
      }
    }),
  addToCart: (dish) =>
    set((state) => {
      const orderId = useStore.getState().orderId;
      state.dishes.push({ ...dish, quantity: 1, totalPrice: dish.dishPrice, orderId: orderId });
    }),
  removeFromCart: (dishId) =>
    set((state) => {
      state.dishes = state.dishes.filter((dish) => dish.dishId !== dishId);
    }),
  getProductById: (dishId) => get().dishes.find((dish) => dish.dishId === dishId),
  setTotal: (total) =>
    set((state) => {
      state.totalPrice = state.appliedDiscount ? total * (1 - state.appliedDiscount) : total;
    }),
  setTotalQuantity: (totalQuantity) =>
    set((state) => {
      state.totalQuantity = totalQuantity;
    }),
  setDiscountedPrice: () =>
    set((state) => {
      state.totalPrice = state.totalPrice * (1 - state.appliedDiscount);
    }),
  setAppliedDiscount: (discount) =>
    set((state) => {
      state.appliedDiscount = discount;
    }),
  setDiscountDetails: (customerData) =>
    set((state) => {
      state.customerData = customerData;
    }),
  setReward: (reward) =>
    set((state) => {
      state.appliedReward = reward;
    }),
  clearDiscount: () =>
    set((state) => {
      state.totalPrice =
        state.totalPrice > 0 ? state.totalPrice / (1 - state.appliedDiscount) : state.totalPrice;
      state.appliedReward = 0;
      state.appliedDiscount = 0;
      state.customerData = { email: '', points: 0 };
    }),

  clearCart: () => set(() => cartInitialState),
});
