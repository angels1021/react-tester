import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import throttle from 'lodash/throttle';
import toaster from 'toastr';
import * as courseActions from '../../actions/courseAction';
import * as stateActions from '../../reducers/collectionReducers';
import { formatAuthorsForDropdown } from '../../selectors/selectors';
import CourseForm from './CourseForm';

export class ManageCoursePage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { ...this.props.course },
      errors: {},
      saving: false
    };

    this.updateCourseState = throttle(this.updateCourseState.bind(this), 100);
    this.courseFormChange = this.courseFormChange.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: { ...nextProps.course } });
    }
  }

  updateCourseState(key, value) {
    const course = { ...this.state.course };
    course[key] = value;
    return this.setState({ course });
  }

  courseFormChange(ev) {
    const key = ev.target.name;
    const value = ev.target.value;
    this.updateCourseState(key, value);
  }

  courseFormIsValid() {
    let isValid = true;
    const errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  }

  saveCourse(ev) {
    ev.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    const { course } = this.state;
    const { saveCourse } = this.props.actions;

    this.setState({ saving: true });
    saveCourse(course).then(() => {
      this.setState({ saving: false });
      toaster.success('Course saved!');
      this.context.router.push('/courses');
    }).catch(ex => {
      this.setState({ saving: false });
      toaster.error(ex);
      throw new Error(ex);
    });
  }

  render() {
    const { saving, errors, course } = this.state;
    const { authors } = this.props;
    return (
      <CourseForm
        course={course}
        onSave={this.saveCourse}
        onChange={this.courseFormChange}
        allAuthors={authors}
        saving={saving}
        errors={errors}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = ({ courses, authors }, { params }) => {
  const courseId = params.id;
  const courseModel = { id: 0, watchHref: '', title: '', category: '', authorId: '', length: 0 };
  //get id from route params and extract single course from courses.courses

  const course = stateActions.getById(courses, courseId) || courseModel;
  const authorsAsDropdownOptions = formatAuthorsForDropdown(stateActions.getAll(authors));

  return {
    course,
    authors: authorsAsDropdownOptions
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(courseActions, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);