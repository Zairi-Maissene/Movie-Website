import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Genres from "./Genres";
import HomeCarousel from "./HomeCarousel";

const GenresJSON = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
const HomeMovies = () => {
  const [checked, setChecked] = useState(null);
  const [loading, setLoading] = useState(null);
  const nbFetch = useRef(0);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [myjson, setmyjson] = useState(null);

  const [sortOption, setSortOption] = useState("popularity");
  console.log(JSON.stringify(myjson));
  nbFetch.current = 0;
  useEffect(() => {
    async function getPopularMovies() {
      setLoading("loading");
      console.log("here");
      let page1 = [];
      let page2 = [];
      let page3 = [];
      let page4 = [];
      try {
        nbFetch.current = 1;
        const res1 = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=${sortOption}.desc&api_key=${process.env.REACT_APP_API_KEY}&vote_count.gte=50&vote_average.gte=6&page=1`
        );
        const res2 = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=${sortOption}.desc&api_key=${process.env.REACT_APP_API_KEY}&vote_count.gte=50&vote_average.gte=6&page=2`
        );
        const res3 = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=${sortOption}.desc&api_key=${process.env.REACT_APP_API_KEY}&vote_count.gte=50&vote_average.gte=6&page=3`
        );
        const res4 = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=${sortOption}.desc&api_key=${process.env.REACT_APP_API_KEY}&vote_count.gte=50&vote_average.gte=6&page=4`
        );
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        const data4 = await res4.json();
        page1 = data1?.results;
        page2 = data2?.results;
        page3 = data3?.results;
        page4 = data4?.results;
        setmyjson([...page1, ...page2, ...page3, ...page4]);
        setLoading("loaded");
        if (filter) Filter();
      } catch (error) {
        console.log("fetch error");
      }
    }
    getPopularMovies();
  }, [sortOption, page, filter]);

  const changeSortOption = (option) => {
    if (option === "vote_average") return "Rating";
    if (option === "release_date") return "Date";
    if (option === "popularity") return "Popularity";
    return null;
  };
  function Filter(array) {
    if (!filter || filter === "All") return array;
    return array.filter(
      (element) => element.genre_ids.indexOf(getFilterid(filter)) > -1
    );
  }
  function getFilterid(genre) {
    for (let i = 0; i < GenresJSON.length; i++) {
      if (GenresJSON[i].name === genre) return GenresJSON[i].id;
    }
  }
  const toggleDropDown = useCallback((select) => {
    document
      .querySelector(`.${select} .dropdown-menu `)
      .classList.toggle("open");
  }, []);

  //
  return (
    <>
      <div className="header">
        <div className="select-container">
          <p>Filter Genres</p>
          <div className="select filter-select">
            <div>
              <span>{filter || "Filter Genres"}</span>
              <button onClick={() => toggleDropDown("filter-select")}>
                &#9660;
              </button>
            </div>
            <ul className="dropdown-menu">
              <li onClick={() => setFilter("All")}>All</li>
              <li onClick={() => setFilter("Comedy")}>Comedy</li>
              <li onClick={() => setFilter("Action")}>Action</li>
              <li onClick={() => setFilter("Romance")}>Romance</li>
              <li onClick={() => setFilter("Drama")}>Drama</li>
              <li onClick={() => setFilter("Documentary")}>Documentary</li>
            </ul>
          </div>
        </div>
        <div className="select-container">
          <p>Sort Movies</p>

          <div className="select sort-select">
            <div>
              <span>{changeSortOption(sortOption)}</span>
              <button onClick={() => toggleDropDown("sort-select")}>
                &#9660;
              </button>
            </div>
            <ul className="dropdown-menu">
              <li onClick={() => setSortOption("popularity")}>Popularity</li>
              <li onClick={() => setSortOption("vote_average")}>Rating</li>
              <li onClick={() => setSortOption("release_date")}>Date</li>
            </ul>
          </div>
        </div>
        <div className="pages">
          <span>Pages</span>
          <button
            className="btn page"
            onClick={() => setPage(1)}
            disabled={myjson && !Filter(myjson)[0]}
          >
            1
          </button>
          <button
            className="btn page"
            onClick={() => setPage(2)}
            disabled={myjson && !Filter(myjson)[20]}
          >
            2
          </button>
          <button
            className="btn page"
            onClick={() => setPage(3)}
            disabled={myjson && !Filter(myjson)[40]}
          >
            3
          </button>
          <button
            className="btn page"
            onClick={() => setPage(4)}
            disabled={myjson && !Filter(myjson)[60]}
          >
            4
          </button>
        </div>
      </div>

      <div className="Movies">
        {myjson && loading === "loading" && (
          <div
            class="alert alert-dismissible alert-primary mb-0 d-flex align-items-center"
            style={{ width: "100%" }}
          >
            {" "}
            <h2>Loading...</h2>
            <div class="spinner-grow text-dark ms-auto" role="status">
              {" "}
            </div>
          </div>
        )}

        {loading === "loaded" &&
          Filter(myjson).slice(20 * (page - 1), 20 * page).length === 0 && (
            <div
              class="alert alert-dismissible alert-danger mb-0"
              style={{ width: "100%", height: "300px", textAlign: "center" }}
            >
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>Oh snap!No Movies found on this page!</strong>{" "}
              <a href="#" class="alert-link">
                Change searching parameters
              </a>{" "}
              and try submitting again.
            </div>
          )}
        {myjson &&
          Filter(myjson).map((element) => {
            if (
              Filter(myjson).indexOf(element) >= 20 * (page - 1) &&
              Filter(myjson).indexOf(element) < 20 * page
            )
              return (
                <div
                  className="moviecontainer"
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${element.poster_path}")`,
                  }}
                >
                  <Link
                    to={`/Details/:${element.title}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="HoverDetails">
                      <h4 className="movieTitle">{element.title}</h4>
                      <div className="rating">
                        <i className="bi bi-star-fill"></i>
                        <h2>{element.vote_average}</h2>
                      </div>
                      <Genres array={element.genre_ids} />
                      {/* {element.genres&&<h2 className="movieGenres">{element.genres.join("-")}</h2>}  */}
                    </div>
                    {/* <img key={element.id} src={`https://image.tmdb.org/t/p/original${element.poster_path}`}/> */}
                  </Link>
                </div>
              );
          })}
      </div>
    </>
  );
};
export default HomeMovies;
