import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';

import {PlayerCounter} from '../components/PlayerCounter';
import {Menu} from '../components/Menu';
import * as _ from 'lodash';

class GameComponent extends Component {
  render() {
    const isLandscape = this.props.layout === 'LANDSCAPE';
    const players = this.props.game.players;
    let nbCol;
    let orientation;
    if (isLandscape) {
      if (players.length < 4) {
        nbCol = players.length;
        orientation = 'column';
      } else if (players.length < 5) {
        nbCol = 2;
        orientation = 'row';
      } else if (players.length < 7) {
        nbCol = 3;
        orientation = 'column';
      } else {
        nbCol = 3;
        orientation = 'row';
      }
    } else {
      if (players.length < 4) {
        nbCol = 1;
        orientation = 'row';
      } else if (players.length < 5) {
        nbCol = 2;
        orientation = 'column';
      } else if (players.length < 7) {
        nbCol = 2;
        orientation = 'column';
      } else {
        nbCol = 3;
        orientation = 'column';
      }
    }

    const chunks = _.chunk(players, nbCol);
    const rows = _.map(chunks, (chunk, rowIndex) => {
      const cells = _.map(chunk, (player, colIndex) => {
        const style = {};
        if (colIndex > 0) {
          style.borderLeftWidth = 2;
          style.borderLeftColor = 'white';
          style.borderStyle = 'solid';
        }
        if (rowIndex > 0) {
          style.borderTopWidth = 2;
          style.borderTopColor = 'white';
          style.borderStyle = 'solid';
        }
        if (players.length === 5 && ((rowIndex === 1 && isLandscape) || (rowIndex === 2 && !isLandscape))) {
          orientation = 'row';
        }
        return (
          <PlayerCounter
            key={player.id}
            player={player}
            orientation={orientation}
            style={style}
            nbPlayer={nbCol + chunks.length - 1}
          />
        );
      });

      return (
        <View key={'row' + rowIndex} style={styles.playersRowContainer}>
          {cells}
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.playersContainer}>
          {rows}
        </View>
        <Menu />
      </View>
    );
  }
}

export const Game = connect(
  state => ({
    game: state.game,
    layout: state.layout.layout,
  }),
  dispatch => ({
    actions: bindActionCreators(gameActions, dispatch),
  })
)(GameComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  playersContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },

  playersRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
