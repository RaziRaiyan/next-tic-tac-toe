import Link from 'next/Link';
import React, {useState} from "react";
import DifficultyPopup from "../components/DifficultyPopup";

export const GAME_MODE = {
    VS_HUMAN: "VS_HUMAN",
    VS_MACHINE: "VS_MACHINE"
}

export const DIFFICULTY = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
    IMPOSSIBLE: "IMPOSSIBLE"
}

/**
 * @description: renders out menu screen where user can chose game mode and difficulty
 * */
const Home = () => {

    const [vsMachine, setVsMachine] = useState(false);

    return (
        <div className="font-semibold text-center">
            {vsMachine && <DifficultyPopup callBack={(e) => setVsMachine(false)}/>}
            <div className="flex justify-evenly mt-10">
                <img rel="Logo" src="/X_blue.svg" className="h-20"/>
                <img rel="Logo" src="/O_orange.svg" className="h-20"/>
            </div>
            <div className="sm:text-2xl mb-10 text-blue-400 font-hairline tracking-widest">
                Choose your play mode
            </div>
            <div className="flex flex-col items-center uppercase mb-16">
                <Link href={{
                            pathname: '/game',
                            query: { mode: GAME_MODE.VS_HUMAN },
                        }}>
                    <a className="p-4 m-4 sm:w-3/4 text-center
                        cursor-pointer
                        hover:shadow-lgIndigoCenter
                        transition duration-300 ease-in-out
                        focus:outline-none uppercase shadow-mdIndigoCenter
                        font-hairline
                    bg-indigo-500 rounded-full text-gray-100">
                        With Friend
                    </a>
                </Link>
                <button
                    className="p-4 m-4 sm:w-3/4 text-center
                        cursor-pointer
                        hover:shadow-lgIndigoCenter
                        transition duration-300 ease-in-out
                        focus:outline-none uppercase shadow-mdIndigoCenter
                        font-hairline
                        bg-blue-500 rounded-full text-gray-100"
                    onClick={(e) => setVsMachine(true)}>
                    With Machine
                </button>
            </div>
        </div>
    )
}

export default Home;