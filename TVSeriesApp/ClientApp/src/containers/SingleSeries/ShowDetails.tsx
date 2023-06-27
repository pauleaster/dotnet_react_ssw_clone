import React from 'react';
import Show from './Show';

interface ShowDetailsProps {
  show: Show;
}

function ShowDetails({ show }: ShowDetailsProps): React.ReactElement {
  return (
    <div>
      <p>{show.name}</p>
      <p>
        <span>Premiered - </span>
        <span>{show.premiered}</span>
      </p>
      <p>
        <span>Rating - </span>
        <span>{show.rating.average}</span>
      </p>
      <p>
        <span>Episodes - </span>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <span>{show._embedded.episodes.length}</span>
      </p>
      <p>
        <img alt="Show" src={show.image.medium} />
      </p>
    </div>
  );
}

export default ShowDetails;
