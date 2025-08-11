import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import userInfoReducer from './slices/userInfoSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
        userInfo: userInfoReducer
    }
});

export default store;