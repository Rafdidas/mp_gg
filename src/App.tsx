import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Main from "./routes/main/main.component";
import "./styles/reset.scss";
import Search from "./routes/searchPage/search";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
};

export default App;
