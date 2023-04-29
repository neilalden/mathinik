import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseCurrentUserType, QuestionType, ActivityType, SubmitActivityType, StudentAccountType, ClassType, ActivitySubmission, SubmitActivityGradeType, LectureType } from "../../../common/types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export type ActivityStateType = {
    loading: boolean
    error?: string
    activities: Array<ActivityType>;
    lectures: Array<LectureType>;
    currentActivity?: ActivityType | ActivitySubmission
    currentLecture?: LectureType;
}

export type getActivitySubmissionType = {
    studentId: StudentAccountType["id"];
    classId: ClassType["classId"];
    activityId: ActivityType["id"]
}

const initialState: ActivityStateType = {
    loading: false,
    error: '',
    activities: [],
    lectures: [],
    currentActivity: undefined,
    currentLecture: undefined
}

export const addActivity = createAsyncThunk("activity/addActivity", (data: ActivityType) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (!firebaseCurrentUser?.displayName) return undefined
    const docId = firestore().collection(`Classes/${firebaseCurrentUser?.displayName}/activities`).doc().id;
    data.id = docId;
    const files = data.files ?? []
    const path: string = firebaseCurrentUser?.displayName || ""
    const urls: Array<string> = []
    if (files) {
        for (const file of files) {
            const reference = storage().ref(`${path}/${file.fileName}`);
            reference
                .putFile(file.uri)
                .then(() => {
                    urls.push(`${path}/${file.fileName}`);
                    if (urls.length === files.length) {
                        data.filesRef = urls
                        delete data.files
                        return firestore()
                            .collection(`Classes/${path}/activities`)
                            .doc(data.id)
                            .set(data)
                            .then(() => "success")
                            .catch(error => console.error(error));
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    } else {
        return firestore()
            .collection(`Classes/${firebaseCurrentUser?.displayName}/activities`)
            .doc(data.id)
            .set(data)
            .then(() => "success")
            .catch((error) => error)
    }
})


export const addLecture = createAsyncThunk("lectures/addLecture", (data: LectureType) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (!firebaseCurrentUser?.displayName) return undefined
    const docId = firestore().collection(`Classes/${firebaseCurrentUser?.displayName}/lectures`).doc().id;
    data.id = docId;
    const files = data.files ?? []
    const path: string = firebaseCurrentUser?.displayName || ""
    const urls: Array<string> = []
    if (files) {
        for (const file of files) {
            const reference = storage().ref(`${path}/${file.fileName}`);
            reference
                .putFile(file.uri)
                .then(() => {
                    urls.push(`${path}/${file.fileName}`);
                    if (urls.length === files.length) {
                        data.filesRef = urls
                        delete data.files
                        return firestore()
                            .collection(`Classes/${path}/lectures`)
                            .doc(data.id)
                            .set(data)
                            .then(() => "success")
                            .catch(error => console.error(error));
                    }
                })
                .catch(error => {
                    console.error("errorz: ", error);
                });
        }
    } else {
        return firestore()
            .collection(`Classes/${firebaseCurrentUser?.displayName}/lectures`)
            .doc(data.id)
            .set(data)
            .then(() => "success")
            .catch((error) => error)
    }
})

export const submitActivity = createAsyncThunk("activity/submitActivity", (data: SubmitActivityType) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (firebaseCurrentUser?.displayName)
        return firestore().collection(`Classes/${data.classId}/activities/${data.activityId}/submissions`).doc(firebaseCurrentUser?.displayName).set(data.payload).then(() => "success").catch((error) => error)
})

export const gradeStudentActivity = createAsyncThunk("activity/gradeStudentActivity", (data: SubmitActivityGradeType) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (firebaseCurrentUser?.displayName)
        return firestore().collection(`Classes/${data.classId}/activities/${data.activityId}/submissions`).doc(data.studentId).update({ score: data.score }).then(() => "success").catch((error) => error)
})

export const getActivitySubmission = createAsyncThunk("activity/getActivitySubmission", (data: getActivitySubmissionType) => {
    return firebaseGetActivitySubmission(data)
})
export const getActivitySubmissions = async (data: { classId: ClassType["classId"], activityId: ActivityType["id"] }) => {
    try {
        const querySnapshot = await firestore().collection(`Classes/${data.classId}/activities/${data.activityId}/submissions`).get().then((querySnapshot) => querySnapshot);
        const arr = []
        // @ts-ignore
        querySnapshot.forEach(doc => arr.push(doc.data()))
        return arr;

    } catch (error) {
        console.error(error)
    }
};

export const firebaseGetActivitySubmission = (data: getActivitySubmissionType) => {
    const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;
    if (firebaseCurrentUser?.displayName)
        return firestore().collection(`Classes/${data.classId}/activities/${data.activityId}/submissions`).doc(firebaseCurrentUser?.displayName).get().then((doc) => doc.data()).catch((error) => error)
}

export const ActivitySlice = createSlice({
    name: "activity",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addActivity.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addActivity.fulfilled, (state, action: PayloadAction<ActivityType>) => {
            state.loading = false
            state.activities = [...state.activities, action.payload]
            state.error = ""
        })
        builder.addCase(addActivity.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(addLecture.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addLecture.fulfilled, (state, action: PayloadAction<LectureType>) => {
            state.loading = false
            state.lectures = [...state.lectures, action.payload]
            state.error = ""
        })
        builder.addCase(addLecture.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(submitActivity.pending, (state) => {
            state.loading = true
        })
        builder.addCase(submitActivity.fulfilled, (state, action: PayloadAction<ActivityType>) => {
            state.loading = false
            state.currentActivity = action.payload
            state.error = ""
        })
        builder.addCase(submitActivity.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(getActivitySubmission.fulfilled, (state, action: PayloadAction<ActivitySubmission>) => {
            state.loading = false
            state.currentActivity = { ...state.currentActivity, ...action.payload }
            state.error = ""
        })
        builder.addCase(getActivitySubmission.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(gradeStudentActivity.pending, (state) => {
            state.loading = true
        })
        builder.addCase(gradeStudentActivity.fulfilled, (state, action: PayloadAction<ActivityType>) => {
            state.loading = false
            state.currentActivity = action.payload
            state.error = ""
        })
        builder.addCase(gradeStudentActivity.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
    reducers: {
        setCurrentActivity: (state, action: PayloadAction<ActivityType>) => {
            const activity = action.payload;
            state.currentActivity = activity
        },
        setCurrentLecture: (state, action: PayloadAction<LectureType>) => {
            const lecture = action.payload;
            state.currentLecture = lecture
        },
    }
})

export const { setCurrentActivity, setCurrentLecture } = ActivitySlice.actions

export default ActivitySlice.reducer