import { FC, useEffect, useState } from "react";
import { getTodayDate } from "../../utils/getTodayDate.utils";
import {
  ArchievementRanking,
  DojangRanking,
  OverallRanking,
  SeedRanking,
  UnionRanking,
  GuildRanking,
} from "../../types/ranking.types";
import Overall from "../../components/ranking/overall";
import Union from "../../components/ranking/union";
import Dojang from "../../components/ranking/dojang";
import Seed from "../../components/ranking/seed";
import Archievement from "../../components/ranking/archievement";
import Guild from "../../components/ranking/guild";
import "./main.style.scss";
import RankCharacter from "../../components/rank_character/rank_character.component";

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
  const [dojangRanking, setDojangRanking] = useState<DojangRanking[]>([]);
  const [seedRanking, setSeedRanking] = useState<SeedRanking[]>([]);
  const [archievementRanking, setArchievementRanking] = useState<
    ArchievementRanking[]
  >([]);

  const overallUrl = `${BASE_URL}/ranking/overall?date=${todayDate}&page=1`;
  const unionUrl = `${BASE_URL}/ranking/union?date=${todayDate}&page=1`;
  const guildUrl = `${BASE_URL}/ranking/guild?date=${todayDate}&ranking_type=0`;
  const dojangUrl = `${BASE_URL}/ranking/dojang?date=${todayDate}&difficulty=0&page=1`;
  const seedUrl = `${BASE_URL}/ranking/theseed?date=${todayDate}&page=1`;
  const archievementUrl = `${BASE_URL}/ranking/achievement?date=${todayDate}&page=1`;

  useEffect(() => {
    fetchRanking<OverallRanking>(overallUrl, setOverallRanking);
    fetchRanking<UnionRanking>(unionUrl, setUnionRanking);
    fetchRanking<GuildRanking>(guildUrl, setGuildRanking);
    fetchRanking<DojangRanking>(dojangUrl, setDojangRanking);
    fetchRanking<SeedRanking>(seedUrl, setSeedRanking);
    fetchRanking<ArchievementRanking>(archievementUrl, setArchievementRanking);
  }, [overallUrl, unionUrl, guildUrl, dojangUrl, seedUrl, archievementUrl]);

  console.log(overallUrl);
  console.log(overallRanking);

  return (
    <section id="main">
      <h1>Main</h1>
      <RankCharacter />
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
        <li>
          <Dojang dojangRanking={dojangRanking} />
        </li>
        <li>
          <Seed seedRanking={seedRanking} />
        </li>
        <li>
          <Archievement archievementRanking={archievementRanking} />
        </li>
      </ul>
    </section>
  );
};

export default Main;
