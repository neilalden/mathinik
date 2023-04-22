import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType, FirebaseCurrentUserType, StudentAccountType } from "../../../common/types";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app"

export type UserStateType = {
    loading: boolean
    error?: string
    user?: AccountType
}
const initialState: UserStateType = {
    loading: false,
    error: '',
    user: undefined
}

export const registerUser = createAsyncThunk("user/registerUser", (data: StudentAccountType) => {
    return firestore()
        .collection('Users')
        .doc(data.id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return undefined
            } else {
                const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
                if (!firebaseCurrentUser) return;
                return firestore()
                    .collection('Users')
                    .doc(data.id)
                    .set({
                        ...data,
                        photoURL: firebaseCurrentUser?.photoURL
                    })
                    .then(() => {
                        firebaseCurrentUser?.updateProfile({ displayName: doc.id }).then(() => {
                            data["photoURL"] = String(firebaseCurrentUser.photoURL)
                            return firestore()
                                .collection("Classes")
                                .doc(data.classId)
                                .update({ students: firebase.firestore.FieldValue.arrayUnion(data) })
                                .then(() => "success")
                                .catch(error => console.error(error))
                        }).catch((error) => console.error(error))
                    })
                    .catch((error) => error)
            }
        })
})

export const fetchUser = createAsyncThunk("user/fetchUser", (id: AccountType["id"]) => {
    return firebaseFetchUser(id)
})

export const firebaseFetchUser = (id) => {
    return firestore()
        .collection('Users')
        .doc(id)
        .get()
        .then((result) => {
            return result.data()
        })
        .catch((error) => error)
}

export const UsersSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<AccountType>) => {
            const user = action.payload
            state.loading = false;
            state.user = user;
            state.error = user ? "" : "ID already in use";

        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.user = undefined
            state.error = action.error.message
        })
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<AccountType>) => {
            state.loading = false;
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.user = undefined
            state.error = action.error.message
        })
    },
    reducers: {
        getUser: (state, action: PayloadAction<any>) => {
            state.user = state.user
        },

    }
})

export const { getUser } = UsersSlice.actions

export default UsersSlice.reducer