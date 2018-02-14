import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as courseAction from './courseAction';
import * as types from './actionsTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Course Actions ...", () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it("should create LOAD_COURSES_PENDING and LOAD_COURSES_SUCCESS actions when loading courses", (done) => {
    // nock('http://my/rest/api')
    //   .get('/courses')
    //   .reply(
    //         200,
    //         {
    //           body: {
    //             courses: [
    //               {
    //                 id: 'A',
    //                 watchHref: '',
    //                 title: 'A',
    //                 category: '',
    //                 authorId: '1',
    //                 length: 10
    //               }
    //             ]
    //           }
    //         }
    //       )

    const expectedActions = [
      {
        type: types.LOAD_COURSES_PENDING,
      },
      {
        type: types.LOAD_COURSES_SUCCESS,
        response: [{ id: 'A', watchHref: '', title: 'A', category: '', authorId: '1', length: 10 }]
      }
    ];

    const intitalState = {
      ids: [],
      byId: {},
      error: false,
      pending: false
    };

    const store = mockStore(intitalState, expectedActions);


    store.dispatch(courseAction.loadCourses())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.LOAD_COURSES_PENDING);
        expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
        done();
      })
      .catch(done);

  });
});
