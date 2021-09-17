import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 30,
      paddingVertical: 10,
   },
   field: {
      marginBottom: 20,
      marginTop: 30,
   },
   label: {
      color: colors.inkBlue,
      fontSize: 24,
   },
   choices: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      marginTop: 15,
      marginHorizontal: -10,
   },
   choice: {
      backgroundColor: colors.lakeGreen,
      paddingHorizontal: 25,
      paddingVertical: 8,
      margin: 8,
      borderRadius: 9,
   },
   choiceText: {
      color: colors.cream,
   },
   switchField: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});

export default styles;
