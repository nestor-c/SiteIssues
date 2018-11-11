
import {ClassRoom} from './ClassRoom.js';
import {handleClientLoad, uniqueRooms} from './gApi.js';

let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup(){
    var myCanvas = createCanvas(HEIGHT, WIDTH);
	let button = createButton('ADD');   
	myCanvas.parent("canvas");
	button.parent("canvas");
    button.position(50,50);

    handleClientLoad.then(function(){
        for(let i=0; i< uniqueRooms.length;i++)
        {
            cRooms.push(new ClassRoom(50,50,100,100));
        };
    });

    button.mousePressed(()=>{
        cRooms.push(new ClassRoom(50, 50, 100, 100));
    })  
}
function mousePressed(){   
    cRooms.forEach(room=>{
        if (room.mouseOver) {
            room.toggleDragging();
            // If so, keep track of relative location of click to corner of rectangle
            room.offsetX = room.X-mouseX;
            room.offsetY = room.Y-mouseY;            
        }
    }) 
}
function mouseReleased(){
    cRooms.forEach(room=>{
        if (room.mouseOver){
            room.untoggleDragging();
        }
    })
}
function draw(){
    background(51)
    for(let i=0; i < cRooms.length;i++){
        cRooms[i].display('classroom'+ i);
        cRooms[i].toggleMouseOver();
        cRooms[i].move();  
        for (let j = 0; j < cRooms.length; j++){
            cRooms[i].snapTogether(cRooms[j]);
        }
    }
}

window.setup = setup; 
window.draw = draw;
window.mousePressed=mousePressed;
window.mouseReleased=mouseReleased;
