export { minimax }
import { getDomElements, players, gameBoard, winningLines, gameObject, whoseMove,  } from './app9.js';

const minimax = {
	startMinMax: (arr)=>{
console.log(arr)
console.log(typeof arr)

// human
var huPlayer = players.player1.mark;
// ai
var aiPlayer = players.cpu.mark;

// this is the board flattened and filled with some values to easier asses the Artificial Inteligence.
var origBoard = arr //[0, 'O', 'X', 'O', 'O', 5, 6, 'X', 8]//["O",1 ,"X","X",4 ,"X", 6 ,"O","O"]; 
//var origBoard = [0,1 ,2,3,4 ,5, 6 ,7,8];

//keeps count of function calls
var fc = 0;

// finding the ultimate play on the game that favors the computer
var bestSpot = minimax(origBoard, aiPlayer);

//loging the results
console.log("index: " + bestSpot.index);
console.log("function calls: " + fc);
console.log(bestSpot)
//return index of bestSpot to cpuMiniMaxMoves();
gameObject.cpuMiniMaxMoves(bestSpot.index)

// the main minimax function
function minimax(newBoard, player){
  //add one to function calls
  fc++;
  
  //available spots
  var availSpots = emptyIndexies(newBoard);
  
  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth

  return moves[bestMove];
}

// returns the available spots on the board
function emptyIndexies(board){
  return  board.filter(s => s !== 'X' && s != 'O');
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}
	},
}

/****************************************************************** 
const minimax = {
	funcCalls: 0,
	scorePlayer: 0,
	scoreCPU: 0,
	tie: 0,

	score: {
		'X' : 1,
		'O' : -1,
		draw: 0,
	}, 
	//check state of the board
	state: (arr)=>{
	
		const allAvailableSpaces = [];
		// loop through board and show all available spaces, minimax.state() is only called from cpuMoves as cpu is always the last player to move
		const loopedSpaces = arr.forEach(item => {
			if(item.textContent === ''){
				console.log(item);
				allAvailableSpaces.push(item);
			}
			// console.log(item)
		});
		minimax.lookForWinningCombos()
		console.log(allAvailableSpaces);
		// minimax.minMaxFunc(allAvailableSpaces);
		minimax.bestSpot(allAvailableSpaces);

	},
	bestSpot: (arr)=>{
		let firstMove = arr;
		if(getDomElements.nextMove.textContent === `${players.cpu.name} to move`){
			firstMove[0].textContent = players.cpu.mark;
		}
		// return minimaxFunction(originalBoard, aiPlayer).index;
	
		
	},
	minimaxFunction: (newBoard, player)=>{
		let availableSpots = newBoard;
		console.log(availableSpots)
		console.log(player)
		if(availableSpots[0])
	},

	// bestMoveCPU: (board)=>{
	// 	//loop through board and find empty spts where cpu could move
	// 	let bestMove;
	// 	let nextMove = []
	// 	let score;
	// 	let bestScore = 100;
	// 	for(let i=0; i<board.length; i++){
	// 		if(board[i].textContent === ''){
	// 			console.log(board[i])
	// 			nextMove.push(board[i])
	// 			score = minimax.minMaxAI(board)
	// 			if(score > bestScore){
	// 				bestScore = score;
	// 				bestMove = {i}
	// 			}
	// 		}
	// 	}
	// 	console.log(nextMove)
	// 	console.log(bestMove)
	// 	nextMove[bestMove.i].textContent = players.cpu.mark; 
	// },
	lookForWinningCombos: ()=>{
		let winX = 'XXX';
		let winO = 'OOO';

		let score = {};
		
		for(let win in winningLines){
			console.log(winningLines[win]);

			if(winningLines[win].join('') === winX ){
				if(players.player1.mark === 'X'){
					console.log('player1 is winner')
					return minimax.minimaxFunction(winningLines[win], players.player1.name);
				}else{
					console.log('cpu is winner')
					return minimax.minimaxFunction(winningLines[win], players.cpu.name);
				}
			}else if(winningLines[win].join('') === winO){
				if(players.player1.mark === 'O'){
					console.log('player1 is winner')
					return minimax.minimaxFunction(winningLines[win], players.player1.name);
				}else{
					console.log('cpu is winner')
					return minimax.minimaxFunction(winningLines[win], players.cpu.name);
				}
			}//else{
				//return minimax.minimaxFunction(winningLines[win], players.cpu.name)
			//}
		 }
	},
	
	minMaxFunc: (arr, player)=>{
		let fil = arr.filter(s=> s!==players.player1.mark && s!== players.cpu.mark);
		console.log(fil)
		
		minimax.funcCalls++;
		
		// const playerOneMiniMax = players.player1.mark;
		// const cpuAI = players.cpu.mark;
		let originalBoard = gameBoard.board;
		let availableSpaces = arr;
		const moves = [];
		// console.log(availableSpaces)
		console.log(availableSpaces, player)
		

		//loop through empty spaces
		let move = {};
		for(let i=0; i<availableSpaces.length; i++){
			//create object and store store the index of the empty space
			
			move[i] = availableSpaces[i];
		}
		// console.log(minimax.funcCalls)
		// console.log(originalBoard)
		// console.log(minimax.scorePlayer)
		// console.log(minimax.scoreCPU)
		console.log(move)
	},
	checkTerminalState(board, player){
		const playerOneMiniMax = players.player1.mark;
		const cpuAI = players.cpu.mark;
		//check for terminal states and return +10 for cpu win, -10 for player win and 0 for a tie
		if(availableSpaces[0] === playerOneMiniMax && availableSpaces[1] === playerOneMiniMax && availableSpaces[2] === playerOneMiniMax){
			return minimax.scorePlayer = -10;
		}else if(availableSpaces[0] === cpuAI && availableSpaces[1] === cpuAI && availableSpaces[2] === cpuAI){
			return minimax.scoreCPU = 10;
		}else if(availableSpaces.length === 0){
			return minimax.tie;
		}
	},
	minMaxAI: ()=>{
		return 1;
	},
}










// }
// class Player {
// 	constructor(max_depth = -1) {
//         this.max_depth = max_depth;
//         this.nodes_map = new Map();
//     }
// 	getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
// 		if(board.constructor.name !== "Board") throw('The first argument to the getBestMove method should be an instance of Board class.');
// 		if(depth == 0) this.nodes_map.clear();
// 		if(board.isTerminal() || depth == this.max_depth ) {
// 			if(board.isTerminal().winner == 'x') {
// 				return 100 - depth;
// 			} else if (board.isTerminal().winner == 'o') {
// 				return -100 + depth;
// 			} 
// 			return 0;
// 		}
// 		//Current player is maximizing
// 		if(maximizing) {
// 			//Initializ best to the lowest possible value
// 			let best = -100;
// 			//Loop through all empty cells
// 			board.getAvailableMoves().forEach(index => {
// 				//Initialize a new board with the current state (slice() is used to create a new array and not modify the original)
// 				let child = new Board(board.state.slice());
// 				//Create a child node by inserting the maximizing symbol x into the current emoty cell
// 				child.insert('x', index);
// 				//Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
// 				let node_value = this.getBestMove(child, false, callback, depth + 1);
// 				//Updating best value
// 				best = Math.max(best, node_value);
				
// 				//If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
// 				if(depth == 0) {
// 					//Comma seperated indicies if multiple moves have the same heuristic value
// 					var moves = this.nodes_map.has(node_value) ? `${this.nodes_map.get(node_value)},${index}` : index;
// 					this.nodes_map.set(node_value, moves);
// 				}
// 			});
// 			//If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
// 			if(depth == 0) {
// 				if(typeof this.nodes_map.get(best) == 'string') {
// 					var arr = this.nodes_map.get(best).split(',');
// 					var rand = Math.floor(Math.random() * arr.length);
// 					var ret = arr[rand];
// 				} else {
// 					ret = this.nodes_map.get(best);
// 				}
// 				//run a callback after calculation and return the index
// 				callback(ret);
// 				return ret;
// 			}
// 			//If not main call (recursive) return the heuristic value for next calculation
// 			return best;
// 		}
// 		if(!maximizing) {
// 			//Initializ best to the highest possible value
// 			let best = 100;
// 			//Loop through all empty cells
// 			board.getAvailableMoves().forEach(index => {
// 				//Initialize a new board with the current state (slice() is used to create a new array and not modify the original)
// 				let child = new Board(board.state.slice());
// 				//Create a child node by inserting the minimizing symbol o into the current emoty cell
// 				child.insert('o', index);
			
// 				//Recursively calling getBestMove this time with the new board and maximizing turn and incrementing the depth
// 				let node_value = this.getBestMove(child, true, callback, depth + 1);
// 				//Updating best value
// 				best = Math.min(best, node_value);
				
// 				//If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
// 				if(depth == 0) {
// 					//Comma seperated indicies if multiple moves have the same heuristic value
// 					var moves = this.nodes_map.has(node_value) ? this.nodes_map.get(node_value) + ',' + index : index;
// 					this.nodes_map.set(node_value, moves);
// 				}
// 			});
// 			//If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
// 			if(depth == 0) {
// 				if(typeof this.nodes_map.get(best) == 'string') {
// 					var arr = this.nodes_map.get(best).split(',');
// 					var rand = Math.floor(Math.random() * arr.length);
// 					var ret = arr[rand];
// 				} else {
// 					ret = this.nodes_map.get(best);
// 				}
// 				//run a callback after calculation and return the index
// 				callback(ret);
// 				return ret;
// 			}
// 			//If not main call (recursive) return the heuristic value for next calculation
// 			return best;
// 		}
// 	}
// }

// let board = ['x','o','','','','','o','','x'];
// board.printFormattedBoard();
// let p = new Player();
// console.log(p.getBestMove(board));
// console.log(p.nodes_map);
********************************/