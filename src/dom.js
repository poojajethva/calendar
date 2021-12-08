import { currentDate, getPrevMonth, getNextMonth, convertInputDate } from "./helpers/date";
import {generateCalendarHtml} from "./templates/generateHtml";
import {popupHtml} from "./templates/generatePopupHtml";

const monthControl = document.querySelector('input[type="month"]');

const setInputVal = (date) => {
    let month=("0" + (date.getMonth() + 1)).slice(-2),
    year = date.getFullYear();
    monthControl.value = `${year}-${month}`;
}

export const domeEvents = () => {
    const date= currentDate();
    setInputVal(date);
    
    monthControl.addEventListener("change", (e) => {
        generateCalendarHtml(convertInputDate(e.target.value), true);
    });
    
    const todayBtn = document.querySelector('.today');
    
    todayBtn.addEventListener("click", e => {
        setInputVal(date);
        generateCalendarHtml(date, false);
    });
    
    const body = document.querySelector("body");
    body.addEventListener("click", e => {
        let currSelected = convertInputDate(monthControl.value)
        if(e.target.classList == "left-arrow"){
            let prevMonth = getPrevMonth(currSelected);
            setInputVal(prevMonth);
            generateCalendarHtml(prevMonth, true);
        }
        
        if(e.target.classList == "right-arrow"){
            let nextMonth = getNextMonth(currSelected);
            setInputVal(nextMonth);
            generateCalendarHtml(nextMonth, true);
        }

        if(e.target.nodeName == "LI"){
            let data = e.target.getAttribute("data-event");
            let date = e.target.getAttribute("data-date");
            let popupDiv = popupHtml(JSON.parse(data), date);
            
            document.querySelector("body").appendChild(popupDiv);
        }
        const popup = document.querySelector(".popup");
        if(e.target.classList == "cross"){
            document.querySelector("body").removeChild(popup);
        }
    });
}