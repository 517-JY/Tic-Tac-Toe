// import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
// import { StyleSheet, View } from 'react-native';

import { AppBootstrap } from '@components';
import Navigator from '@config/navigator';
// import { Game, Home } from '@screens';
// import Navigaor from '@config/navigator';
import { SettingsProvider } from '@contexts/settings-context';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

export default function App(): ReactElement {
   // if (!fontLoaded) return <AppLoading />;
   return (
      <AppBootstrap>
         <SettingsProvider>
            <Navigator />
         </SettingsProvider>
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
