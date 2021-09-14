// import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, AppBootstrap } from '@components';
// import { Game, Home } from '@screens';
// import Navigaor from '@config/navigator';

export default function App(): ReactElement {
   // if (!fontLoaded) return <AppLoading />;
   return (
      <AppBootstrap>
         <View style={styles.container}>
            <Text
               onPress={() => alert(true)}
               style={{ fontSize: 25 }}
               // weight="700"
            >
               Hello World <Text weight="400">test</Text>
            </Text>
         </View>
      </AppBootstrap>
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
