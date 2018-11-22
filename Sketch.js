import {handleClientLoad} from './gAPI.js' 
import {ClassRoom} from './ClassRoom.js';

let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup(){
    var myCanvas = createCanvas(HEIGHT, WIDTH);
    myCanvas.parent("canvas");
    window.onload = handleClientLoad(cRooms);
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
window.onload = window.setup
window.draw = draw;
window.mousePressed=mousePressed;
window.mouseReleased=mouseReleased;
