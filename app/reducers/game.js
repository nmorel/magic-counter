import * as types from '../actions/actionTypes';
import * as _ from 'lodash';
import Immutable from 'immutable';

class Game {
  type;
  startingLife;
  startingPlayerNumber;

  constructor(_type, _startingLife, _startingPlayerNumber) {
    this.type                 = _type;
    this.startingLife         = _startingLife;
    this.startingPlayerNumber = _startingPlayerNumber;
  }

  newGame() {
    return Immutable.Map({
      type: this.type,
      players: Immutable.List.of(..._.range(1, this.startingPlayerNumber + 1))
        .map(id => this.newPlayer(id))
        .toList()
    });
  }

  newPlayer(id) {
    return Immutable.Map({
      id,
      name: 'P' + _.padStart(id.toString(), 2, '0'),
      life: this.startingLife,
      dice: null
    });
  }

  reset(game) {
    return game.update('players', players => {
      return players.map(player => {
        return player
          .set('life', this.startingLife)
          .set('dice', null);
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

    // Increment player's life by 1
    case types.INC_LIFE:
    {
      return state.update('players', players => {
        return players.update(
          players.findIndex(player => player.get('id') === action.playerId),
          player => player.set('life', player.get('life') + 1)
        )
      });
    }

    // Decrement player's life by 1
    case types.DEC_LIFE:
    {
      return state.update('players', players => {
        return players.update(
          players.findIndex(player => player.get('id') === action.playerId),
          player => player.set('life', player.get('life') - 1)
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

    default:
      return state;
  }
}
