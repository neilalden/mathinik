import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseCurrentUserType, QuestionType, QuizType } from "../../../common/types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export type QuizStateType = {
    loading: boolean
    error?: string
    quizes: Array<QuizType>;
}
export type setQuizQuestionsAction = {
    id: string;
    questions: Array<QuestionType>
}

const initialState: QuizStateType = {
    loading: false,
    error: '',
    quizes: []
}

export const addQuiz = createAsyncThunk("quiz/addQuiz", (data: QuizType) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    return firestore().collection(`Classes/${firebaseCurrentUser?.displayName}/quizes`).doc(data.id).set(data).then(() => "success").catch((error) => error)
})

export const QuizSlice = createSlice({
    name: "quiz",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addQuiz.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addQuiz.fulfilled, (state, action: PayloadAction<QuizType>) => {
            state.loading = false
            state.quizes = [...state.quizes, action.payload]
            state.error = ""
        })
        builder.addCase(addQuiz.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
    reducers: {
        setQuiz: {
            reducer: (state, action: PayloadAction<QuizType>) => {
                try {
                    const { id, title, deadline, closeOnDeadline, instructions, pointsPerRight, pointsPerWrong, questions } = action.payload
                    state.quizes.push(
                        {
                            id,
                            title,
                            deadline,
                            closeOnDeadline,
                            instructions,
                            pointsPerRight,
                            pointsPerWrong,
                            questions
                        })
                } catch (error) {
                    console.error(error)
                }
            },
            prepare: (value: QuizType) => {
                const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
                const docId = firestore().collection(`Classes/${firebaseCurrentUser?.displayName}/quizes`).doc().id
                return {
                    payload: {
                        id: docId,
                        title: value.title,
                        deadline: value.deadline,
                        closeOnDeadline: value.closeOnDeadline,
                        instructions: value.instructions,
                        pointsPerRight: value.pointsPerRight,
                        pointsPerWrong: value.pointsPerWrong,
                        questions: []
                    }
                }
            }
        },
        setQuizQuestions: (state, action: PayloadAction<setQuizQuestionsAction>): any => {
            const { id, questions } = action.payload;
            // find quiz index
            let quizIndex = 0
            for (let i = 0; i < state.quizes.length; i++) {
                const quiz = state.quizes[i];
                if (quiz.id === id) { quizIndex = i; break; }
            }
            state.quizes[quizIndex].questions = questions
            return state.quizes[quizIndex]
        },
    }
})

export const { setQuiz, setQuizQuestions, } = QuizSlice.actions

export default QuizSlice.reducer