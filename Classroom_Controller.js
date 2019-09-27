import {
    Classroom
} from "./Classroom.js";

export class Classroom_Controller {
    constructor() {
        this._classes = [];
        this._cLength = this._classes.length;
        this._lastActive = null;
    }
    //getters
    get classes() {
        return this._classes;
    }
    get cLength() {
        return this._cLength;
    }
    get lastActive() {
        return this._lastActive
    }
    //setters
    set lastActive(room) {
        this._lastActive = room;
    }
    set classes(room) {
        this._classes.push(room)
    }
    set cLength(newLength) {
        this._cLength = newLength;
    }
    updateLength(){
        this._cLength = this.classes.length;
    }
    /**
     *  Active classrooms are those created last or those last clicked on. 
     * @returns void
     */
    trackActive(room) {
        if (room.dragging && this.lastActive != room) {
            room.active = true;
            if (this.lastActive != null){
                this.lastActive.active = false;
            }
            this.lastActive = room;
        }
    }
    /**
     * @param {Classroom} room - move the room that's being dragged
     */
    move(room){
        if (room.dragging) {
            room.X = mouseX + room._offsetX;
            room.Y = mouseY + room._offsetY;
          }
    } 
    /**
     * @param {!number} num - The number of classrooms to create;
     * @param {!number} defaultSize - The default size of the Rectangle.
     * @param {[[number, number]]} [dim] - Specify dimensions for classrooms via a 2D array.
     * @param {[[number, number]]} [coord] - Specifies coordinates for classrooms via a 2D array.
     */
    //REF: Create a function that adds new classrooms without 
    //overlapping them and to fit within the constraints of the canvas.
    createClassRooms(qty, defaultSize) {
        
    }
    /** 
     * @param {number} size - Default size of rooms
     * Setup two rooms for testing. One at
     * {200,200} and another at {300, 300} with given size;
     */
    createTestRectangles(size) {
        const WIDTH = window.width/2;
        const HEIGHT = window.height;
        this.classes = new Classroom(WIDTH/5,HEIGHT/5, size, size,"Jones");
        this.classes = new Classroom(WIDTH/5*2.5,HEIGHT/5*2.5, size, size,"Kirk");
        this.updateLength();
        this.lastActive = this.classes[this.cLength - 1];
        this.classes[this.cLength - 1].active = true;
    }

    overlap(){
      for(let i=0;i<this.classes.length;i++){

      }
    }
   /* preventOverlap(rectangle){
        //TODO:figure out a way to check this rectangles position with that of others

        if (overlapping){
            rectangle.offsetX = 0;
            rectangle.offsetY = 0;
        }
    } */
	testOverlap(cls1, cls2){
        //cube 1
        let lC1 = cls1.X;
        let rC1 = cls1.X+cls1.width;
        let tC1 = cls1.Y;
        let bC1 = cls1.Y+cls1.height;
        //cube 2
        let lC2 = cls2.X;
        let rC2 = cls2.X+cls2.width;
        let tC2 = cls2.Y;
        let bC2 = cls2.Y+cls2.height;

        if ((lC1 > rC2 || rC1 < lC2) || (tC1 > bC2 || bC1 < tC2)) {
            return false;
        }
        else{
            return true;
        }
    }
    
}   