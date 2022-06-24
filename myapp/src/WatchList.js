import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
const WatchList = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  function setSliderIndex(array) {
    if (array == null) return;

    document
      .querySelector(".watchlist .slider")
      .style.setProperty("--maxindex", parseInt(array.length / 5));
  }
  const DeleteMovie = useCallback(async (movie) => {
    await fetch(`/delete/watchlist/${movie}`);
    console.log("delete");
    await requestMovies();
    setFlashMessage(`the movie ${movie} was deleted succesfully`);
  }, []);
  async function requestMovies() {
    fetch("/watchlist")
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
      <h2>Your Watch List</h2>
      {loading === false && message && (
        <div className="logged-out user-list">
          <p> sign in to access your watchlist</p>
          <p>Save movies to keep track of what you want to watch!</p>
          <i class="bi bi-bookmark-plus"></i>
        </div>
      )}
      {loading === true && !movies && <h1>loading...</h1>}
      {loading === false && movies?.length === 0 && (
        <div className="user-list empty">
          <h1>Your Watch List is empty </h1>
        </div>
      )}

      {loading === false && movies?.length > 0 && (
        <div className="watchlist user-list">
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
                      <button className="user-list-button details">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button className="handle right-handle">&#8250;</button>
          </div>
        </div>
      )}

      {flashMessage && <Message className="success" message={flashMessage} />}
    </div>
  );
};
export default WatchList;
