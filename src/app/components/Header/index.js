import { useContext } from "react";
import { Link } from "react-router-dom";
// import { Routes, Link, Route, useNavigate } from "react-router-dom";
import Button from "../Button";

import logo from "../../images/logo.svg";
import AuthContext from "../../context/Auth";
import "./index.css";

function Header() {
  const { logout, token } = useContext(AuthContext);

  return (
    <header className="Header">
      <div className="Header__container">
        <Link to="/">
          <img className="Header__logo" src={logo} alt="logo" />
        </Link>
        <Button to={token ? null : "/login"} onClick={token ? logout : null}>
          {token ? "Log out" : "Sign in"}
        </Button>

        {/* <Routes>
          <Route path="/content" element={<Button onClick={logout}>Log out</Button>} />
          <Route path="/content/:id" element={<Button onClick={logout}>Log out</Button>} />
          <Route path="*" element={<Button to="/login">Sign in</Button>} />
        </Routes> */}
      </div>
    </header>
  );
}

export default Header;
