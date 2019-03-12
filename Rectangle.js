/**
 * @constructor 
 * @param {num} gX - X coordinate
 * @param {num} gY - Y coordinate
 * @param {num} gHeight - Height
 * @param {num} gWidth - Width
 */
export class Rectangle{
    constructor(gX, gY, gHeight, gWidth){
        this._X=gX;
        this._Y=gY;
        this._Height=gHeight;
        this._Width=gWidth;
        this.mouseOver = false;
        this._dragging = false;
        this._offsetX = 0;
        this._offsetY = 0;
        this._active=false;
    }
    //getters
    get X(){return this._X;}
    get Y(){return this._Y;}
    get width(){return this._Width;}
    get height(){return this._Height;}
    get offsetX(){return this._offsetX;}
    get offsetY(){return this._offsetY;}
    get active(){return this._active;}
    get dragging(){return this._dragging;}
    
    //setters
    set X(x){ this._X=x;}
    set Y(y){ this._Y=y;}
    set width(w){ this._Width=w;}
    set height(h){ this._Height=h;}
    set offsetX(x){this._offsetX=x;}
    set offsetY(y){this._offsetY=y;}
    set active(bool){this._active=bool;}
    set dragging(bool){this._dragging=bool;}
    //====================
 
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
    toggleDragging(){
        this.dragging = true;
    }
    trackMouseOver(){
        if((mouseX >= this._X && mouseX <= this._X + this._Width) && (mouseY >= this._Y && mouseY <= this._Y + this._Height)){
            this.mouseOver = true;           
        }
        else{
            this.mouseOver = false;
        }
    }
    display(name){
        //Rectangle Color
        const dfColor= "#e3e5e8"
        const activeColor= "#FFFFFF"
        //Rectangle Stroke Weight
        const dfStroke= 1;
        const activeStroke= 3;
        //Rectangle Stroke Color
        const dStrColor = "#000000"
        const aStrColor = "#FF0000"
        //Text Color
        const txtClr= "rgb(180, 200, 25)";
        //Info Button
        const infoClr ="rgb(0, 200, 200)"
        const fontSize = 13;
        
        if (this.active){
            stroke(aStrColor);
            fill(activeColor);
            strokeWeight(activeStroke);
        }
        else{
         fill(dfColor); 
         strokeWeight(dfStroke); 
         stroke(dStrColor);
        }
        rect(this._X,this._Y,this._Height, this._Width);
        //Text Color & text stroke
        noStroke();
        fill(txtClr);
        textSize(fontSize);
        text(name,this._X + 20 , this._Y + 20)
     }

}