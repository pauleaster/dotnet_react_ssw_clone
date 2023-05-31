import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Api from '../../services';
import { Loader } from '../../components/Loader';

interface Show {
  name: string;
  premiered: string;
  rating: {
    average: number;
  };
  _embedded: {
    episodes: any[];
  };
  image: {
    medium: string;
  };
}

function SingleSeries(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    const fetchShow = async (): Promise<void> => {
      if (id) {
        const innerShow = await Api.SeriesService.getShow(id);

        // Create the data object with the desired properties
        const data = {
          name: innerShow.name,
          premiered: innerShow.premiered,
          rating: innerShow.rating.average,
        };

        // Send the show data to the backend API
        await fetch('/api/shows', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        setShow(innerShow);
      }
    };

    fetchShow();
  }, [id]);

  console.log('show:', show);

  return (
    <div>
      {!show && <Loader />}
      {show && (
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
      )}
    </div>
  );
}

export default SingleSeries;
