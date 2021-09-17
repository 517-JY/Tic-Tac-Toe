import { GradientBackground } from '@components';
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './single-player-game.styles';
import { Board } from '@components';
import {
   printFormattedBoard,
   BoardState,
   isEmpty,
   isTerminal,
   getBestMove,
   Cell,
   useSounds,
} from '@utils';

export default function SinglePlayerGame(): ReactElement {
   // const b: BoardState = ['o', 'o', 'x', 'x', 'o', null, 'x', 'o', null];
   // ['o', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'o']
   // [null, null, null, null, null, null, null, null, null]
   const [state, setState] = useState<BoardState>([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
   ]);

   const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(
      Math.random() < 0.5 ? 'HUMAN' : 'BOT'
   );

   const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);

   const playSound = useSounds();

   const gameResult = isTerminal(state);

   const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
      const stateCopy: BoardState = [...state];

      if (stateCopy[cell] || isTerminal(stateCopy)) {
         return;
      }

      stateCopy[cell] = symbol;
      setState(stateCopy);

      try {
         // Add sound
         symbol === 'x' ? playSound('pop1') : playSound('pop2');
      } catch (error) {
         console.log(error);
      }
   };

   const handleOnCellPressed = (cell: number): void => {
      if (turn !== 'HUMAN') {
         return;
      }
      insertCell(cell, isHumanMaximizing ? 'x' : 'o');
      setTurn('BOT');
   };

   const getWinner = (winnerSymbol: Cell): 'HUMAN' | 'BOT' | 'DRAW' => {
      if (winnerSymbol === 'x') {
         return isHumanMaximizing ? 'HUMAN' : 'BOT';
      }

      if (winnerSymbol === 'o') {
         return isHumanMaximizing ? 'BOT' : 'HUMAN';
      }

      return 'DRAW';
   };

   useEffect(() => {
      if (gameResult) {
         // TODO: Check - handle when game is over
         const winner = getWinner(gameResult.winner);

         if (winner === 'HUMAN') {
            playSound('win');
            alert('You Won!');
         }

         if (winner === 'BOT') {
            playSound('loss');
            alert('You Lost! Try it again!');
         }

         if (winner === 'DRAW') {
            playSound('draw');
            alert("It's a Draw!");
         }
      } else {
         if (turn === 'BOT') {
            // Best to start from center or corner
            if (isEmpty(state)) {
               const centerAndCorners = [0, 2, 6, 8, 4];
               // Choose the first move randomly from the centerAndCorners Array
               const firstMove =
                  centerAndCorners[
                     Math.floor(Math.random() * centerAndCorners.length)
                  ];
               insertCell(firstMove, 'x');
               // Bot starts first, it's the bot who maximum its score
               setIsHumanMaximizing(false);
               // Set turn to "HUMAN"
               setTurn('HUMAN');
            } else {
               const best = getBestMove(state, !isHumanMaximizing, 0, -1);
               insertCell(best, isHumanMaximizing ? 'o' : 'x');
               setTurn('HUMAN');
            }
         }
      }
   }, [state, turn]);

   // printFormattedBoard(state);
   // console.log(isEmpty(b));
   // console.log(isFull(b));
   // console.log(getAvailableMoves(b));
   // console.log(isTerminal(state));

   return (
      <GradientBackground>
         <SafeAreaView style={styles.container}>
            <Board
               disabled={Boolean(isTerminal(state)) || turn !== 'HUMAN'} // when board game is terminal, then player should be disabled
               onCellPressed={(cell) => {
                  handleOnCellPressed(cell);
               }}
               state={state}
               size={300}
            />
         </SafeAreaView>
      </GradientBackground>
   );
}
