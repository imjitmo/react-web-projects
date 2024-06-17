import { StateCreator } from 'zustand';

export type UserState = {
  id: string | null;
  email: string | null;
  userType: string | null;
};

export type UserAction = {
  setUserData: (data: UserState) => void;
};

export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/immer', never]],
  [['zustand/persist', unknown]],
  UserSlice
> = () => ({
  id: null,
  email: null,
  userType: null,
  setUserData: (data) => {
    if (data) {
      return {
        id: data.id,
        email: data.email,
        userType: data.userType,
      };
    }
  },
});
