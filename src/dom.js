import { currentDate, getPrevMonth, getNextMonth, convertInputDate } from "./helpers/date";
import {generateCalendarHtml, popupHtml} from "./templates/generateHtml"

export const domeEvents = () => {
    const monthControl = document.querySelector('input[type="month"]');
    const date= currentDate(),
    month= ("0" + (date.getMonth() + 1)).slice(-2),
    year = date.getFullYear(),
    monthVal = `${year}-${month}`;
    monthControl.value = monthVal;
    
    monthControl.addEventListener("change", (e) => {
        generateCalendarHtml(convertInputDate(e.target.value), true);
    });
    
    const todayBtn = document.querySelector('.today');
    
    todayBtn.addEventListener("click", e => {
        monthControl.value = monthVal;
        generateCalendarHtml(date, false);
    });
    
    
    const arrows = document.querySelector(".arrows");
    arrows.addEventListener("click", e => {
        let currSelected = convertInputDate(monthControl.value)
        if(e.target.classList == "left-arrow"){
            let prevMonth = getPrevMonth(currSelected),
            month=("0" + (prevMonth.getMonth() + 1)).slice(-2),
            year = prevMonth.getFullYear();
            
            monthControl.value = `${year}-${month}`;
            generateCalendarHtml(prevMonth, true);
        }
        
        if(e.target.classList == "right-arrow"){
            let nextMonth = getNextMonth(currSelected),
            month=("0" + (nextMonth.getMonth() + 1)).slice(-2),
            year = nextMonth.getFullYear();
            
            monthControl.value = `${year}-${month}`;
            generateCalendarHtml(nextMonth, true);
        }
    });
    
    const body = document.querySelector("body");
    body.addEventListener("click", e => {
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