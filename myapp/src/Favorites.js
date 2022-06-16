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
    <>
      <div className="favorites">
        <div className="slider-container">
          <button className="handle left-handle">&#8249;</button>
          <div className="slider">
            {loading === false && message && (
              <>
                <h1> sign in to access your Favorites List</h1>
                <h2>Save movies to keep track of what you want to watch</h2>
              </>
            )}
            {loading === true && !movies && <h1>loading...</h1>}
            {loading === false && movies?.length === 0 && (
              <h1>Your Favorites List is empty </h1>
            )}

            {loading === false &&
              movies &&
              movies.map((element) => (
                <div
                  className="moviecontainer"
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${element.image}")`,
                  }}
                >
                  <div className="HoverDetails">
                    <h1 className="movieTitle">{element.movie}</h1>
                    <button onClick={() => DeleteMovie(element.movie)}>
                      X
                    </button>
                    <Link
                      to="/Details"
                      state={element.movie}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <button>View Details</button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <button className="handle right-handle">&#8250;</button>
        </div>
      </div>
      {flashMessage && <Message message={flashMessage} className="success" />}
    </>
  );
};
export default Favorites;
