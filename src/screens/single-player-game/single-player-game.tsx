import { GradientBackground } from '@components';
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, Dimensions } from 'react-native';
import styles from './single-player-game.styles';
import { Board, Text, Button } from '@components';
import {
   printFormattedBoard,
   BoardState,
   isEmpty,
   isTerminal,
   getBestMove,
   Cell,
   useSounds,
} from '@utils';

// get device dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width;

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

   const [gamesCount, setGamesCount] = useState({
      wins: 0,
      losses: 0,
      draws: 0,
   });

   const playSound = useSounds();

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
         symbol === 'x' ? playSound('pop1') : playSound('pop2');
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

   const newGame = () => {
      setState([null, null, null, null, null, null, null, null, null]);
      setTurn(Math.random() < 0.5 ? 'HUMAN' : 'BOT');
   };

   useEffect(() => {
      if (gameResult) {
         // TODO: Check - handle when game is over
         const winner = getWinner(gameResult.winner);

         if (winner === 'HUMAN') {
            // alert('You Won!');
            playSound('win');
            setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
         }

         if (winner === 'BOT') {
            // alert('You Lost! Try it again!');
            playSound('loss');
            setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
         }

         if (winner === 'DRAW') {
            // alert("It's a Draw!");
            playSound('draw');
            setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
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
               const best = getBestMove(state, !isHumanMaximizing, 0, 1);
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

   return (
      <GradientBackground>
         <SafeAreaView style={styles.container}>
            <View>
               <Text style={styles.difficulty}>Difficulty: Easy</Text>
            </View>

            <View style={styles.results}>
               <View style={styles.resultsBox}>
                  <Text style={styles.resultsTitle}>Wins</Text>
                  <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
               </View>

               <View style={styles.resultsBox}>
                  <Text style={styles.resultsTitle}>Draws</Text>
                  <Text style={styles.resultsCount}>{gamesCount.draws}</Text>
               </View>

               <View style={styles.resultsBox}>
                  <Text style={styles.resultsTitle}>Losses</Text>
                  <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
               </View>
            </View>

            <Board
               disabled={Boolean(isTerminal(state)) || turn !== 'HUMAN'} // when board game is terminal, then player should be disabled
               onCellPressed={(cell) => {
                  handleOnCellPressed(cell);
               }}
               state={state}
               gameResult={gameResult}
               size={SCREEN_WIDTH - 60}
            />

            {/* Only render the modal when the game result exists */}
            {gameResult && (
               <View style={styles.modal}>
                  <Text style={styles.modalText}>
                     {getWinner(gameResult.winner) === 'HUMAN' && 'You Won'}
                     {getWinner(gameResult.winner) === 'BOT' && 'You Lost'}
                     {getWinner(gameResult.winner) === 'DRAW' && "It's a Draw"}
                  </Text>
                  <Button onPress={newGame} title="Play Again" />
               </View>
            )}
         </SafeAreaView>
      </GradientBackground>
   );
}
