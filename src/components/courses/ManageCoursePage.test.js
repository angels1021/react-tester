import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';


function setup() {
  const props = {
    course: { id: 0, watchHref: '', title: '', category: '', authorId: '', length: 0 },
    actions: { saveCourse: () => Promise.resolve() },
    authors: []
  };

  return mount(<ManageCoursePage {...props} />);
}

describe("ManageCoursePage page", () => {
  it("sets an error message when trying to save empty title", () => {
    const wrapper = setup();
    const saveButton = wrapper.find('button').last();
    const form = wrapper.find('form');
    expect(saveButton.prop('type')).toBe('submit');
    form.simulate('submit');
    expect(wrapper.state().errors.title).toEqual('Title must be at least 5 characters.');
  });
});
