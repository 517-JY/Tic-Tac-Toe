import React, { ReactElement } from 'react';
import {
   TouchableOpacity,
   TouchableOpacityProps,
   ActivityIndicator,
} from 'react-native';
import styles from './button.styles';
import { Text } from '@components';
import { colors } from '@utils';

type ButtonProps = {
   title: string;
   loading: boolean;
} & TouchableOpacityProps;

export default function Button({
   title,
   style,
   loading,
   ...props
}: ButtonProps): ReactElement {
   return (
      <TouchableOpacity
         disabled={loading}
         {...props}
         style={[styles.button, style]}
      >
         {/* Add a spin */}
         {loading ? (
            <ActivityIndicator color="black" />
         ) : (
            <Text style={styles.buttonText}>{title}</Text>
         )}
      </TouchableOpacity>
   );
}
