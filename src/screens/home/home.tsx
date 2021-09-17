import React, { ReactElement } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './home.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigatorParams } from '@config/navigator';
import { GradientBackground, Button } from '@components';

type HomeProps = {
   navigation: NativeStackNavigationProp<StackNavigatorParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps): ReactElement {
   return (
      <GradientBackground>
         <ScrollView contentContainerStyle={styles.container}>
            {/* <Text>Home</Text>
            <Button
               title="Game"
               onPress={() => {
                  navigation.navigate('Game', { gameId: '517' });
               }}
            ></Button> */}

            <Image style={styles.logo} source={require('@assets/logo.png')} />
            <View style={styles.buttons}>
               <Button
                  onPress={() => {
                     navigation.navigate('SinglePlayerGame');
                  }}
                  style={styles.button}
                  title="Single Player"
               />
               <Button style={styles.button} title="MultiPlayer" />
               <Button
                  onPress={() => {
                     navigation.navigate('Login');
                  }}
                  style={styles.button}
                  title="Login"
               />
               <Button
                  onPress={() => {
                     navigation.navigate('Settings');
                  }}
                  style={styles.button}
                  title="Settings"
               />
            </View>
         </ScrollView>
      </GradientBackground>
   );
}
