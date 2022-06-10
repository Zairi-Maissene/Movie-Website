import { useEffect,useState,useCallback } from "react";
import { useLocation} from "react-router-dom";
import requestgenres from "./requestGenres";
import getMovieData from "./getMovieData";
import MovieCast from "./MovieCast";
import Trailer from "./Trailer";
import Recommendations from "./Recommendations";


const Movie=()=>{

const mydata=useLocation()
const [loading,setLoading]=useState("loading")
console.log(mydata)
 const[myjson,setmyjson]=useState(null)
 const[genreList,setgenreList]=useState(null)
const [message, setMessage] = useState(null)
  
  function handleClick(e){
    e.preventDefault();
     const title=myjson?.title
     const image=myjson?.poster_path
     const genres=myjson?.genre_ids
     const rating=myjson?.vote_average  
    console.log('handleclick')
    fetch('/watchlist',{method:'POST',headers:{ Authorization: 'Bearer abcdxyz','Content-Type':'application/json'},body:JSON.stringify({
        title,image,genres,rating
        })}).then(res=>res.json()).then(json=>{
           setMessage(json.message)})}
    useEffect(() => {
     async function setSingleMovieData(movieName) {
        const json= await getMovieData(movieName)
         setLoading("loaded");
       setmyjson(json)
       requestgenres(json.genre_ids).then(array=>setgenreList(array))  //  console.log(json)
     // console.log(value)
     // console.log(loading)
      setmyjson(json)}
      
     setSingleMovieData(mydata.state)
         
        
   
     
   }, [mydata,loading]);
  
  
    
        return(
          <>
         <div className="movieDetails">
           {!myjson && loading==="loading"&&
         
         <div class=  "alert alert-dismissible alert-primary mb-0 d-flex align-items-center" style={{gridColumnStart:1,gridColumnEnd:15}}> <h2>Loading...</h2>
         <div class="spinner-grow text-dark ms-auto" role="status">  </div>
         </div>
           }
         {!myjson&&loading==="loaded"&&
         <div class="alert alert-dismissible alert-danger mb-0"style={{gridColumnStart:1,gridColumnEnd:15}}>
         <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
         <strong>Oh snap!Movie not found!</strong> <a href="#" class="alert-link">Change the movie name</a> and try submitting again.
       </div>}
           {myjson&&genreList
            &&( <>
           
             <div className="movieDescription" >
            <div className="descriptionHeader">
            <div className="center">
            <h3>{myjson.title}</h3>
          
              <ul className="genres">{ genreList.map((element)=>(
                <li key={element}>{element}</li>
              ))}</ul>
           </div>
           <div>
           <i className="bi bi-star-fill"></i>
            <h5 >{myjson.vote_average}</h5>
            </div>
            </div>  
            
           <hr className="line-break"/>
            <h5>Release Date : {myjson.release_date}</h5>
            <p><p><strong>Overview:</strong></p>{myjson.overview}</p>
            <hr className="line-break"/>
            <MovieCast id={myjson.id}/>
           
            </div>
            <div className="moviePoster"> 
            <img src={`https://image.tmdb.org/t/p/original${myjson.poster_path}`} alt={myjson.title} />
            <div className="gradient"></div>
            <div className="icons">
            {/* <div className="star-ratings-css" title={`${(myjson.vote_average/10).toFixed(3)}`}></div> */}
            <Trailer id={myjson.id} />
           <div className="itemcontainer"><h5>Add to favorites</h5>  <i className=" bi bi-heart favorites"></i></div>
            <div className="itemcontainer"><h5>Watch Later</h5><i className="bi bi-plus-square watchlist" onClick={(e)=>handleClick(e)}></i></div>
            </div>
          
           </div> </>
            )}
           
         </div>
          <Recommendations id={myjson?.id} name={myjson?.title}/>
          </>
         
       )}
   
    export default Movie;