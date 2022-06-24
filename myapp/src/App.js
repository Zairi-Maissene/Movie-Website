import React, { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Movie from "./Movie";
import MoviesPage from "./MoviesPage";
import HomePage from "./HomePage";
//  import 'bootswatch/dist/cyborg/bootstrap.min.css'
import "./style.css";
import Login from "./Login";
import WatchList from "./WatchList";
import Navbar from "./Navbar";
import Favorites from "./Favorites";
const App = () => {
  const [movieName, setmovieName] = useState("");
  const [submit, setSubmit] = useState(null);
  console.log(movieName);
  console.log(submit);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Details/:movie" element={<Movie />} />
        <Route path="/Movies" element={<MoviesPage />} />
        <Route path="/watchList" element={<WatchList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
