import {DIFFICULTY} from "../pages";
import {MARKER} from "../pages/game";

/**
 * @description: gets empty cells from the board
 * @param: new_board -> a reference of current state of board
 * @return: array containing coordinates of empty cells
 * **/
const getEmptyCells = (new_board) => {
    let emptyCells = [];
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(new_board[i][j] === 0){
                emptyCells.push([i, j]);
            }
        }
    }
    return emptyCells;
}

/**
 * Applying minimax algorithm to find optimal move for machine's turn
 * @source: https://en.wikipedia.org/wiki/Minimax
 * @description: Minimax algorithm from game theory to find optimal move
 * @param: new_board -> a copy of current state of board after the human's turn
 * @returns: Object of shape {score: <Numeric>, d: <Numeric>}, here d is min depth for optimal move
 * **/
const minimax = (new_board, depth, isMaximizing, cell_left) => {
    let result = checkWinner(new_board);

    if (result === -1) {
        return {score: 1, d:depth};
    }else if(result === 1){
        return {score: -1, d:depth};
    }

    if(cell_left <= 0){
        return {score: 0, d:depth};
    }

    let minDepth = -Infinity;
    if(isMaximizing) {
        let bestScore = -Infinity;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(new_board[i][j] === 0){
                    new_board[i][j] = -1;
                    let {score, d} = minimax(new_board, depth+1, false, cell_left-1);
                    new_board[i][j] = 0;
                    if(score > bestScore) {
                        bestScore = score;
                        minDepth = d;
                    } else if (score === bestScore && d < minDepth) {
                        minDepth = d;
                    }
                }
            }
        }
        return {score: bestScore, d: minDepth};
    }else{
        let bestScore = Infinity;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(new_board[i][j] === 0){
                    new_board[i][j] = 1;
                    let {score, d} = minimax(new_board, depth+1, true, cell_left-1);
                    new_board[i][j] = 0;
                    if(score < bestScore) {
                        bestScore = score;
                        minDepth = d;
                    } else if (score === bestScore && d < minDepth) {
                        minDepth = d;
                    }
                }
            }
        }
        return {score: bestScore, d: minDepth}
    }
}

/**
 * @description: checks if a player or machine is winning the game
 * @param: board_check -> current state of board
 * @return: Either returns -> MARKER.FIRST_PLAYER : First player won the game
 *                            MARKER.SECOND_PLAYER_OR_MACHINE : Second player or machine won the game
 *                            0: No one have won the game yet
 * **/
export const checkWinner = (board_check) => {
    // Horizontal rows Check
    for(let i=0; i<3; i++){
        if(board_check[i][0] === board_check[i][1] && board_check[i][1] === board_check[i][2]){
            if(board_check[i][0] === MARKER.FIRST_PLAYER){
                return MARKER.FIRST_PLAYER
            }
            if(board_check[i][0] === MARKER.SECOND_PLAYER_OR_MACHINE){
                return MARKER.SECOND_PLAYER_OR_MACHINE
            }
        }
    }

    // Vertical rows check
    for(let i=0; i<3; i++){
        if(board_check[0][i] === board_check[1][i] && board_check[1][i] === board_check[2][i]){
            if(board_check[0][i] === MARKER.FIRST_PLAYER){
                return MARKER.FIRST_PLAYER
            }
            if(board_check[0][i] === MARKER.SECOND_PLAYER_OR_MACHINE){
                return MARKER.SECOND_PLAYER_OR_MACHINE
            }
        }
    }

    // First Diagonal Check
    if(board_check[0][0] === board_check[1][1] && board_check[0][0] === board_check[2][2]){
        if(board_check[0][0] === MARKER.FIRST_PLAYER){
            return MARKER.FIRST_PLAYER
        }
        if(board_check[0][0] === MARKER.SECOND_PLAYER_OR_MACHINE){
            return MARKER.SECOND_PLAYER_OR_MACHINE
        }
    }

    // Second Diagonal Check
    if(board_check[2][0] === board_check[1][1] && board_check[2][0] === board_check[0][2]){
        if(board_check[2][0] === MARKER.FIRST_PLAYER){
            return MARKER.FIRST_PLAYER
        }
        if(board_check[2][0] === MARKER.SECOND_PLAYER_OR_MACHINE){
            return MARKER.SECOND_PLAYER_OR_MACHINE
        }
    }

    return 0
}


/**
 * @description: method that make decision for machine's turn based on difficulty chosen
 * @param: new_board -> a reference of current state of board
 *          difficulty -> a value from Object of type DIFFICULTY
 *          mediumFlag -> boolean value to decide which algorithm to chose (either random move or minmax algorithm for optimal move )
 * @return: undefined (The method will just manipulate the state of board after deciding which move has to be taken)
 * **/
export const makeMachineMove = (new_board, difficulty, mediumFlag) => {
    const emptyCells = getEmptyCells(new_board);
    console.log("Medium Flag: ", mediumFlag);
    if(emptyCells.length > 0){
        const machineCell = Math.floor(Math.random() * (emptyCells.length));
        const machineCellChoice = emptyCells[machineCell];
        let machine_row = machineCellChoice[0];
        let machine_col = machineCellChoice[1];
        let bestScore = -Infinity
        let copy_board = [...new_board]
        let minDepth = Infinity
        if((!mediumFlag && difficulty === DIFFICULTY.MEDIUM) || difficulty === DIFFICULTY.HARD || difficulty === DIFFICULTY.IMPOSSIBLE) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (copy_board[i][j] === 0) {
                        copy_board[i][j] = -1;
                        let {score, d} = minimax(copy_board, 0, false, emptyCells.length - 1);
                        copy_board[i][j] = 0;
                        if (score > bestScore) {
                            bestScore = score;
                            minDepth = d;
                            machine_row = i;
                            machine_col = j;
                        } else if (score === bestScore && d < minDepth) {
                            minDepth = d;
                            machine_row = i;
                            machine_col = j;
                        }
                    }
                }
            }
        }
        new_board[machine_row][machine_col] = MARKER.SECOND_PLAYER_OR_MACHINE
    }
}