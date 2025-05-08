import { StateCreator } from 'zustand';

export type UserState = {
  userId: string | null;
  email: string | null;
  displayName: string | null;
  userType: string | null;
};

export type UserAction = {
  setUserLoginData: (data: UserState) => void;
  clearUserLoginData: () => void;
  setUserDisplayName: (displayName: string) => void;
};

export type UserSlice = UserState & UserAction;

const initialState = {
  userId: null,
  email: null,
  displayName: null,
  userType: null,
};

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/immer', never]],
  [['zustand/persist', unknown]],
  UserSlice
> = (set) => ({
  ...initialState,
  setUserLoginData: (data) => {
    if (data) {
      set((state) => {
        state.userId = data.userId;
        state.email = data.email;
        state.displayName = data.displayName;
        state.userType = data.userType;
      });
    }
  },
  setUserDisplayName: (displayName) => {
    set((state) => {
      state.displayName = displayName;
    });
  },
  clearUserLoginData: () => {
    set(() => initialState);
  },
});
