import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist"
import { default as Counter } from './slice/counter';
import { default as Profiles } from './slice/profiles';
import { default as PreLoadData } from './slice/preLoadData';
import { default as User } from './slice/user';
import thunk from "redux-thunk"
import * as reduxThunk from "redux-thunk/extend-redux";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const reducers = combineReducers({ Counter, Profiles, PreLoadData, User })

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store);
    return { store, persistor }
}
export const asyncThunkFullfiled = (response) => {
    if (typeof response !== "object") return false;
    if (Object.keys(response).length === 0) return false;
    if (response?.meta?.requestStatus === "fulfilled") return true;
    return false
}