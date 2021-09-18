import React, { ReactElement, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput } from 'react-native';
import { GradientBackground, TextInput, Button } from '@components';
import styles from './login.styles';
import { Auth } from 'aws-amplify';
import { colors } from '@utils';

export default function Login(): ReactElement {
   const passwordRef = useRef<NativeTextInput | null>(null);
   // Create state object to obtain the user form info
   const [form, setForm] = useState({
      username: 'test',
      password: '12345678',
   });

   const setFormInput = (key: keyof typeof form, value: string) => {
      setForm({ ...form, [key]: value });
   };

   const [loading, setLoading] = useState(false);

   // Handles the login functionality with API
   const login = async () => {
      setLoading(true);
      const { username, password } = form;
      console.log(username, password);

      // Async function
      try {
         const result = await Auth.signIn(username, password);
         console.log(result);
      } catch (error) {
         console.log(error);
         //  Alert.alert('Error!', error?.message || 'Unkown error');
      }

      setLoading(false);
   };

   //    const signup = async () => {
   //       try {
   //          const result = await Auth.signUp({
   //             username: 'test',
   //             password: '12345678',
   //             // Attributes are decided when configuring AWS Amplify
   //             attributes: {
   //                email: 'test@test.com',
   //                name: 'TestTest',
   //             },
   //          });
   //          console.log(result);
   //       } catch (error) {
   //          console.log(error);
   //       }
   //    };

   return (
      <GradientBackground>
         <ScrollView contentContainerStyle={styles.container}>
            <TextInput
               value={form.username}
               onChangeText={(value) => {
                  setFormInput('username', value);
               }}
               returnKeyType="next"
               placeholder="Username"
               style={{ marginBottom: 20 }}
               onSubmitEditing={() => {
                  passwordRef.current?.focus();
               }}
            />
            <TextInput
               style={{ marginBottom: 20 }}
               value={form.password}
               onChangeText={(value) => {
                  setFormInput('password', value);
               }}
               ref={passwordRef}
               returnKeyType="done"
               secureTextEntry
               placeholder="Password"
            />

            <Button
               style={{
                  //   backgroundColor: colors.lakeGreen,
                  padding: 10,
                  margin: 25,
               }}
               loading={loading}
               title="login"
               onPress={login}
            />
         </ScrollView>
      </GradientBackground>
   );
}
