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
import * as _ from 'lodash';

class GameComponent extends Component {
  onNewGame = () => {
    this.props.actions.newGame(this.props.game.get('type'));
  };

  onAddPlayer = () => {
    this.props.actions.addPlayer();
  };

  render() {
    const players = this.props.game.get('players');
    let nbCol;
    if (players.size < 4) {
      nbCol = players.size;
    } else if (players.size < 5) {
      nbCol = 2;
    } else {
      // TODO Above 4, we should change the layout
      nbCol = 3;
    }

    const chunks = _.chunk(players.toArray(), nbCol);
    const rows   = _.map(chunks, (chunk, rowIndex) => {
      const cells = _.map(chunk, (player, colIndex) => {
        const style = {};
        if (colIndex > 0) {
          style.borderLeftWidth = 2;
          style.borderLeftColor = 'white';
          style.borderStyle     = 'solid';
        }
        if (rowIndex > 0) {
          style.borderTopWidth = 2;
          style.borderTopColor = 'white';
          style.borderStyle    = 'solid';
        }
        return (
          <PlayerCounter key={player.get('id')} player={player}
                         style={style} nbPlayer={nbCol + chunks.length - 1}></PlayerCounter>
        );
      });

      return (
        <View key={'row'+rowIndex} style={styles.playersRowContainer}>
          {cells}
        </View>
      )
    });

    return (
      <View style={styles.container}>
        <View style={styles.playersContainer}>
          {rows}
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
    flex: 1
  },

  playersContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000'
  },

  playersRowContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  toolbarButton: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },

  toolbarText: {
    fontSize: 20,
    color: '#000'
  }
});
