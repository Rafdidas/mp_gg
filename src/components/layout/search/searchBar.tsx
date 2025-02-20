import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return;

    navigate(`/character-detail/${encodeURIComponent(query)}`);
  };
  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="캐릭터명"
        />
        <button className="search-btn" type="submit">
          버튼
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
