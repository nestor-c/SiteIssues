var displayPeriod = document.getElementById("Period");

let periods = new Date();
periods.setHours(7);
periods.setMinutes(35);

let now = new Date();

if (now.getHours() < periods.getHours() || (now.getHours() <= periods.getHours() && now.getMinutes() < periods.getMinutes)){
    displayPeriod.firstChild.textContent = "Before first";
}
