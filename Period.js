let periodDisplay = document.getElementById("Period").firstElementChild;
let schedule = 
{
     Regular: 
        {
            1: { 
                startHour:7,
                startMinute: 40,
                endHour:8,
                endMinute:28
            },
            2:{
                startHour:8,
                startMinute:32,
                endHour:9,
                endMinute:20
            },
            3:{
                startHour:9,
                startMinutes:24,
                endHour:10,
                endMinutes:12
            },
            4:{
                startHour:10,
                startMinutes:16,
                endHour:11,
                endMinutes:4
            },
            Lunches:{
                FirstLunch:{
                    startHour:11,
                    startMinutes:4,
                    endHour:11,
                    endMinutes:34,
                    
                    5:[[11,38],[12,26]]
                },
                SecondLunch:{
                    startHour:11,
                    startMinutes:56,
                    endHour:12,
                    endMinutes:26,
                    5:{
                    startHour:11,
                    startMinutes:8,
                    endHour:11,
                    endMinutes:56,            
                    }
                },
            },
            6:{
                startHour:12,
                startMinutes:30,
                endHour:1,
                endMinutes:18
            },
            7:{
                startHour:1,
                startMinutes:22,
                endHour:2,
                endMinute:11 
            }
        },  ``
      Minimum: 
        [
            {1:[[7,40],[8,28]]},
            {2:[[8,32],[9,20]]},
            {3:[[9,24],[10,12]]},
            {4:[[10,16],[11,4]]},
            [   
                {"First Lunch":[[11,4],[11,34]]},
                {5:[[11,38],[12,26]]},
                {"Second Lunch":[[11,56],[12,26]]},
                {5:[[11,8],[11,56]]}
            ],
            {6:[[12,30],[1,18]]},
            {7:[[1,22],[2,11]]} 
        ]
    },
    {  "Modified" : 
        [
            {1:[[7,40],[8,28]]},
            {2:[[8,32],[9,20]]},
            {3:[[9,24],[10,12]]},
            {4:[[10,16],[11,4]]},
            [   
                {"First Lunch":[[11,4],[11,34]]},
                {5:[[11,38],[12,26]]},
                {"Second Lunch":[[11,56],[12,26]]},
                {5:[[11,8],[11,56]]}
            ],
            {6:[[12,30],[1,18]]},
            {7:[[1,22],[2,11]]} 
        ]
    }
}
let time = new Date();
function timeTest (time){
    let hour = time.getHours() % 12
    let minutes = time.getMinutes();
    switch(hour){
        case 7:
            if ((minutes)>=schedule.Regular[1].startMinute)
                periodDisplay.innerHTML = "Period 1";
            break;
        case 8:
            if (minutes<=28)
                periodDisplay.innerHTML = "Period 1";
            else if (minutes >= 32)
                periodDisplay.innerHTML = "Period 2";
            break;
        case 9:
            if (minutes<=20)
                periodDisplay.innerHTML = "Period 2";
            else if (minutes >= 24)
                periodDisplay.innerHTML = "Period 3";
            break;
        case 10:
            if (minutes<=12)
                periodDisplay.innerHTML = "Period 3";
            else if (minutes >= 16)
                periodDisplay.innerHTML = "Period 4";
            break;
        case 1:
            if (minutes<= 18)
                periodDisplay.innerHTML = "Period 6";
            else if (minutes >= 22)
                periodDisplay.innerHTML = "Period 7";
            break;
        case 2:
            if (minutes <= 11)
                periodDisplay.innerHTML = "Period 7";
            else 
                periodDisplay.innerHTML = "School Over"
            break;
        default: 
            periodDisplay.innerHTML = "No school"
    }
}

setInterval(timeTest(time),5000);


