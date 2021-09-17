import { GradientBackground } from '@components';
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './single-player-game.styles';
import { Board } from '@components';
import {
   printFormattedBoard,
   BoardState,
   isEmpty,
   isTerminal,
   getBestMove,
   Cell,
} from '@utils';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default function SinglePlayerGame(): ReactElement {
   // const b: BoardState = ['o', 'o', 'x', 'x', 'o', null, 'x', 'o', null];
   // ['o', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'o']
   // [null, null, null, null, null, null, null, null, null]
   const [state, setState] = useState<BoardState>([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
   ]);

   const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(
      Math.random() < 0.5 ? 'HUMAN' : 'BOT'
   );

   const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);

   const popSoundRef1 = useRef<Audio.Sound | null>(null);
   const popSoundRef2 = useRef<Audio.Sound | null>(null);
   const winSoundRef = useRef<Audio.Sound | null>(null);
   const lossSoundRef = useRef<Audio.Sound | null>(null);
   const drawSoundRef = useRef<Audio.Sound | null>(null);

   const gameResult = isTerminal(state);

   const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
      const stateCopy: BoardState = [...state];

      if (stateCopy[cell] || isTerminal(stateCopy)) {
         return;
      }

      stateCopy[cell] = symbol;
      setState(stateCopy);

      try {
         // Add sound
         symbol === 'x'
            ? popSoundRef1.current?.replayAsync()
            : popSoundRef2.current?.replayAsync();
         // Add Haptics
         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
         console.log(error);
      }
   };

   const handleOnCellPressed = (cell: number): void => {
      if (turn !== 'HUMAN') {
         return;
      }
      insertCell(cell, isHumanMaximizing ? 'x' : 'o');
      setTurn('BOT');
   };

   const getWinner = (winnerSymbol: Cell): 'HUMAN' | 'BOT' | 'DRAW' => {
      if (winnerSymbol === 'x') {
         return isHumanMaximizing ? 'HUMAN' : 'BOT';
      }

      if (winnerSymbol === 'o') {
         return isHumanMaximizing ? 'BOT' : 'HUMAN';
      }

      return 'DRAW';
   };

   useEffect(() => {
      if (gameResult) {
         // TODO: Check - handle when game is over
         const winner = getWinner(gameResult.winner);

         if (winner === 'HUMAN') {
            try {
               winSoundRef.current?.replayAsync();
               Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
               );
            } catch (error) {
               console.log(error);
            }
            alert('You Won!');
         }

         if (winner === 'BOT') {
            try {
               lossSoundRef.current?.replayAsync();
               Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
               );
            } catch (error) {
               console.log(error);
            }
            alert('You Lost! Try it again!');
         }

         if (winner === 'DRAW') {
            try {
               drawSoundRef.current?.replayAsync();
               Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Warning
               );
            } catch (error) {
               console.log(error);
            }
            alert("It's a Draw!");
         }
      } else {
         if (turn === 'BOT') {
            // Best to start from center or corner
            if (isEmpty(state)) {
               const centerAndCorners = [0, 2, 6, 8, 4];
               // Choose the first move randomly from the centerAndCorners Array
               const firstMove =
                  centerAndCorners[
                     Math.floor(Math.random() * centerAndCorners.length)
                  ];
               insertCell(firstMove, 'x');
               // Bot starts first, it's the bot who maximum its score
               setIsHumanMaximizing(false);
               // Set turn to "HUMAN"
               setTurn('HUMAN');
            } else {
               const best = getBestMove(state, !isHumanMaximizing, 0, -1);
               insertCell(best, isHumanMaximizing ? 'o' : 'x');
               setTurn('HUMAN');
            }
         }
      }
   }, [state, turn]);

   // printFormattedBoard(state);
   // console.log(isEmpty(b));
   // console.log(isFull(b));
   // console.log(getAvailableMoves(b));
   // console.log(isTerminal(state));

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

   return (
      <GradientBackground>
         <SafeAreaView style={styles.container}>
            <Board
               disabled={Boolean(isTerminal(state)) || turn !== 'HUMAN'} // when board game is terminal, then player should be disabled
               onCellPressed={(cell) => {
                  handleOnCellPressed(cell);
               }}
               state={state}
               size={300}
            />
         </SafeAreaView>
      </GradientBackground>
   );
}
