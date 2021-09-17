import React, { useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

type SoundType = 'pop1' | 'pop2' | 'win' | 'loss' | 'draw';

export default function useSounds(): (sound: SoundType) => void {
   const popSoundRef1 = useRef<Audio.Sound | null>(null);
   const popSoundRef2 = useRef<Audio.Sound | null>(null);
   const winSoundRef = useRef<Audio.Sound | null>(null);
   const lossSoundRef = useRef<Audio.Sound | null>(null);
   const drawSoundRef = useRef<Audio.Sound | null>(null);

   const playSound = async (sound: SoundType): Promise<void> => {
      const soundsMap = {
         pop1: popSoundRef1,
         pop2: popSoundRef2,
         win: winSoundRef,
         loss: lossSoundRef,
         draw: drawSoundRef,
      };

      try {
         const status = await soundsMap[sound].current?.getStatusAsync();
         status && status.isLoaded && soundsMap[sound].current?.replayAsync();
         switch (sound) {
            case 'pop1':
            case 'pop2':
               // Add Haptics
               Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
               break;
            case 'win':
               Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
               );
               break;
            case 'loss':
               Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
               );
               break;
            case 'draw':
               Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Warning
               );
               break;
            default:
               break;
         }
      } catch (error) {
         console.log(error);
      }
   };

   /**
    * Render Sound
    */
   useEffect(() => {
      // load sounds
      const popSoundObject1 = new Audio.Sound();
      const popSoundObject2 = new Audio.Sound();
      const winSoundObject = new Audio.Sound();
      const lossSoundObject = new Audio.Sound();
      const drawSoundObject = new Audio.Sound();

      const loadSounds = async () => {
         await popSoundObject1.loadAsync(require('@assets/pop_1.wav'));
         popSoundRef1.current = popSoundObject1;

         await popSoundObject2.loadAsync(require('@assets/pop_2.wav'));
         popSoundRef2.current = popSoundObject2;

         await winSoundObject.loadAsync(require('@assets/win.mp3'));
         winSoundRef.current = winSoundObject;

         await lossSoundObject.loadAsync(require('@assets/loss.mp3'));
         lossSoundRef.current = lossSoundObject;

         await drawSoundObject.loadAsync(require('@assets/draw.mp3'));
         drawSoundRef.current = drawSoundObject;
      };

      loadSounds();
      return () => {
         // unload sounds
         popSoundObject1 && popSoundObject1.unloadAsync();
         popSoundObject2 && popSoundObject2.unloadAsync();
         winSoundObject && winSoundObject.unloadAsync();
         lossSoundObject && winSoundObject.unloadAsync();
         drawSoundObject && winSoundObject.unloadAsync();
      };
   }, []);

   return playSound;
}
