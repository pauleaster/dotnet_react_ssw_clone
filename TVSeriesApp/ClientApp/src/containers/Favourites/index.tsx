import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function AddToFavourites(): React.ReactElement {
  const location = useLocation();
  const { show } = location.state || { show: null };
  const [message, setMessage] = useState('');

  const addToFavourites = async (): Promise<void> => {
    try {
      const showData = {
        Name: show.name,
        Premiered: show.premiered,
        Rating: show.rating.average,
      };

      const response = await fetch('/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showData),
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
  const [favourites, setFavourites] = useState<any[]>([]);
  const [selectedFavourite, setSelectedFavourite] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the list of favourites from the backend API
    const fetchFavourites = async (): Promise<void> => {
      try {
        const response = await fetch('/api/favourites'); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setFavourites(data);
        } else {
          console.error('Error fetching favourites:', response.status);
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handleSelectFavourite = (favourite: any): void => {
    setSelectedFavourite(favourite);
  };

  const handleEditFavourite = async (): Promise<void> => {
    try {
      if (!selectedFavourite) {
        return;
      }

      const ratingInput = document.createElement('input');
      ratingInput.type = 'number';
      ratingInput.step = '0.1';
      ratingInput.min = '0';
      ratingInput.max = '10';

      const ratingContainer = document.createElement('div');
      ratingContainer.appendChild(ratingInput);

      const confirmButton = document.createElement('button');
      confirmButton.textContent = 'Your Rating';

      ratingContainer.appendChild(confirmButton);

      const ratingModal = document.createElement('div');
      ratingModal.style.position = 'fixed';
      ratingModal.style.top = '0';
      ratingModal.style.left = '0';
      ratingModal.style.width = '100%';
      ratingModal.style.height = '100%';
      ratingModal.style.background = 'rgba(0, 0, 0, 0.5)';
      ratingModal.style.display = 'flex';
      ratingModal.style.justifyContent = 'center';
      ratingModal.style.alignItems = 'center';
      ratingModal.appendChild(ratingContainer);

      document.body.appendChild(ratingModal);

      const confirmRating = (): void => {
        const newRating = ratingInput.value;
        const parsedRating = parseFloat(newRating);

        if (Number.isNaN(parsedRating) || parsedRating < 0 || parsedRating > 10) {
          // Show inline validation error message
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'Invalid rating value. Please enter a number between 0 and 10.';
          errorMessage.style.color = 'red';
          ratingContainer.appendChild(errorMessage);
          return;
        }

        ratingModal.remove();

        const updatedFavourite = { ...selectedFavourite, myRating: parsedRating.toFixed(1).toString() };

        fetch(`/api/favourites/${selectedFavourite.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFavourite),
        })
          .then(response => {
            if (response.ok) {
              setFavourites(prevFavourites =>
                prevFavourites.map(favourite => (favourite.id === selectedFavourite.id ? updatedFavourite : favourite)),
              );
            } else {
              console.error('Error updating favorite:', response.status);
            }
          })
          .catch(error => {
            console.error('Error updating favorite:', error);
          });
      };

      confirmButton.addEventListener('click', confirmRating);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleDeleteFavourite = async (): Promise<void> => {
    try {
      if (!selectedFavourite) {
        return;
      }

      const response = await fetch(`/api/favourites/${selectedFavourite.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted favorite from the favorites state
        setFavourites(prevFavourites => prevFavourites.filter(favourite => favourite.id !== selectedFavourite.id));
        // Deselect the deleted favorite
        setSelectedFavourite(null);
      } else {
        // Handle the error response
        console.error('Error deleting favorite:', response.status);
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <div>
      <h1>Favourites</h1>
      {loading && <p>Loading...</p>}
      {!loading && favourites.length > 0 && (
        <div style={{ height: '200px', overflow: 'auto' }}>
          {favourites.map(favourite => (
            <button
              key={favourite.id}
              type="button"
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                border: 'none',
                background: selectedFavourite === favourite ? '#eee' : 'transparent',
              }}
              onClick={() => handleSelectFavourite(favourite)}
            >
              {favourite.name}
            </button>
          ))}
        </div>
      )}
      {!loading && favourites.length === 0 && <p>No favourites found.</p>}
      {!loading && selectedFavourite && (
        <div>
          <h2>Favourite</h2>
          <p>Name: {selectedFavourite.name}</p>
          <p>Release Date: {selectedFavourite.premiered}</p>
          <p>Rating: {selectedFavourite.rating}</p>
          <p>MyRating: {selectedFavourite.myrating}</p>
          {/* Display other properties of the selected favourite object as needed */}
          <button type="button" onClick={handleEditFavourite}>
            Edit
          </button>
          <button type="button" onClick={handleDeleteFavourite}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
