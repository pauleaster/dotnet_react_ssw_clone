import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Api from '../../services';
import { Loader } from '../../components/Loader';
import Show from './Show';
import ShowDetails from './ShowDetails';

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
      {show && <ShowDetails show={show} />}
    </div>
  );
}

export default SingleSeries;
