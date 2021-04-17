import React, { useState, useEffect } from 'react';
import './Row.css';

import axios from './axios';

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // return request;
    };
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      {/** container */}
      <div className="row_posters">
        {/** row poster */}
        {movies.map((movie) => (
          <img key={movie.id} className={`row_poster ${isLargeRow && 'row_posterLarge'}`} src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
        )

        )}

      </div>
    </div>
  );
};

export default Row;
