import React, { ReactElement } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import styles from './home.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigatorParams } from '@config/navigator';
import { GradientBackground } from '@components';

type HomeProps = {
   navigation: NativeStackNavigationProp<StackNavigatorParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps): ReactElement {
   return (
      <GradientBackground>
         <ScrollView contentContainerStyle={styles.container}>
            <Text>Home</Text>
            <Button
               title="Game"
               onPress={() => {
                  navigation.navigate('Game', { gameId: '517' });
               }}
            ></Button>
         </ScrollView>
      </GradientBackground>
   );
}
