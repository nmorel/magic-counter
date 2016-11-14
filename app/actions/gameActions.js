import * as types from './actionTypes';
import {counterTypes} from '../constants';

export function newGame(type) {
  return {
    type: types.NEW_GAME,
    game: type
  };
}

export function resetGame() {
  return {
    type: types.RESET_GAME,
  }
}

export function rollDice(player) {
  return {
    type: types.ROLL_DICE,
    playerId: player.get('id')
  }
}

export function incrementCounter(counter, player) {
  return {
    type: types.INC_COUNTER,
    counter,
    playerId: player.get('id')
  }
}

export function decrementCounter(counter, player) {
  return {
    type: types.DEC_COUNTER,
    counter,
    playerId: player.get('id')
  }
}

export function addPlayer() {
  return {
    type: types.ADD_PLAYER
  }
}

export function removePlayer() {
  return {
    type: types.REMOVE_PLAYER
  }
}

export function setNumberOfPlayers(numberOfPlayers) {
  return {
    type: types.SET_NUMBER_OF_PLAYERS,
    numberOfPlayers
  }
}
