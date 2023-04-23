import { PermissionsAndroid } from "react-native";
import { QuizType, TodoType } from "../types";
import DocumentPicker from 'react-native-document-picker';
import { isActivity, isLecture, isQuiz } from "../validation";
import { COLORS } from "./colors";
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export const setStateEmptyString = (...setStates: Array<React.Dispatch<React.SetStateAction<string>>>) => {
    for (const setState of setStates) {
        setState("")
    }
}
export const setStateEmptyArray = (...setStates: Array<React.Dispatch<React.SetStateAction<Array<any>>>>) => {
    for (const setState of setStates) {
        setState([])
    }
}

export const sortArrOfObj = (arr, order = "desc") => {
    return arr.sort((a: object, b: object) => {
        return order === "desc"
            // @ts-ignore
            ? new Date(a["datePosted" || "deadline"]) - new Date(b["datePosted" || "deadline"])
            // @ts-ignore
            : new Date(b["datePosted" || "deadline"]) - new Date(a["datePosted" || "deadline"]);
    });
};
export const sortArrayOfObjects = (arr, order = "desc", property) => {
    return arr.sort((a: object, b: object) => {
        return order === "desc"
            // @ts-ignore
            ? new Date(a[property]) - new Date(b[property])
            // @ts-ignore
            : new Date(b[property]) - new Date(a[property]);
    });
};


export const getTotalPoints = (todo: TodoType): number => {
    // @ts-ignore
    if (!!todo.pointsPerRight) {
        // @ts-ignore
        return todo.pointsPerRight * todo.questions?.length
        // @ts-ignore
    } else if (!!todo.points) {
        // @ts-ignore
        return Number(todo.points)
    } else {
        return 0
    }
}

export const openFile = (setFiles: React.Dispatch<React.SetStateAction<any[]>>) => {
    PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    )
        .then(async response => {
            if (response) {
                DocumentPicker.pickMultiple({
                    type: [DocumentPicker.types.allFiles],
                    mode: 'open',
                    copyTo: 'cachesDirectory',
                })
                    .then(res => {
                        setFiles(prev => [
                            ...prev,
                            { fileName: res[0].name, uri: res[0].fileCopyUri },
                        ]);
                    })
                    .catch(e => alert(`${e}`));
            } else {
                const permission = await requestStoragePermission();
                if (permission) {
                    DocumentPicker.pickMultiple({
                        type: [DocumentPicker.types.allFiles],
                        mode: 'open',
                        copyTo: 'cachesDirectory',
                    })
                        .then(res => {
                            setFiles(prev => [
                                ...prev,
                                { fileName: res[0].name, uri: res[0].fileCopyUri },
                            ]);
                        })
                        .catch(e => alert(`${e}`));
                } else {
                    alert('Unable to upload file');
                }
            }
        })
        .catch(e => alert(`${e}`));
};
export const viewFile = (fileRef: string) => {
    const dir = `${RNFS.DownloadDirectoryPath}/mathinik`;
    const fileName = getFileName(fileRef);
    const dirFile = dir + "/" + fileName;
    RNFS.exists(dirFile).then(exists => {
        if (exists) {
            FileViewer.open(dirFile);
        } else {
            storage()
                .ref(fileRef)
                .getDownloadURL()
                .then(url => {
                    RNFS.exists(dir).then(
                        res => {

                            if (!res) {
                                RNFS.mkdir(dir);
                            }
                            RNFS.downloadFile({
                                fromUrl: url,
                                toFile: dirFile,
                            })
                                .promise.then((x) => {
                                    FileViewer.open(dirFile)
                                })
                                .then(() => { })
                                .catch(error => {
                                    console.error(error);
                                });
                        },
                    ).catch(error => console.error(error))
                })
                .catch(error => console.error(error));
        }
    }).catch(error => console.error(error))
}
export const getFileName = (file: string) => {
    try {
        const split = file.split("/")
        return split[split.length - 1]
    } catch (error) {
        console.error(error)
    }
}
export const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'ReadApp Storage Permission',
                message:
                    'ReadApp needs access to your storage ' +
                    'so you can upload files from your storage',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        alert(`${err}`);
    }
};
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
export const reminder = `Reminder: Most devices only support images, videos,
text, and PDF files. Any other file types would  require
 students to have the necessary application to open 
them.`

export const getTodoColor = (todo: TodoType) => isLecture(todo) ? [COLORS.LIGHTBLUE, COLORS.MIDBLUE, COLORS.BLUENORMAL] : isActivity(todo) ? [COLORS.LIGHTORANGE, COLORS.ORANGE, COLORS.DARKORANGE] : isQuiz(todo) ? [COLORS.LIGHTPINK, COLORS.PINK, COLORS.DARKPINK] : [COLORS.DARKPINK, COLORS.PINK, COLORS.LIGHTPINK]