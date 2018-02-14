import React, { PropTypes } from 'react';
import CoursesListRow from './CoursesListRow';

const CoursesList = ({
  courses,
  deleteCourse
}) => (
  <table className="table" >
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => (
        <CoursesListRow key={course.id} course={course} onDelete={deleteCourse} />
      ))}
    </tbody>
  </table>
);

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CoursesList;