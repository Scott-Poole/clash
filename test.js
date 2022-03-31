import {astar,Graph} from './astar.js';

var graphDiagonal = new Graph([
		[1,0,1,1],
		[1,0,1,0],
		[0,1,1,1]
	], { diagonal: true });
	
var start = graphDiagonal.grid[0][0];
	var end = graphDiagonal.grid[1][2];
	var resultWithDiagonals = astar.search(graphDiagonal, start, end, { heuristic: astar.heuristics.diagonal });
			
let r = astar.search(graphDiagonal, start, end);

console.log(r);