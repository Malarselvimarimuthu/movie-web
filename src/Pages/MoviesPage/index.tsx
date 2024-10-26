// const apiKey = '82bf8e7015e539b6b3839975fa59392a'; 
import React, { useEffect, useState } from 'react';

// Define TypeScript interfaces for the data
interface Trailer {
  title: string;
  trailerUrl: string;
}

interface MovieWithTrailers {
  movie: string;
  trailers: Trailer[];
}

const MovieTrailers: React.FC = () => {
  // Declare your API key here
  const apiKey = '82bf8e7015e539b6b3839975fa59392a'; // Replace with your actual API key

  const [recommendations, setRecommendations] = useState<MovieWithTrailers[]>([]);
  const [language, setLanguage] = useState<string>('en-US'); // Default language to Tamil
  const [inputLanguage, setInputLanguage] = useState<string>(''); // Language input from user

  // Fetch recommendations and trailers based on the selected language
  useEffect(() => {
    const fetchRecommendationsWithTrailers = async () => {
      try {
        // Fetch popular movies based on the selected language
        const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=${language}&page=1&api_key=${apiKey}`;
        const popularMoviesResponse = await fetch(popularMoviesUrl);
        const popularMoviesData = await popularMoviesResponse.json();

        // Fetch trailers for each popular movie
        const recommendationsWithTrailers = await Promise.all(
          popularMoviesData.results.map(async (movie: any) => {
            const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=${language}&api_key=${apiKey}`;
            const trailerResponse = await fetch(trailerUrl);
            const trailerData = await trailerResponse.json();

            const trailers = trailerData.results
              .filter((video: any) => video.type === 'Trailer')
              .map((trailer: any) => ({
                title: movie.title,
                trailerUrl: `https://www.youtube.com/embed/${trailer.key}`,
              }));

            return { movie: movie.title, trailers };
          })
        );

        setRecommendations(recommendationsWithTrailers);
      } catch (error) {
        console.error('Error fetching recommendations or trailers:', error);
      }
    };

    // Only fetch if inputLanguage is not empty
    if (inputLanguage) {
      setLanguage(inputLanguage);
      fetchRecommendationsWithTrailers();
    }
  }, [apiKey, inputLanguage]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Recommended Movies and Trailers</h1>

      {/* User Input for Language */}
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="language-input" className="mb-2">Enter Language Code (e.g., ta): </label>
        <input
          type="text"
          id="language-input"
          className="border border-gray-300 rounded px-4 py-2 mb-2"
          value={inputLanguage}
          onChange={(e) => setInputLanguage(e.target.value)}
          placeholder="Type language code"
        />
        <button 
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          onClick={() => setLanguage(inputLanguage)}
        >
          Submit
        </button>
      </div>

      <div id="movies-container" className="w-full max-w-2xl">
        {recommendations.map((movie, movieIndex) => (
          <div key={movieIndex} className="mb-6">
            <h2 className="text-xl font-semibold">{movie.movie}</h2>
            {movie.trailers.map((trailer, trailerIndex) => (
              <div key={trailerIndex} style={{ marginBottom: '20px' }}>
                <iframe
                  width="560"
                  height="315"
                  src={trailer.trailerUrl}
                  title={`${movie.movie} Trailer ${trailerIndex + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTrailers;
