
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