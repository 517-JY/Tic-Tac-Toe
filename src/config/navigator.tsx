import React, { ReactElement } from 'react';
// import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Game } from '@screens';

export type StackNavigatorParams = {
   Home: undefined;
   Game: { gameId: string };
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();
export default function Navigator(): ReactElement {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Game" component={Game}></Stack.Screen>
         </Stack.Navigator>
      </NavigationContainer>
   );
}
