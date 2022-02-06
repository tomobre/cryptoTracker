import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CoinsItem from '../coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';

class FavoritesScreen extends Component {
  state = {favorites: []};
  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();

      const keys = allKeys.filter(key => {
        return key.includes('favorite-');
      });

      const favs = await Storage.instance.multiGet(keys);

      const favorites = favs.map(fav => {
        return JSON.parse(fav[1]);
      });

      console.log(favorites);

      this.setState({favorites});
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  handlePress = coin => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getFavorites();
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites());
  }
  render() {
    const {favorites} = this.state;
    return (
      <View>
        <Text>dff</Text>
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.charade, flex: 1},
});
export default FavoritesScreen;
