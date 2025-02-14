import { Link } from "react-router-dom";

import "./index.css";

const MovieItem = (props) => {
  const { movieDetails } = props;
  const { posterPath, title, voteAverage, id } = movieDetails;
  return (
    <div className="movie-list-item">
      <Link to={`/movie/${id}`} className='movie-details-link'>
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="movie-poster"
        />
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </Link>
    </div>
  );
};
export default MovieItem;
