import * as actions from '../actions/types';

const initialState = {
  user: null,
  name: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return '';
    }
    default:
      return state;
  }
};

export default reducer;
