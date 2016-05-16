import * as types from '../actions/actionTypes';
import * as _ from 'lodash';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  type: 'standard',
  players: Immutable.List([
    Immutable.Map({
      id: 1,
      name: 'P01',
      life: 20,
      dice: null
    }),
    Immutable.Map({
      id: 2,
      name: 'P02',
      life: 20,
      dice: null
    })
  ])
});

class Game {
  startingLife;

  constructor(_startingLife) {
    this.startingLife = _startingLife;
  }

  newPlayer(id) {
    return Immutable.Map({
      id,
      name: 'P' + _.padStart(id.toString(), 2, '0'),
      life: this.startingLife,
      dice: null
    });
  }
}

const games = {
  standard: new Game(20),
  duelCommander: new Game(30),
  commander: new Game(40)
};

export default function (state = initialState, action = {}) {
  switch (action.type) {

    // New game
    case types.NEW_GAME:
    {
      const game = games[action.game];
      return state
        .set('type', action.game)
        .set('players', Immutable.Seq.of(1, 2)
          .map(id => game.newPlayer(id))
          .toList()
        );
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
