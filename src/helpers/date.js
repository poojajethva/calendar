import { getDaysInMonth, startOfMonth, getDay, subMonths, addMonths, format } from 'date-fns'
export const currentDate = () => new Date();

const weekDay = (n) => {
    const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekDayNames[n];
}

export const getPrevMonth = (date) => subMonths(new Date(date), 1);

export const getNextMonth = (date) => addMonths(new Date(date), 1);

export const getMonth = (date) => date.getMonth();

export const getYear = (date) => date.getFullYear();

export const convertInputDate = (val) => {
    val = val.split("-");
    return new Date(parseInt(val[0]), parseInt(val[1]) - 1, 1);
};

const generateMonth = (date, fromInputChange) => {
    let numOfDays = getDaysInMonth(date), monthArr = [],
    startDay = getDay(startOfMonth(date)), countDay = startDay, 
    currentDay = date.getDate();
    for(let i=1; i<=numOfDays;i++){
        countDay = countDay > 6 ? 0 : countDay;
        let highlightDay = (currentDay == i && !fromInputChange) ? currentDay: null;
        monthArr.push({
            day: i,
            dayName: weekDay(countDay),
            currentDay:highlightDay
        })
        countDay++;
    }
    return {days: monthArr, startDay, endDay: countDay - 1};
}

export const generateCalendar = (date, fromInputChange) => {
    const dateData = generateMonth(date, fromInputChange);
    let updatedCalData = dateData.days;

    if(dateData.startDay > 0){
        let prevMonthData =  generateMonth(getPrevMonth(date), fromInputChange);
        let prevData = prevMonthData.days.slice(-dateData.startDay);
        updatedCalData = [...prevData, ...updatedCalData]
    }

    if(dateData.endDay < 6){
        let nextMonthData =  generateMonth(getNextMonth(date), fromInputChange);
        let nextData = nextMonthData.days.slice(0, 6 - dateData.endDay);
        updatedCalData = [...updatedCalData, ...nextData]
    }

    return {data: updatedCalData, startDay: dateData.startDay};
}