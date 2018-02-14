import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import CourseForm from './CourseForm';


function setup(saving) {
  const props = {
    course: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
}

describe("CourseForm test", () => {

  it("renders from and h1", () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Manage Course');
  });

  it("sets submit button saving prop to false when *** not saving ***", () => {
    const wrapper = setup(false);
    expect(wrapper.children().last().props().saving).toBe(false);
  });

  it("sets submit button saving prop to true when *** is saving ***", () => {
    const wrapper = setup(true);
    expect(wrapper.children().last().props().saving).toBe(true);
  });
});

