// lib/stores/accountDialogStore.ts
import { create } from 'zustand';

type UseAccountDialogState = {
  isAccountDialogModal: boolean;
};

type UseAccountDialogActions = {
  setAccountDialogMdodal: (isAccountDialogModal: boolean) => void;
};

const initialState: UseAccountDialogState = {
  isAccountDialogModal: false,
};

export const UseAccountDialogStore = create<
  UseAccountDialogState & UseAccountDialogActions
>()((set) => ({
  ...initialState,
  setAccountDialogMdodal: (state: boolean) =>
    set({ isAccountDialogModal: state }),
}));
