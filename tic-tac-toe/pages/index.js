import React, {useState, useEffect} from 'react';
import Dialog from '../components/Dialog';

export default function Home() {

  // Board:
  // cell having value = 0 : Cell is empty
  // Cell having value = 1 : Player 1 marked on the cell
  // Cell having value = -1: Player 2 / Computer marked on the cell
  const initial_board_state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  const initialPlayerState = true;
  const initialCellLeft = 9;

  const initialState = {
    board: initial_board_state,
    player: initialPlayerState,
    cellLeft: initialCellLeft
  }

  const [state, setState] = useState(initialState);

  const [board, setboard] = useState(initial_board_state);
  const [player, setPlayer] = useState(initialPlayerState);
  const [cellLeft, setCellLeft] = useState(initialCellLeft);
  const [playerWon, setPlayerWon] = useState(0);
  const vsMachine = false;

  console.log("Rendered")

  // Gets empty cells
  const getEmptyCells = (new_board) => {
    let emptyCells = [];
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(new_board[i][j] == 0){
          emptyCells.push([i, j]);
        }
      }
    }
    return emptyCells;
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // useEffect(() => {
  //   machinePlay()
  // }, [machineTurn])

  const machinePlay = (human_row, human_col) => {

    if(board[human_row][human_col] != 0 || playerWon != 0){
      return;
    }
    let new_board = [...board];
    new_board[human_row][human_col] = player ? 1 : -1;
    if(checkWinner()){
      setboard(new_board);
      setCellLeft(cellLeft-1);
      setPlayerWon(1);
      return;
    }

    const emptyCells = getEmptyCells(new_board);
    if(emptyCells.length > 0){
      const machineCell = Math.floor(Math.random() * (emptyCells.length));
      const machineCellChoice = emptyCells[machineCell];
      const machine_row = machineCellChoice[0];
      const machine_col = machineCellChoice[1];
      new_board[machine_row][machine_col] = player ? -1: 1;
    }
    setboard(new_board);
    setCellLeft(cellLeft-1);
    if(checkWinner()){
      setPlayerWon(-1);
    }
  }


  // Handles cell click
  const handleCellClick = (e, row, col) => {
    if(board[row][col] != 0 || playerWon != 0){
      return;
    }
    if(vsMachine){
      console.log("Machine play")
      machinePlay(row, col);
    }else{
      console.log("Human play")
      humanVsHuman(row, col);
    }
    
  }

  const humanVsHuman = (row, col) => {
    let new_board = [...board];
    new_board[row][col] = player ? 1 : -1;
    setboard(new_board);

    setCellLeft(cellLeft-1);
    if(checkWinner()){
      setPlayerWon(player ? 1: -1);
    }
    setPlayer(!player);
  }

  // Returns true: Someone won depending on whose turn it was
  // Returns false: Nobody Won
  const checkWinner = () => {
    if(
      // Horizontal rows Check
    (board[0][0] != 0 && board[0][0] == board[0][1] && board[0][0] == board[0][2]) ||
    (board[1][0] != 0 && board[1][0] == board[1][1] && board[1][0] == board[1][2])  ||
    (board[2][0] != 0 && board[2][0] == board[2][1] && board[2][0] == board[2][2]) ||

      // Vertical columns Check
    (board[0][0] != 0 && board[0][0] == board[1][0] && board[0][0] == board[2][0]) ||
    (board[0][1] != 0 && board[0][1] == board[1][1] && board[0][1] == board[2][1]) ||
    (board[0][2] != 0 && board[0][2] == board[1][2] && board[0][2] == board[2][2]) ||
    
      // Diagonals Check
    (board[0][0] != 0 && board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||
    (board[2][0] != 0 && board[2][0] == board[1][1] && board[2][0] == board[0][2])
    ){
      // Someone won the game
      // If it was player 1's turn: Player 1 won
      // If it was player 2's turn / computer's turn: Player 2 / Computer won
      return true
    }
    // Nobody have won the game yet
    return false
  }

  const renderIcon = (row, col) => {
    if (board[row][col] == 1){
      return (<img src="/O_orange.svg" className="h-16 w-16 mx-auto my-auto animate-pop"/>)
    }else if(board[row][col] == -1){
      return (<img src="/X_blue.svg" className="h-16 w-16 mx-auto my-auto animate-pop"/>)
    }
    return null;
  }

  const playerHover = () => {
    return `${!player ? "hover:bg-blue-200": "hover:bg-orange-200"}`;
  }

  return (
      <div className="container w-screen my-auto rounded-lg">

        <div className="flex justify-center mb-10">
          <Dialog player={player} playerWon={playerWon} cellLeft={cellLeft}/>
        </div>
        <div className={`mx-auto}`}>
          {
            board.map((row, row_index) => {
              return (<div className="flex flex-row justify-center" key={row_index}>
                {row.map((cell, cell_index) => {
                    return <button className={`h-24 w-24 flex flex-row 
                          ${board[row_index][cell_index] != 0 || playerWon != 0 ? "cursor-not-allowed": ""}
                          ${board[row_index][cell_index] == 0 && playerWon == 0 ? playerHover() : ""}
                          shadow-cell m-2 rounded-md
                          text-xs focus:outline-none`}
                        onClick = {e => handleCellClick(e, row_index, cell_index, true)}
                        key={cell_index}>
                        {renderIcon(row_index, cell_index)}
                      </button>
                  })
                }
              </div>)
            })
          }
        </div>
      </div>
  )
}
