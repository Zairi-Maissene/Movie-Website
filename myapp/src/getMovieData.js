 export default async function getMovieData(movieName) {
    let json = []
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieName}`)
        const responseData = await response.json()
        json = responseData?.results
    } catch (error) {
        
    }
return json[0]}