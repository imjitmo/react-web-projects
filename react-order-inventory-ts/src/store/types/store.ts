import { CartSlice } from '../slices/cartSlice';
import { OrderSlice } from '../slices/orderSlice';
import { UserSlice } from '../slices/userSlice';

export type Store = CartSlice & OrderSlice & UserSlice;
