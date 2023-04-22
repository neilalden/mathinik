import { ActivityType, LectureType, QuizType, TodoType } from "./types";

export const isValid = (...args: Array<any>) => {
  for (let i = 0; i < args.length; i++) {
    const item = args[i]
    if (typeof item === "string") {
      if (item === "") return false
      if (item === "undefined") return false;
      if (item === "false") return false;
      if (item === "null") return false;
    }
    else if (typeof item === "number") {
      if (item === 0 || item >= 0 || item <= 0) { /* do nothing */ }
      else if (isNaN(item)) return false;
    }
    else if (typeof item === "undefined") return false;
    else if (item === null) return false;
    else if (!!!item) return false;
    else if (Array.isArray(item)) {
      if (item.length === 0) return false
    }
    else if (typeof item === "object") {
      if (Object.keys(item).length === 0) return false;
    }
    else {
    }
    if (i === args.length - 1) return true
  }
}
export const asyncThunkFullfiled = (response) => {
  if (typeof response !== "object") return false;
  if (Object.keys(response).length === 0) return false;
  if (response?.meta?.requestStatus === "fulfilled") return true;
  return false
}
export const asyncThunkFailed = (response) => {
  if (typeof response !== "object") return false;
  if (Object.keys(response).length === 0) return false;
  if (response?.meta?.requestStatus === "rejected") return true;
  return false
}

export const isQuiz = (todo: TodoType): todo is QuizType => {
  const quiz: QuizType = {
    id: "",
    title: "",
    deadline: new Date(),
    closeOnDeadline: false,
    instructions: "",
    pointsPerRight: 0,
    pointsPerWrong: 0,
    questions: [{
      question: "",
      answer: "",
      answerType: "option",
      options: [""]
    }],
    topScorer: {
      student: {
        id: "",
        fullname: "",
        phoneNumber: "",
        dateCreated: new Date(),
        isTeacher: false,
        photoURL: ""
      },
      score: 0
    }
  }
  for (const prop in todo) {
    if (!quiz.hasOwnProperty(prop)) {
      return false
    }
  }
  return true;
}

export const isActivity = (todo: TodoType): todo is ActivityType => {
  const activity: ActivityType = {
    id: "",
    title: "",
    deadline: new Date(),
    closeOnDeadline: false,
    instructions: "",
    points: 0,
    files: [],
    filesRef: [],
    topScorer: {
      student: {
        id: "",
        fullname: "",
        phoneNumber: "",
        dateCreated: new Date(),
        isTeacher: false,
        photoURL: ""
      },
      score: 0
    }
  }
  for (const prop in todo) {
    if (!activity.hasOwnProperty(prop)) {
      return false
    }
  }
  return true;
}

export const isLecture = (todo: TodoType): todo is LectureType => {
  const activity: LectureType = {
    id: "",
    title: "",
    instructions: "",
    files: [],
    filesRef: [],
    datePosted: new Date(),
    topScorer: {
      student: {
        id: "",
        fullname: "",
        phoneNumber: "",
        dateCreated: new Date(),
        isTeacher: false,
        photoURL: ""
      },
      score: 0
    }
  }
  for (const prop in todo) {
    if (!activity.hasOwnProperty(prop)) {
      return false
    }
  }
  return true;
}

export const customTypeOf = (arg: any) => {
  if (isActivity(arg)) return "activity";
  if (isLecture(arg)) return "lecture";
  if (isQuiz(arg)) return "quiz";
  return undefined
}