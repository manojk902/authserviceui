import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './slices/userSlice';
import userInfoReducer from './slices/userInfoSlice';
import loginUserReducer from './slices/loginUserSlice';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loginUser","user","userInfo"], // persist only loginUser slice
};

const rootReducer = combineReducers({
  user: userReducer,
  userInfo: userInfoReducer,
  loginUser: loginUserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
