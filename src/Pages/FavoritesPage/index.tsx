import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axiosInstance from '../../Utils/axiosInstance';

interface FavoriteMovie {
  _id: string;
  userId: string;
  movieId: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [error, setError] = useState('');
  
  const userId = localStorage.getItem('userId');

  const fetchFavorites = async () => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      return;
    }

    try {
      const response = await axiosInstance.get(`api/favourites?userId=${userId}`);
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
      const response = await axiosInstance.delete('api/favourites', {
        params: { userId, movieId },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setFavorites(favorites.filter((movie) => movie.movieId !== movieId));
      } else {
        setError('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      setError('Failed to remove favorite');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return (
    <div className="container mx-auto p-6 md:p-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Favorites</h1>
      {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 text-5xl">No favourite movies found... </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-full">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{movie.title}</h2>
              <p className="text-sm text-gray-700 mb-2 line-clamp-3">{movie.overview}</p>
              <p className="text-sm text-gray-500 mb-4">Release Date: {movie.release_date}</p>
              <div className="mt-auto text-right">
                <button
                  onClick={() => removeFavorite(movie.movieId)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-full flex items-center justify-center"
                >
                  <FaTrash className="mr-2" /> Remove
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
