import React, { useState } from 'react';
import axios from 'axios';

const TMDB_API_KEY = '82bf8e7015e539b6b3839975fa59392a';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

const MovieSearch: React.FC = () => {
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { iso_639_1: 'kw', english_name: 'Cornish', name: '' },
    { iso_639_1: 'ff', english_name: 'Fulah', name: 'Fulfulde' },
    { iso_639_1: 'gn', english_name: 'Guarani', name: '' },
    { iso_639_1: 'id', english_name: 'Indonesian', name: 'Bahasa indonesia' }
    // Add more languages as needed
  ];

  const genres = [
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
    // Add more genres as needed
  ];

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError('');
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}`;
      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`;
      } else {
        if (language) {
          url += `&with_original_language=${language}`;
        }
        if (genre) {
          url += `&with_genres=${genre}`;
        }
      }
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded py-2 px-4 mr-2"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded py-2 px-4 mr-2"
        >
          <option value="">Select Language</option>
          {languages.map((lang) => (
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name}
            </option>
          ))}
        </select>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border rounded py-2 px-4 mr-2"
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-4">{movie.title}</h2>
            <p className="text-sm text-gray-600 mt-2">
              {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available'}
            </p>
            <p className="text-gray-500 mt-1">Release Date: {movie.release_date || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
