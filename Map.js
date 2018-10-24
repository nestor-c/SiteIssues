let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup(){
    createCanvas(HEIGHT, WIDTH);
    let button = createButton('ADD');   
    button.position(50,100);
    button.mousePressed(()=>{
        cRooms.push(new ClassRoom(50, 50, 100, 100))
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
            room.untoggleDragging();
        }
    })
}
function draw(){
    background(51)
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
    //getters
    get X(){return this._X;}
    get Y(){return this._Y;}
    get width(){return this._Width;}
    get height(){return this._Height;}
    //setters
    set X(x){ this._X=x;}
    set Y(y){ this._Y=y;}
    set width(w){ this._Width=w;}
    set height(h){ this._Height=h;}
    
    intersection(c1, c2){
        //cube 1
        let lC1 = c1.X;
        let rC1 = c1.X+c1.width;
        let tC1 = c1.Y;
        let bC1 = c1.Y+c1.height;
        //cube 2
        let lC2 = c2.X;
        let rC2 = c2.X+c2.width;
        let tC2 = c2.Y;
        let bC2 = c2.Y+c2.height;

        if ((lC1 > rC2 || rC2 < lC2) || (tC1 > bC2 || bC2 < tC2)) {
            return false;
        }
        else{
            return true;
        }
    }
    move(){
        if (this.dragging) {
            this._X = mouseX + this._offsetX;
            this._Y = mouseY + this._offsetY;
          }
    }   
    toggleDragging(){
        this.dragging = true;
    }
    untoggleDragging(){
        this.dragging = false;
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
