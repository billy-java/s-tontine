// store.ts
import { configureStore } from '@reduxjs/toolkit';

import reunionReducer from './reunionSlice';
import membreReducer from './membreSlice';
import transactionReducer from './transactionSlice';
import activiteReducer from './activiteSlice';
import notificationReducer from './notificationSlice';
import appStateReducer from './appStateSlice';

const store = configureStore({
  reducer: {
    appState: appStateReducer,
    reunion: reunionReducer,
    membre: membreReducer,
    transaction: transactionReducer,
    activite: activiteReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
