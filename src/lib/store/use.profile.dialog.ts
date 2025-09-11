import { create } from 'zustand';

type UseProfileDialogState = {
  isProfileDialogModal: boolean;
};

type UseAccountDialogActions = {
  setProfileDialogModal: (isProfileDialogModal: boolean) => void;
};

const initialState: UseProfileDialogState = {
  isProfileDialogModal: false,
};

export const UseProfileDialogStore = create<
  UseProfileDialogState & UseAccountDialogActions
>()((set) => ({
  ...initialState,
  setProfileDialogModal: (state: boolean) =>
    set({ isProfileDialogModal: state }),
}));
