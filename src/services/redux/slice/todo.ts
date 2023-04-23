import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType, ActivityType, ClassType, FirebaseCurrentUserType, LectureType, QuizType, StudentAccountType, TodoType } from "../../../common/types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { sortArrOfObj } from "../../../common/utils/utility";
import { customTypeOf } from "../../../common/validation";

export type TodoStateType = {
    loading: boolean
    error?: string
    todos: Array<TodoType>;
    submissions?: Array<any>
}

const initialState: TodoStateType = {
    loading: false,
    error: '',
    todos: [],
    submissions: [],
}
export type getSubmissionsPayloadType = {
    todos: Array<TodoType>
    students: Array<StudentAccountType>
    classId: ClassType["classId"]
}
export const getSubmissions = createAsyncThunk("todo/getSubmissions", async (payload: getSubmissionsPayloadType) => {
    const submissions: any = [];
    try {
        for (const [index, todo] of payload.todos.entries()) {
            for (const student of payload.students) {
                if (customTypeOf(todo) === "activity") {
                    const submission = await firestore()
                        .collection(`Classes/${payload.classId}/activities/${todo.id}/submissions`).doc(student.id)
                        .get().then((doc) => ({ ...doc.data(), todoId: todo.id, id: doc.data()?.id ?? student.id, score: doc.data()?.score ?? 0 })).catch((error) => console.error(error));
                    submissions.push(submission)
                    if (index === payload.todos.length - 1) {
                        // return
                    }
                } else if (customTypeOf(todo) === "quiz") {
                    const submission = await firestore()
                        .collection(`Classes/${payload.classId}/quizes/${todo.id}/submissions`).doc(student.id)
                        .get().then((doc) => ({ ...doc.data(), todoId: todo.id, id: doc.data()?.id ?? student.id, score: doc.data()?.score ?? 0 })).catch((error) => console.error(error));
                    submissions.push(submission)
                    if (index === payload.todos.length - 1) {
                        // return
                    }
                }
            }
        }
    } finally {
        return submissions
    }
})

export const getTodos = createAsyncThunk("todo/getTodos", async (classId: ClassType["classId"]) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (!firebaseCurrentUser?.displayName) return undefined
    const results: Array<TodoType> = []
    const quizesSnapshot = await firestore()
        .collection(`Classes/${classId}/quizes`)
        .get();
    const activitiesSnapshot = await firestore()
        .collection(`Classes/${classId}/activities`)
        .get()
    const lecturesSnapshot = await firestore()
        .collection(`Classes/${classId}/lectures`)
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
            topScorer: doc.data().topScorer,
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
            filesRef: doc.data().filesRef,
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


        builder.addCase(getSubmissions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getSubmissions.fulfilled, (state, action) => {
            state.loading = false
            if (!action.payload) {
                state.error = "Error: Payload undefined"
            } else {
                state.submissions = action.payload
                state.error = ""
            }
        })
        builder.addCase(getSubmissions.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
    reducers: {

    }
})

export const { } = TodoSlice.actions

export default TodoSlice.reducer