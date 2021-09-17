import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../text/text';
import { BoardResult, BoardState } from '@utils';
import BoardLine from './board-line';

type Cell = 'x' | 'o' | null;
type BoardProps = {
   state: BoardState;
   size: number;
   disabled?: boolean;
   gameResult?: BoardResult | false;
   onCellPressed?: (index: number) => void;
};

export default function Board({
   state,
   disabled,
   size,
   gameResult,
   onCellPressed,
}: BoardProps): ReactElement {
   return (
      <View
         style={{
            width: size,
            height: size,
            backgroundColor: 'grey',
            flexDirection: 'row',
            flexWrap: 'wrap',
         }}
      >
         {state.map((cell, index) => {
            return (
               <TouchableOpacity
                  disabled={cell !== null || disabled}
                  onPress={() => onCellPressed && onCellPressed(index)}
                  style={{
                     width: '33.333333%',
                     height: '33.333333%',
                     backgroundColor: 'white',
                     borderWidth: 1,
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
                  key={index}
               >
                  <Text style={{ fontSize: size / 8 }}>{cell}</Text>
               </TouchableOpacity>
            );
         })}

         {/* Display the BoardLine only if has a gameResult */}
         {true && (
            <BoardLine
               size={size}
               gameResult={{ winner: 'o', diagonal: 'MAIN', direction: 'D' }}
            />
         )}
      </View>
   );
}
