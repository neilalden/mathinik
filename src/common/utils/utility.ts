
export const setStateEmptyString = (...setStates: Array<React.Dispatch<React.SetStateAction<string>>>) => {
    for (const setState of setStates) {
        setState("")
    }
}