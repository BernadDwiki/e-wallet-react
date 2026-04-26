import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    transfers: [],
  },
  reducers: {
    addTransferHistory(state, action) {
      const transfer = {
        id: Date.now(),
        ...action.payload,
        date: new Date().toISOString(),
      };
      state.transfers.unshift(transfer);
    },
    clearTransferHistory(state) {
      state.transfers = [];
    },
  },
});

export const { addTransferHistory, clearTransferHistory } = historySlice.actions;
export default historySlice.reducer;
