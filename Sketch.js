import { Rectangle } from "./Rectangle.js";

// import {handleClientLoad} from './gAPI.js'
//TODO: Make an easy to implement classroom creator
let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup() {
	var myCanvas = createCanvas(HEIGHT, WIDTH);
	myCanvas.parent("canvas");
	
	cRooms = createClassRooms(4);
	// window.onload = handleClientLoad(cRooms);
}

/**
 * @param {num} num The number of classrooms to create;
 * @param {[[h,w],...]} dim Specify dimensions for classrooms via a 2D array.
 * @example dim - [[200,200][300,300]]
 * @param {[[x,y],...]} coord Specifies coordinates for classrooms via a 2D array.
 * @example coord - [[300,200][500,300]]
 */
function createClassRooms(num,defaultSize,dim,coord){
	if (num === undefined){
		console.log("Error: num not specified")
		return -1;
	}
	let rooms = [];
	let randX, randY;
	if (dim === undefined && coord === undefined){
		for(let i=0;i < num; i++){
			randX=Math.floor(Math.random() * WIDTH);
			randY=Math.floor(Math.random() * HEIGHT);
			rooms.push(new Rectangle(randX,randY,defaultSize,defaultSize))
		}
	} 
	else if (dim != undefined && coord === undefined) {
		if (dim.length != num){
			throw("Dim array length must match num. Leave empty arrays if you don't plan on specifying all.")
		}
		for (let i=0; i<num; i++){
			if (dim[i].length != 0 && dim[i].length === 2){ 
				randX=Math.floor(Math.random() * WIDTH);
				randY=Math.floor(Math.random() * HEIGHT);
				rooms.push(new Rectangle(randX,randY,dim[i][0],dim[i][1]));
			}
			else if (dim[i].length != 2){
				throw("Dim array: "+ i +" should have length 2.[h,w]")
			}
			randX=Math.floor(Math.random() * WIDTH);
			randY=Math.floor(Math.random() * HEIGHT);
			rooms.push(new Rectangle(randX,randY,defaultSize,defaultSize))
		}
	}
	else if (dim === undefined && coord != undefined) {
		if (coord.length != num){
			throw("Coord array length must match num. Leave empty arrays if you don't plan on specifying all.")
		}
		for (let i=0; i<num; i++){
			if (coord[i].length != 0 && coord[i].length === 2) rooms.push(new Rectangle(coord[i][0],coord[i][1],200,200));
			else if (coord[i].length != 2){
				throw("Coord array: "+ i +" should have length 2.[x,y]")
			}
			randX=Math.floor(Math.random() * WIDTH);
			randY=Math.floor(Math.random() * HEIGHT);
			rooms.push(new Rectangle(randX,randY,200,200))
		}
	}
	else if (dim != undefined && coord != undefined){
		if (coord.length != num && dim.length != num){
			throw("Coord && dim array length must match num. Leave empty arrays if you don't plan on specifying all.")
		}
		for (let i=0; i<num; i++){
			if (coord[i].length === 2 && dim[i].length === 2) rooms.push(new Rectangle(coord[i][0],coord[i][1],dim[i][0],dim[i][1]));
			else if (coord[i].length != 2 || coord[i].length != 0){
				throw("Coord array: "+ i +" should have length 2 or be empty.[x,y]")
			}
			randX=Math.floor(Math.random() * WIDTH);
			randY=Math.floor(Math.random() * HEIGHT);
			rooms.push(new Rectangle(randX,randY,200,200))
		}
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
		for (let j = 0; j < cRooms.length; j++) {
			cRooms[i].snapTogether(cRooms[j]);
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
