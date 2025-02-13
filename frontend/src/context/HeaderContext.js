import React from "react";

const HeaderContext = React.createContext({
  searchInput: "",
  activeOptionId: "",
  onChangeSearchInput: () => {},
  onClickPopularButton: () => {},
  onClickTopRatedButton: () => {},
  onClickUpComingButton: () => {},
  
});
export default HeaderContext;
