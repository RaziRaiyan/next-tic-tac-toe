import React, {useState} from 'react';

export default function Home() {

  // Board:
  // cell having value = 0 : Cell is empty
  // Cell having value = 1 : Player 1 marked on the cell
  // Cell having value = -1: Player 2 / Computer marked on the cell
  let initial_board_state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  const [board, setboard] = useState(initial_board_state);
  

  // Player turn
  let player = false;

  // Handles cell click
  const handleCellClick = (e, row, col) => {
    console.log(row, col);
    let new_board = [...board];
    new_board[row][col] = player ? 1 : -1;
    player = !player;
    setboard(new_board);
  }

  return (
    <div className="h-screen">
      <div className="bg-teal-100">
        Tic Tac Toe

        
      </div>
      <div className="container w-screen h-full my-auto">

        <div className="mx-auto">
          {
            board.map((row, row_index) => {
              return (<div className="flex flex-row justify-center" key={row_index}>
                {row.map((cell, cell_index) => {
                    return <button className="h-24 w-24 border-2 flex flex-row border-gray-700 text-xs hover:bg-teal-200 focus:outline-none"
                        onClick = {e => handleCellClick(e, row_index, cell_index)}
                        key={cell_index}>
                        {`${row_index}, ${cell_index}`}
                      </button>
                  })
                }
              </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}
