import React, { useState, useContext, useCallback } from "react";
import AuthContext from "./Auth";

const ContentContext = React.createContext();

const FAVORITES_STORAGE_KEY = "FELIX_FAVORITES";
const FREE_MOVIES_API = "https://dummy-video-api.onrender.com/content/free-items";
const PAID_MOVIES_API = "https://dummy-video-api.onrender.com/content/items";

function ContentProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(
    async (type) => {
      const apiEndpoint =
        {
          all: PAID_MOVIES_API,
          free: FREE_MOVIES_API,
        }[type] || FREE_MOVIES_API;

      setLoading(true);
      setError(false);

      try {
        const response = await fetch(apiEndpoint, {
          headers: { authorization: token },
        });

        if (response.status > 399 && response.status < 600) {
          throw new Error("failed to load");
        }

        const moviesData = await response.json();

        setMovies(moviesData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const toggleFavorite = (id) => {
    let newFavorites = [...favorites];

    if (favorites.includes(id)) {
      newFavorites = newFavorites.filter((movieId) => movieId !== id);
    } else {
      newFavorites = newFavorites.concat(id);
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <ContentContext.Provider
      value={{ favorites, toggleFavorite, loading, error, movies, getMovies }}
    >
      {children}
    </ContentContext.Provider>
  );
}

function withContent(Component) {
  return (props) => {
    const context = useContext(ContentContext);

    return <Component {...context} {...props} />;
  };
}

export { ContentProvider, withContent };
export default ContentContext;
