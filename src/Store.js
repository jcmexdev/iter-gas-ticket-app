import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';

const reducer = combineReducers({
  user,
});

export default createStore(reducer, applyMiddleware(thunk));
