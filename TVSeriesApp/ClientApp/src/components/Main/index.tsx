import React from 'react';
import * as Router from 'react-router-dom';
import { Series } from '../../containers/Series';
import { SingleSeries } from '../../containers/SingleSeries';

export const Main = (): any => (
  <Router.Switch>
    <Router.Route exact path="/" component={Series} />
    <Router.Route path="/series/:id" component={SingleSeries} />
  </Router.Switch>
);

export default Main;
