import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnergyData, EnergyState } from '../../types';

const initialState: EnergyState = {
  data: null,
  loading: false,
  error: null,
  selectedMonth: new Date().toISOString().slice(0, 7), // YYYY-MM
};

const energySlice = createSlice({
  name: 'energy',
  initialState,
  reducers: {
    fetchEnergyDataStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.selectedMonth = action.payload;
    },
    fetchEnergyDataSuccess(state, action: PayloadAction<EnergyData>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchEnergyDataFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchEnergyDataStart,
  fetchEnergyDataSuccess,
  fetchEnergyDataFailure,
} = energySlice.actions;
export default energySlice.reducer;