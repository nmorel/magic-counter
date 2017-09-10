import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';
import {counterTypes} from '../constants';
import * as _ from 'lodash';
import Svg, {Path, Rect, Text as SvgText} from 'react-native-svg';

import {calculateFontSize, getColor} from '../helper';

import {FitText} from './FitText';

class PlayerCounterComponent extends Component {
  k = 0;
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

    const life = _.padStart(this.props.player.life.toString(), 2, '0');

    // const dice = this.props.player.dice ?
    //   (
    //     <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>{this.props.player.dice}</Text>
    //   ) :
    //   (
    //     <TouchableHighlight style={[]} onPress={this.onRollDice}>
    //       <Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>Roll dice</Text>
    //     </TouchableHighlight>
    //   );

    const incButton = (
      <TouchableHighlight
        key={'inc' + this.props.player.id}
        style={[styles.button, orientationStyles[this.props.orientation].incButton]}
        onPress={this.onIncrementLife}
        underlayColor="rgba(0,0,0,0)"
      >
        <Svg key={this.k++} style={{width: '60%', height: '60%'}} viewBox="0 0 24 24">
          <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#FFF" />
          <Path d="M0 0h24v24H0z" fill="transparent" />
        </Svg>
      </TouchableHighlight>
    );

    const decButton = (
      <TouchableHighlight
        key={'dec' + this.props.player.id}
        style={[styles.button, orientationStyles[this.props.orientation].decButton]}
        onPress={this.onDecrementLife}
        underlayColor="rgba(0,0,0,0)"
      >
        <Svg key={this.k++} style={{width: '60%', height: '60%'}} viewBox="0 0 24 24">
          <Path d="M19 13H5v-2h14v2z" fill="#FFF" />
          <Path d="M0 0h24v24H0z" fill="transparent" />
        </Svg>
      </TouchableHighlight>
    );

    const buttons = this.props.orientation === 'row' ? [decButton, incButton] : [incButton, decButton];

    return (
      <View style={[styles.container, this.props.style]}>
        {/* Life */}
        <View style={[styles.lifeContainer]}>
          <Svg style={{width: 200, height: 100, backgroundColor: 'red'}} viewBox="0 0 50 30">
            <SvgText fill={'#FFF'} fontSize={25} textAnchor="middle" x={25} y={0}>
              -99
            </SvgText>
          </Svg>
        </View>

        <View style={[styles.buttonsContainer, orientationStyles[this.props.orientation].buttonsContainer]}>
          {buttons}
        </View>

        {/* Player's name */}
        {/*<View style={[styles.nameContainer, {backgroundColor: getColor(this.props.player.id)}]}>*/}
        {/*<Text style={[styles.text, {fontSize: calculateFontSize(fontSizeSmall)}]}>{this.props.player.name}</Text>*/}
        {/*</View>*/}
      </View>
    );
  }
}
export const PlayerCounter = connect(undefined, dispatch => ({
  actions: bindActionCreators(gameActions, dispatch),
}))(PlayerCounterComponent);

const baseFontSizeSmall = 60;
const baseFontSizeMedium = 250;
const baseFontSizeLarge = 650;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  nameContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 5,
    borderRadius: 5,
  },

  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },

  text: {
    color: '#fff',
  },

  button: {
    flex: 1,
  },

  lifeContainer: {
    flex: 1,
  },
});

const orientationStyles = {
  column: StyleSheet.create({
    buttonsContainer: {
      flexDirection: 'column',
    },

    incButton: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    decButton: {
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  }),

  row: StyleSheet.create({
    buttonsContainer: {
      flexDirection: 'row',
    },

    incButton: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: 30,
    },

    decButton: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 30,
    },
  }),
};
