import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import {
   useFonts,
   DeliusUnicase_400Regular,
   DeliusUnicase_700Bold,
} from '@expo-google-fonts/delius-unicase';
import AppLoading from 'expo-app-loading';
import { Auth } from 'aws-amplify';

type AppBootstrapProps = {
   children: ReactNode;
};

export default function AppBootstrap({
   children,
}: AppBootstrapProps): ReactElement {
   const [fontLoaded] = useFonts({
      DeliusUnicase_400Regular,
      DeliusUnicase_700Bold,
   });

   // Check user authentication status
   const [authLoaded, setAuthLoaded] = useState(false);

   useEffect(() => {
      async function checkCurrentUser() {
         try {
            const user = await Auth.currentAuthenticatedUser();
            console.log('The user is ' + user);
         } catch (error) {
            console.log(error);
         }

         // console.log('Whether is here on AppBootstrap');
         setAuthLoaded(true);
      }

      checkCurrentUser();
   }, []);

   return fontLoaded && authLoaded ? <>{children}</> : <AppLoading />;
}
