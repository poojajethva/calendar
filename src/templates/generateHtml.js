import { generateCalendar } from "../helpers/date";
import { getEventsData } from "../helpers/dataManipulation";

const sortEventsByTime = (data, date) => {
    return data.sort((a,b) => {
        let aTime = a.time == "all_day" ? `${date} 00:00:00`: a.time;
        aTime = new Date(aTime).getTime();
        let bTime = b.time == "all_day" ? `${date} 00:00:00`: b.time;
        bTime = new Date(bTime).getTime();
        if(aTime > bTime){
            return 1;
        } else if(aTime < bTime){
            return -1;
        } else {
            return 0;
        }
    })
}

const getEventsHtml = (data) => {
    let htmlStr = "";
    const sortedByTime = sortEventsByTime(data.events, data.date);
    sortedByTime.map(dd => {
        let className = dd.accepted ? "accepted" : "not-accepted";
        className = dd.time == "all_day" ? (className + " all-day") : className;
        htmlStr += `<li class="${className}" data-event='${JSON.stringify(dd)}'>${dd.name}</li>`
    })
    return `<ul>${htmlStr}</ul>`;
}

export const generateCalendarHtml = (date, fromInputChange) => {
    const data = generateCalendar(date, fromInputChange);
    const dataEvents = getEventsData(date);
    let str = "", startIndex = data.startDay, count = 0;
    data.data.map((dd, index) => {
        let className = dd.currentDay ? "highlight" : "", events = [], ulHtml = "";
        if(index >= startIndex){
            events = dataEvents[count];
            ulHtml = events ? getEventsHtml(events) : "";
            count++;
        }
        str += `<div class="day">
                <div class="day-dd ${className}">${dd.day}</div>

                ${ulHtml}
            </div>`;
    })
    document.querySelector(".cal-body").innerHTML = str;
}

const getIndividualEvent = (data) => {
    let readableTime = data.time == "all_day" ? "00:00:00" : data.time.split(" ")[1],
    duration = data.duration_minutes == "all_day" ? "All Day" : data.duration_minutes + " mins";
    return `<div class="title">
        ${data.name}
    </div>
    <div class="start-time">
        <span>Starting at: </span><span>${readableTime}</span>
    </div>
    <div class="dur">
        <span>Duration: </span><span> ${duration}</span>
    </div>
    <div class="attend">
        <span>Attending: </span><span>${data.accepted ? "Yes" : "No"}
    </div>`
}

const getCrossHtml = () => `<span class="cross">X</span>`

export const popupHtml = (data) => {
    let popupDiv = document.createElement("div");
    popupDiv.classList.add("popup");
    let popupDivInner = document.createElement("div");
    popupDivInner.classList.add("popup-inner");
    let innerCont = getIndividualEvent(data);
    let cross = getCrossHtml();
    popupDivInner.innerHTML = innerCont + cross;
    popupDiv.appendChild(popupDivInner);
    return popupDiv
}