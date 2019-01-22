import {Rectangle} from "./Rectangle.js";
import {Classroom_Controller} from "./Classroom_Controller.js"
//import {handleClientLoad} from './gAPI.js'
let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const classController = new Classroom_Controller();

function setup() {
	var myCanvas = createCanvas(HEIGHT, WIDTH);
	myCanvas.parent("canvas");
	classController.createTestRectangles(100);
	//window.onload = handleClientLoad(cRooms);
}
function draw() {
	const rooms = classController.classes;
	classController.trackActive();
	let bgColor = '#b7bfcc';
	background(bgColor);
	for (let i = 0; i < rooms.length; i++) {
		if (rooms[i].active){
			let fillColor = '#ffffff';
			rooms[i].display(`Classroom ${i}`, fillColor);
		}
		else {rooms[i].display('Classroom' + i)};
		rooms[i].trackMouseOver();
		rooms[i].move();
		
		for (let j = 0; j < rooms.length; j++) {
			rooms[i].snapTogether(rooms[j]);
		}
	}
}
function mousePressed() {
	let rooms = classController.classes;
	rooms.forEach(room => {
		if (room.mouseOver) {
			room.toggleDragging();
			// If so, keep track of relative location of click to corner of rectangle
			room.offsetX = room.X - mouseX;
			room.offsetY = room.Y - mouseY;
		}
	})
}
function mouseReleased() {
	const rooms = classController.classes;
	rooms.forEach(room => {
		if (room.mouseOver) {
			room.untoggleDragging();
		}
	})
}
window.setup = setup;
//	window.onload = window.setup
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
