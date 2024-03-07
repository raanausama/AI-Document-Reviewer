import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import userReducer from './user';


const reducers = combineReducers({
    user: userReducer,
});


const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: `${import.meta.env.VITE_APP_SECRET_KEY}`,
            // eslint-disable-next-line
            onError: function (error) {
                // Handle the error.
            },
        }),
    ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store);