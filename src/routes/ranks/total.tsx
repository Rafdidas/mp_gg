import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  formatDateToKorean,
  getTodayDate,
} from "../../utils/getTodayDate.utils";
import { fetchRankingData } from "../../api/rankingApi";
import { fetchDataNormal } from "../../api/rankingTopApi";
import {
  OverallRankTop,
  Ocid,
  OverallRanking,
} from "../../types/ranking.types";
import "./total.scss";

const todayDate = getTodayDate();

const Total = () => {
  const [limit, setLimit] = useState(10);
  const [ocidData, setOcidData] = useState<Record<string, string | null>>({});
  const [characterData, setCharacterData] = useState<
    Record<string, OverallRankTop | null>
  >({});

  const { data: overallRanking } = useQuery<OverallRanking[]>({
    queryKey: ["ranking", "overall"],
    queryFn: () =>
      fetchRankingData(
        `${process.env.REACT_APP_BASE_URL}/ranking/overall?date=${todayDate}`,
        limit
      ),
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!overallRanking) return;

    const fetchAllCharacters = async () => {
      try {
        // ✅ Step 1: 모든 캐릭터의 OCID 한 번에 가져오기
        const ocidPromises = overallRanking.map((character: any) =>
          fetchDataNormal<Ocid>(
            `${process.env.REACT_APP_BASE_URL}/id?character_name=${character.character_name}`
          )
        );

        const ocidResults = await Promise.all(ocidPromises);
        const ocidMap: Record<string, string | null> = {};

        ocidResults.forEach((result, index) => {
          ocidMap[overallRanking[index].character_name] = result?.ocid ?? null;
        });

        setOcidData(ocidMap);

        // ✅ Step 2: OCID를 기반으로 캐릭터 기본 정보 한 번에 가져오기
        const characterPromises = ocidResults.map((ocid, index) => {
          if (ocid?.ocid) {
            return fetchDataNormal<OverallRankTop>(
              `${process.env.REACT_APP_BASE_URL}/character/basic?ocid=${ocid.ocid}`
            );
          }
          return Promise.resolve(null);
        });

        const characterResults = await Promise.all(characterPromises);
        const characterMap: Record<string, OverallRankTop | null> = {};

        characterResults.forEach((result, index) => {
          characterMap[overallRanking[index].character_name] = result;
        });

        setCharacterData(characterMap);
      } catch (error) {
        console.error("캐릭터 정보 배치 가져오기 실패:", error);
      }
    };

    fetchAllCharacters();
  }, [overallRanking]);

  return (
    <div className="wrap-inner">
      <div className="list-box">
        <h2 className="list-tit">
          <strong>{formatDateToKorean(todayDate)}</strong> 랭킹
        </h2>
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
                  <p className="img">
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
                    <span className="level-word">
                      Lv.{character.character_level} | {character.world_name}
                    </span>
                  </p>
                </div>
                <p className="char-popular">{character.character_popularity}</p>
                <p className="char-guild">
                  {character.character_guildname || "-"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>랭킹 데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default Total;
