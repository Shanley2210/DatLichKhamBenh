import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import userReducer from './userSlice';
import adminReducer from './adminSlice';
import doctorReducer from './doctorSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // dùng localStorage
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['language']
};

const rootReducer = combineReducers({
    language: languageReducer,
    user: userReducer,
    admin: adminReducer,
    doctor: doctorReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);
