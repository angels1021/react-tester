import * as actions from './actionsTypes';
import courseApi from '../mockApi/mockCoursesApi';

export const loadCoursesSuccess = (response) => ({
  type: actions.LOAD_COURSES_SUCCESS,
  response
});

export const loadCoursesPending = () => ({
  type: actions.LOAD_COURSES_PENDING,
});

export const loadCoursesFailed = (error) => ({
  type: actions.LOAD_COURSES_FAILED,
  error
});

export const createCoursesSuccess = (response) => ({
  type: actions.CREATE_COURSES_SUCCESS,
  response
});

export const updateCoursesSuccess = (response) => ({
  type: actions.UPDATE_COURSES_SUCCESS,
  response
});

export const deleteCourseSuccess = (response) => ({
  type: actions.DELETE_COURSE_SUCCESS,
  response

});


//thunks
export const loadCourses = () => (dispatch) => {
  dispatch(loadCoursesPending());
  return courseApi.getAllCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(ex => {
      dispatch(loadCoursesFailed(new Error(ex)));
    });
};


export const deleteCourse = (courseId) => (dispatch) => (
  courseApi.deleteCourse(courseId)
    .then(deletedId => {
      dispatch(deleteCourseSuccess(deletedId));
    })
);

export const saveCourse = (course) => (dispatch) => (
  courseApi.saveCourse(course)
    .then(nCourse => {
      dispatch(
        (course.id) ?
        updateCoursesSuccess(nCourse) :
        createCoursesSuccess(nCourse)
      );
    })
);