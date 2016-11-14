import * as types from '../actions/actionTypes';
import * as _ from 'lodash';
import Immutable from 'immutable';

class Game {
  type;
  startingLife;
  minPlayer;
  maxPlayer;

  constructor(_type, _startingLife, _minPlayer, _maxPlayer) {
    this.type         = _type;
    this.startingLife = _startingLife;
    this.minPlayer    = _minPlayer;
    this.maxPlayer    = _maxPlayer || 18;
  }

  newGame() {
    return Immutable.Map({
      type: this.type,
      minPlayer: this.minPlayer,
      maxPlayer: this.maxPlayer,
      players: Immutable.List.of(..._.range(1, this.minPlayer + 1))
        .map(id => this.newPlayer(id))
        .toList()
    });
  }

  newPlayer(id) {
    return Immutable.Map({
      id,
      name: 'P' + _.padStart(id.toString(), 2, '0'),
      dice: null,
      life: this.startingLife,
      poison: 0,
      energy: 0,
    });
  }

  reset(game) {
    return game.update('players', players => {
      return players.map(player => {
        return player
          .set('dice', null)
          .set('life', this.startingLife)
          .set('poison', 0)
          .set('energy', 0);
      })
    });
  }
}

const games = {
  standard: new Game('standard', 20, 2),
  duelCommander: new Game('duelCommander', 30, 2),
  commander: new Game('commander', 40, 3)
};

const initialState = games.standard.newGame();

export default function (state = initialState, action = {}) {
  switch (action.type) {

    // New game
    case types.NEW_GAME:
    {
      return games[action.game].newGame();
    }

    // Reset game
    case types.RESET_GAME:
    {
      return games[state.get('type')].reset(state);
    }

    // Rolling dice for a player
    case types.ROLL_DICE:
    {
      return state.update('players', players => {
        return players.update(
          players.findIndex(player => player.get('id') === action.playerId),
          player => player.set('dice', _.random(1, 20))
        )
      });
    }

    // Increment player's counter by 1
    case types.INC_COUNTER:
    {
      return state.update('players', players => {
        return players.update(
          players.findIndex(player => player.get('id') === action.playerId),
          player => player.set(action.counter.id, player.get(action.counter.id) + 1)
        )
      });
    }

    // Decrement player's counter by 1
    case types.DEC_COUNTER:
    {
      return state.update('players', players => {
        return players.update(
          players.findIndex(player => player.get('id') === action.playerId),
          player => player.set(action.counter.id, player.get(action.counter.id) - 1)
        )
      });
    }

    // Add a player
    case types.ADD_PLAYER:
    {
      const game = games[state.get('type')];
      return state.update('players', players => {
        return players.push(game.newPlayer(players.size + 1));
      });
    }

    // Remove a player
    case types.REMOVE_PLAYER: {
      return state.update('players', players => {
        return players.pop();
      });
    }

    // Set the number of players
    case types.SET_NUMBER_OF_PLAYERS: {
      if (state.get('players').size === action.numberOfPlayers) {
        return state;
      }

      const game = games[state.get('type')];
      return state.update('players', players => {
        if (players.size < action.numberOfPlayers) {
          // Il faut ajouter des joueurs
          while (players.size < action.numberOfPlayers) {
            players = players.push(game.newPlayer(players.size + 1))
          }
        } else {
          // Il faut retirer des joueurs
          players = players.take(action.numberOfPlayers);
        }
        return players;
      });
    }

    default:
      return state;
  }
}
