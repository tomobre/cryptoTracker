import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from './src//components/coins/CoinsStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from './src/res/colors';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const App = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {backgroundColor: Colors.blackPearl},
        }}>
        <Tabs.Screen
          option={{
            tabBarIcon: ({size, color}) => {
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={{
                  uri: 'https://www.iconpacks.net/icons/1/free-coin-icon-794-thumb.png',
                }}
              />;
            },
          }}
          name="coins"
          component={CoinsStack}
        />
        <Tabs.Screen
          option={{
            tabBarIcon: ({size, color}) => {
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={{
                  uri: 'https://p1.hiclipart.com/preview/563/803/639/bookmark-icon-favorite-icon-favourite-icon-png-clipart.jpg',
                }}
              />;
            },
          }}
          name="favorites"
          component={FavoritesStack}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
