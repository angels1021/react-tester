import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import initialState from '../reducers/intialState';

export const configureStore = () => {
  const middleware = [thunk];
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
};

