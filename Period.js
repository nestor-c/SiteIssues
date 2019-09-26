var period = document.getElementById("Period");
var date = new Date();
var date2 = new Date();
date.setSeconds(9);


if (date2.getSeconds() < date.getSeconds()){
    period.textContent = "Period 1";
}
