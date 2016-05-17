import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';

import {calculateFontSize} from '../helper';

class PlayerCounterComponent extends Component {

  onIncrementLife = () => {
    this.props.actions.incrementLife(this.props.player);
  };

  onDecrementLife = () => {
    this.props.actions.decrementLife(this.props.player);
  };

  onRollDice = () => {
    this.props.actions.rollDice(this.props.player);
  };

  render() {
    const fontSizeSmall  = baseFontSizeSmall / this.props.nbPlayer;
    const fontSizeMedium = baseFontSizeMedium / this.props.nbPlayer;
    const fontSizeLarge  = baseFontSizeLarge / this.props.nbPlayer;

    const life = _.padStart(this.props.player.get('life').toString(), 2, '0');

    const dice = this.props.player.get('dice') ?
      (
        <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>{this.props.player.get('dice')}</Text>
      ) :
      (
        <TouchableHighlight style={[]} onPress={this.onRollDice}>
          <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>Roll dice</Text>
        </TouchableHighlight>
      );

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableHighlight style={[styles.button]} onPress={this.onDecrementLife}>
          <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeMedium)}]}>-</Text>
        </TouchableHighlight>
        <View style={[styles.lifeContainer]}>
          <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>{this.props.player.get('name')}</Text>
          <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeLarge)}]}>{life}</Text>
          {dice}
        </View>
        <TouchableHighlight style={[styles.button]} onPress={this.onIncrementLife}>
          <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeMedium)}]}>+</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
export const PlayerCounter = connect(undefined,
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(PlayerCounterComponent);

const baseFontSizeSmall  = 40;
const baseFontSizeMedium = 200;
const baseFontSizeLarge  = 600;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },

  text: {
    color: '#fff'
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  lifeContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
