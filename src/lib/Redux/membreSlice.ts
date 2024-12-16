// membreSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TMembre } from '../types';
import { membres } from '../tabelles';

interface MembreState {
  membres: TMembre[];
}

const initialState: MembreState = {
  membres: membres,
};

const membreSlice = createSlice({
  name: 'membre',
  initialState,
  reducers: {
    ajouterMembre(state, action: PayloadAction<TMembre>) {
      state.membres.push(action.payload);
    },
    modifierMembre(state, action: PayloadAction<TMembre>) {
      const index = state.membres.findIndex(
        (membre) => membre.id === action.payload.id
      );
      if (index !== -1) {
        state.membres[index] = action.payload;
      }
    },

    supprimerMembre(state, action: PayloadAction<string>) {
      state.membres = state.membres.filter(
        (membre) => membre.id !== action.payload
      );
    },
  },
});

export const { ajouterMembre, modifierMembre, supprimerMembre } =
  membreSlice.actions;
export default membreSlice.reducer;
