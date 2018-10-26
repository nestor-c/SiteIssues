let cRooms = [];
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function setup(){
    createCanvas(HEIGHT, WIDTH);
    let button = createButton('ADD');   
    button.position(25,25,100);
    button.mousePressed(()=>{
        cRooms.push(new ClassRoom(50, 50, 100, 100));
    })  
}
function mousePressed(){   
    cRooms.forEach(room=>{
        if (room.mouseOver) {
            room.toggleDragging();
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
    for(let i=0; i < cRooms.length;i++){
        cRooms[i].display();
        cRooms[i].toggleMouseOver();
        cRooms[i].move();    
        if (cRooms.length >= 2){
            for(let j=i+1;j<=cRooms.length-1;j++)
            { 
                let check = cRooms[i].intersection(cRooms[i],cRooms[j]);
                //if (check){}
            }
        }
    }
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
    get offsetX(){return this._offsetX;}
    get offsetY(){return this._offsetY;}
    //setters
    set X(x){ this._X=x;}
    set Y(y){ this._Y=y;}
    set width(w){ this._Width=w;}
    set height(h){ this._Height=h;}
    set offsetX(x){this._offsetX=x;}
    set offsetY(y){this._offsetY=y;}


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

        if ((lC1 > rC2 || rC1 < lC2) || (tC1 > bC2 || bC1 < tC2)) {
            return false;
        }
        else{
            return true;
        }
    }
    snapTogether(c1, c2){
        let c1_Divided={
            //Top
            lT:{x: c1.X, y: c1.Y},
            mT:{x: c1.X+c1.width/2, y:c1.Y},
            rT:{x: c1.X+c1.width, y:c1.Y},
            //Middle
            lM:{x:c1.X, y:c1.Y+c1.height/2},
            mM:{x:c1.X+c1.width/2, y:c1.Y+c1.height/2},
            rM:{x:c1.X+c1.width, y:c1.Y+c1.height/2},
            //Bottom
            lB:{x:c1.X,y:c1.Y+c1.height},
            mB:{x:c1.X+c1.width/2,y:c1.Y+c1.height},
            rB:{x:c1.X+c1.width,y:c1.Y+c1.height}
        }
        let c2_Divided={
            //Top
            lT:{x: c2.X, y: c2.Y},
            mT:{x: c2.X+c2.width/2, y:c2.Y},
            rT:{x: c2.X+c2.width, y:c2.Y},
            //Middle
            lM:{x:c2.X, y:c2.Y+c2.height/2},
            mM:{x:c2.X+c2.width/2, y:c2.Y+c2.height/2},
            rM:{x:c2.X+c2.width, y:c2.Y+c2.height/2},
            //Bottom
            lB:{x:c2.X,y:c2.Y+c2.height},
            mB:{x:c2.X+c2.width/2,y:c2.Y+c2.height},
            rB:{x:c2.X+c2.width,y:c2.Y+c2.height}
        }
        j
        
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
        strokeWeight(4)
        rect(this._X,this._Y,this._Height, this._Width);    
        text( 'Classroom',this._X, this._Y,)
    }     
}
