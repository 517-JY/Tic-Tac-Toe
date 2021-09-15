import { GradientBackground } from '@components';
import React, { ReactElement } from 'react';
import { Text, SafeAreaView } from 'react-native';
import styles from './single-player-game.styles';
import { Board } from '@components';

export default function SinglePlayerGame(): ReactElement {
   return (
      <GradientBackground>
         <SafeAreaView style={styles.container}>
            <Board
               onCellPressed={(index) => {
                  alert(index);
               }}
               state={['x', 'o', null, 'x', 'o', null, 'x', 'o', null]}
               size={300}
            />
         </SafeAreaView>
      </GradientBackground>
   );
}
