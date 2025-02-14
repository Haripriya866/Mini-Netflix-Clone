import { Component } from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import MovieItem from "../MovieItem";
import Header from "../Header";
import HeaderContext from "../../context/HeaderContext";
import { API_OPTIONS } from "../../api";

const settings = {
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
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
  ],
};

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: "",
    activeOptionId: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { searchInput, activeOptionId } = this.state;
    console.log(activeOptionId);

    let apiUrl = "";
    if (searchInput) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&page=1&language=en-US`;
    } else {
      switch (activeOptionId) {
        case "top_rated":
          apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
          break;
        case "upcoming":
          apiUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
          break;
        default:
          apiUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
      }
    }

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const response = await fetch(apiUrl, API_OPTIONS);
    if (response.ok === true) {
      const data = await response.json();
      console.log(data);
      const formatedData = data.results.map((eachItem) => ({
        id: eachItem.id,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
        voteAverage: Math.round(eachItem.vote_average * 10) / 10,
      }));
      this.setState({
        moviesList: formatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  onClickPopularButton = () => {
    this.setState({ activeOptionId: "", searchInput: "" }, this.getData);
  };

  onChangeSearchInput = (event) => {
    this.setState(
      {
        searchInput: event.target.value,
      },
      this.getData
    );
  };

  onClickTopRatedButton = () => {
    this.setState(
      {
        activeOptionId: "top_rated",
        searchInput: "",
      },
      this.getData
    );
  };

  onClickUpComingButton = () => {
    this.setState(
      {
        activeOptionId: "upcoming",
        searchInput: "",
      },
      this.getData
    );
  };

  renderSuccessView = () => {
    const { moviesList } = this.state;

    return (
      <div className="success-container">
        <Slider {...settings}>
          {moviesList.map((eachMovie) => (
            <MovieItem key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </Slider>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="failure-heading">
        Something went wrong. Try again later.
      </h1>
    </div>
  );

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" width={50} height={50} />
    </div>
  );

  renderView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    const { searchInput, activeOptionId } = this.state;
    return (
      <>
        <div className="home-container">
          <HeaderContext.Provider
            value={{
              searchInput,
              activeOptionId,
              onChangeSearchInput: this.onChangeSearchInput,
              onClickPopularButton: this.onClickPopularButton,
              onClickTopRatedButton: this.onClickTopRatedButton,
              onClickUpComingButton: this.onClickUpComingButton,
            }}
          >
            <Header />
            {this.renderView()}
          </HeaderContext.Provider>
        </div>
      </>
    );
  }
}
export default Home;
