import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 30,
      paddingVertical: 40,
   },
   textInput: {
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

export default styles;
