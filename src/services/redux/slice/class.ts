import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType, ClassType, FirebaseCurrentUserType, StudentAccountType, } from "../../../common/types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app"
import { fetchUser, firebaseFetchUser } from "./user";

export type ClassStateType = {
    loading: boolean
    error?: string
    classDetails?: ClassType
}

const initialState: ClassStateType = {
    loading: false,
    error: '',
    classDetails: undefined
}

export const getClassDetails = createAsyncThunk("class/getQuiz", (classId: AccountType["classId"]) => {
    return firestore().collection(`Classes`).doc(classId).get().then((doc) => {
        const results = doc.data()
        return results
    }).catch((error) => error)
});

export type payloadType = {
    classId: AccountType["classId"];
    studentId: StudentAccountType
}

export const addStudentToClass = createAsyncThunk("class/addStudent", (payload: payloadType) => {
    const doc = firestore().collection("Classes").doc(payload.classId);
    return firebaseFetchUser(payload.studentId).then(data => {
        return doc.update({
            students: firebase.firestore.FieldValue.arrayUnion(data)
        }).then(() => data).catch(error => console.error(error))
    })
})



export const ClassSlice = createSlice({
    name: "class",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getClassDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getClassDetails.fulfilled, (state, action: PayloadAction<ClassType>) => {
            state.loading = false
            state.classDetails = action.payload
            state.error = ""
        })
        builder.addCase(getClassDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(addStudentToClass.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addStudentToClass.fulfilled, (state, action: PayloadAction<StudentAccountType>) => {
            const students = [...state.classDetails?.students]
            state.loading = false
            state.classDetails = { ...state.classDetails, students: [...students, action.payload] }
            state.error = ""
        })
        builder.addCase(addStudentToClass.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
    reducers: {
    }
})

export const { } = ClassSlice.actions

export default ClassSlice.reducer