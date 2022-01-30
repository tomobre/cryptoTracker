import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SectionList,
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends Component {
  state = {coin: {}, markets: []};

  getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '/');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    console.log('markets', markets);
    this.setState({markets});
  };

  getSections = coin => {
    const data = [
      {title: 'Market cap', data: [coin.market_cap_usd]},
      {title: 'Volume 24h', data: [coin.volume24]},
      {title: 'Change 24h', data: [coin.percent_change_24h]},
    ];

    return data;
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    console.log(this.props.route.params);
    this.getMarkets(coin.id);
    this.props.navigation.setOptions({title: coin.symbol});
    this.setState({coin});
  }
  render() {
    const {coin, markets} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.iconImg}
            source={{url: this.getSymbolIcon(coin.name)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <SectionList
          keyExtractor={item => item}
          sections={this.getSections(coin)}
          renderItem={({item}) => <Text>{item}</Text>}
          renderSectionHeader={({section}) => <Text>{section.title}</Text>}
        />
        <Text>Markets</Text>
        <FlatList
          horizontal={true}
          data={markets}
          renderItem={({item}) => {
            <CoinMarketItem item={item} />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.charade},
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {fontSize: 16, fontWeight: 'bold', color: '#fff', marginLeft: 8},
  iconImg: {
    width: 24,
    height: 25,
  },
});

export default CoinDetailScreen;
