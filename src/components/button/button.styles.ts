import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   button: {
      backgroundColor: colors.cream,
      // '#F0F0EB'

      //  #dafaf7
      paddingVertical: 20,
      paddingHorizontal: 35,
      borderRadius: 30,
   },
   buttonText: {
      fontSize: 18,
      color: colors.darkGrey,
      textAlign: 'center',
   },
});

export default styles;
