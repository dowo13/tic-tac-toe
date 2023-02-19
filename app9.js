import { minimax } from './minimax.js';
export { getDomElements, players, gameBoard, winningLines, gameObject, whoseMove, }

const getDomElements = (()=>{
    const wrapper = document.querySelector('.wrapper');
    const h1Header = document.querySelector('.header');
    const openingScreen = document.querySelector('.openingScreen');
    const pvp = document.querySelector('.playerPlayer');
    const pvCpu = document.querySelector('.playerCPU');
    const choosePlayerMarkers = document.querySelector('.chooseMarkers');
    const crosses = document.getElementById('crosses');
    const noughts = document.getElementById('noughts');
    const showGameBoard = document.querySelector('.showGameBoard');
    const nextMove = document.querySelector('.whoseMove');
    const levelSelect = document.getElementById('levels');
    const playerToMove = document.querySelector('.playerToMove');
    const winner = document.querySelector('.winner');
    const winnningPlayer = document.querySelector('.winName');
    const box1 = document.querySelector('.box1');
    const box2 = document.querySelector('.box2');
    const box3 = document.querySelector('.box3');
    const box4 = document.querySelector('.box4');
    const box5 = document.querySelector('.box5');
    const box6 = document.querySelector('.box6');
    const box7 = document.querySelector('.box7');
    const box8 = document.querySelector('.box8');
    const box9 = document.querySelector('.box9');
    const playBoard = document.querySelector('.playBoard');
    const winnerPara = document.querySelector('.winName');
    
    return{wrapper, h1Header, openingScreen, pvp, pvCpu, choosePlayerMarkers, crosses, noughts, showGameBoard, nextMove, levelSelect, playerToMove, winner, winnningPlayer, box1, box2, box3, box4, box5, box6, box7, box8, box9, playBoard, winnerPara };
})();
console.log(getDomElements.levelSelect.value)

const players = {
    player1: {
        name:null,
        mark: null,
        playing: true,
        end: false,
    },
    player2: {
        name: null,
        mark: null,
        playing: false,
        end: false,
    },
    cpu: {
        name: 'CPU',
        mark: null,
        end: false,
    },
    enterNames: (target)=>{
        console.log(target)
        const arrOfNames = [];
        const nameOverlayDiv = document.querySelector('.namesOverlay');
        nameOverlayDiv.style.display = 'block';
        const nameForm = document.forms;
        // console.log(nameForm)
        const nameInput = document.getElementById('playerNames');
        nameInput.focus();
        if(arrOfNames.length > 0){
            nameInput.placeholder = '';
        }
        // console.log(nameOverlayDiv)
        if(target.className === 'playerCPU'){
            console.log('one player selected ');
            nameForm[0].addEventListener('submit', (e)=>{
                e.preventDefault()
                console.log('submitted')
                console.log(nameInput.value)
                const p1 = getNames(nameInput.value || 'player 1');
                players.player1.name = p1.n;
                chooseMarkerDisplay();
                chooseMarkers();
            })

        }else {
            console.log('whoops thats not working!!!')
            nameForm[0].addEventListener('submit', (e)=>{
                e.preventDefault();
                arrOfNames.push(nameInput.value);
                nameInput.value = '';
                console.log(arrOfNames)
                const p1 = getNames(arrOfNames[0] || 'player 1');
                players.player1.name = p1.n;
                const p2 = getNames(arrOfNames[1] || 'player 2');
                players.player2.name = p2.n;
                if(arrOfNames.length < 2){
                    return
                }else{
                    chooseMarkerDisplay();
                    chooseMarkers();
                }
               
            })
        }
    },
}
const difficulty = {
    easy: true,
    hard: false,
    gameLevelHandler: ()=>{
        if(difficulty.easy === true){
            gameObject.playGame();
        }else{
            getDomElements.levelSelect.addEventListener('click', ()=>{
                if(getDomElements.levelSelect.value === 'easy'){
                 gameObject.playGame();
                }else{
                    difficulty.easy = false;
                    difficulty.hard = true;
                    gameObject.playGame();
                }
            })
        }
      
    },
}

const getNames = (n)=>{
    return {n};
}
const getMarker = (m1)=>{
    return {m1};
}
const chooseMarkerDisplay = ()=>{
    getDomElements.openingScreen.style.display = 'none';
    getDomElements.wrapper.style.backgroundImage = 'none';
    getDomElements.h1Header.textContent = `Choose your marker ${players.player1.name}`;
    getDomElements.choosePlayerMarkers.style.display = 'flex';
}

const chooseMarkers = ()=>{
    let target;
    const cross = getDomElements.crosses.addEventListener('click', (e)=>{
        target = e.target;
        const p1m = getMarker(target.textContent);
        players.player1.mark = p1m.m1;
        if(players.player2.playing === true){
            players.player2.mark = getDomElements.noughts.textContent;
            drawBoard();
        }else{
            players.cpu.mark = getDomElements.noughts.textContent;
            drawBoard();
        }
    });
    const nought = getDomElements.noughts.addEventListener('click', (e)=>{
        target = e.target;
        const p1m = getMarker(target.textContent);
        players.player1.mark = p1m.m1;
        if(players.player2.playing === true){
            players.player2.mark = getDomElements.crosses.textContent;
            drawBoard();
        }else{
            players.cpu.mark = getDomElements.crosses.textContent;
            drawBoard();
        }
    });
    
}

const onePlayerGame = ()=>{
    console.log('1 player game');
    // const p1 = getNames(prompt('enter your name player 1') || 'player 1');
    players.enterNames(getDomElements.pvCpu);
    // players.player1.name = p1.n;
    // chooseMarkerDisplay();
    // chooseMarkers();
    console.log()
   
}
const twoPlayerGame = ()=>{
    players.player2.playing = true;
    console.log('2 player game');
    players.enterNames(getDomElements.pvp);
    // const p1 = getNames(prompt('enter your name player 1') || 'player 1');
    // players.player1.name = p1.n;
    // const p2 = getNames(prompt('enter your name player 2') || 'player 2');
    // players.player2.name = p2.n;
    // chooseMarkerDisplay();
    // chooseMarkers();
}

const gameBoard = {
    emptySpacesCounter: 0,
    gameArray: [0,1,2,3,4,5,6,7,8],
    board: [[],
[],
[],
],
pushToBoard: (mark)=>{
    if(mark === getDomElements.box1){
        gameBoard.gameArray[0] = mark.textContent;
        gameBoard.board[0][0] = mark.textContent;
        winningLines.top[0] = mark.textContent;
        winningLines.topLeftBottomRight[0] = mark.textContent;
        winningLines.col1[0] = mark.textContent;
    }else if(mark === getDomElements.box2){
        gameBoard.gameArray[1] = mark.textContent;
        gameBoard.board[0][1] = mark.textContent;
        winningLines.top[1] = mark.textContent;
        winningLines.col2[0] = mark.textContent;
    }else if(mark === getDomElements.box3){
        gameBoard.gameArray[2] = mark.textContent;
        gameBoard.board[0][2] = mark.textContent;
        winningLines.top[2] = mark .textContent;
        winningLines.topRightBottomLeft[0] = mark.textContent;
        winningLines.col3[0] = mark.textContent; 
    }else if(mark === getDomElements.box4){
        gameBoard.gameArray[3] = mark.textContent;
        gameBoard.board[1][0] = mark.textContent;
        winningLines.middle[0] = mark.textContent;
        winningLines.col1[1] = mark.textContent;
    }else if(mark === getDomElements.box5){
        gameBoard.gameArray[4] = mark.textContent;
        gameBoard.board[1][1] = mark.textContent;
        winningLines.middle[1] = mark.textContent;
        winningLines.topLeftBottomRight[1] = mark.textContent;
        winningLines.topRightBottomLeft[1] = mark.textContent;
        winningLines.col2[1] = mark.textContent;
    }else if(mark === getDomElements.box6){
        gameBoard.gameArray[5] = mark.textContent;
        gameBoard.board[1][2] = mark.textContent;
        winningLines.middle[2] = mark.textContent;
        winningLines.col3[1] = mark.textContent;
    }else if(mark === getDomElements.box7){
        gameBoard.gameArray[6] = mark.textContent;
        gameBoard.board[2][0] = mark.textContent;
        winningLines.bottom[0] = mark.textContent;
        winningLines.topRightBottomLeft[2] = mark.textContent;
        winningLines.col1[2] = mark.textContent;
    }else if(mark === getDomElements.box8){
        gameBoard.gameArray[7] = mark.textContent;
        gameBoard.board[2][1] = mark.textContent;
        winningLines.bottom[1] = mark.textContent;
        winningLines.col2[2] =mark.textContent;
    }else if(mark === getDomElements.box9){
        gameBoard.gameArray[8] = mark.textContent;
        gameBoard.board[2][2] = mark.textContent;
        winningLines.bottom[2] = mark.textContent;
        winningLines.topLeftBottomRight[2] = mark.textContent;
        winningLines.col3[2] = mark.textContent;
    }
},
}

const winningLines = {
    top: [],
    middle: [],
    bottom: [],
    topLeftBottomRight: [],
    topRightBottomLeft: [],
    col1: [],
    col2: [],
    col3: [],
}

const drawBoard = ()=>{
    getDomElements.choosePlayerMarkers.style.display = 'none';
    getDomElements.h1Header.textContent = '';
    getDomElements.wrapper.style.backgroundColor = 'chartreuse';
    getDomElements.showGameBoard.style.display = ' block';
    whoseMove(players.player1.name);
    // gameObject.playGame();
    difficulty.gameLevelHandler();
}

console.log(gameBoard)

const whoseMove = (name)=>{
    return getDomElements.nextMove.textContent = `${name} to move`;
}

const gameObject = {
    
    playGame: ()=>{
        
        const boxesArray = [getDomElements.box1, getDomElements.box2, getDomElements.box3, getDomElements.box4, getDomElements.box5, getDomElements.box6, getDomElements.box7, getDomElements.box8, getDomElements.box9];
        //if(players.player2.playing === false){
            //player v computer
            const loopBoxes = boxesArray.forEach(item=>{
                // if(players.player2.playing === false){
                    item.addEventListener('click', ()=>{
                        if(getDomElements.nextMove.textContent === `${players.player1.name} to move`){
                            if(item.textContent === ''){
                                item.textContent = players.player1.mark;
                                console.log(item)
                                gameBoard.pushToBoard(item);
                                gameObject.lookForWinner(players.player1.name);
                                if(players.player2.playing === false){
                                // whoseMove(players.cpu.name);
                                if(getDomElements.levelSelect.value === 'easy'){
                                    gameObject.cpuSet(boxesArray);
                                }else{
                                    whoseMove(players.cpu.name);
                                    minimax.startMinMax(gameBoard.gameArray)
                                    
                                    console.log('hard skill level selected')
                                }
                                // gameObject.cpuSet(boxesArray);
                                //for evaluate function to get minimax working
                                // minimax.startMinMax()
                                }else{
                                    whoseMove(players.player2.name);
                                    gameObject.player2play(boxesArray)
                                }
                            }else{
                                alert('space occupied 1');
                            }
                        }
                })
            })
            console.log(gameBoard.board)
       
    },
    player2play: (arr)=>{
        console.log('got to player 2 function');
        console.log(arr.length);
        let tCheck = arr.filter(item=>item.textContent !== players.player1.mark && item.textContent !== players.player2.mark);
        console.log(tCheck)
        if(tCheck.length === 0){
            console.log(' 0 spaces empty game tied')
            gameObject.lookForWinner('tied');
        }
        const loopedBoxesP2 = arr.forEach(item=>{
            item.addEventListener('click', ()=>{
                if(getDomElements.nextMove.textContent === `${players.player2.name} to move`){
                    if(item.textContent === ''){
                        item.textContent = players.player2.mark;
                        gameBoard.pushToBoard(item);
                        console.log(gameBoard)
                        gameObject.lookForWinner(players.player2.name);
                        whoseMove(players.player1.name);
                    }
                }
            })
        })
    },
    cpuSet: (arr)=>{
        const setOfemptySpaces = new Set();
        const iter = setOfemptySpaces.values();
        for(let i =0; i< arr.length; i++){
        
           if(arr[i].textContent === ''){
                setOfemptySpaces.add(arr[i]);
           }
        }
        const ranArr = Array.from(setOfemptySpaces);
        const obj = Object.assign({}, ranArr);
        console.log();
        gameObject.cpuMoves(obj, arr);
    },
    cpuMoves: (obj, arr)=>{
        if(players.cpu.end === false){
            setTimeout(() => {
                console.log(obj);
               
                    let empties = Object.keys(obj);
                    let ranNum = Math.floor(Math.random()*(empties.length));
                    let val = obj[empties[ranNum]]; // uncomment here to make cpu move 
                    console.log(empties)
                    if(empties.length === 0){
                        gameObject.lookForWinner('tied');
                    }else{
                        val.textContent = players.cpu.mark;
                    }
                    // val.textContent = players.cpu.mark; //uncomment here 
                    gameBoard.pushToBoard(val); //uncomment here
                    gameObject.lookForWinner(players.cpu.name);
                    whoseMove(players.player1.name);
            }, 1500);
        }
       
        
    },
    cpuMiniMaxMoves: (n)=>{
        //minimax algorithm result here
        let spaces = [];
        setTimeout(() => {
            let allSpaces = [getDomElements.box1, getDomElements.box2, getDomElements.box3, getDomElements.box4, getDomElements.box5, getDomElements.box6, getDomElements.box7, getDomElements.box8, getDomElements.box9];
        
            let bestCPUmove = gameBoard.gameArray;
            console.log(bestCPUmove)
            console.log(n)
            console.log(bestCPUmove)
            gameBoard.emptySpacesCounter ++;
            console.log(gameBoard.emptySpacesCounter)
            let cpuMov = allSpaces[bestCPUmove[n]]
            console.log(cpuMov)
            // cpuMov.textContent = players.cpu.mark;
            if(cpuMov == undefined){
                gameObject.lookForWinner('tied')
            }else{
                cpuMov.textContent = players.cpu.mark;
            }
            gameBoard.pushToBoard(cpuMov);
            gameObject.lookForWinner(players.cpu.name);
            whoseMove(players.player1.name);
        }, 1000);
       
    },
    lookForWinner: (winnersName)=>{
        let winX = 'XXX';
        let winO = 'OOO';

        if(winnersName === 'tied'){
            gameObject.showWin('9', 'tied');
        }
       console.log(winnersName);
       console.log(winningLines)
        for(let w in winningLines){
            console.log(winningLines[w].join(''))
            if(winningLines[w].join('') === winX){
                if(players.player1.mark === 'X'){
                    console.log('player 1 wins')
                    gameObject.drawWinnigLine(winX, winnersName);
                    players.cpu.end = true;
                }else{
                    console.log('cpu wins')
                    gameObject.drawWinnigLine(winX, winnersName);
                }
            }else if(winningLines[w].join('') === winO){
                if(players.player1.mark === 'O'){
                    console.log('player 1 wins')
                    gameObject.drawWinnigLine(winO, winnersName);
                    players.cpu.end = true;
                }else{
                    console.log('cpu wins')
                    gameObject.drawWinnigLine(winO, winnersName);
                }
            }
        }
        
        if(gameBoard.board[2] === ""){
            console.log('empty')
        }
    },
    drawWinnigLine: (winner, winName)=>{
        //find which line is the winning line
        console.log(winner, winName);
        for(let prop in winningLines){
            console.log(winningLines[prop]);
        }
        winningLines.top.join('');
        winningLines.bottom.join('');
        winningLines.middle.join('');
        winningLines.col1.join('');
        winningLines.col2.join('');
        winningLines.col3.join('');
        winningLines.topLeftBottomRight.join('');
        winningLines.topRightBottomLeft.join('');
        
        if(winningLines.top.join('')=== winner){
            console.log('top')
            gameObject.showWin('1', winName);
        }else if(winningLines.middle.join('')=== winner){
            console.log('middle')
            gameObject.showWin('2', winName);
        }else if(winningLines.bottom.join('')=== winner){
            console.log('bottom')
            gameObject.showWin('3', winName);
        }else if(winningLines.col1.join('')=== winner){
            console.log('col1')
            gameObject.showWin('4', winName);
        }else if(winningLines.col2.join('')=== winner){
            console.log('col2')
            gameObject.showWin('5', winName);
        }else if(winningLines.col3.join('')=== winner){
            console.log('col3')
            gameObject.showWin('6', winName);
        }else if(winningLines.topLeftBottomRight.join('') === winner){
            console.log('top left')
            gameObject.showWin('7', winName);
        }else{
            // winningLines.topRightBottomLeft.join('');
            console.log('top right');
            gameObject.showWin('8', winName);
        }
    },
    showWin: (win, name)=>{
        //svg graphics here on page
        const overlay = document.querySelector('.overLay');
        overlay.style.display = 'block';
        const path1 = document.querySelector('.path1');
        const path2 = document.querySelector('.path2');
        const path3 = document.querySelector('.path3');
        const path4 = document.querySelector('.path4');
        const path5 = document.querySelector('.path5');
        const path6 = document.querySelector('.path6');
        const path7 = document.querySelector('.path7');
        const path8 = document.querySelector('.path8');
        const showWinner = document.querySelector('.winner').style.display = 'block';

        console.log(win);
        switch(win){
            case '1':
            path1.style.display = 'block';
            // winnerPara.textContent = `the winner is ${name}`
            gameObject.displayWinnersName(name);
            break;
            case '2':
            path2.style.display = 'block';
            // winnerPara.textContent = `the winner is ${name}`;
            gameObject.displayWinnersName(name);
            break;
            case '3':
            path3.style.display = 'block';
            // winnerPara.textContent = `the winner is ${name}`;
            gameObject.displayWinnersName(name);
            break;
            case '4':
            path4.style.display = 'block';
            gameObject.displayWinnersName(name);
            break;
            case '5':
            path5.style.display = 'block';
            gameObject.displayWinnersName(name);
            break;
            case '6':
            path6.style.display = 'block';
            gameObject.displayWinnersName(name);
            break;
            case '7':
            path7.style.display = 'block';
            gameObject.displayWinnersName(name);
            break;
            case '8':
            path8.style.display = 'block';
            gameObject.displayWinnersName(name);
            break;
            case '9':
            gameObject.tiedGame()
            break;
        }
    },
    displayWinnersName: (name)=>{
        console.log(name)
        setTimeout((n) => {
            n = name;
            console.log(n)
            if(name === players.player1.name){
                getDomElements.winnerPara.innerHTML = `congratulations!! <br> the winner is... <br> <span style="color: blue;"> ${name}!!</span>`;
            }else if(name === players.player2.name){
                getDomElements.winnerPara.innerHTML = `congratulations!! <br> the winner is... <br> <span style="color: blue;"> ${name}!!</span>`;
            }else{
                getDomElements.winnerPara.innerHTML = `Unlucky!! <br> the winner is... <br> <span style="color: blue;"> ${name}!!</span>`;
            }
            
        }, 1000);
        // winnerPara.textContent = `the winner is ${name}`
    },
    tiedGame: ()=>{
        console.log('ok why u not working im calling you from cpuminimax function line 378')
        return getDomElements.winnerPara.textContent = 'Game Tied'
    },
}

const reset = document.querySelector('.reset').addEventListener('click', ()=>{
    location.reload();
})

//start game by choosing 1 or 2 player game
getDomElements.pvCpu.addEventListener('click', onePlayerGame);
getDomElements.pvp.addEventListener('click', twoPlayerGame);
// console.log(players)
// console.log(gameBoard)
// console.log(winningLines)

console.log()

/***

  if(ranArr[ranSetPick] === getDomElements.box1 && getDomElements.box1.textContent === '' || ranArr[ranSetPick] === getDomElements.box2 && getDomElements.box2.textContent === '' || ranArr[ranSetPick] === getDomElements.box3 && getDomElements.box3.textContent === ''){
                        gameBoard.board[0].push(ranArr[ranSetPick].textContent);
                    }else if(ranArr[ranSetPick] === getDomElements.box4 && getDomElements.box4.textContent === ''|| ranArr[ranSetPick] === getDomElements.box5 && getDomElements.box5.textContent === '' || ranArr[ranSetPick] === getDomElements.box6 && getDomElements.box6.textContent === ''){
                        gameBoard.board[1].push(ranArr[ranSetPick].textContent);
                    }else if(ranArr[ranSetPick] === getDomElements.box7 && getDomElements.box7.textContent === ''|| ranArr[ranSetPick] === getDomElements.box8 && getDomElements.box8.textContent === '' || ranArr[ranSetPick] === getDomElements.box9 && getDomElements.box9.textContent === ''){
                        gameBoard.board[2].push(ranArr[ranSetPick].textContent);
                    }

                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                     if(ranArr[ranSetPick] === getDomElements.box1 || ranArr[ranSetPick] === getDomElements.box2 || ranArr[ranSetPick] === getDomElements.box3){
                            gameBoard.board[0].push(ranArr[ranSetPick].textContent);
                        }else if(ranArr[ranSetPick] === getDomElements.box4 || ranArr[ranSetPick] === getDomElements.box5 || ranArr[ranSetPick] === getDomElements.box6){
                            gameBoard.board[1].push(ranArr[ranSetPick].textContent);
                        }else if(ranArr[ranSetPick] === getDomElements.box7 || ranArr[ranSetPick] === getDomElements.box8 || ranArr[ranSetPick] === getDomElements.box9){
                            gameBoard.board[2].push(ranArr[ranSetPick].textContent);

                        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                         if(ranArr[ranSetPick] === getDomElements.box1 && getDomElements.box1.textContent === ''){
                            gameBoard.board[0][0].push(ranArr[ranSetPick].textContent);
                        }else if(ranArr[ranSetPick] === getDomElements.box2 && getDomElements.box2.textContent === ''){
                            gameBoard.board[0][1].push(ranArr[ranSetPick].textContent)
                        }else if(ranArr[ranSetPick] === getDomElements.box3 && getDomElements.box3.textContent === ''){
                            gameBoard.board[0][2].push(ranArr[ranSetPick].textContent)
                        }else if(ranArr[ranSetPick] === getDomElements.box4 && getDomElements.box4.textContent === ''){
                            gameBoard.board[1][0].push(ranArr[ranSetPick].textContent)
                        }else if(ranArr[ranSetPick] === getDomElements.box5 && getDomElements.box5.textContent === ''){
                            gameBoard.board[1][1].push(ranArr[ranSetPick].textContent)
                        }else if(ranArr[ranSetPick] === getDomElements.box6 && getDomElements.box6.textContent === ''){
                            gameBoard.board[1][2].push(ranArr[ranSetPick].textContent)
                        }else if(ranArr[ranSetPick] === getDomElements.box7 && getDomElements.box7.textContent === ''){
                            gameBoard.board[2][0].push(ranArr[ranSetPick].textContent)
                        }else if(ranArr[ranSetPick] === getDomElements.box8 && getDomElements.box8.textContent === ''){
                            gameBoard.board[2][1].push(ranArr[ranSetPick].textContent)
                        }else if(ranArr[ranSetPick] === getDomElements.box9 && getDomElements.box9.textContent === ''){
                            gameBoard.board[2][2].push(ranArr[ranSetPick].textContent)
                        }
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////]
                        if(ranArr[ranSetPick] === getDomElements.box1 || ranArr[ranSetPick] === getDomElements.box2 || ranArr[ranSetPick] === getDomElements.box3){
                            gameBoard.board[0].push(ranArr[ranSetPick].textContent);
                        }else if(ranArr[ranSetPick] === getDomElements.box4 || ranArr[ranSetPick] === getDomElements.box5 || ranArr[ranSetPick] === getDomElements.box6){
                            gameBoard.board[1].push(ranArr[ranSetPick].textContent);
                        }else if(ranArr[ranSetPick] === getDomElements.box7 || ranArr[ranSetPick] === getDomElements.box8 || ranArr[ranSetPick] === getDomElements.box9){
                            gameBoard.board[2].push(ranArr[ranSetPick].textContent);
///////////////////////////////////////////////////////////////////////////////                        }////////////////////////////////////////////////
if(item === getDomElements.box1 || item === getDomElements.box2 || item === getDomElements.box3){
                            gameBoard.board[0].push(item.textContent);
                        }else if(item === getDomElements.box4 || item === getDomElements.box5 || item === getDomElements.box6){
                            gameBoard.board[1].push(item.textContent);
                        }else if(item === getDomElements.box7 || item === getDomElements.box8 || item === getDomElements.box9){
                            gameBoard.board[2].push(item.textContent);
                        }
*/
/****
 console.log(sets.set)
        const cpuMove = new Set();
        let ranArr;
        let ranSetPick;
        const cpuArray = [];
        const cpuGo = '';
        console.log('cpu move now', arr);
      
        const delayMove = setTimeout(() => {
            
            const checkForEmptySpace = arr.forEach(item=>{
                if(item.textContent === ''){
                    cpuMove.add(item);
                }
            })
           
            const ranSetPick = Math.floor(Math.random()*cpuMove.size);
            console.log(ranSetPick)
            ranArr = Array.from(cpuMove);
            console.log(ranArr[ranSetPick]);
            if(gameBoard.board[0].length === 3 && gameBoard.board[1].length === 3 && gameBoard.board[2].length === 3){
                alert('Game Over');
            }else{
                if(ranArr[ranSetPick].textContent === players.player1.mark || ranArr[ranSetPick].textContent === players.cpu.mark){
                    console.log(' same space picked ', ranArr[ranSetPick]);
                    console.log(ranArr)
                    console.log(cpuMove)

                }else{
                    
                    ranArr[ranSetPick].textContent = players.cpu.mark;
                    //arr.splice(ranArr[ranSetPick])
                    // cpuMove.delete(ranArr[ranSetPick]);
                }
            whoseMove(players.player1.name);
            if(getDomElements.box1 === ranArr[ranSetPick]){
                gameBoard.board[0][0] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box2 === ranArr[ranSetPick]){
                gameBoard.board[0][1] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box3 === ranArr[ranSetPick]){
                gameBoard.board[0][2] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box4 === ranArr[ranSetPick]){
                gameBoard.board[1][0] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box5 === ranArr[ranSetPick]){
                gameBoard.board[1][1] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box6 === ranArr[ranSetPick]){
                gameBoard.board[1][2] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box7 === ranArr[ranSetPick]){
                gameBoard.board[2][0] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box8 === ranArr[ranSetPick]){
                gameBoard.board[2][1] = ranArr[ranSetPick].textContent;
            }else if(getDomElements.box9 === ranArr[ranSetPick]){
                gameBoard.board[2][2] = ranArr[ranSetPick].textContent;
            }
            gameObject.lookForWinner();
            }  
        }, 1500);
        
        //cpuMove.delete(ranArr[ranSetPick]);
    },


*/
/********

 switch(winningLines.top[0]&&winningLines.top[1]&&winningLines.top[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }
        switch(winningLines.middle[0]&&winningLines.middle[1]&&winningLines.middle[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }
        switch(winningLines.bottom[0]&&winningLines.bottom[1]&&winningLines.bottom[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }
        switch(winningLines.topRightBottomLeft[0]&&winningLines.topRightBottomLeft[1]&&winningLines.topRightBottomLeft[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }
        switch(winningLines.topLeftBottomRight[0]&&winningLines.topLeftBottomRight[1]&&winningLines.topLeftBottomRight[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }
        switch(winningLines.col1[0]&&winningLines.col1[1]&&winningLines.col1[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }
        switch(winningLines.col2[0]&&winningLines.col2[1]&&winningLines.col2[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }
        switch(winningLines.col3[0]&&winningLines.col3[1]&&winningLines.col3[2]){
            case players.player1.mark:
            console.log('player1 wins');
            break;
            case players.cpu.mark:
            console.log('cpu wins');
            break;
        }


         if(winningLines.top[0]&&winningLines.top[1]&&winningLines.top[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.top[0]&&winningLines.top[1]&&winningLines.top[2] === players.cpu.mark){
            console.log('cpu wins');
        }else if(winningLines.middle[0]&&winningLines.middle[1]&&winningLines.middle[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.middle[0]&&winningLines.middle[1]&&winningLines.middle[2] === players.cpu.mark){
            console.log('cpu wins')
        }else if(winningLines.bottom[0]&&winningLines.bottom[1]&&winningLines.bottom[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.bottom[0]&&winningLines.bottom[1]&&winningLines.bottom[2] === players.cpu.mark){
            console.log('cpu wins')
        }else if(winningLines.topRightBottomLeft[0]&&winningLines.topRightBottomLeft[1]&&winningLines.topRightBottomLeft[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.topRightBottomLeft[0]&&winningLines.topRightBottomLeft[1]&&winningLines.topRightBottomLeft[2] === players.cpu.mark){
            console.log('cpu wins')
        }else if(winningLines.topLeftBottomRight[0]&&winningLines.topLeftBottomRight[1]&&winningLines.topLeftBottomRight[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.topLeftBottomRight[0]&&winningLines.topLeftBottomRight[1]&&winningLines.topLeftBottomRight[2] === players.cpu.mark){
            console.log('cpu wins')
        }else if(winningLines.col1[0]&&winningLines.col1[1]&&winningLines.col1[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.col1[0]&&winningLines.col1[1]&&winningLines.col1[2] === players.cpu.mark){
            console.log('cpu wins')
        }else if(winningLines.col2[0]&&winningLines.col2[1]&&winningLines.col2[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.col2[0]&&winningLines.col2[1]&&winningLines.col2[2] === players.cpu.mark){
            console.log('cpu wins')
        }else if(winningLines.col3[0]&&winningLines.col3[1]&&winningLines.col3[2] === players.player1.mark){
            console.log('p1 wins')
        }else if(winningLines.col3[0]&&winningLines.col3[1]&&winningLines.col3[2] === players.cpu.mark){
            console.log('cpu wins')
        }
*/

/*****

 // if(x !== '' && x.length === 3){
        //     console.log('ok 33333333333333333333333333')
        // }else{
        //     console.log(x.length)
        // }

    //    if(winningLines.top[0]=== players.player1.mark && winningLines.top[1]=== players.player1.mark && winningLines.top[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.top[0]=== players.cpu.mark && winningLines.top[1]&& winningLines.top[2]=== players.cpu.mark){
    //         console.log('cpu wins')
    //    }else if(winningLines.middle[0]=== players.player1.mark && winningLines.middle[1]=== players.player1.mark && winningLines.middle[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.middle[0]=== players.cpu.mark && winningLines.middle[1]=== players.cpu.mark && winningLines.middle[2]=== players.cpu.mark){
    //         console.log('cpu wins')
    //    }else if(winningLines.bottom[0]=== players.player1.mark && winningLines.bottom[1]=== players.player1.mark && winningLines.bottom[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.bottom[0]=== players.cpu.mark && winningLines.bottom[1]=== players.cpu.mark && winningLines.bottom[2]=== players.cpu.mark){
    //     console.log('cpu wins')
    //    }else if(winningLines.topLeftBottomRight[0]=== players.player1.mark && winningLines.topLeftBottomRight[1]=== players.player1.mark && winningLines.topLeftBottomRight[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.topLeftBottomRight[0]=== players.cpu.mark && winningLines.topLeftBottomRight[1]=== players.cpu.mark && winningLines.topLeftBottomRight[2]=== players.cpu.mark){
    //         console.log('cpu wins')
    //    }else if(winningLines.topRightBottomLeft[0]=== players.player1.mark && winningLines.topRightBottomLeft[1]=== players.player1.mark && winningLines.topRightBottomLeft[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.topRightBottomLeft[0]=== players.cpu.mark && winningLines.topRightBottomLeft[1]=== players.cpu.mark && winningLines.topRightBottomLeft[2]=== players.cpu.mark){
    //     console.log('cpu wins')
    //    }else if(winningLines.col1[0]=== players.player1.mark && winningLines.col1[1]=== players.player1.mark && winningLines.col1[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.col1[0]=== players.cpu.mark && winningLines.col1[1]=== players.cpu.mark && winningLines.col1[2]=== players.cpu.mark){
    //     console.log('cpu wins')
    //    }else if(winningLines.col2[0]=== players.player1.mark && winningLines.col2[1]=== players.player1.mark && winningLines.col2[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.col2[0]=== players.cpu.mark && winningLines.col2[1]=== players.cpu.mark && winningLines.col2[2]=== players.cpu.mark){
    //     console.log('cpu wins')
    //    }else if(winningLines.col3[0]=== players.player1.mark && winningLines.col3[1]=== players.player1.mark && winningLines.col3[2]=== players.player1.mark){
    //         console.log('p1 wins')
    //    }else if(winningLines.col3[0]=== players.cpu.mark && winningLines.col3[1]=== players.cpu.mark && winningLines.col3[2]=== players.cpu.mark){
    //     console.log('cpu wins')
    //    }

*/