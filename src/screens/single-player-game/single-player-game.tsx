import { GradientBackground } from '@components';
import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './single-player-game.styles';
import { Board } from '@components';
import {
   printFormattedBoard,
   BoardState,
   isEmpty,
   isTerminal,
   getBestMove,
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

   const gameResult = isTerminal(state);

   const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
      const stateCopy: BoardState = [...state];

      if (stateCopy[cell] || isTerminal(stateCopy)) {
         return;
      }

      stateCopy[cell] = symbol;
      setState(stateCopy);
   };

   const handleOnCellPressed = (cell: number): void => {
      if (turn !== 'HUMAN') {
         return;
      }
      insertCell(cell, isHumanMaximizing ? 'x' : 'o');
      setTurn('BOT');
   };

   useEffect(() => {
      if (gameResult) {
         alert('Game Over');
         // TODO: handle when game is over
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
               const best = getBestMove(state, !isHumanMaximizing, 0, 2);
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
