import React, {Component} from 'react';
import {View} from 'react-native';
import {initStore} from './store';
import {Provider} from 'react-redux';
import {LAYOUT_CHANGE} from './actions/actionTypes';

import {Game} from './views/Game';

const store = initStore();

/**
 * Index commun entre iOS et Android
 */
export default class extends Component {

  onLayout = (event) => {
    const {width, height} = event.nativeEvent.layout;
    store.dispatch({
      type: LAYOUT_CHANGE,
      payload: (width > height) ? 'LANDSCAPE' : 'PORTRAIT'
    })
  };

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}} onLayout={this.onLayout}>
          <Game />
        </View>
      </Provider>
    );
  }

}
