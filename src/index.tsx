// import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
// import { StyleSheet, View } from 'react-native';

import { AppBootstrap } from '@components';
import Navigator from '@config/navigator';
// import { Game, Home } from '@screens';
// import Navigaor from '@config/navigator';

export default function App(): ReactElement {
   // if (!fontLoaded) return <AppLoading />;
   return (
      <AppBootstrap>
         <Navigator />
      </AppBootstrap>
   );
}

// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//    },
// });
