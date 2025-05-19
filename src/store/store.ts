import { configureStore } from '@reduxjs/toolkit';
import energyReducer from './slices/energySlice';
import createSagaMiddleware from 'redux-saga';
import { watchEnergyData } from './sagas/energySaga';
import dashboardReducer from './slices/dashboardSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
      // energy: energyReducer,
      dashboard: dashboardReducer,
      // другие редьюсеры можно добавить здесь
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  
  // sagaMiddleware.run(watchEnergyData);
  
  // Типы для TypeScript
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;