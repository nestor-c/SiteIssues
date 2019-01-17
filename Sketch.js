import { Rectangle } from "./Rectangle.js";

// import {handleClientLoad} from './gAPI.js'
//TODO: Make an easy to implement classroom creator
let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup() {
	var myCanvas = createCanvas(HEIGHT, WIDTH);
	myCanvas.parent("canvas");
	
	cRooms = createClassRooms(5);
	// window.onload = handleClientLoad(cRooms);
}

/**
 * 
 * @param {num} num The number of classrooms to create;
 * @param {*} param1 You can designate the height and width for a few or all classrooms. 
 * @param {*} param2 You can designate the location for a few or all classrooms.
 */
function createClassRooms(num,dim,coord){
	if (dim != null && coord != null && num != null){
		let rooms = [];
		let randX= Math.floor(Math.random() * WIDTH);
		let randY= Math.floor(Math.random() * HEIGHT);
		for(let i=0;i < num; i++){
			rooms.push(new Rectangle(randX,randY,200,200))
		}
	} else if (dim != null || coord){

	}

	return rooms;
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

window.setup = setup;
window.onload = window.setup
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
