// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
   useFonts,
   DeliusUnicase_400Regular,
   DeliusUnicase_700Bold,
} from '@expo-google-fonts/delius-unicase';
import AppLoading from 'expo-app-loading';
import { Text } from '@components';
// import { Game, Home } from '@screens';
// import Navigaor from '@config/navigator';

export default function App() {
   const [fontLoaded] = useFonts({
      DeliusUnicase_400Regular,
      DeliusUnicase_700Bold,
   });
   if (!fontLoaded) return <AppLoading />;
   return (
      <View style={styles.container}>
         {/* <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
         <Image source={require('@assets/icon.png')} />
         <Home />
         <Game /> */}

         <Text
            onPress={() => alert(true)}
            style={{ fontSize: 25 }}
            // weight="700"
         >
            Hello World <Text weight="400">test</Text>
         </Text>
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
