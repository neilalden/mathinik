import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType, ActivityType, FirebaseCurrentUserType, LectureType, QuizType, TodoType } from "../../../common/types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { sortArrOfObj } from "../../../common/utils/utility";

export type TodoStateType = {
    loading: boolean
    error?: string
    todos: Array<TodoType>;
}

const initialState: TodoStateType = {
    loading: false,
    error: '',
    todos: []
}

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (!firebaseCurrentUser?.displayName) return undefined

    const results: Array<TodoType> = []
    const quizesSnapshot = await firestore()
        .collection(`Classes/${firebaseCurrentUser.displayName}/quizes`)
        .get();
    const activitiesSnapshot = await firestore()
        .collection(`Classes/${firebaseCurrentUser.displayName}/activities`)
        .get()
    const lecturesSnapshot = await firestore()
        .collection(`Classes/${firebaseCurrentUser.displayName}/lectures`)
        .get()
    quizesSnapshot.forEach((doc) => {
        const data: QuizType = {
            id: doc.data().id,
            title: doc.data().title,
            deadline: doc.data().deadline?.toDate(),
            closeOnDeadline: doc.data().closeOnDeadline,
            instructions: doc.data().instructions,
            pointsPerRight: doc.data().pointsPerRight,
            pointsPerWrong: doc.data().pointsPerWrong,
            questions: doc.data().questions,
            topScorer: doc.data().topScorer
        }
        results.push(data);
    })
    activitiesSnapshot.forEach((doc) => {
        const data: ActivityType = {
            id: doc.data().id,
            title: doc.data().title,
            deadline: doc.data().deadline?.toDate(),
            closeOnDeadline: doc.data().closeOnDeadline,
            instructions: doc.data().instructions,
            points: doc.data().points,
            files: doc.data().files,
        }
        results.push(data);
    });
    lecturesSnapshot.forEach((doc) => {
        const data: LectureType = {
            id: doc.data().id,
            title: doc.data().title,
            instructions: doc.data().instructions,
            datePosted: doc.data().datePosted?.toDate(),
            files: doc.data().files,
        }
        results.push(data);
    });
    return sortArrOfObj(results);
})

export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTodos.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.loading = false
            if (!action.payload) {
                state.error = "Error: Payload undefined"
            } else {
                state.todos = action.payload
                state.error = ""
            }
        })
        builder.addCase(getTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
    reducers: {
    }
})

export const { } = TodoSlice.actions

export default TodoSlice.reducer