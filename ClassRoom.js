import {Rectangle} from "./Rectangle.js"

/** 
 * @constructs
 * @param {number} x - x location on map
 * @param {number} y - y location on map
 * @param {number} h - Room height on map
 * @param {number} w - Room width  on map
*/
export class Classroom extends Rectangle{
    constructor(x,y,h,w,rm="A-01",tch="John Doe"){
        super(x,y,h,w);
        this._room=rm;
        this._teacher=tch;
    }
}