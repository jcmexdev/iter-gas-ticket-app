import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Thunk from 'redux-thunk';
import user from './reducers/user';

const reducer = combineReducers({
  user,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// const logger = store => next => action => {
//   console.log('dispatching =>', action);
//   let result = next(action);
//   console.log('next state =>', store.getState());
//   return result;
// };

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(Thunk));
const persistor = persistStore(store);

export { store, persistor };
