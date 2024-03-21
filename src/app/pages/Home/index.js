import React, { useEffect, useContext } from "react";

import MovieCard from "../../components/MovieCard";
import ContentContext from "../../context/Content";
import "./index.css";

function Home() {
  const { favorites, toggleFavorite, movies, loading, error, getMovies } =
    useContext(ContentContext);

  useEffect(() => {
    getMovies("free");
  }, [getMovies]);

  if (loading) {
    return (
      <div className="Home">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="Home">
      {loading && <p>Loading...</p>}
      {error && <p>Whoops! Movies stolen by pirate clouds! 😱🏴‍☠️☁️</p>}
      {movies.map(({ title, id, description, image }) => (
        <MovieCard
          id={id}
          key={id}
          title={title}
          description={description}
          image={image}
          isFavorite={favorites.includes(id)}
          onToggleFavorite={() => toggleFavorite(id)}
        />
      ))}
    </div>
  );
}

export default Home;
