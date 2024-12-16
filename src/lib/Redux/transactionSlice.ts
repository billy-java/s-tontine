// transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TTransaction } from '../types';
import { transactions } from '../tabelles';

interface TransactionState {
  transactions: TTransaction[];
}

const initialState: TransactionState = {
  transactions: transactions,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    ajouterTransaction(state, action: PayloadAction<TTransaction>) {
      state.transactions.push(action.payload);
    },
    modifierTransaction(state, action: PayloadAction<TTransaction>) {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    supprimerTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const { ajouterTransaction, modifierTransaction, supprimerTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
