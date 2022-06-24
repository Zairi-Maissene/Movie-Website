import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
const Favorites = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  function setSliderIndex(array) {
    if (array == null) return;

    document
      .querySelector(".favorites .slider")
      .style.setProperty("--maxindex", parseInt(array.length / 6));
  }
  const DeleteMovie = useCallback(async (movie) => {
    await fetch(`/delete/favorites/${movie}`);
    console.log("delete");
    await requestMovies();
    setFlashMessage(
      `${movie} was succesfully deleted from your favorites list`
    );
  }, []);
  async function requestMovies() {
    fetch("/favorites")
      .then((res) => res.json())
      .then((json) => {
        if (json.sessionError != null) setMessage(true);
        else setMovies(json?.result);
        setLoading(false);
        setSliderIndex(json?.result);
      });
  }
  useEffect(() => {
    requestMovies();
  }, []);

  return (
    <div className="list-container">
      <h2>Your Favorites</h2>
      {loading === false && message && (
        <div className="logged-out user-list">
          <p> sign in to access your Favorites List</p>
          <p>Save your favorite movies and recommmend them to friends!</p>
          <i className=" bi bi-heart"></i>
        </div>
      )}
      {loading === true && !movies && <h1>loading...</h1>}
      {loading === false && movies?.length === 0 && (
        <div className="user-list empty">
          <h1>Your Favorites List is empty </h1>
        </div>
      )}

      {loading === false && movies?.length > 0 && (
        <div className="favorites user-list">
          <div className="slider-container list">
            <button className="handle left-handle">&#8249;</button>
            <div className="slider">
              {movies.map((element) => (
                <div
                  className="moviecontainer"
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${element.image}")`,
                  }}
                >
                  <div className="HoverDetails">
                    <p className="movieTitle">{element.movie}</p>
                    <button
                      className="user-list-button delete"
                      onClick={() => DeleteMovie(element.movie)}
                    >
                      X
                    </button>
                    <Link
                      to={`/Details/:${element.movie}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <button className="user-list-button">View Details</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button className="handle right-handle">&#8250;</button>
          </div>
        </div>
      )}

      {flashMessage && <Message message={flashMessage} className="success" />}
    </div>
  );
};
export default Favorites;
