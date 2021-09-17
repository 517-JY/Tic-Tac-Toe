import React, { ReactElement, useEffect, useState, useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { GradientBackground, Text } from '@components';
import styles from './settings.styles';
import { colors, useSounds } from '@utils';
import { difficulties, useSettings } from '@contexts/settings-context';

//    const [state1, setState1] = useState(false);
//    const [state2, setState2] = useState(false);

export default function Settings(): ReactElement | null {
   //    const [settings, setSettings] = useState<SettingsType | null>(null);

   //    const context = useSettings();

   const { settings, saveSetting } = useSettings();

   if (!settings) {
      return null;
   }

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
                        <TouchableOpacity
                           onPress={() => {
                              saveSetting(
                                 'difficulty',
                                 level as keyof typeof difficulties
                              );
                           }}
                           style={[
                              styles.choice,
                              {
                                 backgroundColor:
                                    settings?.difficulty === level
                                       ? colors.lakeGreen
                                       : colors.lightGrey,
                              },
                           ]}
                           key={level}
                        >
                           <Text
                              style={[
                                 styles.choiceText,
                                 {
                                    color:
                                       settings?.difficulty === level
                                          ? colors.cream
                                          : colors.darkGrey,
                                 },
                              ]}
                           >
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
                  ios_backgroundColor={colors.lightGrey}
                  value={settings?.sounds}
                  onChange={() => {
                     saveSetting('sounds', !settings.sounds);
                  }}
               />
            </View>
            <View style={[styles.field, styles.switchField]}>
               <Text style={styles.label}>Haptics/Vibrations</Text>
               <Switch
                  trackColor={{
                     //  false: colors.nightBlack, // this does not work, using " ios_backgroundColor"
                     true: colors.lakeGreen,
                  }}
                  thumbColor={colors.cream}
                  ios_backgroundColor={colors.lightGrey}
                  value={settings?.haptics}
                  onChange={() => {
                     saveSetting('haptics', !settings.haptics);
                  }}
               />
            </View>
         </ScrollView>
      </GradientBackground>
   );
}
