import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaCommentDots, FaPlay } from 'react-icons/fa'; // Added FaPlay icon for the trailer button
import languages from '../../data/languages';
import genres from '../../data/genres';
import image from '../../assets/optical-fiber-background.jpg';
import axiosInstance from '../../Utils/axiosInstance';
const TMDB_API_KEY = '82bf8e7015e539b6b3839975fa59392a';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  trailerUrl?: string;
}

interface Command {
  username: string;
  command: string;
  movieId: number;
}

const MovieSearch: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeCommandMovieId, setActiveCommandMovieId] = useState<number | null>(null);
  const [allCommands, setAllCommands] = useState<Command[]>([]);
  const [newCommand, setNewCommand] = useState<string>('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUsername(storedUserId);
    }
  }, []);

  const fetchUsername = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`api/users/getname/${userId}`);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

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

  const fetchFavorites = async () => {
    if (!userId) return;
    try {
      const response = await axiosInstance.get(`api/favourites?userId=${userId}`);
      setFavorites(response.data.map((fav: any) => fav.movieId));
    } catch (error) {
      console.error('Error fetching favorites', error);
    }
  };

  const toggleFavorite = async (movie: Movie) => {
    if (!userId){
      alert("Login to Access Favourites")
      return;
    };
    try {
      const isFavorite = favorites.includes(movie.id);

      if (isFavorite) {
        await axiosInstance.delete(`api/favourites`, {
          params: { userId, movieId: movie.id },
        });
        setFavorites(favorites.filter((id) => id !== movie.id));
      } else {
        await axiosInstance.post('api/favourites', {
          userId,
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
        });
        setFavorites([...favorites, movie.id]);
      }
    } catch (error) {
      console.error('Error toggling favorite', error);
    }
  };

  const fetchAllCommands = async (movieId: number) => {
    try {
      const response = await axiosInstance.get(`api/feedback/getfeedback?movieId=${movieId}`);
      setAllCommands(response.data);
    } catch (error) {
      console.error('Error fetching commands:', error);
    }
  };

  const handleCommandSubmit = async () => {
    if (!userId || !username || !newCommand || activeCommandMovieId === null) return;
    try {
      await axiosInstance.post('api/feedback/submit', {
        userId,
        username,
        command: newCommand,
        movieId: activeCommandMovieId,
      });
      setNewCommand('');
      fetchAllCommands(activeCommandMovieId); // Refresh commands for this movie
    } catch (error) {
      console.error('Error submitting command:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchFavorites();
  }, [userId, searchQuery, language, genre]);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto p-4 max-w-[2000px] backdrop-blur-lg bg-white bg-opacity-10 rounded-lg shadow-lg">
        
        <div className="mb-4 bg-white bg-opacity-70 p-4 rounded-lg shadow sticky top-0 z-10">
          <h1 className="text-3xl font-bold mb-4 text-center">Movie Search</h1>
          <form onSubmit={(e) => { e.preventDefault(); fetchMovies(); }} className="flex flex-col sm:flex-row items-center gap-2">
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
        
        <div className="overflow-y-auto h-[calc(850px)] max-h-[80vh] max-w-20xl">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white p-3 rounded shadow relative flex flex-col justify-between h-full"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover mb-2 rounded"
                  onClick={() => setHoveredMovieId(movie.id)}
                />
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-700 overflow-y-auto h-24 mb-2">{movie.overview}</p>
                <p className="text-sm text-gray-700 font-bold">Release Date: {movie.release_date}</p>

                <div className="flex items-center justify-between mt-2">
                  <button onClick={() => toggleFavorite(movie)}>
                    <FaHeart
                      size={20}
                      className={favorites.includes(movie.id) ? 'text-red-500' : 'text-gray-500'}
                    />
                  </button>
                  {movie.trailerUrl && (
                    <button
                      className="text-gray-500 flex items-center space-x-1"
                      onClick={() => window.open(movie.trailerUrl, '_blank')}
                    >
                      <FaPlay /> <span>Trailer</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setActiveCommandMovieId(movie.id);
                      fetchAllCommands(movie.id);
                    }}
                    className="text-gray-700 flex items-center space-x-1"
                  >
                    <FaCommentDots /> <span>Comments</span>
                  </button>
                </div>

                {activeCommandMovieId === movie.id && (
                  <div className="p-4 mt-2 bg-gray-200 rounded-lg max-h-40 overflow-y-auto">
                    {allCommands.map((cmd, index) => (
                      <p key={index}>
                        <strong>{cmd.username}:</strong> {cmd.command}
                      </p>
                    ))}
                    <textarea
                      value={newCommand}
                      onChange={(e) => setNewCommand(e.target.value)}
                      className="w-full p-2 rounded mt-2"
                      placeholder="Leave a comment..."
                    />
                    <button
                      onClick={handleCommandSubmit}
                      className="bg-blue-500 text-white p-2 rounded mt-2"
                    >
                      Submit
                    </button>
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
