import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist"
import { default as Profiles } from './slice/profiles';
import { default as User } from './slice/user';
import { default as Quiz } from './slice/quiz';
import { default as Todo } from './slice/todo';
import { default as Activity } from './slice/activity';
import thunk from "redux-thunk"
import * as reduxThunk from "redux-thunk/extend-redux";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const reducers = combineReducers({ Profiles, User, Quiz, Todo, Activity })

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store);
    return { store, persistor }
}