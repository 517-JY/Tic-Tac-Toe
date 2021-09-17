import React, { ReactElement, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { GradientBackground, Text } from '@components';
import styles from './settings.styles';
import { colors } from '@utils';

export default function Settings(): ReactElement {
   const [state1, setState1] = useState(false);
   const [state2, setState2] = useState(false);
   const difficulties = {
      '1': 'Easy',
      '3': 'Intermediate',
      '4': 'Hard',
      '-1': 'Lunatic',
   };
   return (
      <GradientBackground>
         <ScrollView contentContainerStyle={styles.container}>
            {/* <Text style={{ color: colors.brickRed }}>Settings</Text> */}
            <View style={styles.field}>
               <Text style={styles.label}>Bot Difficulty</Text>
               <View style={styles.choices}>
                  {/* // Make a loop to create difficulty buttons */}
                  {Object.keys(difficulties).map((level) => {
                     return (
                        <TouchableOpacity style={styles.choice} key={level}>
                           <Text style={styles.choiceText}>
                              {/* {difficulties[level as '1' | '3' | '4' | '-1']} */}
                              {difficulties[level as keyof typeof difficulties]}
                           </Text>
                        </TouchableOpacity>
                     );
                  })}
               </View>
            </View>
            <View style={[styles.field, styles.switchField]}>
               <Text style={styles.label}>Sounds</Text>
               <Switch
                  trackColor={{
                     false: colors.nightBlack, // this does not work, using " ios_backgroundColor"
                     true: colors.lakeGreen,
                  }}
                  thumbColor={colors.cream}
                  ios_backgroundColor={colors.darkGrey}
                  value={state1}
                  onChange={() => {
                     setState1(!state1);
                  }}
               />
            </View>
            <View style={[styles.field, styles.switchField]}>
               <Text style={styles.label}>Haptics/Vibrations</Text>
               <Switch
                  trackColor={{
                     false: colors.nightBlack, // this does not work, using " ios_backgroundColor"
                     true: colors.lakeGreen,
                  }}
                  thumbColor={colors.cream}
                  ios_backgroundColor={colors.darkGrey}
                  value={state2}
                  onChange={() => {
                     setState2(!state2);
                  }}
               />
            </View>
         </ScrollView>
      </GradientBackground>
   );
}
