// notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TNotification } from '../types';
import { notifications } from '../tabelles';

interface NotificationState {
  notifications: TNotification[];
}

const initialState: NotificationState = {
  notifications: notifications,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    ajouterNotification(state, action: PayloadAction<TNotification>) {
      state.notifications.push(action.payload);
    },
    modifierNotification(state, action: PayloadAction<TNotification>) {
      const index = state.notifications.findIndex(
        (notification) => notification.id === action.payload.id
      );
      if (index !== -1) {
        state.notifications[index] = action.payload;
      }
    },
    supprimerNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const {
  ajouterNotification,
  modifierNotification,
  supprimerNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
