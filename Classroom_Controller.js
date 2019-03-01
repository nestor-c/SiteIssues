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
    createClassRooms(num, defaultSize, dim, coord) {
        _classes = [];
        let randX, randY;
        if (num === undefined || defaultSize === undefined) {
            throw ("Error: Num or defaultSize not specified")
        }
        if (dim === undefined && coord === undefined) {
            for (let i = 0; i < num; i++) {
                randX = Math.floor(Math.random() * WIDTH);
                randY = Math.floor(Math.random() * HEIGHT);
                _classes.push(new Rectangle(randX, randY, defaultSize, defaultSize));
            }
        } else if (dim != undefined && coord === undefined) {
            if (dim.length != num) {
                throw ("Dim array length must match num. Leave empty arrays if you don't plan on specifying all.")
            }
            for (let i = 0; i < num; i++) {
                if (dim[i].length != 0 && dim[i].length === 2) {
                    randX = Math.floor(Math.random() * WIDTH);
                    randY = Math.floor(Math.random() * HEIGHT);
                    _classes.push(new Rectangle(randX, randY, dim[i][0], dim[i][1]));
                } else if (dim[i].length != 2) {
                    throw ("Dim array: " + i + " should have length 2.[h,w]")
                }
                randX = Math.floor(Math.random() * WIDTH);
                randY = Math.floor(Math.random() * HEIGHT);
                rooms.push(new Rectangle(randX, randY, defaultSize, defaultSize))
            }
        } else if (dim === undefined && coord != undefined) {
            if (coord.length != num) {
                throw ("Coord array length must match num. Leave empty arrays if you don't plan on specifying all.")
            }
            for (let i = 0; i < num; i++) {
                if (coord[i].length != 0 && coord[i].length === 2) _classes.push(new Rectangle(coord[i][0], coord[i][1], 200, 200));
                else if (coord[i].length != 2) {
                    throw ("Coord array: " + i + " should have length 2.[x,y]")
                }
                randX = Math.floor(Math.random() * WIDTH);
                randY = Math.floor(Math.random() * HEIGHT);
                _classes.push(new Rectangle(randX, randY, defaultSize, defaultSize))
            }
        } else if (dim != undefined && coord != undefined) {
            if (coord.length != num && dim.length != num) {
                throw ("Coord && dim array length must match num. Leave empty arrays if you don't plan on specifying all.")
            }
            for (let i = 0; i < num; i++) {
                if (coord[i].length === 2 && dim[i].length === 2) _classes.push(new Rectangle(coord[i][0], coord[i][1], dim[i][0], dim[i][1]));
                else if (coord[i].length != 2 || coord[i].length != 0) {
                    throw ("Coord array: " + i + " should have length 2 or be empty.[x,y]")
                }
                randX = Math.floor(Math.random() * WIDTH);
                randY = Math.floor(Math.random() * HEIGHT);
                _classes.push(new Rectangle(randX, randY, defaultSize, defaultSize))
            }
        }
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
    
    // overlap(rect){
    //     //cube 1
    //     let lC1 = this.X;
    //     let rC1 = this.X+this.width;
    //     let tC1 = this.Y;
    //     let bC1 = this.Y+this.height;
    //     //cube 2
    //     let lC2 = rect.X;
    //     let rC2 = rect.X+rect.width;
    //     let tC2 = rect.Y;
    //     let bC2 = rect.Y+rect.height;

    //     if ((lC1 > rC2 || rC1 < lC2) || (tC1 > bC2 || bC1 < tC2)) {
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // }
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