
import {ClassRoom} from './ClassRoom.js';

let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup(){
    createCanvas(HEIGHT, WIDTH);
    let button = createButton('ADD');   
    button.position(25,25,100);
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
    // let name = 'classroom'
    // cRooms.forEach(room=>{
    //     room.display(name)
    //     room.toggleMouseOver();
    //     room.move()
    //     cRooms.forEach(other=>{
    //         room.snapTogether(other);   
    //     })
    // })

    //This loop was causing a slight shift of the classrooms as each was snapped together. 
    // it may have to do with the order that the snapTogether is called.
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
window.mousePressed= mousePressed;
window.mouseReleased=mouseReleased;
