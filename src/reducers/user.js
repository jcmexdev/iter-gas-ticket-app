import * as actions from '../actions/types';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return { ...state, fullName: action.payload.fullName };
    }
    default:
      return state;
  }
};

export default reducer;
