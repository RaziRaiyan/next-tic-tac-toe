import React, {useState, useEffect} from 'react';
import Dialog from '../components/Dialog';
import PopUp from '../components/PopUp';
import {GAME_MODE, DIFFICULTY} from './index';
import {useRouter} from 'next/router';
import Link from 'next/Link';
import {checkWinner, makeMachineMove} from "../utils/game_logic";

export const MARKER = {
  FIRST_PLAYER: 1,
  SECOND_PLAYER_OR_MACHINE: -1
}

// Board:
// cell having value = 0 : Cell is empty
// Cell having value = 1 (MARKER.FIRST_PLAYER) : Player 1 marked on the cell
// Cell having value = -1 (MARKER.SECOND_PLAYER_OR_MACHINE): Player 2 / Computer marked on the cell
export default function Game({
                               initial_board_state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                               initialPlayerState = true,
                               initialCellLeft = 9
                             }) {
  const router = useRouter();
  const vsMachine = router.query.mode === GAME_MODE.VS_MACHINE;
  const difficulty = router.query.difficulty
  if(vsMachine && difficulty === DIFFICULTY.IMPOSSIBLE){
    initial_board_state[1][1] = -1;
    initialCellLeft = 8;
  }

  const [board, setBoard] = useState(initial_board_state);
  const [player, setPlayer] = useState(initialPlayerState);
  const [cellLeft, setCellLeft] = useState(initialCellLeft);
  const [playerWon, setPlayerWon] = useState(0);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [mediumFlag, setMediumFlag] = useState(false);

  const humanVsMachine = (human_row, human_col) => {
    if(board[human_row][human_col] !== 0 || playerWon !== 0){
      return;
    }
    let new_board = [...board];
    new_board[human_row][human_col] = MARKER.FIRST_PLAYER
    if(checkWinner(board) === MARKER.FIRST_PLAYER){
      setBoard(new_board);
      setCellLeft(cellLeft-1);
      setPlayerWon(MARKER.FIRST_PLAYER);
      setFirstPlayerScore(firstPlayerScore+1);
      return;
    }

    makeMachineMove(new_board, difficulty, mediumFlag)
    setMediumFlag(!mediumFlag);
    setBoard(new_board);
    setCellLeft(cellLeft-2);
    if(checkWinner(board) === MARKER.SECOND_PLAYER_OR_MACHINE){
      setPlayerWon(MARKER.SECOND_PLAYER_OR_MACHINE);
      setSecondPlayerScore(secondPlayerScore+1);
    }

  }

  const humanVsHuman = (row, col) => {
    let new_board = [...board];
    new_board[row][col] = player ? MARKER.FIRST_PLAYER : MARKER.SECOND_PLAYER_OR_MACHINE;
    setBoard(new_board);

    setCellLeft(cellLeft-1);
    if(checkWinner(board)){
      const winner = player ? MARKER.FIRST_PLAYER: MARKER.SECOND_PLAYER_OR_MACHINE;
      setPlayerWon(winner);
      if(winner === 1){
        setFirstPlayerScore(firstPlayerScore+1);
      }else{
        setSecondPlayerScore(secondPlayerScore+1);
      }
    }
    setPlayer(!player);
  }

  // Handles cell click
  const handleCellClick = (e, row, col) => {
    if(board[row][col] !== 0 || playerWon !== 0){
      return;
    }
    if(vsMachine){
      humanVsMachine(row, col);
    }else{
      humanVsHuman(row, col);
    }
    
  }

  const renderIcon = (row, col) => {
    if (board[row][col] === MARKER.FIRST_PLAYER){
      return (<img src="/O_orange.svg" className="h-16 w-16 mx-auto my-auto animate-pop" alt="O"/>)
    }else if(board[row][col] === -1){
      return (<img src="/X_blue.svg" className="h-16 w-16 mx-auto my-auto animate-pop" alt="X"/>)
    }
    return null;
  }

  const handleRestart = () => {
    setBoard(initial_board_state);
    setCellLeft(initialCellLeft);
    setPlayer(initialPlayerState);
    setPlayerWon(0);
    setFirstPlayerScore(0);
    setSecondPlayerScore(0);
  }

  const handleContinue = () => {
    setBoard(initial_board_state);
    setCellLeft(initialCellLeft);
    setPlayer(initialPlayerState);
    setPlayerWon(0);
  }

  const playerHover = () => {
    return `${!player ? "hover:bg-blue-200 hover:shadow-mdBlueCenter": "hover:bg-orange-200 hover:shadow-mdOrangeCenter"}`;
  }

  return (
      <div className="container w-screen my-auto rounded-lg mb-4">
        {
          (playerWon !== 0 || cellLeft <= 0) && <PopUp playerWon={playerWon} vsMachine={vsMachine}
                                                       callBackHandleContinue={handleContinue}
                                                       callBackHandleRestart={handleRestart}/>
        }

        <div className={`flex justify-center md:mb-10 items-center`} data-testid="data-game-dialog-container">
          {
            !vsMachine && <Dialog player={player} playerWon={playerWon} cellLeft={cellLeft}/>
          }
          
        </div>
        <div className="flex items-center justify-around md:flex-row flex-col">

          <div className="flex md:hidden w-full justify-between">
            <div className="text-3xl md:text-6xl font-bold text-blueGray-700 w-1/4 text-center flex-row md:flex-col flex md:hidden justify-center items-center">
              <img rel="o" src="/O_orange.svg" className="md:h-12 md:w-12 w-10 h-10"/>
              {firstPlayerScore}
            </div>

            <div className="text-3xl md:text-6xl font-bold text-blueGray-700 w-1/4 text-center flex-row-reverse md:flex-col flex md:hidden justify-center items-center">
              <img rel="o" src="/X_blue.svg" className="md:h-12 md:w-12 w-10 h-10"/>
              {secondPlayerScore}
            </div>
          </div>

          <div className="text-6xl font-bold text-blueGray-700 w-1/4 text-center flex-col justify-center items-center hidden md:flex">
            <img rel="o" src="/O_orange.svg" className="h-12 w-12"/>
            {firstPlayerScore}
          </div>
          
          <div className={`mx-auto}`} data-testid="data-game-row-container">
          {
            board.map((row, row_index) => {
              return (<div className="flex flex-row justify-center" key={row_index} data-testid="data-game-cell-container">
                {row.map((cell, cell_index) => {
                    return <button  data-testid="data-game-cell"
                          className={`h-24 w-24 flex flex-row 
                          shadow-mdPurpleCenter
                          ${board[row_index][cell_index] !== 0 || playerWon !== 0 ? "cursor-not-allowed": ""}
                          ${board[row_index][cell_index] === 0 && playerWon === 0 ? playerHover() : ""}
                          m-2 rounded-md
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
          <div className="text-6xl font-bold text-blueGray-700 w-1/4 text-center flex-col md:flex hidden justify-center items-center">
            <img rel="o" src="/X_blue.svg" className="h-12 w-12 flex-shrink-0"/>
            {secondPlayerScore}
          </div>
        </div>
        
          <div className="flex justify-center mt-8 items-center">
            <Link href="/">
              <a className="h-10 w-10 m-4 rounded-full shadow-cell flex justify-center items-center focus:outline-none cursor-pointer">
                <img rel="menu" src="/menu.svg"/>
              </a>
            </Link>
            <button className="h-10 w-10 m-4 rounded-full shadow-cell flex justify-center items-center focus:outline-none" onClick={() => handleRestart()}>
              <img rel="restart" src="/restart.svg"/>
            </button>
          </div>
      </div>
  )
}

