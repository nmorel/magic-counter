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
import {counterTypes} from '../constants';
import {Counter} from './Counter';
import * as _ from 'lodash';

import {calculateFontSize, getColor} from '../helper';

class PlayerCounterComponent extends Component {

  onIncrementLife = () => {
    this.props.actions.incrementCounter(counterTypes.life, this.props.player);
  };

  onDecrementLife = () => {
    this.props.actions.decrementCounter(counterTypes.life, this.props.player);
  };

  onRollDice = () => {
    this.props.actions.rollDice(this.props.player);
  };

  render() {
    const fontSizeSmall = baseFontSizeSmall / this.props.nbPlayer;
    const fontSizeMedium = baseFontSizeMedium / this.props.nbPlayer;
    const fontSizeLarge = baseFontSizeLarge / this.props.nbPlayer;

    const life = _.padStart(this.props.player.get('life').toString(), 2, '0');

    // const dice = this.props.player.get('dice') ?
    //   (
    //     <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>{this.props.player.get('dice')}</Text>
    //   ) :
    //   (
    //     <TouchableHighlight style={[]} onPress={this.onRollDice}>
    //       <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>Roll dice</Text>
    //     </TouchableHighlight>
    //   );

    const incButton = (
      <TouchableHighlight key={'inc' + this.props.player.id}
                          style={[styles.button, orientationStyles[this.props.orientation].incButton]}
                          onPress={this.onIncrementLife}
                          underlayColor="rgba(0,0,0,0)">
        <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeMedium)}]}>+</Text>
      </TouchableHighlight>
    );

    const decButton = (
      <TouchableHighlight key={'dec' + this.props.player.id}
                          style={[styles.button, orientationStyles[this.props.orientation].decButton]}
                          onPress={this.onDecrementLife}
                          underlayColor="rgba(0,0,0,0)">
        <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeMedium)}]}>-</Text>
      </TouchableHighlight>
    );

    const buttons = this.props.orientation === 'row' ? [decButton, incButton] : [incButton, decButton];

    return (
      <View style={[styles.container, this.props.style]}>

        <View style={[styles.container]}>
          {/* Life */}
          <View style={[styles.lifeContainer]}>
            <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeLarge)}]}>{life}</Text>
          </View>

          <View style={[styles.buttonsContainer, orientationStyles[this.props.orientation].buttonsContainer]}>
            {buttons}
          </View>

          {/* Player's name */}
          <View style={[styles.nameContainer, {backgroundColor: getColor(this.props.player.get('id'))}]}>
            <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>{this.props.player.get('name')}</Text>
          </View>
        </View>

        <View style={{height: 60, flexDirection: 'row'}}>
          {/*<Counter counter={counterTypes.poison} player={this.props.player} orientation="row"*/}
                   {/*style={{borderRightWidth: 2, borderColor: '#fff'}}/>*/}
          <Counter counter={counterTypes.energy} player={this.props.player} orientation="row"/>
        </View>
      </View>
    )
  }
}
export const PlayerCounter = connect(undefined,
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(PlayerCounterComponent);

const baseFontSizeSmall = 60;
const baseFontSizeMedium = 250;
const baseFontSizeLarge = 650;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  nameContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 5,
    borderRadius: 5
  },

  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1
  },

  text: {
    color: '#fff'
  },

  button: {
    flex: 1
  },

  lifeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const orientationStyles = {
  column: StyleSheet.create({
    buttonsContainer: {
      flexDirection: 'column'
    },

    incButton: {
      alignItems: 'center',
      justifyContent: 'flex-start'
    },

    decButton: {
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }),

  row: StyleSheet.create({
    buttonsContainer: {
      flexDirection: 'row'
    },

    incButton: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: 30
    },

    decButton: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 30
    }
  })
};
