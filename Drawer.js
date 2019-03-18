export class Drawer{
    constructor(x,y,h,w){
        this._X = x,
        this._Y = y,
        this._Height = h,
        this._Width = w
        this._hidden=true;
        this._BTN_heightPercentOfPage= 0.03;
        this._BTN_widthPercentOfPage =0.055;
        this.DRAWER = {
            //REF: Remove magic numbers
            X: document.body.clientWidth/2,
            Y:0,
            Height: document.body.clientHeight,
            Width: document.body.clientWidth/2,
            Color:'rgb(150,200,255)',
        }
        this.BUTTON = {
            X: document.body.clientWidth/2,
            Y:0,
            Height:document.body.clientHeight*this._BTN_heightPercentOfPage,
            Width: document.body.clientWidth*this._BTN_widthPercentOfPage,
            Color:'rgb(240,240,240)',
        }
    }
    get hidden(){
        return this._hidden;
    }
    set hidden(bool){
        this._hidden=bool;
    }    
    _displayDrawer(){
        //Drawer shape
        noStroke();
        fill(this.DRAWER.Color);
        rect(this.DRAWER.X,this.DRAWER.Y,this.DRAWER.Width,this.DRAWER.Height);
    }
    _displayButton(){
         //Text Consts
         const TXT_CLR = 0;  
         const FNT_SIZE = 16;
        //Button shape
        noStroke();
        strokeWeight(1);
        fill(this.BUTTON.Color);
        rect(this.BUTTON.X,this.BUTTON.Y,this.BUTTON.Width,FNT_SIZE);
        // Button Text
        fill(TXT_CLR).
        textSize(FNT_SIZE).
        text('CLOSE',this.BUTTON.X,this.BUTTON.Y,this.BUTTON.Width,this.BUTTON.Height).
        noStroke();
           
    }
    _displayInformation(data=""){
        const tS= 12;
        const info = data;
        textSize(tS);
        text(info,this.BUTTON.X, this.BUTTON.Height + textSize(),this.DRAWER.Width,this.DRAWER.Height);
    }
    close(){
        if((mouseX >=this.BUTTON.X && mouseX <= this.BUTTON.X+this.BUTTON.Width)
            && (mouseY >= this.BUTTON.Y && mouseY <= this.BUTTON.Y+this.BUTTON.Height))
            this.hidden = true;
    }  
  
    display(data){
        this._displayDrawer();
        this._displayButton();
        this._displayInformation(data);
    }

    addText(words){
        const X = this.BUTTON.X;
        const Y = this.BUTTON.Height + textSize();
        text(words, X, Y);
    }


}