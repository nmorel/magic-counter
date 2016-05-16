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
    const life = _.padStart(this.props.player.get('life').toString(), 2, '0');

    const dice = this.props.player.get('dice') ?
      (
        <Text style={[styles.text]}>{this.props.player.get('dice')}</Text>
      ) :
      (
        <TouchableHighlight style={[]} onPress={this.onRollDice}>
          <Text style={[styles.text]}>Roll dice</Text>
        </TouchableHighlight>
      );

    return (
      <View style={[styles.container]}>
        <TouchableHighlight style={[styles.button]} onPress={this.onDecrementLife}>
          <Text style={[styles.text, styles.buttonText]}>-</Text>
        </TouchableHighlight>
        <View style={[styles.lifeContainer]}>
          <Text style={[styles.text, styles.name]}>{this.props.player.get('name')}</Text>
          <Text style={[styles.text, styles.life]}>{life}</Text>
          {dice}
        </View>
        <TouchableHighlight style={[styles.button]} onPress={this.onIncrementLife}>
          <Text style={[styles.text, styles.buttonText]}>+</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
export const PlayerCounter = connect(state => ({
    game: state.game
  }),
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(PlayerCounterComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderLeftColor: 'white',
    // borderLeftStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: 'white',
    borderStyle: 'solid',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'white'
  },

  text: {
    color: '#fff'
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 150
  },

  lifeContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  name: {
    fontSize: 20
  },

  life: {
    fontSize: 200
  }
});
