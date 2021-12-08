import {data} from "../data/data"
import { getYear, getMonth } from "date-fns"
export const getEventsData = date => {
    let year = getYear(date), month = getMonth(date) + 1;
    return data.filter(dd => {
        let str = dd.date.split("-");
        return (Number(str[0]) === year && Number(str[1]) === month)
    })
}