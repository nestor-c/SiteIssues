import { Rectangle } from "./Rectangle.js";

// import {handleClientLoad} from './gAPI.js'

let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
function checkAll(rooms){
	for (let i =0; i<rooms; i++){
		
	}
}

function setup() {
	var myCanvas = createCanvas(HEIGHT, WIDTH);
	myCanvas.parent("canvas");
	cRooms = createClassRooms(2,100);
	// window.onload = handleClientLoad(cRooms);
}



function draw() {
	let color = "#b7bfcc";
	background(color)
	for (let i = 0; i < cRooms.length; i++) {
		cRooms[i].display('classroom' + i);
		cRooms[i].checkAndToggleMouseOver();
		cRooms[i].move();
		for (let j = 0; j < cRooms.length; j++) {
			//cRooms[i].snapTogether(cRooms[j]);
		}
	}
}
function mousePressed() {
	cRooms.forEach(room => {
		if (room.mouseOver) {
			room.toggleDragging();
			// If so, keep track of relative location of click to corner of rectangle
			room.offsetX = room.X - mouseX;
			room.offsetY = room.Y - mouseY;
		}
	})
	

}
function mouseReleased() {
	cRooms.forEach(room => {
		if (room.mouseOver) {
			room.untoggleDragging();
		}
	})
	 
}

window.setup = setup;
window.onload = window.setup
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
