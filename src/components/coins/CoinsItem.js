import React from 'react';
import {View, Text, Pressable, Image, StyleSheet, Platform} from 'react-native';
import Colors from '../../res/colors';

const CoinsItem = ({item, onPress}) => {
  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/1200px-Green_Arrow_Up.svg.png';
    } else {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png';
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image
          style={styles.imgIcon}
          source={{
            uri: getImgArrow(),
          }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS == 'ios' ? 0 : 16,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
