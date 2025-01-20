import { FC, useEffect, useState } from "react";
import { getTodayDate } from "../../utils/getTodayDate.utils";
import {
  GuildRanking,
  OverallRanking,
  UnionRanking,
} from "../../types/ranking.types";
import Overall from "../../components/ranking/overall";
import Union from "../../components/ranking/union";
import "./main.style.scss";
import Guild from "../../components/ranking/guild";

const API_KEY = process.env.REACT_APP_MAPLE_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchRanking = async <T,>(
  endpoint: string,
  setData: (data: T[]) => void
) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "x-nxopen-api-key": API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error(`error: ${response.status}`);
    }

    const data = await response.json();
    setData(data.ranking);
  } catch (error) {
    console.error(error);
  }
};

const Main: FC = () => {
  const todayDate = getTodayDate();
  const [overallRanking, setOverallRanking] = useState<OverallRanking[]>([]);
  const [unionRanking, setUnionRanking] = useState<UnionRanking[]>([]);
  const [guildRanking, setGuildRanking] = useState<GuildRanking[]>([]);

  const overallUrl = `${BASE_URL}/ranking/overall?date=${todayDate}&page=1`;
  const unionUrl = `${BASE_URL}/ranking/union?date=${todayDate}`;
  const guildUrl = `${BASE_URL}/ranking/guild?date=${todayDate}&ranking_type=0`;

  useEffect(() => {
    fetchRanking<OverallRanking>(overallUrl, setOverallRanking);
    fetchRanking<UnionRanking>(unionUrl, setUnionRanking);
    fetchRanking<GuildRanking>(guildUrl, setGuildRanking);
  }, [overallUrl, unionUrl, guildUrl]);

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
        <li>
          <Guild guildRanking={guildRanking} />
        </li>
      </ul>
    </section>
  );
};

export default Main;
