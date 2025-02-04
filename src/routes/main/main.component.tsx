import { getTodayDate } from "../../utils/getTodayDate.utils";
import {
  ArchievementRanking,
  DojangRanking,
  OverallRanking,
  SeedRanking,
  UnionRanking,
  GuildRanking,
} from "../../types/ranking.types";
import { useQuery } from "@tanstack/react-query";
import { fetchRankingData } from "../../api/rankingApi";
import { fetchUpdateData } from "../../api/BoardApi";
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

const Main = () => {
  const todayDate = getTodayDate();

  const overallUrl = `${BASE_URL}/ranking/overall?date=${todayDate}`;
  const unionUrl = `${BASE_URL}/ranking/union?date=${todayDate}&page=1`;
  const guildUrl = `${BASE_URL}/ranking/guild?date=${todayDate}&ranking_type=0`;
  const dojangUrl = `${BASE_URL}/ranking/dojang?date=${todayDate}&difficulty=0&page=1`;
  const seedUrl = `${BASE_URL}/ranking/theseed?date=${todayDate}&page=1`;
  const archievementUrl = `${BASE_URL}/ranking/achievement?date=${todayDate}&page=1`;
  const updateUrl = `${BASE_URL}/notice-update`;
  

  const { data: overallRanking } = useQuery({
    queryKey: ["ranking", "overall"],
    queryFn: () => fetchRankingData<OverallRanking>(overallUrl),
  });
  const { data: unionRanking } = useQuery({
    queryKey: ["ranking", "unionRanking"],
    queryFn: () => fetchRankingData<UnionRanking>(unionUrl),
  });
  const { data: guildRanking } = useQuery({
    queryKey: ["ranking", "guildRanking"],
    queryFn: () => fetchRankingData<GuildRanking>(guildUrl),
  });
  const { data: dojangRanking } = useQuery({
    queryKey: ["ranking", "dojangRanking"],
    queryFn: () => fetchRankingData<DojangRanking>(dojangUrl),
  });
  const { data: seedRanking } = useQuery({
    queryKey: ["ranking", "seedRanking"],
    queryFn: () => fetchRankingData<SeedRanking>(seedUrl),
  });
  const { data: archievementRanking } = useQuery({
    queryKey: ["ranking", "archievementRanking"],
    queryFn: () => fetchRankingData<ArchievementRanking>(archievementUrl),
  });
  const { data: updateList } = useQuery({
    queryKey: ["board", "updateList"],
    queryFn: () => fetchUpdateData(updateUrl),
  });

  const overallTop = overallRanking?.[0] || null;
  const unionTop = unionRanking?.[0] || null;
  const dojangTop = dojangRanking?.[0] || null;
  const seedTop = seedRanking?.[0] || null;
  const archievementTop = archievementRanking?.[0] || null;

  return (
    <section id="main">
      <h1>Main</h1>
      <section className="top_section">
        <RankCharacter rankData={[overallTop, unionTop, dojangTop, seedTop, archievementTop].filter(Boolean)} />
      </section>
      <section className="rank_section main_section">
        <Overall overallRanking={overallRanking || []} />
        <Union unionRanking={unionRanking || []} />
        <Guild guildRanking={guildRanking || []} />
        <Dojang dojangRanking={dojangRanking || []} />
        <Seed seedRanking={seedRanking || []} />
        <Archievement archievementRanking={archievementRanking || []} />
      </section>
      <section className="board_section main_section">
        <UpdateList updateList={updateList || []} />
      </section>
    </section>
  );
};

export default Main;
