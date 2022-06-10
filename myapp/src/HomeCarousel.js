import { useState,useEffect } from "react";
const HomeCarousel=()=>{
    const [myjson, setMyjson] = useState(null);
 useEffect(() => {
     
     async function getTopMovies(){
         try{const res=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&vote_count.gte=50&vote_average.gte=6&page=1`)
        const json=await res.json()      
        const data=json?.results.slice(0,5)
        setMyjson(data)}
        catch(e){console.error(e+"fetch error")}
        }
        getTopMovies()
   
 }, []);
 return(<div className="HomeCarousel">
     <div className="progress-bar">
                <div className="progress-bar-item active"></div>
                <div className="progress-bar-item"></div>
                <div className="progress-bar-item"></div>
                <div className="progress-bar-item"></div>
                <div className="progress-bar-item"></div>
     </div>
        <div className="slider">
            {myjson?.map(element=>(
               <div className="Movie" style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${element.backdrop_path}")`}}>
                 
                </div>
            ))}
        </div>
    </div>)
    

}
export default HomeCarousel 