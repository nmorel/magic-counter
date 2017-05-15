import * as types from '../actions/actionTypes';
import padStart from 'lodash/padStart';
import random from 'lodash/random';

class Game {
  type;
  startingLife;
  minPlayer;
  maxPlayer;

  constructor(_type, _startingLife, _minPlayer, _maxPlayer) {
    this.type = _type;
    this.startingLife = _startingLife;
    this.minPlayer = _minPlayer;
    this.maxPlayer = _maxPlayer || 18;
  }

  newGame() {
    const players = [];
    for (let i = 1; i < this.minPlayer + 1; i++) {
      players.push(this.newPlayer(i));
    }

    return {
      type: this.type,
      minPlayer: this.minPlayer,
      maxPlayer: this.maxPlayer,
      players,
    };
  }

  newPlayer(id) {
    return {
      id,
      name: 'P' + padStart(id.toString(), 2, '0'),
      dice: null,
      life: this.startingLife,
      poison: 0,
      energy: 0,
    };
  }

  reset(game) {
    return {
      ...game,
      players: game.players.map(player => ({
        ...player,
        dice: null,
        life: this.startingLife,
        poison: 0,
        energy: 0,
      })),
    };
  }
}

const games = {
  standard: new Game('standard', 20, 2),
  duelCommander: new Game('duelCommander', 30, 2),
  commander: new Game('commander', 40, 3),
};

const initialState = games.standard.newGame();

export default function(state = initialState, action = {}) {
  switch (action.type) {
    // New game
    case types.NEW_GAME: {
      return games[action.game].newGame();
    }
    // Reset game
    case types.RESET_GAME: {
      return games[state.type].reset(state);
    }
    // Rolling dice for a player
    case types.ROLL_DICE: {
      return {
        ...state,
        players: state.players.map(player => {
          if (player.id === action.playerId) {
            return {
              ...player,
              dice: random(1, 20),
            };
          } else {
            return player;
          }
        }),
      };
    }
    // Increment player's counter by 1
    case types.INC_COUNTER: {
      return {
        ...state,
        players: state.players.map(player => {
          if (player.id === action.playerId) {
            return {
              ...player,
              [action.counter.id]: player[action.counter.id] + 1,
            };
          } else {
            return player;
          }
        }),
      };
    }
    // Decrement player's counter by 1
    case types.DEC_COUNTER: {
      return {
        ...state,
        players: state.players.map(player => {
          if (player.id === action.playerId) {
            return {
              ...player,
              [action.counter.id]: player[action.counter.id] - 1,
            };
          } else {
            return player;
          }
        }),
      };
    }
    // Add a player
    case types.ADD_PLAYER: {
      const game = games[state.type];
      return {
        ...state,
        players: [...state.players, game.newPlayer(state.players.length + 1)],
      };
    }
    // Remove a player
    case types.REMOVE_PLAYER: {
      return {
        ...state,
        players: state.players.slice(0, state.players.length - 1),
      };
    }
    // Set the number of players
    case types.SET_NUMBER_OF_PLAYERS: {
      if (state.players.length === action.numberOfPlayers) {
        return state;
      }

      let players;
      if (state.players.length < action.numberOfPlayers) {
        const game = games[state.type];
        players = [...state.players];
        for (let i = state.players.length; i < action.numberOfPlayers; i++) {
          players.push(game.newPlayer(i));
        }
      } else {
        players = state.players.slice(0, action.numberOfPlayers - 1);
      }

      return {
        ...state,
        players,
      };
    }

    default:
      return state;
  }
}
