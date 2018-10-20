class Classroom extends Rectangle{
	constructor(teacher, room, cnfP, h, w){
		super(h, w);
		this._teacher=teacher;
		this._room=room;
		// conferencePeriod
		this._cnfP=cnfp;
	}	
	
	_room = 0
	_cnfp= 0
	get teacher(){
		return this._teacher;
	}
	get room(){
		return this._room;
	}
	get conference(Period){
		return this._cnfP;
	}
	set chTeacher(newTeacher){
		this._teacher=newTeacher;
	}
	set chRoom(newRoom){
		this._room=newRoom;
	}
	set chCnfp(newCnfp){
		this._cnfp = newCnfp;
	}
}
