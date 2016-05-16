import React, {Component} from 'react';
import {Text} from 'react-native';
import {initStore} from './store';
import {Provider} from 'react-redux';

import {Game} from './views/Game';

const store = initStore();

/**
 * Index commun entre iOS et Android
 */
export default class extends Component {

  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }

}
