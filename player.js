import {Card} from './card.js';
import {Troop} from './troop.js';

const Player = function(game/*deck*/){
	this.game = game;
	this.playable = [new Card(),new Card(),new Card(),new Card()];
	this.rest = [new Card(),new Card(),new Card(),new Card()];
	this.money = 0;
	this.selectedCard = -1;
	this.selectCard = function(i){
		if(this.playable[i]){
			this.selectedCard = i;
		}
	}
	this.playCard = function(x,y){
		if(this.playable[this.selectedCard]){
			let played = this.playable[this.selectedCard];
			this.playable[this.selectedCard] = this.rest.shift();
			this.rest.push(played);
			this.selectedCard = -1;
			this.game.entities.push(new Troop(x,y,played.color));
		}
	};
}

export {Player};

