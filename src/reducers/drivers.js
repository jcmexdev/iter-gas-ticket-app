import * as actions from '../actions/types';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DRIVERS: {
      return action.drivers;
    }
    default:
      return state;
  }
};

export default reducer;
