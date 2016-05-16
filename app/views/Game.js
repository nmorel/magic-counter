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

import {PlayerCounter} from '../components/PlayerCounter';

class GameComponent extends Component {
  onNewGame = () => {
    this.props.actions.newGame(this.props.game.get('type'));
  };

  onAddPlayer = () => {
    this.props.actions.addPlayer();
  };

  render() {
    const players = this.props.game.get('players')
      .map(player => <PlayerCounter key={player.get('id')} player={player}></PlayerCounter>)
      .toArray();

    return (
      <View style={styles.container}>
        <View style={styles.playersContainer}>
          {players}
        </View>
        <View style={styles.toolbarContainer}>
          <TouchableHighlight style={[styles.toolbarButton]} onPress={this.onNewGame}>
            <Text style={[styles.toolbarText]}>New game</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.toolbarButton]} onPress={this.onAddPlayer}>
            <Text style={[styles.toolbarText]}>Add player</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export const Game = connect(state => ({
    game: state.game
  }),
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(GameComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },

  playersContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  toolbarButton: {
    margin: 10
  },

  toolbarText: {
    fontSize: 20,
    color: '#fff'
  }
});
