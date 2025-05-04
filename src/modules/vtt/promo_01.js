// these two functions are taken somewhere from stack overflow
// https://stackoverflow.com/a/38148759
function calculateDays(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let timeDifference = end - start;
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
}
// https://stackoverflow.com/a/2901298
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (window.location.href.includes("attendance/week") || window.location.href.includes("calendar")) {
    const calendarCard = document.querySelector(".page-title");
    calendarCard.innerHTML = `
    <div class="box-bcd-big-no-grid" style="
        --gradient-color1: ${'#000000'};
        --gradient-color2: ${'#ffffff'};
        background-color: #004d40; 
        color: white; 
        padding: 10px; 
        position: relative;
        text-align: right;
        ">
        <h4 class="z-index: 999;">Hollow Knight: Silksong was first announced</h4>
        <h1 class="z-index: 999;">${numberWithCommas(calculateDays('2019-02-14', new Date().toISOString().slice(0, 10)))}</h1>
        <h4 class="z-index: 999;">days ago</h4>
        <div class="close-buttons">
            <button id="close-popup" class="close-btn" style="background-color: #ff5722; color: white; border: none; padding: 5px;">Close</button>
        </div>
    </div><br>`;
}