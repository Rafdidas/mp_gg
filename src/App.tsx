import React, { FC } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Main from "./routes/main/main.component";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default App;
