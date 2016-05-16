import * as types from './actionTypes';

export function newGame(type) {
  return {
    type: types.NEW_GAME,
    game: type
  };
}

export function rollDice(player) {
  return {
    type: types.ROLL_DICE,
    playerId: player.get('id')
  }
}

export function incrementLife(player) {
  return {
    type: types.INC_LIFE,
    playerId: player.get('id')
  }
}

export function decrementLife(player) {
  return {
    type: types.DEC_LIFE,
    playerId: player.get('id')
  }
}

export function addPlayer() {
  return {
    type: types.ADD_PLAYER
  }
}
