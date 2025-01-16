import { useEffect, useState } from "react";
import OverallItem from "./overall-item";
import { getTodayDate } from "../../utils/getTodayDate.utils";

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

const API_KEY = process.env.REACT_APP_MAPLE_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Overall = () => {
  const todayDate = getTodayDate();
  const urlString = `${BASE_URL}/ranking/overall?date=${todayDate}&page=1`;
  const [overallRanking, setOverallRanking] = useState<OverallRanking[]>([]);

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
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    overallFetch();
  }, [urlString, API_KEY]);

  return (
    <div>
      <h2>종합 랭킹</h2>
      <ul>
        {overallRanking.map((rank) => {
          return (
            <li key={rank.ranking} style={{ borderBottom: "1px solid #aaa" }}>
              <OverallItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Overall;
