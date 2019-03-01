import {Rectangle} from "./Rectangle.js"

/** 
 * @constructs
 * @param {string}
 * @param {string}
 
 * @param {number} x - x location on map
 * @param {string} y - y location on map
 * @param {string} h - Room height on map
 * @param {string} w - Room width on map
*/
export class Classroom extends Rectangle{
    constructor(x,y,h,w,rm,tch,){
        super(x,y,h,w);
        this._room=rm;
        this._teacher=tch;
    }
}