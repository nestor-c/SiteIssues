import {Classroom_Controller} from "./Classroom_Controller.js"
//import {handleClientLoad} from './gAPI.js'
let cRooms = [];
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const classController = new Classroom_Controller();

function setup() {
	var myCanvas = createCanvas(WIDTH, HEIGHT);
	myCanvas.parent("canvas");
	classController.createTestRectangles(100);
	//window.onload = handleClientLoad(cRooms);
}
function draw() {
	const rooms = classController.classes;
	let bgColor = '#b7bfcc';
	background(bgColor);	
	for (let i = 0; i < rooms.length; i++) {
		classController.trackActive(rooms[i]);
		rooms[i].display(`Classroom ${i}`);
		rooms[i].trackMouseOver();
		classController.move(rooms[i]);
		for (let j = 0; j < rooms.length; j++) {
			rooms[i].snapTogether(rooms[j]);
		}
	}
}
function mousePressed(){
	let rooms = classController.classes;
	for (let i=0; i<rooms.length;i++){
		if (rooms[i].mouseOver) {
			rooms[i].dragging=true;
			cursor('grab'); 
			// If so, keep track of relative location of click to corner of rectangle
			rooms[i].offsetX = rooms[i].X - mouseX;
			rooms[i].offsetY = rooms[i].Y - mouseY;
			select('#drawer').style("visibility", 'visible');
		}
	}
}
function mouseReleased() {
	const rooms = classController.classes;
	for (let i =0; i<rooms.length;i++){
		if (rooms[i].mouseOver && rooms[i].dragging){
			rooms[i].dragging=false;
			cursor('auto');
			// select('#drawer').style("visibility", 'hidden');
		}		
	}
}

window.setup = setup;
//	window.onload = window.setup
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
