import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/intialState';
import * as courseActions from '../actions/courseAction';

describe("Store", () => {
  it("should successfully create a course", () => {
    //arrange
    const store = createStore(rootReducer, initialState);
    const course = { id: 'A', title: 'AB' };

    //act
    const action = courseActions.createCoursesSuccess(course);
    store.dispatch(action);

    //assert
    const newState = store.getState();
    expect(newState.courses.ids.length).toEqual(1);
    expect(newState.courses.byId.A).toEqual(course);

  });
});
