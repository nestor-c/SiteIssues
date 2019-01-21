
export class Rectangle{
    constructor(gX, gY, gHeight, gWidth){
        this._X=gX;
        this._Y=gY;
        this._Height=gHeight;
        this._Width=gWidth;
        this.mouseOver = false;
        this.dragging = false;
        this._offsetX = 0;
        this._offsetY = 0;
        this._active=false;
        this.overlapping=[];
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
    //====================
    overlap(c2){
        let corner = {X:this.X + this.width, Y:this.Y+this.height}
        let dist_Corner = dist(this.X,this.Y,corner.X, corner.Y)
        let d = dist(this.X,this.Y,c2.X,c2.Y);
    
        if ((this.X === c2.X || this.Y === c2.Y) && d <= this.width){
            console.log(`Overlapping one`);
        }
        else if (this.X != c2.X && this.Y != c2.Y && d <= dist_Corner){
            console.log('Overlapping two')
        }
        else    console.log("False");
    }
	_intersection(c2){
        //cube 1
        let lC1 = this.X;
        let rC1 = this.X+this.width;
        let tC1 = this.Y;
        let bC1 = this.Y+this.height;
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
    snapTogether(c2){
        //Four sides of calling classroom
        let l = this.X;
        let r = this.X + this.width;
        let t = this.Y;
        let b = this.Y + this.height;
        //Four sides of target classroom
        let l2 = c2.X;
        let r2 = c2.X+c2.width;
        let t2 = c2.Y;
        let b2 = c2.Y+c2.height;

        //First condition
        let lr2_Diff = Math.abs(l-r2);
        let rl2_Diff = Math.abs(r - l2);
        let tb2_Diff = Math.abs(t-b2);
        let bt2_Diff = Math.abs(b-t2);
        //Second condition
        let tt2_Diff = Math.abs(t-t2)
        let ll2_Diff = Math.abs(l-l2)
        
        let threshold = 30;

        if(this.dragging){                  
            if    (lr2_Diff < threshold && tt2_Diff < threshold){ 
                this.X = r2; 
                this.Y=t2;
            }
            else if(rl2_Diff < threshold && tt2_Diff< threshold){ 
                this.X = l2 - c2.width; 
                this.Y=t2;
            }
            else if(tb2_Diff < threshold && ll2_Diff < threshold){ 
                this.Y = b2; 
                this.X=l2
            }
            else if(bt2_Diff < threshold && ll2_Diff < threshold){ 
                this.Y = t2 - c2.height;
                this.X = l2
             }    
        }
    }
    move(){
        if (this.dragging) {
            this.X = mouseX + this._offsetX;
            this.Y = mouseY + this._offsetY;
          }
    }   
    toggleDragging(){
        this.dragging = true;
    }
    untoggleDragging(){
        this.dragging = false;
    }
    checkAndToggleMouseOver(){
        if((mouseX >= this._X && mouseX <= this._X + this._Width) && (mouseY >= this._Y && mouseY <= this._Y + this._Height)){
            this.mouseOver = true;           
        }
        else{
            this.mouseOver = false;
        }
    }
    display(name){
        let white = color(255, 255, 255);
        fill(white);
        strokeWeight(1);
        rect(this._X,this._Y,this._Height, this._Width);    
        fill(180, 200, 25);
        text(name,this._X + 20 , this._Y + 20)
    }
}