import { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../Header";

import "./index.css";
import { API_OPTIONS } from "../../api";

const settings = {
  dots: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive:[
    {
      breakpoint: 768, // Devices below 768px width
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1024, // Optional: Adjust for tablet sizes if needed
      settings: {
        slidesToShow: 4,
      },
    },
  ]
};

class MovieDetails extends Component {
  state = { movieDetails: {}, castList: [] };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

    const response = await fetch(movieDetailsUrl, API_OPTIONS);
    if (response.ok === true) {
      const data = await response.json();
      console.log(data);
      const formatedData = {
        id: data.id,
        title: data.title,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        rating: Math.round(data.vote_average * 10) / 10,
        overview: data.overview,
        genresList: data.genres.map((eachItem) => eachItem.name).join(", "),
        banner: data.backdrop_path,
      };
      this.setState({
        movieDetails: formatedData,
      });
      this.getCastData(id);
    } else if (response.status === 404) {
      console.log("error occured");
    }
  };

  getCastData = async (movieId) => {
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

    const response = await fetch(castUrl, API_OPTIONS);
    if (response.ok === true) {
      const data = await response.json();
      const formatedCastData = data.cast.slice(0, 10).map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profilePath: actor.profile_path,
      }));
      this.setState({
        castList: formatedCastData,
      });
    } else {
      console.log("Error occurred while fetching cast details");
    }
  };

  renderMovieDetailsView = () => {
    const { movieDetails, castList } = this.state;

    const {
      title,
      posterPath,
      releaseDate,
      rating,
      overview,
      genresList,
      banner,
    } = movieDetails;

    return (
      <div className="movie-details-container">
        <div className="movie-details">
          <div className="movie-details-left-container">
            <div className="top-content">
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
              />
              <div className="text-content">
                <h1 className="movie-details-title">{title}</h1>
                <p className="movie-details-rating">Rating: {rating}</p>
                <p className="movie-details-genres">{genresList}</p>
                <p className="movie-details-release-date">
                  Release Date: {releaseDate}
                </p>
              </div>
            </div>
            <h2 className="movie-details-overview">Overview</h2>
            <p className="movie-details-overview-para">{overview}</p>
          </div>
          <img
            className="banner-image"
            src={`https://image.tmdb.org/t/p/original${banner}`}
            alt="banner"
          />
        </div>
        <h1 className="cast-heading">Cast</h1>
        <div className="cast-container">
          <Slider {...settings}>
            {castList.map((actor) => (
              <div key={actor.id} className="actor-list-item">
                <img
                  className="cast-image"
                  src={`https://image.tmdb.org/t/p/w200${actor.profilePath}`}
                  alt={actor.name}
                />
                <p className="cast-name">{actor.name}</p>
                <p className="cast-character">Character: {actor.character}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <Header />
        {this.renderMovieDetailsView()}
      </>
    );
  }
}
export default MovieDetails;
