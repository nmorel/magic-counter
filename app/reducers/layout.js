import * as types from '../actions/actionTypes';

const initialState = {
  width: 0,
  height: 0,
  layout: 'LANDSCAPE',
};

export default function(state = initialState, {type, payload}) {
  switch (type) {
    case types.LAYOUT_CHANGE: {
      return payload;
    }

    default:
      return state;
  }
}
