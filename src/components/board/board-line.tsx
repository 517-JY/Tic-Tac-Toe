import React, { ReactElement, useEffect, useRef } from 'react';

import { View, StyleSheet, Animated } from 'react-native';

import { BoardResult, colors } from '@utils';

type BoardLineProps = {
   size: number;
   gameResult?: BoardResult | false;
};

export default function BoardLine({
   size,
   gameResult,
}: BoardLineProps): ReactElement {
   // calculate the height of the digonal winning line
   const diagonalHeight = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));

   // create the animation component
   const animationRef = useRef<Animated.Value>(new Animated.Value(0));

   useEffect(() => {
      Animated.timing(animationRef.current, {
         toValue: 1,
         duration: 800,
         useNativeDriver: false,
      }).start();
   }, []);

   return (
      <>
         {gameResult && gameResult.column && gameResult.direction === 'V' && (
            <Animated.View
               style={[
                  styles.line,
                  styles.vLine,
                  {
                     left: `${33.333333 * gameResult.column - 16.666666}%`,
                     height: animationRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                     }),
                  },
               ]}
            ></Animated.View>
         )}
         {gameResult && gameResult.row && gameResult.direction === 'H' && (
            <Animated.View
               style={[
                  styles.line,
                  styles.hLine,
                  {
                     top: `${33.333333 * gameResult.row - 16.666666}%`,
                     width: animationRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                     }),
                  },
               ]}
            ></Animated.View>
         )}
         {gameResult && gameResult.diagonal && gameResult.direction === 'D' && (
            <Animated.View
               style={[
                  styles.line,
                  styles.dLine,
                  {
                     height: animationRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, diagonalHeight],
                     }),
                     // Do rotation with transform
                     transform: [
                        {
                           //    translateY: -(diagonalHeight - size) / 2,
                           // Move the diagonal boardLine up
                           // For the animation, the move value should be animated
                           translateY: animationRef.current.interpolate({
                              inputRange: [0, 1],
                              outputRange: [
                                 size / 2,
                                 -(diagonalHeight - size) / 2,
                              ],
                           }),
                        },

                        {
                           rotateZ:
                              gameResult.diagonal === 'MAIN'
                                 ? '-45deg'
                                 : '45deg',
                        },
                     ],
                  },
               ]}
            ></Animated.View>
         )}
      </>
   );
}

const styles = StyleSheet.create({
   line: {
      position: 'absolute',
      backgroundColor: colors.redPink,
   },
   vLine: {
      width: 4,
      //   height: '100%',
   },
   hLine: {
      //   width: '100%',
      height: 4,
   },
   dLine: {
      width: 4,
      top: 0,
      left: '50%',
   },
});
