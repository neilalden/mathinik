import { ActivityStateType } from "./slice/activity"
import { ClassStateType } from "./slice/class"
import { QuizStateType } from "./slice/quiz"
import { TodoStateType } from "./slice/todo"
import { UserStateType } from "./slice/user"

export type StateType = {
    Activity: ActivityStateType
    Quiz: QuizStateType
    User: UserStateType
    Todo: TodoStateType
    Class: ClassStateType
}