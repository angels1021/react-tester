/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home';
import AboutPage from './components/about';
import CoursesPage from './components/courses';
import ManageCoursePage from './components/courses/ManageCoursePage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="courses/:id" component={ManageCoursePage} />
  </Route>
);