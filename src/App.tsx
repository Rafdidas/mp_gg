import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Main from "./routes/main/main.component";
import "./styles/reset.scss";
import Search from "./routes/searchPage/search";
import Total from "./routes/ranks/total";
import CharacterDetail from "./routes/character_detail/character_detail.component";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ranks/total" element={<Total />} />
        <Route index element={<Main />} />
        <Route path="character-detail/:ocid" element={<CharacterDetail />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  );
};

export default App;
