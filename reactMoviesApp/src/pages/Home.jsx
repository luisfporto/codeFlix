import { useState, useEffect } from 'react'
import React from 'react'
import MovieCard from '../components/movieCard'
import './MoviesGrid.css'
import axios from 'axios'
const moviesURL = import.meta.env.VITE_API 
const apiKey = import.meta.env.VITE_API_KEY 


const Home = () => {
 const [topMovies, setTopMovies] = useState([])
 const [genres, setGenres] = useState({ genres: [] });
 const [movies, setMovies] = useState({ results: [] });


 const [initialized, setInitialized] = useState(false);

 const getAllMovies = async (url) => {
  const res =  await fetch(url);
  const data = await res.json();
setMovies(data.results) 
console.log(setMovies)
}

 const getTopRatedMovies = async (url) => {
  const res =  await fetch(url);
  const data = await res.json();
setTopMovies(data.results) 
}
const fetchDataGenre = async () => {

  const genres = await axios(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=f0044a458f05e21114db9abe0117ef77&language=pt-BR',
  );

  setGenres(genres);
  console.log(genres.data.genres)


};

useEffect(() =>{
const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
getTopRatedMovies(topRatedUrl);
const allMoviesURL =`${moviesURL}top_rated?${apiKey}`;
if (!initialized) {
  fetchDataGenre();
  setInitialized(true);
}
}, [])
  
  return (
    
  <div className='container'>
    <h2 className='title'>Melhores filmes</h2>
    {/* <div className="row greybkd app-heading px-5">
    { genres ? genres?.data?.genres.map((genre, index) => 
            <div className='test' key={index}>
            {genre.name}<br/> {genre.id}
                </div>
            ): 'Loading ...'
         }
        </div> */}

        
    <div className='movies-container'>
      {topMovies.length === 0  && <p>Carregando...</p>}
      {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key = {movie.id} movie={movie} />)}

    </div>
  </div>
  )
}

export default Home