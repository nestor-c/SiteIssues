const Classroom ={
	constructor(teacher, room, cnfP){
		this._teacher=teacher;
		this._room=room;
		this._cnfP=cnfp;
	}	
	_room = 0,
	_cnfp= 0,
	get teacher(){
		return this._teacher;
	}
	get room(){
		return this._room;
	}
	get conference(Period){
		return this._cnfP;
	}
	set teacher(newTeacher){
		this._teacher=newTeacher;
	}
	set chCnf(){
		this._teacher=newTeacher;
	}

}
