import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={() => {
          navigate(`/search-view/${term}`);
        }}
      >
        <input
          className="inp"
          placeholder="Search..."
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Search;
