import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import SubmitButton from '../common/SubmitButton';

const CourseForm = ({ course, allAuthors, onSave, onChange, saving, errors }) => (
  <form
    onSubmit={onSave}
  >
    <h1>Manage Course</h1>
    <TextInput name="title" label="title" value={course.title} onChange={onChange} />
    <SelectInput
      name="authorId"
      label="author"
      value={course.authorId}
      options={allAuthors}
      defaultOption={'Select author'}
      onChange={onChange}
    />
    <TextInput name="category" label="Category" value={course.category} onChange={onChange} />
    <TextInput name="length" label="Length" value={course.length} onChange={onChange} />
    <SubmitButton saving={saving} />
  </form>
);

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

CourseForm.defaultProps = {
  allAuthors: PropTypes.array,
  errors: PropTypes.object
};

export default CourseForm;