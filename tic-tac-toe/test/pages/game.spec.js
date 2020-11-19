import React from 'react';
import {render, fireEvent} from '../test-utils';
import { cleanup } from '@testing-library/react'
import Game from "../../pages/game";


jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/game",
            pathname: "",
            query: {
                mode: "VS_HUMAN"
            },
            asPath: "",
        };
    },
}));

describe("Pages", () => {
    describe("game_vs_human", () => {
        let expectedProps;
        let wrapper;

        beforeEach(() => {
            expectedProps = {
                initial_board_state: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                initialPlayerState: true,
                initialCellLeft: 9
            }

            wrapper = render(<Game {...expectedProps}/>);
        });

        afterEach(cleanup)

        test("Should not have dialog component that shows player turn", () => {
            expect(wrapper.getByTestId('data-game-dialog-container').childNodes.length).toBe(1);
        })

        test("Should render three rows in one whole box", () => {
            expect(wrapper.getByTestId('data-game-row-container').childNodes.length).toBe(3);
        })

        test("Should render three cells for each row", () => {
            expect(wrapper.getAllByTestId('data-game-cell-container').length).toBe(3);
        })

        test("Should render nine cells", () => {
            const cell_wrapper = wrapper.getAllByTestId('data-game-cell');
            expect(cell_wrapper.length).toBe(9);
        })

        test("Should render icon on cell click and not before that", async() => {
            const cell_wrapper = wrapper.getAllByTestId('data-game-cell');
            cell_wrapper.every((cell) => {
                expect(cell.childNodes.length).toBe(0)
                fireEvent.click(cell)
                expect(cell.childNodes.length).toBe(1)
            })
        })

    })

    describe("game_vs_human_someone_wins", () => {
        let expectedProps;
        let wrapper;

        beforeEach(() => {
            expectedProps = {
                // Board:   O | O |
                //        ____|___|___
                //            |   |
                //        ````|```|````
                //          x | x |
                // If We simulate click on top right corner cell we can simulate
                // first player as a winner
                initial_board_state: [[1, 1, 0], [0, 0, 0], [-1, -1, 0]],
                initialPlayerState: true,
                initialCellLeft: 5
            }

            wrapper = render(<Game {...expectedProps}/>);
        });

        afterEach(cleanup)

        test("Should not allow cursor to click in exactly four cells since we have played on four cells already", () => {
            wrapper = render()
            const cell_wrapper = wrapper.getAllByTestId('data-game-cell');
            let count = 0;
            cell_wrapper.forEach(cell => {
                if(cell.className.includes("cursor-not-allowed")){
                    count++;
                }
            })
            expect(count).toBe(4)
        })
    })
})

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/game",
            pathname: "",
            query: {
                mode: "VS_HUMAN"
            },
            asPath: "",
        };
    },
}));

describe("Pages", () => {
    describe("game_vs_machine", () => {
        let expectedProps;

        beforeEach(() => {
            expectedProps = {
                initial_board_state: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                initialPlayerState: true,
                initialCellLeft: 9
            }
        });

        test("Should have a dialog component that shows player turn", () => {
            const wrapper = render(<Game />);
            expect(wrapper.getByTestId('data-game-dialog-container').childNodes.length).toBe(1);
        })
    })
})