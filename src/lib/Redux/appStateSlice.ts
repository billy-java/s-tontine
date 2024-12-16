// appStateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  reunionModal: { isOpen: boolean; idToUpdate?: string };
  membreModal: { isOpen: boolean; idToUpdate?: string };
  transactionModal: { isOpen: boolean; idToUpdate?: string };
  activiteModal: { isOpen: boolean; idToUpdate?: string };
  notificationModal: { isOpen: boolean; idToUpdate?: string };
}

const initialState: ModalState = {
  reunionModal: { isOpen: false },
  membreModal: { isOpen: false },
  transactionModal: { isOpen: false },
  activiteModal: { isOpen: false },
  notificationModal: { isOpen: false },
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    ouvrirModal(
      state,
      action: PayloadAction<{ modal: keyof ModalState; idToUpdate?: string }>
    ) {
      const { modal, idToUpdate } = action.payload;
      state[modal] = { isOpen: true, idToUpdate };
    },
    fermerModal(state, action: PayloadAction<keyof ModalState>) {
      const modal = action.payload;
      state[modal] = { isOpen: false };
    },
    toggleModal(
      state,
      action: PayloadAction<{ modal: keyof ModalState; idToUpdate?: string }>
    ) {
      const { modal, idToUpdate } = action.payload;
      state[modal] = {
        isOpen: !state[modal].isOpen,
        idToUpdate: idToUpdate ?? state[modal].idToUpdate,
      };
    },
  },
});

export const { ouvrirModal, fermerModal, toggleModal } = appStateSlice.actions;
export default appStateSlice.reducer;
