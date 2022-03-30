import {Unit} from './unit.js';

const width = 1;
const height = 1;

class Unit extends Entity{
	constructor(x,y,color){
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
		this.color = color;
		this.isStatic = false;
	}
	
	update(){
		//move random
		//this.x += Math.random() - Math.random();
		//this.y += Math.random() - Math.random();
	}
}

export {Unit};