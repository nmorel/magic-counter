import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';

class MenuComponent extends Component {
  onNewGame = (type) => {
    this.props.actions.newGame(type);
  };

  onReset = () => {
    this.props.actions.resetGame();
  };

  onAddPlayer = () => {
    this.props.actions.addPlayer();
  };

  render() {
    return (
      <View style={styles.container}>
        <Button text="New standard" action={() => this.onNewGame('standard')}/>
        <Button text="New duel EDH" action={() => this.onNewGame('duelCommander')}/>
        <Button text="New EDH" action={() => this.onNewGame('commander')}/>
        <Button text="Add player" action={this.onAddPlayer}/>
        <Button text="Reset" action={this.onReset}/>
      </View>
    )
  }
}

function Button({text, action}) {
  return (
    <TouchableHighlight style={[styles.button]} onPress={action}>
      <Text style={[styles.text]}>{text}</Text>
    </TouchableHighlight>
  )
}

export const Menu = connect(
  undefined,
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(MenuComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  button: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },

  text: {
    fontSize: 20,
    color: '#000'
  }
});
