import React from 'react';
import { useLocation } from 'react-router-dom';

function AddToFavourites(): React.ReactElement {
  const location = useLocation();
  const { show } = location.state;

  return (
    <div>
      <h1>Add to Favourites</h1>
      <p>Show Name: {show.name}</p>
      {/* Display other properties of the show object as needed */}
    </div>
  );
}

export default AddToFavourites;
