import { content } from "./content";

export const getPeriodOfDay = () => {
    const hours = new Date().getHours();
    const data = [
        [0, 4, content.evening],
        [5, 11, content.morning],
        [12, 17, content.afternoon],
        [18, 24, content.evening]
    ]
    for (var i = 0; i < data.length; i++) {
        if (hours >= data[i][0] && hours <= data[i][1]) {
            return (data[i][2]);
        }
    }
}