class Rectangle{
    constructor(height, width){
		this._height = height;
        this._width = width;
	}	
    get Width(){
        return this._width;
    }
    get Height(){
        return this._height;
    }
    set Width(w){
       this._width = w;
    }
    set Height(h){
       this._height = h;
    }

}