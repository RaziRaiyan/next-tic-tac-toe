import React from 'react';
import {render} from '../test-utils';
import PopUp from "../../components/PopUp";
import {MARKER} from "../../pages/game";

describe('Components', () =>{
    describe('Popup', () => {
        let expectedProps;

        beforeEach(() => {
            expectedProps = {
                // playerWon: 0 -> No player won
                playerWon: 0,
                vsMachine: false,
                callBackHandleContinue: () => {},
                callBackHandleRestart: () => {}
            }
        });

        test("Should show match tied when no one wins that when playerWon is 0", () => {
            const {getByTestId} = render(<PopUp {...expectedProps}/>);
            expect(getByTestId('data-popup-text')).toHaveTextContent("Match Tied");
        })

        test("Should show first player won when first player wins the game and game mode is human vs human", () => {
            const props = {...expectedProps, playerWon: MARKER.FIRST_PLAYER}
            const {getByTestId} = render(<PopUp {...props}/>);
            expect(getByTestId('data-popup-text')).toHaveTextContent("First Player Won");
        })

        test("Should show second player won when second player wins the game and it game mode is human vs human", () => {
            const props = {...expectedProps, playerWon: MARKER.SECOND_PLAYER_OR_MACHINE}
            const {getByTestId} = render(<PopUp {...props}/>);
            expect(getByTestId('data-popup-text')).toHaveTextContent("Second Player Won");
        })

        test("Should show you won player wins and game mode is human vs machine", () => {
            const props = {...expectedProps, playerWon: MARKER.FIRST_PLAYER, vsMachine: true};
            const {getByTestId} = render(<PopUp {...props}/>);
            expect(getByTestId('data-popup-text')).toHaveTextContent("You Won")
        })

        test("Should show machine won player wins and game mode is human vs machine", () => {
            const props = {...expectedProps, playerWon: MARKER.SECOND_PLAYER_OR_MACHINE, vsMachine: true};
            const {getByTestId} = render(<PopUp {...props}/>);
            expect(getByTestId('data-popup-text')).toHaveTextContent("Machine Won")
        })
    })
})

