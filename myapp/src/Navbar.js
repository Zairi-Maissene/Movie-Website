import Login from "./Login";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [movie, setMovie] = useState("");
  return (
    <header>
      <div id="search-bar">
        <input
          type="text"
          id="search-input"
          placeholder="Search a movie ..."
          onChange={(e) => {
            setMovie(e.target.value);
          }}
          required
        />

        <Link to={`/Details/${movie}`}>
          <button className="btn btn-light">
            <i class="bi bi-search"></i>
          </button>
        </Link>
      </div>
      <nav class="navibar">
        <ul>
          <Link to="/">
            <li>
              <i class="bi bi-house-door"></i>
            </li>
          </Link>
          <Link to="/Movies">
            <li>
              <i class="bi bi-film"></i>
            </li>
          </Link>
          <Link to="/watchlist">
            {" "}
            <li>
              <i class="bi bi-bookmark-plus"></i>
            </li>
          </Link>
          <Link to="/favorites">
            <li>
              {" "}
              <i className=" bi bi-heart"></i>
            </li>
          </Link>
          <Login />
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
