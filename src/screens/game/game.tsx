import { GradientBackground } from '@components';
import React from 'react';
import { View, Text } from 'react-native';
import styles from './game.styles';

export default function Game() {
   return (
      <GradientBackground>
         <View style={styles.container}>
            <Text>Game</Text>
         </View>
      </GradientBackground>
   );
}
