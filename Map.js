let cRooms = [];
const HEIGHT = 200;
const WIDTH = HEIGHT;
const OFFSET = 100;

function setup(){
    createCanvas(window.innerHeight, window.innerWidth);
    background(51);   
}

function draw(){
    cRooms.forEach(room=>{
        room.display();
    })
}

function mousePressed(){
    cRooms.push(new ClassRoom(mouseX-OFFSET, mouseY-OFFSET, HEIGHT, WIDTH));   
}



class ClassRoom{
    constructor(x, y, Height, Width){
        this._x=x;
        this._y=y;
        this._Height=Height;
        this._Width=Width;
     
    }
    
    display(){
        let white = color(255, 255, 255);
        fill(white);
        rect(this._x,this._y,this._Height, this._Width);    
    }    
    
    

  
}
