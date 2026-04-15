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

const persistConfig = {
  key: 'e-wallet-root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authReducer
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

