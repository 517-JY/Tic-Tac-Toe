import { GradientBackground } from '@components';
import React, { ReactElement, useState } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './single-player-game.styles';
import { Board } from '@components';
import {
   printFormattedBoard,
   BoardState,
   isEmpty,
   isFull,
   getAvailableMoves,
   isTerminal,
} from '@utils';

export default function SinglePlayerGame(): ReactElement {
   const b: BoardState = ['o', 'o', 'x', 'x', 'o', null, 'x', 'o', null];
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

   const handleOnCellPressed = (cell: number): void => {
      const stateCopy: BoardState = [...state];

      if (stateCopy[cell] || isTerminal(stateCopy)) {
         return;
      }

      stateCopy[cell] = 'x';
      setState(stateCopy);
   };

   printFormattedBoard(state);
   // console.log(isEmpty(b));
   // console.log(isFull(b));
   // console.log(getAvailableMoves(b));
   console.log(isTerminal(state));

   return (
      <GradientBackground>
         <SafeAreaView style={styles.container}>
            <Board
               disabled={Boolean(isTerminal(state))} // when board game is terminal, then player should be disabled
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
