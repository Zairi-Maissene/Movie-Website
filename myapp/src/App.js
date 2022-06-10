
import React, { useState } from "react";

import { BrowserRouter,Link,Routes,Route } from "react-router-dom";
import Movie from "./Movie";
import HomeMovies from "./HomeMovies";
//  import 'bootswatch/dist/cyborg/bootstrap.min.css'
  import './style.css'

import Login from "./Login"
import WatchList from './WatchList'
import Navbar from "./Navbar";
   const App=()=>{
    
       const [movieName,setmovieName]=useState("")
       const [submit,setSubmit]=useState(null);
       console.log(movieName);
       console.log(submit);
       return(
           <BrowserRouter>
       <div>
        <Navbar/>
       <div class="form-group row d-flex justify-content-center mt-5">
      <label htmlFor="searchMovie" class="col-auto col-form-label">Enter Movie Name</label>
      <div class="col-sm-4">
        <input type="text" class="form-control-plaintext" id="searchMovie" placeholder="movieName" onChange={(e)=>{setmovieName(e.target.value)}}/>
      </div>
       <Link to="/Details" state={movieName} className="col-auto">
           <button onClick={()=>{setSubmit(true)}} className="btn btn-light">Submit</button>
        </Link>
        </div>
       
       
        <Routes> 
    
        <Route path="/" element={<HomeMovies/>} />
        <Route path="/Details" element={<Movie name={movieName}/> }/>
        <Route path="/watchList" element={<WatchList/>}/>
       </Routes>
      
       </div>
       </BrowserRouter>)

   } 
   export default App
