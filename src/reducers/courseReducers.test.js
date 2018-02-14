import expect from 'expect';
import courseReducers from './courseReducers';
import * as actions from '../actions/courseAction';

describe("Course Reducers", () => {
  describe("should add course when passed 'CREATE_COURSES_SUCCESS'", () => {
    const intitalState = {
      ids: ['A'],
      byId: {
        A: {
          id: 'A',
          title: 'A'
        }
      },
      error: false,
      pending: false
    };

    const newCourse = {
      id: 'B',
      title: 'B'
    };

    const action = actions.createCoursesSuccess(newCourse);

    const newState = courseReducers(intitalState, action);

    const expectedState = {
      ids: ['A', 'B'],
      byId: {
        A: {
          id: 'A',
          title: 'A'
        },
        B: {
          id: 'B',
          title: 'B'
        }
      },
      error: false,
      pending: false
    };

    it("state.ids length should have incremented by 1", () => {
      expect(newState.ids.length).toEqual(2);
    });

    it("state.byId should have added the new course under it's 'id' property", () => {
      expect(newState.byId.B.title).toEqual('B');
    });

    it('all props should have updated with the new course', () => {
      expect(newState).toEqual(expectedState);
    });
  });

});