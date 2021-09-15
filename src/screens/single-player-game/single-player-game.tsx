import { GradientBackground } from '@components';
import React, { ReactElement } from 'react';
import { Text, SafeAreaView } from 'react-native';
import styles from './single-player-game.styles';

export default function SinglePlayerGame(): ReactElement {
   return (
      <GradientBackground>
         <SafeAreaView style={styles.container}>
            <Text style={{ color: '#fff' }}>Game</Text>
         </SafeAreaView>
      </GradientBackground>
   );
}
