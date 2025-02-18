import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTodayDate } from "../../utils/getTodayDate.utils";
import { fetchRankingData } from "../../api/rankingApi";
import { fetchDataNormal } from "../../api/rankingTopApi";
import {
  OverallRanking,
  OverallRankTop,
  Ocid,
} from "../../types/ranking.types";
import "./total.scss";

const todayDate = getTodayDate();
const overallAPI = `${process.env.REACT_APP_BASE_URL}/ranking/overall?date=${todayDate}`;

const Total = () => {
  const { data: overallRanking } = useQuery<OverallRanking[]>({
    queryKey: ["ranking", "overall"],
    queryFn: () => fetchRankingData(overallAPI),
    staleTime: 1000 * 60 * 5,
  });

  const [characterData, setCharacterData] = useState<
    Record<string, OverallRankTop | null>
  >({});
  const [ocidData, setOcidData] = useState<Record<string, string | null>>({});

  const fetchCharacterInfo = useCallback(
    async (characterName: string) => {
      if (!characterName || !overallRanking) return null;

      try {
        const character = overallRanking.find(
          (char) => char.character_name === characterName
        );

        if (!character) return null;

        // ✅ OCID 가져오기
        const ocidData = await fetchDataNormal<Ocid>(
          `${process.env.REACT_APP_BASE_URL}/id?character_name=${character.character_name}`
        );

        if (!ocidData?.ocid) return null;

        // OCID 상태 업데이트
        setOcidData((prev) => ({
          ...prev,
          [characterName]: ocidData.ocid,
        }));

        // ✅ OCID를 기반으로 캐릭터 기본 정보 가져오기
        const characterInfo = await fetchDataNormal<OverallRankTop>(
          `${process.env.REACT_APP_BASE_URL}/character/basic?ocid=${ocidData.ocid}`
        );

        setCharacterData((prev) => ({
          ...prev,
          [characterName]: characterInfo,
        }));
      } catch (error) {
        console.error("캐릭터 정보 가져오기 실패:", error);
        return null;
      }
    },
    [overallRanking]
  );

  useEffect(() => {
    if (overallRanking) {
      overallRanking.forEach((character) => {
        if (!characterData[character.character_name]) {
          fetchCharacterInfo(character.character_name);
        }
      });
    }
  }, [overallRanking, fetchCharacterInfo]);

  return (
    <div className="wrap-inner">
      <h1>일반 랭킹</h1>
      {overallRanking ? (
        <ul className="ranking-grid">
          <li className="ranking-grid-head">
            <p>#</p>
            <div>캐릭터</div>
            <p>인기도</p>
            <p>길드</p>
          </li>
          {overallRanking.map((character) => (
            <li key={character.ranking}>
              <p>{character.ranking}</p>
              <div className="char-info">
                <p>
                  <img
                    src={
                      characterData[character.character_name]?.character_image
                    }
                    alt={character.character_name}
                  />
                </p>
                <p>
                  <span>
                    <Link
                      to={`/character-detail/${
                        ocidData[character.character_name]
                      }`}
                    >
                      {character.character_name}
                    </Link>
                  </span>
                  <span>
                    | {character.character_level} | {character.world_name}
                  </span>
                </p>
              </div>
              <p>{character.character_popularity}</p>
              <p>{character.character_guildname || "-"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>랭킹 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Total;
