import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={FavoritesScreen} name="Favorites" />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
