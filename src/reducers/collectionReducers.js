import { combineReducers } from 'redux';
import * as types from '../actions/actionsTypes';

function setCollectionReducers(type = '') {

  if (!type) {
    throw new Error('cannot set collection reducers without a type string');
  }

  const typeCAP = type.toUpperCase();
  const actionTypes = {
    SUCCESS: types[`LOAD_${typeCAP}_SUCCESS`],
    FAILED: types[`LOAD_${typeCAP}_FAILED`],
    PENDING: types[`LOAD_${typeCAP}_PENDING`],
    UPDATE_SUCCESS: types[`UPDATE_${typeCAP}_SUCCESS`],
    CREATE_SUCCESS: types[`CREATE_${typeCAP}_SUCCESS`],
    DELETE_SUCCESS: types[`DELETE_${typeCAP}_SUCCESS`]
  };

  const anyUndefined = Object.keys(actionTypes).filter(action => !actionTypes[action]);

  if (anyUndefined.length) {
    throw new Error(`missing action type ${anyUndefined.join(", ")} for ${type} collection reducers in ../actions/actionsTypes`);
  }

  /* eslint-disable array-callback-return */
  /* eslint-disable no-param-reassign */
  const ids = (state = [], action) => {
    if (!action.response) { return state; }
    switch (action.type) {
      case actionTypes.SUCCESS:
        return action.response.map(item => item.id) || state;

      case actionTypes.CREATE_SUCCESS:
        return [...state.filter(id => id !== action.response.id), action.response.id];

      default:
        return state;
    }
  };

  const byId = (state = {}, action) => {
    if (!action.response) { return state; }

    switch (action.type) {
      case actionTypes.SUCCESS:
        return action.response.reduce((collection, item) => {
          collection[item.id] = item;
          return collection;
        }, {});

      case actionTypes.UPDATE_SUCCESS:
      case actionTypes.CREATE_SUCCESS:
        return { ...state, ...{ [action.response.id]: action.response } };

      default:
        return state;
    }
  };

  /* eslint-enable array-callback-return */
  /* eslint-enable no-param-reassign */

  const pending = (state = false, action) => {
    switch (action.type) {
      case actionTypes.SUCCESS:
      case actionTypes.FAILED:
        return false;
      case actionTypes.PENDING:
        return true;
      default:
        return state;
    }
  };

  const error = (state = false, action) => {
    switch (action.type) {
      case actionTypes.SUCCESS:
      case actionTypes.PENDING:
        return false;
      case actionTypes.FAILED:
        return action.error || { message: `failed to load ${type}` };
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    byId,
    pending,
    error
  });

}

export const getById = (state, id) => state.byId[id];

export const getAll = state => state.ids.map(id => getById(state, id));

export default setCollectionReducers;