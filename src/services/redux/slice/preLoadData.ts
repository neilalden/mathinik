import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const preLoadDataSlice = createSlice({
    name: "preLoad",
    initialState: {
        countryList: [],
    },
    reducers: {
        setCountryList: (state, action: PayloadAction<any>) => {
            state.countryList = action.payload
        },
    }
})
export const { setCountryList } = preLoadDataSlice.actions

export default preLoadDataSlice.reducer