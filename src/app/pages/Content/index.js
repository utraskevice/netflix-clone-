import React from "react";

import MovieCard from "../../components/MovieCard";
import { withContent } from "../../context/Content";
import "./index.css";

class Content extends React.Component {
  componentDidMount() {
    const { getMovies } = this.props;

    getMovies("all");
  }

  render() {
    const { favorites, toggleFavorite, movies, loading, error } = this.props;

    if (loading) {
      return (
        <div className="Content">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="Content">
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
}

export default withContent(Content);
