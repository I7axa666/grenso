import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { EnergyData } from '../../types';
import apiClient from '../../api/client';
import { fetchEnergyDataStart, fetchEnergyDataSuccess, fetchEnergyDataFailure } from '../slices/energySlice';

function* fetchEnergyDataSaga(action: PayloadAction<string>) {
  try {
    const month = action.payload;
    const response: { data: EnergyData } = yield call(apiClient.get, `/energy-consumption?month=${month}`);
    yield put(fetchEnergyDataSuccess(response.data));
  } catch (error) {
    yield put(fetchEnergyDataFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function* watchEnergyData() {
  yield takeLatest(fetchEnergyDataStart.type, fetchEnergyDataSaga);
}