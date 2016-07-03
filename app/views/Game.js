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
  onNewGame = (type) => {
    this.props.actions.newGame(type);
  };

  onAddPlayer = () => {
    this.props.actions.addPlayer();
  };

  render() {
    const isLandscape = this.props.layout === 'LANDSCAPE';
    const players     = this.props.game.get('players');
    let nbCol;
    let orientation;
    if (isLandscape) {
      if (players.size < 4) {
        nbCol       = players.size;
        orientation = 'column';
      } else if (players.size < 5) {
        nbCol       = 2;
        orientation = 'row';
      } else if (players.size < 7) {
        nbCol       = 3;
        orientation = 'column';
      } else {
        nbCol       = 3;
        orientation = 'row';
      }
    } else {
      if (players.size < 4) {
        nbCol       = 1;
        orientation = 'row';
      } else if (players.size < 5) {
        nbCol       = 2;
        orientation = 'column';
      } else if (players.size < 7) {
        nbCol       = 2;
        orientation = 'column';
      } else {
        nbCol       = 3;
        orientation = 'column';
      }
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
        if (players.size === 5 && ((rowIndex === 1 && isLandscape) || (rowIndex === 2 && !isLandscape))) {
          orientation = 'row';
        }
        return (
          <PlayerCounter key={player.get('id')} player={player} orientation={orientation}
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
          <TouchableHighlight style={[styles.toolbarButton]} onPress={() => this.onNewGame('standard')}>
            <Text style={[styles.toolbarText]}>New standard</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.toolbarButton]} onPress={() => this.onNewGame('duelCommander')}>
            <Text style={[styles.toolbarText]}>New duel EDH</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.toolbarButton]} onPress={() => this.onNewGame('commander')}>
            <Text style={[styles.toolbarText]}>New EDH</Text>
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
    game: state.game,
    layout: state.layout,
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
