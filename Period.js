var periodDisplay = document.getElementById("Period");
let pd_Text = displayPeriod.firstChild.textContent;
let periods = [];
let schedule = 
[
    { "Regular" : 
        [
            {1:[[7,40],[8,28]]},
            {2:[[8,32],[9,20]]},
            {3:[[9,24],[10,12]]},
            {4:[[10,16],[11,04]]},
            [   
                {"First Lunch":[[11,04],[11,34]]},
                {5:[[11,38],[12,26]]},
                {"Second Lunch":[[11,56],[12,26]]},
                {5:[[11,08],[11,56]]}
            ],
            {6:[[12,30],[1,18]]},
            {7:[[1,22],[2,11]]} 
        ]
    },
    {  "Minimum" : 
        [
            {1:[[7,40],[8,28]]},
            {2:[[8,32],[9,20]]},
            {3:[[9,24],[10,12]]},
            {4:[[10,16],[11,04]]},
            [   
                {"First Lunch":[[11,04],[11,34]]},
                {5:[[11,38],[12,26]]},
                {"Second Lunch":[[11,56],[12,26]]},
                {5:[[11,08],[11,56]]}
            ],
            {6:[[12,30],[1,18]]},
            {7:[[1,22],[2,11]]} 
        ]
    }
]

let periodNow = function(hour){
    switch (hour){
        case 1:

        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        default:
    }
}

let now = new Date();


