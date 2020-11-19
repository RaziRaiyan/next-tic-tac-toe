
import {checkWinner, getEmptyCells} from "../../utils/game_logic";
import {MARKER} from "../../pages/game";

describe("Game Logic", () => {
    let board;

    beforeEach(() => {
        board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    })

    test("Should have no winner", () => {
        let result = checkWinner(board);
        expect(result).toBe(0);
    })

    test("Should have player 1 as winner", () => {
        for(let i=0; i<3; i++){
            board[i][0] = MARKER.FIRST_PLAYER;
        }

        let result = checkWinner(board);

        expect(result).toBe(MARKER.FIRST_PLAYER)
    })

    test("Should have player 2 or machine as winner", () => {
        for(let i=0; i<3; i++){
            board[i][0] = MARKER.SECOND_PLAYER_OR_MACHINE;
        }

        let result = checkWinner(board);

        expect(result).toBe(MARKER.SECOND_PLAYER_OR_MACHINE)
    })

    test("Should have nine empty cells when no player have made any move", () => {
        expect(getEmptyCells(board).length).toBe(9);
    })

    test("Should have zero empty cells left that indicates match ends in a draw", () => {
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                board[i][j] = 1
            }
        }
        expect(getEmptyCells(board).length).toBe(0);
    })


})