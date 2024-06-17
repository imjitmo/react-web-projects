import { Dishes } from './dishes';

export type CartDishes = Dishes & { quantity: number };
