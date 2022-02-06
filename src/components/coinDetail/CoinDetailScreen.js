import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SectionList,
  Pressable,
  Alert,
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

class CoinDetailScreen extends Component {
  state = {coin: {}, markets: [], isFavorite: false};

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr !== null) {
        this.setState({isFavorite: true});
      }
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);

    console.log('stored', stored);
    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {text: 'cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;

          await Storage.instance.remove(key);

          this.setState({isFavorite: false});
        },
        style: 'destructive',
      },
    ]);
  };

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
    this.setState({coin}, () => {
      this.getFavorite();
    });
  }
  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{url: this.getSymbolIcon(coin.name)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
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
  row: {flexDirection: 'row'},
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {fontSize: 16, fontWeight: 'bold', color: '#fff', marginLeft: 8},
  iconImg: {
    width: 24,
    height: 25,
  },
  btnFavoriteText: {color: Colors.white},
  btnFavorite: {padding: 8, borderRadius: 8},
  btnFavoriteAdd: {backgroundColor: Colors.picton},
  btnFavoriteRemove: {backgroundColor: Colors.carmine},
});

export default CoinDetailScreen;
