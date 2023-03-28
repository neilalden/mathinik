import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type VoidFunction = () => void;
export type ArgFunction = (arg?: any) => void;

export type AccountType = TeacherAccountType | StudentAccountType;

export type TeacherAccountType = {
    id: string;
    fullname: string;
    phoneNumber: string;
    dateCreated: Date;
    isTeacher: true;
}
export type StudentAccountType = {
    id: string;
    fullname: string;
    phoneNumber: string;
    dateCreated: Date;
    isTeacher: false;
}

export type TodoType = LectureType | ActivityType | QuizType

export type LectureType = {
    title: string;
    instructions: string;
    files?: Array<File>
}

export type ActivityType = {
    title: string;
    deadline: Date;
    closeOnDeadline: boolean;
    instructions: string;
    pointsPerActivity?: number;
    files?: Array<File>
}

export type QuizType = {
    title: string;
    deadline: Date;
    closeOnDeadline: boolean;
    instructions: string;
    pointsPerRight?: number;
    pointsPerWrong?: number;
    questions: Array<QuestionType>
}
export type QuestionType = {
    question: string;
    answer: string;
    answerType: "option" | "write";
    options?: Array<string>
}

export type FirebaseCurrentUserType = FirebaseAuthTypes.User | null
export type FirebaseTimeStampType = {
    creationTime: number;
    lastSignInTime: number
}