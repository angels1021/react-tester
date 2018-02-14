import * as actions from './actionsTypes';
import authorAoi from '../mockApi/mockAuthorsApi';

export const loadAuthorsSuccess = (response) => ({
  type: actions.LOAD_AUTHORS_SUCCESS,
  response
});

export const loadAuthorsPending = () => ({
  type: actions.LOAD_AUTHORS_PENDING,
});

export const loadAuthorsFailed = (error) => ({
  type: actions.LOAD_AUTHORS_FAILED,
  error
});


//thunks
export const loadAuthors = () => (dispatch) => {
  dispatch(loadAuthorsPending());
  return authorAoi.getAllAuthors()
    .then(courses => {
      dispatch(loadAuthorsSuccess(courses));
    })
    .catch(ex => {
      dispatch(loadAuthorsFailed(new Error(ex)));
    });
};