export default async function requestgenres(array){
    const returnarray=[]
   const res=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
    const json= await res.json()
   
    
      
    
    const genrearray=json.genres
    genrearray.forEach(element => {
      if(array.includes(element.id))
        returnarray.push(element.name)
    })
   
    return returnarray;
  }