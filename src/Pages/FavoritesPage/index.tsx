import React, { useState } from 'react';
import './MovieCard.css'; // Assuming you're using CSS for styling

interface Movie {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    imageUrl: string;
}

const MovieCard: React.FC<Movie> = ({ id, title, description, releaseDate, imageUrl }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <div className="movie-card">
            <img src={imageUrl} alt={title} className="movie-image" />
            <div className="movie-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <p><strong>Release Date:</strong> {releaseDate}</p>
            </div>
        </div>
    );
};

const MovieList: React.FC = () => {
    const movies: Movie[] = [
        {
            id: 1,
            title: "The Wild Robot",
            description: "After a shipwreck, an intelligent robot called Roz is ...",
            releaseDate: "2024-09-12",
            imageUrl: "https://image.tmdb.org/t/p/w500//wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
        },
        {
            id: 2,
            title: "Venom: The Last Dance",
            description: "Eddie and Venom are on the run. Hunted by both ...",
            releaseDate: "2024-10-22",
            imageUrl: "https://image.tmdb.org/t/p/w500//63xYQj1BwRFielxsBDXvHIJyXVm.jpg",
        },
    ];

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    id={movie.id} 
                    title={movie.title} 
                    description={movie.description} 
                    releaseDate={movie.releaseDate} 
                    imageUrl={movie.imageUrl} 
                />
            ))}
        </div>
    );
};

export default MovieList;
