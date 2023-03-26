import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPayload_UpdateStatus } from '@Services/ConnectionService/interfaces';
import CONSTANTS, { SOCKET_CONSTANTS, socketConnection } from './constants';
import { IConnectionReducer, ActionTypes } from './interfaces';

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        socketConnection: SOCKET_CONSTANTS.CONNECTED,
        internetConnection: true,
        hasInternet: true,
    },
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        updateConnectionState: (state, action: ActionTypes) => {
            switch (action.type) {
                case CONSTANTS.UPDATE_CONNECTION_STATE: {
                    return {
                        ...state,
                        [action.target]: action.value,
                        hasInternet:
                            action.target === socketConnection
                                ? action.value === SOCKET_CONSTANTS.CONNECTED
                                : state.hasInternet,
                    };
                }
                default: {
                    return state;
                }
            }
        },
        updateStatus: (state, action: PayloadAction<IPayload_UpdateStatus>) => ({
            type: CONSTANTS.UPDATE_CONNECTION_STATE,
            target: action.payload.target,
            value: action.payload.value,
        }),
    },
});
export const { reducer__Connection, updateStatus } = connectionSlice.actions;

export default connectionSlice.reducer;
