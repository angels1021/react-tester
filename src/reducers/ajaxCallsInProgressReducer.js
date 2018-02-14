import initialState from './intialState';

const isSuccess = (action) => {
  const match = action.match(/._SUCCESS$/);
  return match ? action.substr(0, match.index + 1) : false;
};

const isPending = (action) => {
  const match = action.match(/._PENDING$/);
  return match ? action.substr(0, match.index + 1) : false;
};

const isFailed = (action) => {
  const match = action.match(/._FAILED$/);
  return match ? action.substr(0, match.index + 1) : false;
};

const ajaxCallsInProgressReducer = (state = initialState.callsInProgress, action) => {

  const pending = isPending(action.type);
  if (pending) {
    return [...state.filter(item => item !== pending), pending];
  }

  const complete = isSuccess(action.type) || isFailed(action.type);
  if (complete) {
    return [...state.filter(item => item !== complete)];
  }

  return state;
};

export default ajaxCallsInProgressReducer;
