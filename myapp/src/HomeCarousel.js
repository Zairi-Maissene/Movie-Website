import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Genres from "./Genres";
const HomeCarousel = () => {
  const [myjson, setMyjson] = useState(null);
  useEffect(() => {
    async function getTopMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&vote_count.gte=50&vote_average.gte=6&page=1`
        );
        const json = await res.json();
        const data = json?.results.slice(0, 5);
        setMyjson(data);
      } catch (e) {
        console.error(e + "fetch error");
      }
    }
    getTopMovies();
  }, []);
  return (
    <div className="CarouselContainer">
      <h1>Latest Movies</h1>
      <div className="HomeCarousel slider-container">
        <button className="handle left-handle">&#8249;</button>
        <div className="slider">
          {myjson?.map((element) => (
            <div
              className="Movie"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${element.backdrop_path}")`,
              }}
            >
              <div className="movieInfo">
                <div className="CarouselTitle">{element.title}</div>
                <Genres array={element.genre_ids} />
                <p>
                  View Details
                  <Link to={`/Details/${element.title}`}>
                    <button>
                      <i class="bi bi-caret-right"></i>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="handle right-handle">&#8250;</button>
      </div>
    </div>
  );
};
export default HomeCarousel;
