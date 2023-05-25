import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Series } from '../../containers/Series';
import SingleSeries from '../../containers/SingleSeries';

export function Main(): React.JSX.Element {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Series />} />
        <Route path="/series/:id" element={<SingleSeries />} />
      </Route>
    </Routes>
  );
}

export default Main;
