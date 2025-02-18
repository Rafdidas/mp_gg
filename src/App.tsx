import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Main from "./routes/main/main.component";
import "./styles/reset.scss";
import Search from "./routes/searchPage/search";
import CharacterDetail from "./routes/character_detail/character_detail.component";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Main />} />
        <Route path="character-detail/:ocid" element={<CharacterDetail />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  );
};

export default App;
