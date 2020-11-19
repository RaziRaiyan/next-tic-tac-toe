import Link from "next/Link";
import React from "react";
import {MARKER} from "../pages/game";

/**
 * @description: renders popup when any of the user or machine wins the game or match ties
 * @props: playerWon <MARKER>:
 *         vsMachine <boolean>
 *         callBackHandleContinue < fn() >
 *         callBackHandleRestart < fn() >
 * */
const PopUp = ({playerWon, vsMachine, callBackHandleContinue, callBackHandleRestart}) => {

    let text = "Match Tied";
    let logo = null;

    if(playerWon === MARKER.FIRST_PLAYER){
        logo = (<img rel="winner_logo" src="/O_orange.svg" alt="O"/>);
        if(vsMachine){
            text = "You Won"
        }else{
            text = "First Player Won"
        }
    }else if(playerWon === MARKER.SECOND_PLAYER_OR_MACHINE){
        logo = (<img rel="winner_logo" src="/X_blue.svg" alt="X"/>);
        if(vsMachine){
            text = "Machine Won"
        }else{
            text = "Second Player Won"
        }
    }

    return (
        <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center z-50" data-testid={"data-popup"}>
            <div className="w-5/6 sm:w-3/4 md:w-1/2 h-64 bg-gray-200 shadow-mdGrayCenter animate-popSimple opacity-100 rounded-3xl flex flex-col justify-center items-center">
                <div className="h-16 w-16 mb-4 mt-4">
                    {logo}
                </div>
                <div className={`text-blueGray-700 text-3xl font-hairline mb-2`} data-testid="data-popup-text">
                    {text}
                </div>
                <div className="flex justify-center items-center">
                    <Link href="/">
                        <a className="h-12 w-12 m-4 rounded-full shadow-cell flex justify-center items-center focus:outline-none cursor-pointer">
                            <img rel="menu" src="/menu.svg" alt="menu"/>
                        </a>
                    </Link>
                    <button className="h-16 w-16 m-4 rounded-full shadow-cell flex justify-center items-center focus:outline-none"
                            onClick={() => callBackHandleContinue()}>
                        <img className="h-6 w-6" rel="continue" src="/continue.svg" alt="continue"/>
                    </button>
                    <button className="h-12 w-12 m-4 rounded-full shadow-cell flex justify-center items-center focus:outline-none"
                            onClick={() => callBackHandleRestart()}>
                        <img rel="restart" src="/restart.svg" alt="restart"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopUp;