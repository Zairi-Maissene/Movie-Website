import Login from "./Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
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
            <i className="bi bi-plus-square"></i>
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
  );
};
export default Navbar;
