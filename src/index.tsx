import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Game, Home } from '@screens';
// import Navigaor from '@config/navigator';

export default function App() {
   return (
      <View style={styles.container}>
         {/* <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" /> */}
         <Image source={require('@assets/icon.png')} />
         {/* <Home />
         <Game /> */}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
