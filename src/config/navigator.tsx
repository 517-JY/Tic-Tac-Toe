import React, { ReactElement } from 'react';
// import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
   createNativeStackNavigator,
   NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Home, SinglePlayerGame, Settings } from '@screens';
import { colors } from '@utils';

export type StackNavigatorParams = {
   Home: undefined;
   SinglePlayerGame: undefined;
   Settings: undefined;
};

const navigatorOptions: NativeStackNavigationOptions = {
   headerStyle: {
      backgroundColor: colors.lightYellow,
   },
   headerShadowVisible: false,
   headerTintColor: colors.darkGrey,
   headerTitleAlign: 'center',
   headerTitleStyle: {
      fontFamily: 'DeliusUnicase_700Bold',

      // DeliusUnicase_700Bold
      fontSize: 16,
   },
   headerBackTitleStyle: {
      fontFamily: 'DeliusUnicase_400Regular',

      // DeliusUnicase_700Bold
      fontSize: 14,
   },
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();
export default function Navigator(): ReactElement {
   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen
               name="Home"
               component={Home}
               options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
               name="SinglePlayerGame"
               component={SinglePlayerGame}
               options={{ headerShown: true }}
            ></Stack.Screen>
            <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
         </Stack.Navigator>
      </NavigationContainer>
   );
}
