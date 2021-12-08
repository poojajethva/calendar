export const sortEventsByTime = ({events, date}) => {
    return events.sort((a,b) => {
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