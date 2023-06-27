import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Series } from '../../containers/Series';
import SingleSeries from '../../containers/SingleSeries';
import AddToFavourites from '../../containers/Favourites';

export function Main(): React.JSX.Element {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Series />} />
        <Route path="/series/:id" element={<SingleSeries />} />
        <Route path="/addtofavourites" element={<AddToFavourites />} />
      </Route>
    </Routes>
  );
}

export default Main;
