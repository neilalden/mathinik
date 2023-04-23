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
    photoURL: string;
    classId?: string
}
export type StudentAccountType = {
    id: string;
    fullname: string;
    phoneNumber: string;
    dateCreated: Date;
    isTeacher: false;
    photoURL?: string;
    classId?: string
}

export type TodoType = LectureType | ActivityType | QuizType

export type LectureType = {
    id: string;
    title: string;
    instructions: string;
    datePosted: Date;
    files?: Array<File & FileType>;
    filesRef?: Array<string>;
    pointsPerRight?: undefined;
    topScorer?: {
        student: StudentAccountType;
        score: number
    }
}
export type ActivityType = {
    id: string;
    title: string;
    deadline: Date;
    closeOnDeadline: boolean;
    instructions: string;
    points: number;
    files?: Array<File & FileType>;
    filesRef?: Array<string>;
    topScorer?: {
        student: StudentAccountType;
        score: number
    }
}

export type QuizType = {
    id: string;
    title: string;
    deadline: Date;
    closeOnDeadline: boolean;
    instructions: string;
    pointsPerRight: number;
    pointsPerWrong?: number;
    questions: Array<QuestionType>;
    topScorer?: {
        student: StudentAccountType;
        score: number
    }
}
export type QuestionType = {
    question: string;
    answer: string;
    answerType: "option" | "write";
    options: Array<string>
}

export type FirebaseCurrentUserType = FirebaseAuthTypes.User | null
export type FirebaseTimeStampType = {
    creationTime: number;
    lastSignInTime: number
}

export type FileType = {
    fileName: string;
    uri: string
}

export type setStateBoolean = React.Dispatch<React.SetStateAction<boolean>>
export type setStateString = React.Dispatch<React.SetStateAction<string>>
export type setStateNumber = React.Dispatch<React.SetStateAction<number>>

export type ActivitySubmission = {
    answer: string;
    score: number | null;
    createdAt: Date;
    id: StudentAccountType["id"];
    name: StudentAccountType["fullname"];
    photoURL?: StudentAccountType["photoURL"]
}

export type QuizSubmission = {
    answers: Array<QuizAnswer>;
    score: number;
    createdAt: Date;
    id: StudentAccountType["id"];
    name: StudentAccountType["fullname"]
}
export type QuizAnswer = {
    question: QuestionType["question"];
    correctAnswer: QuestionType["answer"]
    answer: string;
}
export type SubmitQuizType = {
    payload: QuizSubmission;
    classId: TeacherAccountType["id"];
    quizId: QuizType["id"]
}
export type SubmitActivityType = {
    payload: ActivitySubmission;
    classId: TeacherAccountType["id"];
    activityId: AccountType["id"]
}

export type SubmitActivityGradeType = {
    score: ActivitySubmission["score"]
    classId: TeacherAccountType["id"];
    activityId: AccountType["id"];
    studentId: StudentAccountType["id"]
}
export type RankingItem = {
    student: StudentAccountType;
    points: number
}

export type StudentGrade = {
    student: StudentAccountType;
    submissions: QuizSubmission | ActivitySubmission;
    average: number
}

export type ClassType = {
    classId: TeacherAccountType["id"];
    teacher: TeacherAccountType;
    students: Array<StudentAccountType>;
    ranking: Array<RankingItem>;
    studentGrades: Array<StudentGrade>
}