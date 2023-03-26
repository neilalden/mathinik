import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist"
import { default as Counter } from './slice/counter';
import { default as Account } from './slice/account';
import { default as Profiles } from './slice/profiles';
import { default as PreLoadData } from './slice/preLoadData';


const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const reducers = combineReducers({ Counter, Account, Profiles, PreLoadData })

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store);
    return { store, persistor }
}