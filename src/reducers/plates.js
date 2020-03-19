import * as actions from '../actions/types';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PLATES: {
      return action.plates;
    }
    default:
      return state;
  }
};

export default reducer;
