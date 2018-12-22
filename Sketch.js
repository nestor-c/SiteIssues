import { Rectangle } from "./Rectangle.js";

// import {handleClientLoad} from './gAPI.js'

let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup() {
	var myCanvas = createCanvas(HEIGHT, WIDTH);
	myCanvas.parent("canvas");
	
	for (let i=0; i<5; i++){
		cRooms.push(new Rectangle(300,300,200,200));
	}
	
	// window.onload = handleClientLoad(cRooms);
}

function draw() {
	let color = "#b7bfcc";
	background(color)
	for (let i = 0; i < cRooms.length; i++) {
		cRooms[i].display('classroom' + i);
		cRooms[i].checkAndToggleMouseOver();
		cRooms[i].move();
		for (let j = i+1; j < cRooms.length; j++) {
			cRooms[i].snapTogether(cRooms[j]);
		}
	}
}

function mousePressed() {
	let shallow = shallowest(cRooms);
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
function shallowest(rooms){
	//COND: We only need the rooms that are intersecting.
	// Might also only want to grab those that the mouse is clicking on.
	if (rooms.length >= 2) {
		let shallowest = rooms[0];

		rooms.forEach(rm => {
			if (rm.depth < shallowest.depth) {
				shallowest = rm;
			}
		});
		return shallowest;
	}
}
function stackedClassrooms(cRooms) {
	//COND: Check which classrooms are intersecting.
	// Return an array of all intersecting classrooms.
	if (cRooms.lenght >= 2) {
		var stacked = [];
		for (let i = 0; i < cRooms.length - 1; i++) {
			for (let j = i + 1; j < cRooms.length; j++) {
				if (cRooms[i]._intersecting(j)) {
					stacked.push(cRooms[i]);
					stacked.push(cRooms[j]);
				}
			}
		}
	}
}
window.setup = setup;
window.onload = window.setup
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
