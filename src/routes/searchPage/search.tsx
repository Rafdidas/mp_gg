import React from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q") || "";

  return (
    <div>
      {q ? (
        <p>"{q}"에 대한 검색 결과를 표시합니다.</p>
      ) : (
        <p>검색어를 입력해주세요.</p>
      )}
    </div>
  );
};

export default Search;
