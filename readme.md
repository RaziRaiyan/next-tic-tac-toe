# TIC TAC TOE

## Problem Description
#### To implement a tic tac toe game having Human vs Human mode and Human vs Machine mode

## Assumptions
- Users will enter the menu screen first to chose game mode
- There will be Human vs Human mode and Human vs Machine mode
- Human Vs Human mode:
   - Players can make their move
   - If a player wins a popup menu will appear that shows who won the game
   - On Popup user can have three options either to go to main menu or to continue the game or to restart a new game
   - Users score will be shown on the game screen
   - On top of game, it will show whose player's turn is it
- Human Vs Machine mode:
    - Once the user choose vs Machine mode a popup will appear that will ask for difficulty level
    - User can chose from:
        - Easy: User can win the game easily 
        - Medium: There is a fair chance for machine to win the game
        - Hard: There is a high chance that machine will win the game or the match will end in a draw
        - Challenging: Hard plus Machine will make the first move

## Algorithms
- All the algorithms discussed below are applied to Human vs Machine mode only based on difficulty level
    - Easy: Machine will make random move on the empty cells
    - Medium: Machine will make random move and an optimal move using the minimax algorithm alternately
    - Hard: On every turn machine will make an optimal move based on minimax algorithm
    - Challenging: Similar to hard but this time machine will start first
- Minimax Algorithm: 
    - https://en.wikipedia.org/wiki/Minimax
    - https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction
    
## Framework
- NextJS
    - Since this challenge requires no backend API call, and the page is going to be static
    - NextJS makes it easy to develop static site with page routing 

## Project initialisation
- Check for node version ``` node -v ```
- Install node JS if you don't have installed:  https://nodejs.org/en/download/
- Move to tic-tac-toe directory
    ``` cd tic-tac-toe ```
    - install packages: ``` npm install```


## Tests
- Testing frameworks used:
    - React testing library
    - Jest
- There are 4 test suites containing 22 tests in total 
- To run tests, move to tic-tac-toe directory
    ``` cd tic-tac-toe ```
    - run test: ``` npm run test ```

## Run in development environment
- Move to tic-tac-toe directory
    ``` cd tic-tac-toe ```
- install packages if not already installed: ``` npm install```
- Execute command: ``` npm run dev ```
- server will start on http://localhost:3000

## Build project for production environment
- Move to tic-tac-toe directory
    ``` cd tic-tac-toe ```
- install packages if not already installed: ``` npm install```
- Execute build command: ``` npm run build ```
- Start project: ``` npm start```
- server will start on http://localhost:3000

