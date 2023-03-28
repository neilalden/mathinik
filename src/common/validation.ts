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
        else if (typeof item === "object") {
            if (Object.keys(item).length === 0) return false;
        }
        else {
        }
        if (i === args.length - 1) return true
    }
}