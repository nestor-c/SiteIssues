import {Classroom_Controller} from "./Classroom_Controller.js"
import {Drawer} from "./Drawer.js"
//import {handleClientLoad} from './gAPI.js'

export const WINDOWHEIGHT = window.innerHeight;
export const WINDOWWIDTH = window.innerWidth;
export const DOCHEIGHT = document.body.clientHeight;
export const DOCWIDTH = document.body.clientWidth;
export const classController = new Classroom_Controller();

const DRAWER =  new Drawer(1,2,3,4);

function setup() {
	const myCanvas = createCanvas(WINDOWWIDTH, WINDOWHEIGHT);
	myCanvas.id('canvas');
	myCanvas.parent('body');
	classController.createTestRectangles(100);
	DRAWER.addText('test',DRAWER.BUTTON.Height+textSize());
	// window.onload = handleClientLoad(classController);
}
function draw() {
	const rooms = classController.classes;
	const BG_COLOR = '#b7bfcc';
	background(BG_COLOR);
	
	if (!DRAWER.hidden){
		DRAWER.display();
	}
	for (let i = 0; i < rooms.length; i++) {
		classController.trackActive(rooms[i]);
		rooms[i].display(`Classroom ${i}`);
		rooms[i].trackMouseOver();
		classController.move(rooms[i]);
		//See if you can get rid of this. This is making it n^2 time complexity.
		for (let j = 0; j < rooms.length; j++) {
			rooms[i].snapTogether(rooms[j]);
		}
	}
}
//CANVAS EVENTS
function mousePressed(){
	let rooms = classController.classes;
	DRAWER.close();
	for (let i=0; i<rooms.length;i++){
		if (rooms[i].mouseOver) {
			rooms[i].dragging=true;
			cursor('grab'); 
			// If so, keep track of relative location of click to corner of rectangle
			rooms[i].offsetX = rooms[i].X - mouseX;
			rooms[i].offsetY = rooms[i].Y - mouseY;

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
function doubleClicked(){
	const ROOMS = classController.classes;
	for(let room of ROOMS){
		if (room.mouseOver){
			DRAWER.hidden = false;
		}
	}
}
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.doubleClicked = doubleClicked;
window.mouseReleased = mouseReleased;
