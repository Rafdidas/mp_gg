import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Main from "./routes/main/main.component";
import Search from "./routes/searchPage/search";
import Total from "./routes/ranks/total";
import CharacterDetail from "./routes/character_detail/character_detail.component";
import "./styles/reset.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dojang from "./routes/ranks/dojang";
import Union from "./routes/ranks/union";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Main />} />
          <Route path="search" element={<Search />} />
          <Route
            path="character-detail/:characterName"
            element={<CharacterDetail />}
          />
          <Route path="/ranks/total" element={<Total />} />
          <Route path="/ranks/dojang" element={<Dojang />} />
          <Route path="/ranks/union" element={<Union />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
