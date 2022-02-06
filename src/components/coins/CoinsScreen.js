import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import CoinSearch from './CoinsSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };
  handlePress = coin => {
    console.log('go to detail', this.props);
    this.props.navigation.navigate('CoinDetail', {coin});
  };
  handleSearch = query => {
    console.log('changing');
    const {allCoins} = this.state;
    const coinsFiltered = allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    this.setState({coins: coinsFiltered});
  };

  componentDidMount = async () => {
    this.setState({loading: true});
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    this.setState({coins: res.data, allCoins: res.data, loading: false});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        <CoinSearch onChange={this.handleSearch} />
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color="#fff"
            size="large"></ActivityIndicator>
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem
              item={item}
              onPress={() => this.handlePress(item)}></CoinsItem>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', alignItems: 'center'},
  btn: {padding: 8, backgroundColor: 'blue', borderRadius: 8, margin: 16},
  btnText: {color: 'white', textAlign: 'center'},
  loader: {marginTop: 60},
});

export default CoinsScreen;
