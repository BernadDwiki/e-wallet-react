import { createSlice } from '@reduxjs/toolkit';

const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    selectedPerson: null,
    amount: '',
    notes: '',
  },
  reducers: {
    setSelectedPerson(state, action) {
      state.selectedPerson = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setNotes(state, action) {
      state.notes = action.payload;
    },
    clearTransfer(state) {
      state.selectedPerson = null;
      state.amount = '';
      state.notes = '';
    },
  },
});

export const { setSelectedPerson, setAmount, setNotes, clearTransfer } = transferSlice.actions;
export default transferSlice.reducer;