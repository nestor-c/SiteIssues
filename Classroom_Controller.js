import { Rectangle } from "./Rectangle.js";

export class Classroom_Controller {
    constructor() {
        this._classes = [];
        this._active = [];
    }
    get classes(){
        return this._classes;
    }
    //TODO: function to check if one rectangle collides with another in realtime.
    //This function may need to be added to sketch.draw to make this happen

    //TODO: Method keeping track of squares location.

    //TODO: Function that keeps track of currently clicked reactangle and keeps its 
    //       location relative to other rectangles.
    
    /**
     * There should always be an active rectangle. If the user isn't clicking
     * on a rectangle just yet then make the last active rectangle the current
     * active. Otherwise the last rectangle created is the active. 
     */
    activeClassroom(){
        for(let i=0; i<this.classes;i++){
            if (i === this.classes.length-1){
                active.push(true);
            }
            active.push(false);
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
                _classes.push(new Rectangle(randX, randY, defaultSize, defaultSize))
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
     * TEST:  Setup two rectangles for testing. One at
     * {200,200} and another at {300, 300} with given size;
     */
    createTestRectangles(size) {
        this._classes.push(new Rectangle(200, 200, size, size));
        this._classes.push(new Rectangle(300, 300, size, size));
    }
}