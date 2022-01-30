import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={CoinsScreen} name="Coins" />
      <Stack.Screen component={CoinDetailScreen} name="CoinDetail" />
    </Stack.Navigator>
  );
};

export default CoinsStack;
