import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 80,
   },
   difficulty: {
      color: colors.darkGrey,
      fontSize: 24,
      textAlign: 'center',
      marginTop: 20,
   },
   results: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 60,
   },
   resultsBox: {
      width: 90,
      height: 65,
      backgroundColor: colors.lakeGreen,
      borderWidth: 1,
      borderColor: colors.darkYellow,
      alignItems: 'center',
      padding: 15,
      marginHorizontal: 5,
   },
   resultsTitle: {
      color: colors.darkGrey,
      fontSize: 14,
   },
   resultsCount: {
      color: colors.darkGrey,
      fontSize: 18,
   },
   modal: {
      position: 'absolute',
      backgroundColor: colors.lakeGreen,
      bottom: 60,
      left: 45,
      right: 45,
      padding: 20,
      borderWidth: 2,
      borderRadius: 50,
      borderColor: colors.lightYellow,
      marginBottom: 30,
   },
   modalText: {
      color: colors.brickRed,
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 20,
   },
});

export default styles;
