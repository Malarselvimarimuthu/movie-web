import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [error, setError] = useState('');
  
  // Retrieve userId from local storage
  const userId = localStorage.getItem('userId');

  const fetchFavorites = async () => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/favourites?userId=${userId}`);
      setFavorites(response.data);
    } catch (error) {
      setError('Failed to fetch favorites');
    }
  };

  const removeFavorite = async (movieId: number) => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/favourites`, {
        params: { userId, movieId }, // Pass userId and movieId as query parameters
      });
      setFavorites(favorites.filter((movie) => movie.id !== movieId));
    } catch (error) {
      setError('Failed to remove favorite');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Favorites</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.id} className="bg-white p-4 rounded shadow flex flex-col justify-between h-full">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p className="text-sm text-gray-700 truncate">{movie.overview}</p>
              <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>

              <div className="mt-4 text-right">
                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-full flex items-center justify-center"
                >
                  <FaTrash className="mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
