import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import * as _ from 'lodash';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';

class CounterComponent extends Component {

  onIncrement = () => {
    this.props.actions.incrementCounter(this.props.counter, this.props.player);
  };

  onDecrement = () => {
    this.props.actions.decrementCounter(this.props.counter, this.props.player);
  };

  render() {
    const {counter, player} = this.props;
    const counterValue = player.get(counter.id);

    const incButton = (
      <TouchableHighlight key={'inc' + counter.id + '$' + player.id}
                          style={[styles.button, styles.incButton]}
                          onPress={this.onIncrement}
                          underlayColor="rgba(0,0,0,0)">
        <Text style={[styles.text, {fontSize: 30}]}>+</Text>
      </TouchableHighlight>
    );

    const decButton = counterValue > 0 ? (
      <TouchableHighlight key={'dec' + counter.id + '$' + player.id}
                          style={[styles.button, styles.decButton]}
                          onPress={this.onDecrement}
                          underlayColor="rgba(0,0,0,0)">
        <Text style={[styles.text, {fontSize: 30}]}>-</Text>
      </TouchableHighlight>
    ) : (
      <View key={'dec' + counter.id + '$' + player.id} style={[styles.button, styles.decButton]}/>
    );

    const buttons = this.props.orientation === 'row' ? [decButton, incButton] : [incButton, decButton];

    return (
      <View style={[styles.container, counterValue > 0 ? styles.active : {}, this.props.style]}>

        {/* Counter */}
        <View style={[styles.lifeContainer]}>
          <Image source={counter.icon} style={styles.icon}/>
          <Text style={[styles.text, {fontSize: 30}]}>{_.padStart(counterValue.toString(), 2, '0')}</Text>
        </View>

        <View style={[styles.buttonsContainer]}>
          {buttons}
        </View>
      </View>
    )
  }
}
export const Counter = connect(undefined,
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(CounterComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0.4,
  },

  active: {
    opacity: 1,
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
    flex: 1,
    flexDirection: 'row',
  },

  icon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },

  text: {
    color: '#000'
  },

  button: {
    flex: 1
  },

  incButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },

  decButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20
  },

  lifeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
