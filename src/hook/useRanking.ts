import { useMemo } from "react";
import {
  DojangRanking,
  Ocid,
  OverallRanking,
  OverallRankTop,
} from "../types/ranking.types";
import { getTodayDate } from "../utils/getTodayDate.utils";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchRankingData } from "../api/rankingApi";
import { fetchDataNormal } from "../api/rankingTopApi";

const todayDate = getTodayDate();

interface CharacterData {
  data: OverallRankTop | null;
  guildName: string | null;
}

const useRanking = (rankingType: "dojang" | "overall", limit: number) => {
  // ✅ 랭킹 API URL 설정
  const rankingUrl =
    rankingType === "dojang"
      ? `${process.env.REACT_APP_BASE_URL}/ranking/dojang?date=${todayDate}&difficulty=1&page=1`
      : `${process.env.REACT_APP_BASE_URL}/ranking/overall?date=${todayDate}`;

  // ✅ Step 1: 랭킹 데이터 가져오기
  const { data: rankingData } = useQuery<DojangRanking[] | OverallRanking[]>({
    queryKey: ["ranking", rankingType],
    queryFn: () => fetchRankingData(rankingUrl, limit),
    staleTime: 1000 * 60 * 10,
  });

  // ✅ Step 2: OCID 조회
  const ocidQueries = useQueries({
    queries: (rankingData ?? []).map((character) => ({
      queryKey: ["ocid", character.character_name],
      queryFn: () =>
        fetchDataNormal(
          `${process.env.REACT_APP_BASE_URL}/id?character_name=${character.character_name}`
        ),
      staleTime: 1000 * 60 * 30, // 30분 동안 캐싱
      enabled: !!character.character_name,
    })),
  });

  // ✅ OCID 결과 정리
  const ocidData = useMemo(() => {
    const ocidMap: Record<string, string | null> = {};
    if (!rankingData) return ocidMap;

    ocidQueries.forEach((query, index) => {
      if (query.data) {
        const ocidData = query.data as Ocid;
        ocidMap[rankingData[index]?.character_name] = ocidData.ocid ?? null;
      }
    });

    return ocidMap;
  }, [rankingData, ocidQueries]);

  // ✅ OCID 값이 있는 캐릭터만 필터링
  const ocidList = useMemo(
    () =>
      Object.entries(ocidData)
        .filter(([, ocid]) => !!ocid)
        .map(([name, ocid]) => ({ name, ocid })),
    [ocidData]
  );

  // ✅ Step 3: 캐릭터 정보 가져오기 (OCID가 있는 경우만 요청)
  const characterQueries = useQueries({
    queries: ocidList.map(({ name, ocid }) => ({
      queryKey: ["character", ocid],
      queryFn: () =>
        fetchDataNormal(
          `${process.env.REACT_APP_BASE_URL}/character/basic?ocid=${ocid}`
        ),
      staleTime: 1000 * 60 * 30, // 30분 동안 캐싱
      enabled: !!ocid, // OCID가 있는 경우만 실행
    })),
  });

  // ✅ 캐릭터 정보 정리
  const characterData = useMemo(() => {
    if (!ocidList.length) return {};

    const characterMap: Record<string, CharacterData> = {};
    characterQueries.forEach((query, index) => {
      const { name } = ocidList[index];
      if (query.data) {
        const characterData = query.data as OverallRankTop;
        characterMap[name] = {
          data: characterData,
          guildName: characterData.character_guild_name || null,
        };
      }
    });

    return characterMap;
  }, [characterQueries]);

  return { rankingData, ocidData, characterData };
};

export default useRanking;
