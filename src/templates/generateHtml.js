import { generateCalendar } from "../helpers/date";
import { getEventsData } from "../helpers/dataManipulation";
import {sortEventsByTime} from "../helpers/sortTime";

const getEventsHtml = (data) => {
    let htmlStr = "";
    const sortedByTime = sortEventsByTime(data);
    sortedByTime.map(dd => {
        let className = dd.accepted ? "accepted" : "not-accepted";
        className = dd.time == "all_day" ? (className + " all-day") : className;
        htmlStr += `<li class="${className}" data-event='${JSON.stringify(dd)}'>${dd.name}</li>`
    })
    return `<ul>${htmlStr}</ul>`;
}

export const generateCalendarHtml = (date, isNotCurrentMonth) => {
    const data = generateCalendar(date, isNotCurrentMonth);
    const dataEvents = getEventsData(date);
    let htmlStr = "", startIndex = data.startDay, count = 0;
    data.data.map((dd, index) => {
        let className = dd.currentDay ? "highlight" : "", 
        events = [], 
        ulHtml = "", 
        dayClassName = dd.overlapping ? "dull" : "";
        if(index >= startIndex){
            events = dataEvents[count];
            ulHtml = events ? getEventsHtml(events) : "";
            count++;
        }
        htmlStr += `<div class="day ${dayClassName}">
                <div class="day-dd ${className}">${dd.day}</div>
                ${ulHtml}
            </div>`;
    })
    document.querySelector(".cal-body").innerHTML = htmlStr;
}