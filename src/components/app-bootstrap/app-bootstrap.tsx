import React, {
   createContext,
   ReactElement,
   ReactNode,
   useEffect,
   useState,
   Dispatch,
   SetStateAction,
} from 'react';
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

type AuthContextType = {
   user: { [key: string]: any } | null;
   setUser: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AppBootstrap({
   children,
}: AppBootstrapProps): ReactElement {
   const [fontLoaded] = useFonts({
      DeliusUnicase_400Regular,
      DeliusUnicase_700Bold,
   });

   // Check user authentication status
   const [authLoaded, setAuthLoaded] = useState(false);
   const [user, setUser] = useState<{ [key: string]: any } | null>(null);

   useEffect(() => {
      async function checkCurrentUser() {
         try {
            const user = await Auth.currentAuthenticatedUser();
            // console.log('The user is ' + user);
            setUser(user);
         } catch (error) {
            // console.log(error);
            setUser(null);
         }

         // console.log('Whether is here on AppBootstrap');
         setAuthLoaded(true);
      }

      checkCurrentUser();
   }, []);

   return fontLoaded && authLoaded ? (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   ) : (
      <AppLoading />
   );
}
