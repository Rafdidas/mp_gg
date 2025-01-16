import { FC, useEffect, useState } from "react";
import { getTodayDate } from "../../utils/getTodayDate.utils";
import { OverallRanking, UnionRanking } from "../../types/ranking.types";
import Overall from "../../components/ranking/overall";
import Union from "../../components/ranking/union";
import "./main.style.scss";

const API_KEY = process.env.REACT_APP_MAPLE_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Main: FC = () => {
  const todayDate = getTodayDate();
  const urlString = `${BASE_URL}/ranking/overall?date=${todayDate}&page=1`;
  const [overallRanking, setOverallRanking] = useState<OverallRanking[]>([]);
  const [unionRanking, setUnionRanking] = useState<UnionRanking[]>([]);

  useEffect(() => {
    const overallFetch = async () => {
      try {
        const response = await fetch(urlString, {
          headers: {
            "x-nxopen-api-key": API_KEY || "",
          },
        });
        if (!response.ok) {
          throw new Error(`error: ${response.status}`);
        }

        const data = await response.json();
        setOverallRanking(data.ranking);
      } catch (error) {
        console.error(error);
      }
    };

    const unionFetch = async () => {
      try {
        const response = await fetch(urlString, {
          headers: {
            "x-nxopen-api-key": API_KEY || "",
          },
        });
        if (!response.ok) {
          throw new Error(`error: ${response.status}`);
        }

        const data = await response.json();
        setUnionRanking(data.ranking);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    overallFetch();
    unionFetch();
  }, [urlString]);

  return (
    <section id="main">
      <h1>Main</h1>
      <ul>
        <li>
          <Overall overallRanking={overallRanking} />
        </li>
        <li>
          <Union unionRanking={unionRanking} />
        </li>
      </ul>
    </section>
  );
};

export default Main;
