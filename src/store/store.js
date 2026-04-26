import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import authReducer from './slice/authSlice.js';
import transferReducer from './slice/transferSlice.js';
import historyReducer from './slice/historySlice.js';

const persistConfig = {
  key: 'e-wallet-root',
  storage,
  whitelist: ['auth', 'transfer', 'history']
};

const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  transfer: transferReducer,
  history: historyReducer
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          REHYDRATE
        ]
      }
    });
  }
});

export const persistor = persistStore(store);

