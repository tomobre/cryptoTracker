import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const CoinsItem = ({item, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{color: 'black'}}>{item.name}</Text>
      <Text>{item.symbol}</Text>
    </Pressable>
  );
};

export default CoinsItem;
