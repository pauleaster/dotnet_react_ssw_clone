import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function AddToFavourites(): React.ReactElement {
  const location = useLocation();
  const { show } = location.state || { show: null };
  const [message, setMessage] = useState('');

  const addToFavourites = async (): Promise<void> => {
    try {
      const response = await fetch('/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(show),
      });

      if (response.ok) {
        setMessage(`Show "${show.name}" added to favourites successfully`);
      } else {
        setMessage(`Error adding show to favourites: ${response.status}`);
      }
    } catch (error) {
      setMessage(`Error adding show to favourites: ${error}`);
    }
  };

  useEffect(() => {
    addToFavourites();
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>Favourites</h1>
      <p>{message}</p>
    </div>
  );
}

export function ListFavourites(): React.ReactElement {
  const [favourites, setfavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the list of favourites from the backend API
    const fetchfavourites = async (): Promise<void> => {
      try {
        const response = await fetch('/api/favourites'); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setfavourites(data);
        } else {
          console.error('Error fetching favourites:', response.status);
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchfavourites();
  }, []);

  return (
    <div>
      <h1>List Favourites</h1>
      {loading && <p>Loading...</p>}
      {!loading && favourites.length > 0 && (
        <>
          {favourites.map(favorite => (
            <div key={favorite.id}>
              <p>Show Name: {favorite.name}</p>
              {/* Display other properties of the favorite object as needed */}
            </div>
          ))}
        </>
      )}
      {!loading && favourites.length === 0 && <p>No favourites found.</p>}
    </div>
  );
}
