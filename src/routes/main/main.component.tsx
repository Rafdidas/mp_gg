import { getTodayDate } from "../../utils/getTodayDate.utils";
import { useQueries } from "@tanstack/react-query";
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
  const queries = useQueries({
    queries: [
      {
        queryKey: ["ranking", "overall"],
        queryFn: () => fetchRankingData(API_ENDPOINTS.overall),
      },
      {
        queryKey: ["ranking", "union"],
        queryFn: () => fetchRankingData(API_ENDPOINTS.union),
      },
      {
        queryKey: ["ranking", "guild"],
        queryFn: () => fetchRankingData(API_ENDPOINTS.guild),
      },
      {
        queryKey: ["ranking", "dojang"],
        queryFn: () => fetchRankingData(API_ENDPOINTS.dojang),
      },
      {
        queryKey: ["ranking", "seed"],
        queryFn: () => fetchRankingData(API_ENDPOINTS.seed),
      },
      {
        queryKey: ["ranking", "archievement"],
        queryFn: () => fetchRankingData(API_ENDPOINTS.archievement),
      },
      {
        queryKey: ["board", "updateList"],
        queryFn: () => fetchUpdateData(API_ENDPOINTS.update),
      },
      {
        queryKey: ["board", "eventList"],
        queryFn: () => fetchEventData(API_ENDPOINTS.event),
      },
    ],
  });

  const [
    overall,
    union,
    guild,
    dojang,
    seed,
    archievement,
    updateList,
    eventList,
  ] = queries.map((q) => q.data || []);

  const rankData = [
    overall?.[0],
    union?.[0],
    dojang?.[0],
    seed?.[0],
    archievement?.[0],
  ].filter(Boolean);

  return (
    <section id="main">
      <h1>Main</h1>
      <section className="top_section">
        <RankCharacter rankData={rankData} />
      </section>
      <section className="rank_section main_section">
        <Overall overallRanking={overall} />
        <Union unionRanking={union} />
        <Guild guildRanking={guild} />
        <Dojang dojangRanking={dojang} />
        <Seed seedRanking={seed} />
        <Archievement archievementRanking={archievement} />
      </section>
      <section className="board_section main_section">
        <UpdateList updateList={updateList} />
        <EventList eventList={eventList} />
      </section>
    </section>
  );
};

export default Main;
