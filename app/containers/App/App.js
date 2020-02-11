/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import VoiceMailDetails from 'containers/voicemaildetails/Loadable';
import Header from '../../components/Header/Header';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import './style.scss';
import 'semantic-ui-css/semantic.min.css'

const App = () => (
  <div className="app-wrapper">
    <Header />
    <div>
    </div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/voicemaildetails" component={VoiceMailDetails} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
