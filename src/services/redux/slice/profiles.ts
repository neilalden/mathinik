import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AccountType, ProfilesType } from "../../../../common/types";


const initialState: any = {
    profiles: [],
    countryFilter: "",
    updateIndex: undefined
}

export const profilesSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addProfile: (state, action: PayloadAction<any>) => {
            state.profiles = [...state.profiles, action.payload]
        },
        setCountryFilter: (state, action: PayloadAction<string>) => {
            state.countryFilter = action.payload
        },
        setUpdateIndex: (state, action: PayloadAction<undefined | number>) => {
            state.updateIndex = action.payload
        },
        updateProfiles: (state, action: PayloadAction<Array<any>>) => {
            state.profiles = action.payload
        }
    }
})

export const { addProfile, setCountryFilter, updateProfiles, setUpdateIndex } = profilesSlice.actions

export default profilesSlice.reducer