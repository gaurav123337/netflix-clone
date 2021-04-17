import React, { useState, useEffect } from 'react';
import './Row.css';

import axios from './axios';
import Youtube from "react-youtube";
// import movieTrailer from 'movie-trailer';

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // return request;
    };
    fetchData();
  }, [fetchUrl]);

  // Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);

      // movieTrailer(movie?.name || '')
      //   .then((url) => {
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerUrl(urlParams.get('v'));
      //   })
      //   .catch(err => console.log(err))
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      {/** container */}
      <div className="row_posters">
        {/** row poster */}
        {movies.map((movie) => (
          <img key={movie.id} className={`row_poster ${isLargeRow && 'row_posterLarge'}`} src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.title}
            onClick={() => handleClick(movie)}
          />
        ))}

      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
