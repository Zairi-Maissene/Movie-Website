import { useState,useEffect } from "react";
const Trailer=(props)=>{
    const[video,setVideo]=useState(null)
    useEffect(()=>{
        requestVideos(props.id)

    },[props.id])
    async function requestVideos(id)
    {
        const res=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
        const json= await res.json()
        json.results.forEach((element)=>{
            if(element.type==="Trailer")
             {setVideo(element.key);return}
        })
    }
        return(   video &&
            <div className="itemcontainer">
                <h5>Watch Trailer</h5>
             < a href={`https://www.youtube.com/watch?v=${video}`} target="_blank" rel="noopener noreferrer">
            <i class="bi bi-play-btn" style={{fontSize:"3rem"}}></i> </a>
              </div>
        )
}
export default Trailer