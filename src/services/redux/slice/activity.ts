import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseCurrentUserType, QuestionType, ActivityType } from "../../../common/types";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export type ActivityStateType = {
    loading: boolean
    error?: string
    activities: Array<ActivityType>;
}

const initialState: ActivityStateType = {
    loading: false,
    error: '',
    activities: []
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
                            .add(data)
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
    },
    reducers: {
    }
})

export const { } = ActivitySlice.actions

export default ActivitySlice.reducer