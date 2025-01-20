import { FC, useEffect, useState } from "react";
import { getTodayDate } from "../../utils/getTodayDate.utils";
import { getfetchRanking } from "../../utils/getFetchRanking.utils";
import { getFetchBoard } from "../../utils/getFetchBoard.utils";
import {
  ArchievementRanking,
  DojangRanking,
  OverallRanking,
  SeedRanking,
  UnionRanking,
  GuildRanking,
} from "../../types/ranking.types";
import { Update } from "../../types/board.types";
import Overall from "../../components/ranking/overall";
import Union from "../../components/ranking/union";
import Dojang from "../../components/ranking/dojang";
import Seed from "../../components/ranking/seed";
import Archievement from "../../components/ranking/archievement";
import Guild from "../../components/ranking/guild";
import UpdateList from "../../components/board/updateList";
import RankCharacter from "../../components/rank_character/rank_character.component";
import "./main.style.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
  const [updateList, setUpdateList] = useState<Update[]>([]);

  const overallUrl = `${BASE_URL}/ranking/overall?date=${todayDate}&page=1`;
  const unionUrl = `${BASE_URL}/ranking/union?date=${todayDate}&page=1`;
  const guildUrl = `${BASE_URL}/ranking/guild?date=${todayDate}&ranking_type=0`;
  const dojangUrl = `${BASE_URL}/ranking/dojang?date=${todayDate}&difficulty=0&page=1`;
  const seedUrl = `${BASE_URL}/ranking/theseed?date=${todayDate}&page=1`;
  const archievementUrl = `${BASE_URL}/ranking/achievement?date=${todayDate}&page=1`;
  const updateUrl = `${BASE_URL}/notice-update`;

  useEffect(() => {
    getfetchRanking<OverallRanking>(overallUrl, setOverallRanking);
    getfetchRanking<UnionRanking>(unionUrl, setUnionRanking);
    getfetchRanking<GuildRanking>(guildUrl, setGuildRanking);
    getfetchRanking<DojangRanking>(dojangUrl, setDojangRanking);
    getfetchRanking<SeedRanking>(seedUrl, setSeedRanking);
    getfetchRanking<ArchievementRanking>(
      archievementUrl,
      setArchievementRanking
    );
    getFetchBoard<Update>(updateUrl, setUpdateList);
  }, [
    overallUrl,
    unionUrl,
    guildUrl,
    dojangUrl,
    seedUrl,
    archievementUrl,
    updateUrl,
  ]);

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
        <li>
          <UpdateList updateList={updateList} />
        </li>
      </ul>
    </section>
  );
};

export default Main;
