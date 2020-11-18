import React from 'react';
import {render} from '../test-utils';
import Dialog from '../../components/Dialog';

describe('Component', () => {
    describe('Dialog', () => {

        let expectedProps;

        beforeEach(() => {
            expectedProps = {
                player: false,
                playerWon: 0,
                cellLeft: 9
            }
        })

        test('Should show first player turn', () => {
            const props = {...expectedProps, player: true};
            const {getByText} = render(<Dialog {...props}/>);
            const firstPlayerWinnerText = getByText("First player turn");

            expect(firstPlayerWinnerText).toBeVisible();
        });

        test('Should shoe second player turn', () => {
            const props = {...expectedProps, player: false};
            const {getByText} = render(<Dialog {...props}/>);
            const secondPlayerWinnerText = getByText("Second player turn");
            expect(secondPlayerWinnerText).toBeVisible();
        })

        test('Should have opacity 0 when a first player wins', () => {
            const props = {...expectedProps, playerWon: 1};
            const {getByTestId} = render(<Dialog {...props}/>);
            expect(getByTestId('data-dialog')).toHaveClass('opacity-0');
        })

        test('Should have opacity 0 when a second player or machine wins', () => {
            const props = {...expectedProps, playerWon: -1};
            const {getByTestId} = render(<Dialog {...props}/>);
            expect(getByTestId('data-dialog')).toHaveClass('opacity-0');
        })
    });
})

