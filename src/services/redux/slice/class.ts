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
    ranking: any
}

const initialState: ClassStateType = {
    loading: false,
    error: '',
    classDetails: undefined,
    ranking: undefined
}

export const getClassDetails = createAsyncThunk("class/getQuiz", (classId: AccountType["classId"]) => {
    return firestore().collection(`Classes`).doc(classId).get().then((doc) => {
        const results = doc.data()
        return results
    }).catch((error) => error)
});

export type payloadType = {
    classId: AccountType["classId"];
    studentId: StudentAccountType["id"]
}

export type removeStudentPayloadType = {
    students: ClassType["students"];
    studentId: StudentAccountType["id"];
}

export const addStudent = createAsyncThunk("class/addStudent", (payload: payloadType) => {
    const doc = firestore().collection("Classes").doc(payload.classId);
    return firebaseFetchUser(payload.studentId).then(data => {
        return doc.update({
            students: firebase.firestore.FieldValue.arrayUnion(data)
        }).then(() => {
            return firestore().collection("Users").doc(payload.studentId).update({ classId: payload.classId }).then(() => data).catch((error) => console.error(error))
        }).catch(error => console.error(error))
    })
});

export const removeStudent = createAsyncThunk("class/removeStudent", (payload: removeStudentPayloadType) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (!firebaseCurrentUser) return;
    const doc = firestore().collection("Classes").doc(String(firebaseCurrentUser?.displayName));
    return doc.update({
        students: payload.students
    }).then(() => {
        return firestore().collection("Users").doc(payload.studentId).update({ classId: null }).then(() => payload.students).catch((error) => console.error(error))
    }).catch(error => console.error(error))
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

        builder.addCase(addStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addStudent.fulfilled, (state, action: PayloadAction<StudentAccountType>) => {
            const students = [...state.classDetails?.students]
            state.loading = false
            state.classDetails = { ...state.classDetails, students: [...students, action.payload] }
            state.error = ""
        })
        builder.addCase(addStudent.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(removeStudent.pending, (state) => {
            state.loading = true
        })
        builder.addCase(removeStudent.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.classDetails.students = action.payload
            state.error = ""
        })
        builder.addCase(removeStudent.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
    reducers: {
        setRanking: (state, action: PayloadAction<any>) => {
            state.ranking = action.payload
        },
    }
})

export const { setRanking } = ClassSlice.actions

export default ClassSlice.reducer