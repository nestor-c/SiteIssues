import {Classroom_Controller} from "./Classroom_Controller.js"
import {handleClientLoad} from './gAPI.js'

export const HEIGHT = window.innerHeight;
export const WIDTH = window.innerWidth;
export const classController = new Classroom_Controller();

function setup() {
	const myCanvas = createCanvas(WIDTH, HEIGHT);
	myCanvas.parent("canvas");
	const addInfo = createButton('Add Info');
	addInfo.style('position','relative').style('left','0%').style('top','20%');
	
	addInfo.mousePressed(classController.addInfo);
	addInfo.parent('#drawer');
	//classController.createTestRectangles(100);
	window.onload = handleClientLoad(classController);
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
			select('#drawer').style('left', '50%').style('transition','.4s');
		}
	}
	
}
function mouseReleased() {
	const rooms = classController.classes;
	for (let i =0; i<rooms.length;i++){
		if (rooms[i].mouseOver && rooms[i].dragging){
			rooms[i].dragging=false;
			cursor('auto');
		}		
	}
}
document.getElementById('drawer').addEventListener('click',function(){
	this.style.left = '150%';
	this.style.transition = '.7s';	
})
window.setup = setup;
//	window.onload = window.setup
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
