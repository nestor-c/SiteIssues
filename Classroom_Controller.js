import {
    Rectangle
} from "./Rectangle.js";

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
    set lastActive(rectangle) {
        this._lastActive = rectangle;
    }
    set classes(rectangle) {
        this._classes.push(rectangle)
    }
    set cLength(newLength) {
        this._cLength = newLength;
    }
    updateLength(){
        this._cLength = this.classes.length;
    }

    //TODO: function to check if one rectangle collides with another in realtime.
    //This function may need to be added to sketch.draw to make this happen

    //TODO: Method keeping track of squares location.

    //TODO: Function that keeps track of currently clicked reactangle and keeps its 
    //       location relative to other rectangles. 

    /**
     *  Active classrooms are those created last or those last clicked on. 
     * @returns void
     */
    trackActive(rectangle) {
        if (rectangle.dragging && this.lastActive != rectangle) {
            rectangle.active = true;
            if (this.lastActive != null){
                this.lastActive.active = false;
            }
            this.lastActive = rectangle;
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
     * @param {number} size - Default size of rectangles
     * Setup two rectangles for testing. One at
     * {200,200} and another at {300, 300} with given size;
     */
    createTestRectangles(size) {
        this.classes = new Rectangle(200, 200, size, size);
        this.classes = new Rectangle(300, 300, size, size);
        this.updateLength();
        this.lastActive = this.classes[this.cLength - 1];
        this.classes[this.cLength - 1].active = true;
    }
   /* preventOverlap(rectangle){
        //TODO:figure out a way to check this rectangles position with that of others

        if (overlapping){
            get back to spot they were before they were grabbed
        }
    } */
}