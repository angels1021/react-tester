import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import initialState from '../reducers/intialState';

export const configureStore = () => {
  const middleware = [thunk, reduxImmutableStateInvariant()];
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
};
