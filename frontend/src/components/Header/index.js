import HeaderContext from "../../context/HeaderContext";

import "./index.css";

const Header = () => {
  return (
    <HeaderContext.Consumer>
      {(value) => {
        const {
          searchInput,
          onChangeSearchInput,
          onClickPopularButton,
          onClickTopRatedButton,
          onClickUpComingButton,
        } = value;

        return (
          <>
            <nav className="header-container">
              <h1 className="movie-heading">MovieDb</h1>
              <div className="right-container">
                <ul className="header-list-container">
                  <li className="header-list-item">
                    <button
                      type="button"
                      className="text-button"
                      onClick={onClickPopularButton}
                    >
                      Popular
                    </button>
                  </li>
                  <li className="header-list-item">
                    <button
                      type="button"
                      className="text-button"
                      onClick={onClickTopRatedButton}
                    >
                      Top Rated
                    </button>
                  </li>
                  <li className="header-list-item">
                    <button
                      type="button"
                      className="text-button"
                      onClick={onClickUpComingButton}
                    >
                      Upcoming
                    </button>
                  </li>
                </ul>
                <input
                  type="text"
                  placeholder="Movie Name"
                  className="search-input"
                  value={searchInput}
                  onChange={onChangeSearchInput}
                />
                <button type="button" className="search-button">
                  Search
                </button>
              </div>
            </nav>
          </>
        );
      }}
    </HeaderContext.Consumer>
  );
};

export default Header;
