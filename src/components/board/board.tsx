import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../text/text';
import { BoardState } from '@utils';

type Cell = 'x' | 'o' | null;
type BoardProps = {
   state: BoardState;
   size: number;
   onCellPressed?: (indes: number) => void;
};

export default function Board({
   state,
   size,
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
      </View>
   );
}
