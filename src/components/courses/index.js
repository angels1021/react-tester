import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseList from './CourseList';
import * as stateActions from '../../reducers/collectionReducers';

class CoursesPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.deleteCourse = this.deleteCourse.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  deleteCourse(courseId) {
    const { actions } = this.props;
    actions.deleteCourse(courseId);
  }

  redirectToAddCoursePage() {
    this.context.router.push('/courses/new');
  }

  render() {
    const courses = stateActions.getAll(this.props.courses);


    return (
      <div>
        <h1>Courses</h1>
        <button className="btn btn-primary btn-sm" onClick={this.redirectToAddCoursePage}>
          <span>Add Course</span>
        </button>
        <CourseList courses={courses} deleteCourse={this.deleteCourse} />
      </div>
    );
  }

}

CoursesPage.propTypes = {
  courses: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

CoursesPage.contextTypes = {
  router: PropTypes.object
};


// connect
const mapStateToProps = ({ courses }) => ({
  courses
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);