import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const AUTH_TOKEN_STORAGE_KEY = "AUTH_TOKEN_STORAGE_KEY";
const LOGIN_API = "https://dummy-video-api.onrender.com/auth/login";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
  const [errorType, setErrorType] = useState(null);
  const [loading, setLoading] = useState(false);
  const error = {
    empty: "Fields cannot be Empty",
    credentials: "Check login details",
    request: "Oops! Something expolded! 💥",
  }[errorType];

  const logout = () => {
    setToken(null);
    navigate("/");
  };

  const login = async (username, password) => {
    if (!username || !password) {
      setErrorType("empty");
    } else {
      setLoading(true);
      setErrorType(null);
      try {
        const response = await fetch(LOGIN_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.status > 399 && response.status < 600) {
          setErrorType(response.status === 400 ? "credentials" : "request");
        } else {
          const data = await response.json();

          setToken(data.token);
          navigate("/content");
        }
      } catch (error) {
        setErrorType("request");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, error, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
