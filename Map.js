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
                if (check){
                    cRooms[i].snapTogether(cRooms[j]);
                }
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


  /*   intersection(c1, c2){
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
    } */
    
    //Do it without the items intersecting
    snapTogether(c2){
       

      
    }
    
    /* checkFourCorners(){
        //check if Top left corner is in any of the four quadrants
        let checkQ1= this.inQuadrant(dC1.q1.lT, dC2.q1);
        let checkQ2= this.inQuadrant(dC1.q1.lT, dC2.q2);
        let checkQ3= this.inQuadrant(dC1.q1.lT, dC2.q3);
        let checkQ4= this.inQuadrant(dC1.q1.lT, dC2.q4);

        if (checkQ1){
           this.X = c2.X+c2.width; 
        }
        else if (checkQ2){

        }
        else if (checkQ3){

        }
        else if (checkQ4){

        }
    } 
    

     _divide(c){
        //divides the given classroom into fourths as follows:
           
        lT___mT____rT
        |    |     |
        lM___mM____rM
        |    |     |
        lB___mB____rB   
        
        return {
            lT:{x: c.X, y: c.Y},
            mT:{x: c.X+c.width/2, y:c.Y},
            rT:{x: c.X+c.width, y:c.Y},
            //Middle
            lM:{x:c.X, y:c.Y+c.height/2},
            mM:{x:c.X+c.width/2, y:c.Y+c.height/2},
            rM:{x:c.X+c.width, y:c.Y+c.height/2},
            //Bottom
            lB:{x:c.X,y:c.Y+c.height},
            mB:{x:c.X+c.width/2,y:c.Y+c.height},
            rB:{x:c.X+c.width,y:c.Y+c.height}
        }
    } 

    fourQuadrants(c){
         /*   
       ___  ____
      | q2 | q1  |
      |____ _____|
      | q3 | q4  |
      |____ _____|   
    

        let dC = this._divide(c);

        return {
             q1: [dC.mT,dC.rT,dC.mM,dC.rM],
             q2: [dC.lT,dC.mT,dC.lM,dC.mM],
             q3: [dC.rM,dC.mM,dC.lB,dC.mB],
             q4: [dC.mM,dC.rM,dC.mB,dC.lB]
        }
    }  
    inQuadrant(corner, quad){
        //quad contains the coordinates for the four corners of a given quadrant
        //The order is tL=[0], tR =[1], bL=[2], bR=[3]
        if ((corner.x >= quad[0].x && corner.x < quad[1].x) && (corner.y >= quad[0].y && corner.y <= quad[2].y)){
            return true;
        }
        else return false;
    }
*/
    
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
