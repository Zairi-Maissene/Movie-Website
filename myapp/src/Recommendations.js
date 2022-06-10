import { useEffect,useState} from "react"
import { Link } from "react-router-dom"
import Genres from "./Genres"
const  Recommendations=(props)=>{
    const[myjson,setmyjson]=useState(null)
    useEffect(()=>{
        async function requestRecommendations(){
            const res=await fetch(`https://api.themoviedb.org/3/movie/${props.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
            const data=await res.json()
            const json=data?.results
            setmyjson(json)
        }
        requestRecommendations()
    },[props.id])
     


    return(
        <div className="recommendations">
        <h3 className="mb-4">Watch if you like {props.name}</h3>
    <div className="slider-container">
        <button className="handle left-handle">&#8249;</button>
        <div className="slider">
        {myjson&&myjson.map((element)=>(
           <div className="moviecontainer"  style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${element.poster_path}")`}}>
           <Link to ='/Details' state={element.title} style={{textDecoration:'none',color:'inherit'}}>
         
         <h1 className="movieTitle">{element.title}</h1>
         
         <div className="HoverDetails">
         
        <i className="bi bi-star-fill"></i>
        <h2 >{element.vote_average.toFixed(1)}</h2>
        <Genres array={element.genre_ids}/>
        {/* {element.genres&&<h2 className="movieGenres">{element.genres.join("-")}</h2>}  */}
          </div>
  {/* <img key={element.id} src={`https://image.tmdb.org/t/p/original${element.poster_path}`}/> */}
  </Link>
     </div>


 ))}
 </div>
    <button className="handle right-handle">&#8250;</button>
    </div>
    </div>)
}
export default Recommendations




