let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup(){
    createCanvas(HEIGHT, WIDTH);
    background(51);   
    let button = createButton('ADD');   
    button.position(50,100);
    button.mousePressed(()=>{
        cRooms.push(new ClassRoom(random(HEIGHT)/4,random(WIDTH), 100, 100))
    })  
}

function mousePressed(){   
    cRooms.forEach(room=>{
        if (room.mouseOver) {
            room.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            room.offsetX = room._X-mouseX;
            room.offsetY = room._Y-mouseY;
        }
    }) 
}

function mouseReleased(){
    cRooms.forEach(room=>{
        if (room.mouseOver){
            room.dragging = false;
        }
    })
}

function draw(){
    cRooms.forEach(room=>{
        room.display();
        room.toggleMouseOver();
        room.move();    
    })
}


class ClassRoom{
    constructor(gX, gY, gHeight, gWidth){
        this._X=gX;
        this._Y=gY;
        this._Height=gHeight;
        this._Width=gWidth;
        this.mouseOver = false;
        this.dragging = false;
        this._offsetX = 0;
        this._offsetY = 0;
    }
    move(){
        if (this.dragging) {
            this._X = mouseX + this._offsetX;
            this._Y = mouseY + this._offsetY;
          }
    }
    
    toggleMouseOver(){
        if((mouseX >= this._X && mouseX <= this._X + this._Width) && (mouseY >= this._Y && mouseY <= this._Y + this._Height)){
            this.mouseOver = true;           
        }
        else{
            this.mouseOver = false;
        }
    }
    display(){
        let white = color(255, 255, 255);
        fill(white);
        rect(this._X,this._Y,this._Height, this._Width);    
    }     
}
