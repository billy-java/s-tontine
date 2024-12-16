// reunionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TReunion } from '../types';
import { reunions } from '../tabelles';

interface ReunionState {
  reunions: TReunion[];
}

const initialState: ReunionState = {
  reunions: reunions,
};

const reunionSlice = createSlice({
  name: 'reunion',
  initialState,
  reducers: {
    // Ajouter une nouvelle réunion
    ajouterReunion(state, action: PayloadAction<TReunion>) {
      state.reunions.push(action.payload);
    },
    // Modifier une réunion existante
    modifierReunion(state, action: PayloadAction<TReunion>) {
      const index = state.reunions.findIndex(
        (reunion) => reunion.id === action.payload.id
      );
      if (index !== -1) {
        state.reunions[index] = action.payload;
      }
    },
    // Supprimer une réunion par ID
    supprimerReunion(state, action: PayloadAction<string>) {
      state.reunions = state.reunions.filter(
        (reunion) => reunion.id !== action.payload
      );
    },
  },
});

export const { ajouterReunion, modifierReunion, supprimerReunion } =
  reunionSlice.actions;
export default reunionSlice.reducer;
