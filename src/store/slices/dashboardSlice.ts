import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/client';
import { ApiResponse, Aor, Day, Events, OrData, Or, ContextInInterval } from '../../features/AccountPage/types';

interface DashboardState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
  month: number;
  year: number;
  selectedAor: Aor | null;
  selectedAorId: number | null;
  selectedOr: Or | null;
  selectedOrId: number | null;
  selectedDay: Day | null;
  modalData: ModalData | null,
}

interface ModalData {
  data: OrData;
  or_name?: string;
  aor_name?: string;
  or_reduction_volume?: number;
  zone: number;
  events?: Events[];
  or_context?: ContextInInterval[];
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  selectedAor: null,
  selectedAorId: null,
  selectedOr: null,
  selectedOrId: null,
  selectedDay: null,
  modalData: null,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async ({ month, year }: { month: number; year: number }) => {
    const response = await apiClient.get<ApiResponse>(
      `/initial_data/?year=${year}&month=${month}`
    );
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMonth(state, action) {
      state.month = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setSelectedAor(state, action) {
      state.selectedAor = action.payload;
    },
    setSelectedAorId(state, action) {
      state.selectedAor = action.payload;
    },
    setSelectedOr(state, action) {
      state.selectedOr = action.payload;
    },
    setSelectedOrId(state, action) {
      state.selectedOr = action.payload;
    },
    setSelectedDay(state, action) {
      state.selectedDay = action.payload;
    },
    setModalData(state, action) { // Новый редьюсер для modalData
      state.modalData = action.payload;
     },
     clearModalData(state) { // Редьюсер для очистки modalData
      state.modalData = null;
     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { 
  setMonth, 
  setYear,
  setSelectedAor,
  setSelectedAorId,
  setSelectedOr,
  setSelectedOrId,
  setSelectedDay,
  setModalData,
  clearModalData
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
