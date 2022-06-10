import { useState,useEffect } from "react";

const MovieCast=(props)=>{
    const [myjson,setmyjson]=useState(null)
    useEffect(
        ()=>{
            async function requestMovieCast(){
                const res=await fetch(`https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
                const json=await res.json()
                setmyjson( json.cast.slice(0,4))
                }
                 requestMovieCast()},
        [props.id]
        )
  
    return(
        <div>
            <h5>Cast:</h5>
        <ul className="cast">
       { myjson && myjson.map((element)=>(

          <li className="castMember" key={element.id}><h5 className="ActorName">{element.name}</h5>
         <img src={`https://image.tmdb.org/t/p/original${element.profile_path}`} alt={element.name}/>
         </li>
       ))
       }
       </ul> 
       </div>
    )

}
export default MovieCast