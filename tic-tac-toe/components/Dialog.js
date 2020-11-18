const Dialog = ({player, playerWon, cellLeft}) => {

    const showText = ()=>{
        return `${player ? "First": "Second"} player  turn`;
    }

    return (
        <div className={`text-center py-2 px-6 uppercase text-xl font-hairline
         text-blueGray-600 inline-block rounded-full ${(playerWon != 0 || cellLeft <= 0) && "opacity-0"}`}>
            {showText()}
        </div>
    )
}

export default Dialog;