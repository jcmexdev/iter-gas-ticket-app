import * as actions from '../actions/types';

const initialState = { fullName: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return { ...state, fullName: action.payload.fullName };
    }
    case actions.REMOVE_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
