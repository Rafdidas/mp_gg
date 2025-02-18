import { getTodayDate } from "../../utils/getTodayDate.utils";
import { useQuery } from "@tanstack/react-query";
import { fetchRankingData } from "../../api/rankingApi";
import { fetchEventData, fetchUpdateData } from "../../api/BoardApi";

import Overall from "../../components/ranking/overall";
import Union from "../../components/ranking/union";
import Dojang from "../../components/ranking/dojang";
import Seed from "../../components/ranking/seed";
import Archievement from "../../components/ranking/archievement";
import Guild from "../../components/ranking/guild";
import UpdateList from "../../components/board/updateList";
import RankCharacter from "../../components/rank_character/rank_character.component";
import EventList from "../../components/board/eventList";

import "./main.style.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const todayDate = getTodayDate();

const API_ENDPOINTS = {
  overall: `${BASE_URL}/ranking/overall?date=${todayDate}`,
  union: `${BASE_URL}/ranking/union?date=${todayDate}&page=1`,
  guild: `${BASE_URL}/ranking/guild?date=${todayDate}&ranking_type=0`,
  dojang: `${BASE_URL}/ranking/dojang?date=${todayDate}&difficulty=0&page=1`,
  seed: `${BASE_URL}/ranking/theseed?date=${todayDate}&page=1`,
  archievement: `${BASE_URL}/ranking/achievement?date=${todayDate}&page=1`,
  update: `${BASE_URL}/notice-update`,
  event: `${BASE_URL}/notice-event`,
};

const Main = () => {
  // 랭킹 데이터 요청
  const rankingQueries = {
    overall: useQuery({
      queryKey: ["ranking", "overall"],
      queryFn: () => fetchRankingData(API_ENDPOINTS.overall),
      staleTime: 1000 * 60 * 5,
    }),
    union: useQuery({
      queryKey: ["ranking", "union"],
      queryFn: () => fetchRankingData(API_ENDPOINTS.union),
    }),
    guild: useQuery({
      queryKey: ["ranking", "guild"],
      queryFn: () => fetchRankingData(API_ENDPOINTS.guild),
    }),
    dojang: useQuery({
      queryKey: ["ranking", "dojang"],
      queryFn: () => fetchRankingData(API_ENDPOINTS.dojang),
    }),
    seed: useQuery({
      queryKey: ["ranking", "seed"],
      queryFn: () => fetchRankingData(API_ENDPOINTS.seed),
    }),
    archievement: useQuery({
      queryKey: ["ranking", "archievement"],
      queryFn: () => fetchRankingData(API_ENDPOINTS.archievement),
    }),
  };

  console.log("overallRanking 캐싱 여부:", rankingQueries.overall);

  // 게시판 데이터 요청
  const boardQueries = {
    updateList: useQuery({
      queryKey: ["board", "updateList"],
      queryFn: () => fetchUpdateData(API_ENDPOINTS.update),
    }),
    eventList: useQuery({
      queryKey: ["board", "eventList"],
      queryFn: () => fetchEventData(API_ENDPOINTS.event),
    }),
  };

  const rankData = [
    rankingQueries.overall.data?.[0],
    rankingQueries.union.data?.[0],
    rankingQueries.dojang.data?.[0],
    rankingQueries.seed.data?.[0],
    rankingQueries.archievement.data?.[0],
  ].filter(Boolean);

  return (
    <section id="main">
      <h1>Main</h1>
      <section className="top_section">
        <RankCharacter rankData={rankData} />
      </section>
      <section className="rank_section main_section">
        <Overall overallRanking={rankingQueries.overall.data || []} />
        <Union unionRanking={rankingQueries.union.data || []} />
        <Guild guildRanking={rankingQueries.guild.data || []} />
        <Dojang dojangRanking={rankingQueries.dojang.data || []} />
        <Seed seedRanking={rankingQueries.seed.data || []} />
        <Archievement
          archievementRanking={rankingQueries.archievement.data || []}
        />
      </section>
      <section className="board_section main_section">
        <UpdateList updateList={boardQueries.updateList.data || []} />
        <EventList eventList={boardQueries.eventList.data || []} />
      </section>
    </section>
  );
};

export default Main;
