import React, {useState} from 'react';
import O_red from '../assets/O_red.svg';
import O_yellow from '../assets/O_yellow.svg';
import X_red from '../assets/X_red.svg';
import X_yellow from '../assets/X_yellow.svg';

export default function Home() {

  // Board:
  // cell having value = 0 : Cell is empty
  // Cell having value = 1 : Player 1 marked on the cell
  // Cell having value = -1: Player 2 / Computer marked on the cell
  const initial_board_state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  const initialPlayerState = true;
  const initialCellLeft = 9;

  const [board, setboard] = useState(initial_board_state);
  const [player, setPlayer] = useState(initialPlayerState);
  const [cellLeft, setCellLeft] = useState(initialCellLeft);
  const [playerWon, setPlayerWon] = useState(0);
  

  // Player turn

  // Handles cell click
  const handleCellClick = (e, row, col) => {
    if(board[row][col] != 0 || playerWon != 0){
      return
    }
    let new_board = [...board];
    new_board[row][col] = player ? 1 : -1;
    setboard(new_board);
    setCellLeft(cellLeft-1);
    if(cellLeft == 0){
      // All the cells are filled, so match tied
      console.log("Match tied");
    }
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
      console.log("Someone Won");
      return true
    }
    // Nobody have won the game yet
    return false
  }

  const renderIcon = (row, col) => {
    if (board[row][col] == 1){
      return (<img src={O_red} className="h-16 w-16 mx-auto my-auto"/>)
    }else if(board[row][col] == -1){
      return (<img src={X_yellow} className="h-16 w-16 mx-auto my-auto"/>)
    }
    return null;
  }

  const playerHover = () => {
    return `${!player ? "hover:bg-yellow-200": "hover:bg-red-200"}`;
  }

  return (
      <div className="container w-screen my-auto">
        <div className={`mx-auto pt-8 pb-16}`}>
          {
            board.map((row, row_index) => {
              return (<div className="flex flex-row justify-center" key={row_index}>
                {row.map((cell, cell_index) => {
                    return <button className={`h-24 w-24 border-4 flex flex-row 
                          ${board[row_index][cell_index] != 0 || playerWon != 0 ? "cursor-not-allowed": ""}
                          ${board[row_index][cell_index] == 0 && playerWon == 0 ? playerHover() : ""}
                        border-gray-700
                          text-xs focus:outline-none`}
                        onClick = {e => handleCellClick(e, row_index, cell_index)}
                        key={cell_index}>
                        {renderIcon(row_index, cell_index)}
                      </button>
                  })
                }
              </div>)
            })
          }
        </div>
        <div className="text-center uppercase">
        {
          cellLeft <= 0 ? "Match Tied":
          playerWon != 0 ?
            (playerWon == 1 ? "First player won": "Second player won") :
            `${player ? "First": "Second"} player  turn`
        }
        </div>
      </div>
  )
}
