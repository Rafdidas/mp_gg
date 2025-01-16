import { FC, useEffect, useState } from "react";
import "./main.style.scss";
import Overall from "../../components/ranking/overall";

interface OverallRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  character_level: number;
  character_exp: number;
  character_popularity: number;
  character_guildname: string;
}

const Main: FC = () => {
  return (
    <section id="main">
      <h1>Main</h1>
      <ul>
        <li>
          <Overall />
        </li>
      </ul>
    </section>
  );
};

export default Main;
