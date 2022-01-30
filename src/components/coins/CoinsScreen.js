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

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };
  handlePress = coin => {
    console.log('go to detail', this.props);
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  componentDidMount = async () => {
    this.setState({loading: true});
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    this.setState({coins: res.data, loading: false});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
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
          )}></FlatList>
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
