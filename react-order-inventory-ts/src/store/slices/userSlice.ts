import { StateCreator } from 'zustand';

export type UserState = {
  id: string | null;
  email: string | null;
  userType: string | null;
};

export type UserSlice = UserState;

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/immer', never]],
  [['zustand/persist', unknown]],
  UserSlice
> = () => ({
  id: null,
  email: null,
  userType: null,
});
