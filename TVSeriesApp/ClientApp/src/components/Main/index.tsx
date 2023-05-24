import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Series } from '../../containers/Series';
import { SingleSeries } from '../../containers/SingleSeries';

export const Main = (): any => (
  <Router>
    <Route>
      <Route path="/" element={<Series />} />
      <Route path="/series/:id" element={<SingleSeries />} />
    </Route>
  </Router>
);

export default Main;
