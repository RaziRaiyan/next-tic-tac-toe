import Link from "next/Link";
import React from "react";
import {MARKER} from "../pages/game";
import {DIFFICULTY, GAME_MODE} from "../pages";

const DifficultyPopup = ({callBack}) => {
    return (
        <div className="bg-black bg-opacity-50 absolute inset-0
           flex justify-center items-center z-50" data-testid={"data-difficulty-popup"}>

            <div className="relative w-5/6 sm:w-3/4 md:w-1/2 h-88 bg-gray-200
            shadow-mdGrayCenter animate-popSimple opacity-100 rounded-3xl sm:p-16 md:p-20
            flex flex-col justify-center items-center flex-wrap">
                <Link href={{
                    pathname: '/game',
                    query: { mode: GAME_MODE.VS_MACHINE, difficulty: DIFFICULTY.EASY },
                }}>
                    <a className="p-4 m-4 w-1/3 font-hairline text-center
                        cursor-pointer
                        hover:shadow-lgGreenCenter
                        bg-green-300
                        transition duration-300 ease-in-out
                        focus:outline-none uppercase shadow-mdGreenCenter rounded-full text-blueGray-800">
                        EASY
                    </a>
                </Link>
                <Link href={{
                    pathname: '/game',
                    query: { mode: GAME_MODE.VS_MACHINE, difficulty: DIFFICULTY.MEDIUM },
                }}>
                    <a className="p-4 m-4 w-1/3 font-hairline text-center
                        cursor-pointer
                        hover:shadow-lgYellowCenter
                        transition duration-300 ease-in-out
                        focus:outline-none uppercase shadow-mdYellowCenter bg-yellow-300 rounded-full text-blueGray-800">
                        Medium
                    </a>
                </Link>
                <Link href={{
                    pathname: '/game',
                    query: { mode: GAME_MODE.VS_MACHINE, difficulty: DIFFICULTY.HARD },
                }}>
                    <a className="p-4 m-4 w-1/3 font-hairline text-center
                        cursor-pointer
                        hover:shadow-lgOrangeCenter
                        transition duration-300 ease-in-out
                        focus:outline-none uppercase shadow-mdOrangeCenter bg-orange-300 rounded-full text-blueGray-800">
                        Hard
                    </a>
                </Link>
                <Link href={{
                    pathname: '/game',
                    query: { mode: GAME_MODE.VS_MACHINE, difficulty: DIFFICULTY.IMPOSSIBLE },
                }}>
                    <a className="p-4 m-4 w-1/3 font-hairline text-center
                        cursor-pointer
                        bg-red-400
                        hover:shadow-lgRedCenter
                        transition duration-300 ease-in-out
                        focus:outline-none uppercase shadow-mdRedCenter rounded-full text-blueGray-800">
                        Impossible
                    </a>
                </Link>
                <button className="absolute top-0 right-0 mt-4 focus:outline-none mr-6 text-red-500" onClick={callBack}>
                    X
                </button>
            </div>
        </div>
    )
}

export default DifficultyPopup;