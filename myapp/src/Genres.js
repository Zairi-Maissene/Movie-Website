import { useEffect, useState } from "react"
import requestgenres from "./requestGenres"

 const Genres=(props)=>{
    const[genreList,setgenreList]=useState(null)
    useEffect(()=>{
        requestgenres(props.array).then(array=>setgenreList(array))
    },[props.array])
    return(
        genreList&&<h5 className='genres'>{genreList.join("-")}</h5>)
}
export default Genres