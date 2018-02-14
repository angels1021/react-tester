import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CoursesListRow = ({ course, onDelete }) => {

  const { id, watchHref, title, category, authorId, length } = course;

  return (
    <tr>
      <td><a href={watchHref} target="_blank" rel="noopener noreferrer" >Watch</a></td>
      <td><Link to={`/courses/${id}`} >{title}</Link></td>
      <td>{authorId}</td>
      <td>{category}</td>
      <td>{length}</td>
    </tr>
  );
};

CoursesListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CoursesListRow;