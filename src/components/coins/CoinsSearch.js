import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Platform} from 'react-native';

class CoinSearch extends Component {
  state = {
    query: '',
  };

  handleText = query => {
    this.setState({
      query,
    });

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };
  render() {
    const {query} = this.state;
    return (
      <View>
        <TextInput
          placeholder="search coin"
          value={query}
          onChangeText={this.handleText}
          placeholderTextColor="#fff"
        />
      </View>
    );
  }
}

export default CoinSearch;
