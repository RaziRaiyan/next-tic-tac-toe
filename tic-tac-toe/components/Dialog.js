const Dialog = ({player, playerWon, cellLeft}) => {

    const showText = ()=>{
        if(playerWon != 0){
            if(playerWon == 1){
                return "First player won"
            }else{
                return "Second player won"
            }
        }else if(cellLeft <= 0){
            return "Match Tied"
        }else{
            return `${player ? "First": "Second"} player  turn`;
        }
    }

    return (
        <div className={`text-center p-2 uppercase text-2xl shadow-mdBlue
            bg-gradient-to-r from-teal-400 to-teal-500
         text-white inline-block rounded-lg`}>
            {showText()}
        </div>
    )
}

export default Dialog;