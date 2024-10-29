import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import languages from '../../data/languages';
import genres from '../../data/genres';
import image from '../../assets/optical-fiber-background.jpg';

const TMDB_API_KEY = '82bf8e7015e539b6b3839975fa59392a';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  trailerUrl?: string;
}

const MovieSearch: React.FC = () => {
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError('');

      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc`;

      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`;
      } else {
        if (language) url += `&with_original_language=${language}`;
        if (genre) url += `&with_genres=${genre}`;
      }

      const response = await axios.get(url);
      const moviesWithTrailers = await Promise.all(
        response.data.results.map(async (movie: Movie) => {
          const trailerResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`
          );
          const trailer = trailerResponse.data.results.find((video: any) => video.type === 'Trailer');
          return {
            ...movie,
            trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
          };
        })
      );
      setMovies(moviesWithTrailers);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies();
  };

  const toggleFavorite = (movieId: number) => {
    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto p-4 max-w-[2000px] backdrop-blur-lg bg-white bg-opacity-10 rounded-lg shadow-lg">
        
        {/* Static Search Form */}
        <div className="mb-4 bg-white bg-opacity-70 p-4 rounded-lg shadow sticky top-0 z-10">
          <h1 className="text-3xl font-bold mb-4 text-center">Movie Search</h1>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded py-2 px-4 flex-grow"
            />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded py-2 px-4"
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
              className="border rounded py-2 px-4"
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
        </div>
        
        {/* Movie List Container */}
        <div className="overflow-y-auto h-[calc(850px)] max-h-[80vh] max-w-20xl">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white p-4 rounded shadow relative flex flex-col justify-between h-full"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover mb-4 rounded"
                  onClick={() => setHoveredMovieId(movie.id)}
                />
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-700 truncate">{movie.overview}</p>
                <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>

                <div className="absolute top-2 right-2" onClick={() => toggleFavorite(movie.id)}>
                  <FaHeart
                    className={`text-2xl ${favorites.includes(movie.id) ? 'text-red-500' : 'text-gray-400'}`}
                  />
                </div>
                
                {hoveredMovieId === movie.id && movie.trailerUrl && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-full max-w-lg bg-white rounded p-4 relative">
                      <iframe
                        width="100%"
                        height="315"
                        src={movie.trailerUrl}
                        title={`${movie.title} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <button
                        onClick={() => setHoveredMovieId(null)}
                        className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
