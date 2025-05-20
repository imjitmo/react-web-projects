import { StateCreator } from 'zustand';

export type UserState = {
  userId: string | null;
  email: string | null;
  displayName: string | null;
  userType: string | null;
  photo: string | null;
  signature: string | null;
};

export type UserAction = {
  setUserLoginData: (data: UserState) => void;
  setUserDisplayName: (displayName: string) => void;
  setUserPhoto: (photo: string) => void;
  setUserSignature: (signature: string) => void;
  clearUserLoginData: () => void;
};

export type UserSlice = UserState & UserAction;

const initialState = {
  userId: null,
  email: null,
  displayName: null,
  userType: null,
  photo: null,
  signature: null,
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
        state.photo = data.photo;
        state.signature = data.signature;
      });
    }
  },
  setUserDisplayName: (displayName) => {
    set((state) => {
      state.displayName = displayName;
    });
  },
  setUserPhoto: (photo) => {
    set((state) => {
      state.photo = photo;
    });
  },
  setUserSignature: (signature) => {
    set((state) => {
      state.signature = signature;
    });
  },
  clearUserLoginData: () => {
    set(() => initialState);
  },
});
