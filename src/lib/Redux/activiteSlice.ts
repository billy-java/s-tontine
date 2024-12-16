// activiteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TActivite } from '../types';
import { activites } from '../tabelles';

interface ActiviteState {
  activites: TActivite[];
}

const initialState: ActiviteState = {
  activites: activites,
};

const activiteSlice = createSlice({
  name: 'activite',
  initialState,
  reducers: {
    ajouterActivite(state, action: PayloadAction<TActivite>) {
      state.activites.push(action.payload);
    },
    modifierActivite(state, action: PayloadAction<TActivite>) {
      const index = state.activites.findIndex(
        (activite) => activite.id === action.payload.id
      );
      if (index !== -1) {
        state.activites[index] = action.payload;
      }
    },
    supprimerActivite(state, action: PayloadAction<string>) {
      state.activites = state.activites.filter(
        (activite) => activite.id !== action.payload
      );
    },
  },
});

export const { ajouterActivite, modifierActivite, supprimerActivite } =
  activiteSlice.actions;
export default activiteSlice.reducer;
