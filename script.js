//player creation factory
const createPlayer = (name, mark) => {
    return {name, mark};
}

function startGame() {
const gameBoard = (function() {
    
    //declare gameboard as an array
    let board = [];

    //creates a 3x3 grid for the gameboard
    for (i = 0; i < 9; i++){
        board.push('');
    }
    //defines squares as "squares" div in html, this allows us to create a new element (square), we then assign a class name to each div and then append
    //the child square to the parent "squares", because of the first line (for each item) there will be 9 squares because there are 9 items in .board
    let squares = document.querySelector(".squares");

    board.forEach((item, index) => {
    const square = document.createElement('div');
    square.className = 'square';
    squares.appendChild(square);
    })

    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            //display active player marker by simplying adding a classlist and then setting the data attribute to the current player's mark
            square.classList.add(game.currentPlayer.mark);
            square.setAttribute('data', game.currentPlayer.mark);
            // update array value to display current player by setting the item inside that board array to be the current player's marker
            board[index] = game.currentPlayer.mark;
            //remove event listener from marked box so that players can't change their mark/ repeatedly mark the same tile
            square.style.pointerEvents = 'none';
            // update our array , we have marked a spot so now we need to configure the remaining squares on our gameboard by removing 1 tile each time a tile is marked
            game.remainingSpots -=1;
            //check winner: if all 3 values within any of the combinations are ===... 
            game.checkWinner();
            // check how many tiles remain
            if (game.winnerDeclared == false) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots == 0) {
                    game.declareTie();
                }
            }
        })
    });

    return {
        board
    };
})();

const game = (() => {
    
    //declare players
    const playerOne = createPlayer('Player 1', 'skull');
    const playerTwo = createPlayer('Player 2', 'ghost');

    //starting point
    let currentPlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    // selectors
    let displayer = document.querySelector('.displayer');
    let playerName = document.querySelector('.player-name');
    
    // winning combinations
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    //create reset button after winning
    function showButton() {
    document.getElementById("resetBtn").style.display = "block";
    }

    //checks winner
    function checkWinner() {
        winCombinations.forEach((item, index) => { // [0, 1, 2, 4, 5, 6, 7]
            if (gameBoard.board[item[0]] === this.currentPlayer.mark && 
                gameBoard.board[item[1]] === this.currentPlayer.mark &&
                gameBoard.board[item[2]] === this.currentPlayer.mark) {
                    console.log('winner!');
                    displayer.innerHTML = `<b>${this.currentPlayer.name} wins!</b>`;
                    this.winnerDeclared = true;
                    showButton();
              }
        })
    }

    //alert next player
    function alertNextPlayer() {
        this.currentPlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
    }

    //next player
    function nextPlayer() {
        this.currentPlayer === playerOne ? this.currentPlayer = playerTwo : this.currentPlayer = playerOne;
        console.log('nextPlayer() function ran');
        console.log('current player: ' + currentPlayer.name);
    }

    //declare tie
    function declareTie() {
        displayer.innerHTML = "<b>Tie game!</b>";
    }

    //return (needed when using modules)
    return {
        currentPlayer, remainingSpots, checkWinner, alertNextPlayer, nextPlayer, declareTie, winnerDeclared, showButton
    };
})();
}

startGame();

function hideResetBtn() {
    document.getElementById('resetBtn').style.display = "none";
}

function resetDOM() {
    document.querySelector('.displayer').innerHTML = `<span class="player-name">Player 1</span>, it's your turn.`;
    document.querySelector('.squares').innerHTML = '';
}

function handleReset() {
    document.querySelector('.resetBtn').addEventListener('click', function(){
        resetDOM();
        startGame();
        hideResetBtn();

    });
}

handleReset();