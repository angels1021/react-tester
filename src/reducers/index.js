import { combineReducers } from 'redux';
import courses from './courseReducers';
import authors from './authorsReducers';
import callsInProgress from './ajaxCallsInProgressReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  callsInProgress
});

export default rootReducer;