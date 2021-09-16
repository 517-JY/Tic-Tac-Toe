import { GradientBackground } from '@components';
import React, { ReactElement } from 'react';
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

// TODO: Recap
export default function SinglePlayerGame(): ReactElement {
   const b: BoardState = ['o', 'o', 'x', 'x', 'o', null, 'x', 'o', null];
   // ['o', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'o']
   // [null, null, null, null, null, null, null, null, null]
   printFormattedBoard(b);
   // console.log(isEmpty(b));
   // console.log(isFull(b));
   // console.log(getAvailableMoves(b));
   console.log(isTerminal(b));

   return (
      <GradientBackground>
         <SafeAreaView style={styles.container}>
            <Board
               onCellPressed={(index) => {
                  alert(index);
               }}
               state={b}
               size={300}
            />
         </SafeAreaView>
      </GradientBackground>
   );
}
