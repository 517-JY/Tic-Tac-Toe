import React, { ReactElement, forwardRef } from 'react';
import {
   TextInput as NativeTextInput,
   TextInputProps as NativeTextInputProps,
   StyleSheet,
} from 'react-native';
import { colors } from '@utils';

const styles = StyleSheet.create({
   input: {
      height: 50,
      width: '100%',
      borderColor: colors.darkYellow,
      backgroundColor: colors.cream,
      borderWidth: 2,
      padding: 8,
      color: colors.darkGrey,
      fontFamily: 'DeliusUnicase_400Regular',
   },
});

const TextInput = forwardRef<NativeTextInput, NativeTextInputProps>(
   ({ style, ...props }: NativeTextInputProps, ref): ReactElement => {
      return (
         <NativeTextInput
            ref={ref}
            placeholderTextColor={colors.lightGrey}
            style={[styles.input, style]}
            {...props}
         />
      );
   }
);

TextInput.displayName = 'TextInput';

export default TextInput;
