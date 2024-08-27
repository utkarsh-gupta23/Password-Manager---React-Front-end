import React from "react";
import "../navbar/Navbar.css";
import { useCredentailContext } from "../../../hooks/useCredentialContext";

function SearchBox() {
  const { dispatch } = useCredentailContext();
  const [search, setSearch] = React.useState("");
  const handleSearch = (e) => {
    dispatch({ type: "SEARCH", payload: e.target.value });
    setSearch(e.target.value);
  };
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search"
        className="search-field"
        onChange={handleSearch}
        value={search}
      />
    </div>
  );
}

export default SearchBox;
