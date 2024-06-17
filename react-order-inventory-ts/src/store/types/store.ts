import { CartSlice } from '../slices/cartSlice';
import { OrderSlice } from '../slices/orderSlice';

export type Store = CartSlice & OrderSlice;
