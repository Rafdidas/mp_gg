import { FC } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchDataNormal } from "../../api/rankingTopApi";
import {
  OverallRanking,
  UnionRanking,
  DojangRanking,
  SeedRanking,
  ArchievementRanking,
  Ocid,
  OverallRankTop,
} from "../../types/ranking.types";

interface RankCharacterProps {
  rankData: (
    | OverallRanking
    | UnionRanking
    | DojangRanking
    | SeedRanking
    | ArchievementRanking
    | null
  )[];
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RankCharacter: FC<RankCharacterProps> = ({ rankData }) => {
  // ✅ OCID 가져오기
  const ocidQueries = useQueries({
    queries: rankData.map((rank) => ({
      queryKey: ["ocid", rank?.character_name],
      queryFn: async () => {
        if (!rank?.character_name) return null;
        const ocidData = await fetchDataNormal<Ocid>(
          `${BASE_URL}/id?character_name=${rank.character_name}`
        );
        return ocidData.ocid;
      },
      enabled: !!rank?.character_name,
    })),
  });

  // ✅ OCID를 기반으로 캐릭터 기본 정보 가져오기
  const characterQueries = useQueries({
    queries: ocidQueries.map(({ data: ocid }, index) => ({
      queryKey: ["character", ocid],
      queryFn: async () => {
        if (!ocid) return null;
        const characterData = await fetchDataNormal<OverallRankTop>(
          `${BASE_URL}/character/basic?ocid=${ocid}`
        );
        return characterData;
      },
      enabled: !!ocid,
    })),
  });

  return (
    <div className="rank_top_section">
      {/* ✅ "이번 주 랭킹 1위" 박스 */}
      {characterQueries[0]?.data && (
        <div className="rank_top_box">
          <h3>이번 주 랭킹 1위</h3>
          <div className="info">
            <p>{characterQueries[0].data.character_name}</p>
            <p>Lv.{characterQueries[0].data.character_level}</p>
            <p>{characterQueries[0].data.character_class}</p>
            <p>World: {characterQueries[0].data.world_name}</p>
          </div>
          <img
            src={characterQueries[0].data.character_image}
            alt={characterQueries[0].data.character_name}
          />
        </div>
      )}

      {/* ✅ 유니온, 무릉도장, 더 시드, 업적 랭킹을 map()으로 추가 */}
      {characterQueries.slice(1).map(({ data: character }, index) => {
        const rankInfo = rankData[index + 1];

        return character ? (
          <div key={index} className="rank_top_box">
            {/* ✅ 유니온 랭킹 박스 */}
            {rankInfo && "union_level" in rankInfo && (
              <>
                <h3>이번 주 유니온 랭킹 1위</h3>
                <div className="info">
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                  <p>World: {character.world_name}</p>
                  <p>Union Level: {rankInfo.union_level}</p>
                  <p>Union Power: {rankInfo.union_power}</p>
                </div>
                <img src={character.character_image} alt={character.character_name} />
              </>
            )}

            {/* ✅ 무릉도장 랭킹 박스 */}
            {rankInfo && "dojang_floor" in rankInfo && (
              <>
                <h3>이번 주 무릉도장 랭킹 1위</h3>
                <div className="info">
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                  <p>World: {character.world_name}</p>
                  <p>Dojang Floor: {rankInfo.dojang_floor}</p>
                  <p>Time Record: {rankInfo.dojang_time_record}</p>
                </div>
                <img src={character.character_image} alt={character.character_name} />
              </>
            )}

            {/* ✅ 더 시드 랭킹 박스 */}
            {rankInfo && "theseed_floor" in rankInfo && (
              <>
                <h3>이번 주 더 시드 랭킹 1위</h3>
                <div className="info">
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                  <p>World: {character.world_name}</p>
                  <p>Seed Floor: {rankInfo.theseed_floor}</p>
                  <p>Time Record: {rankInfo.theseed_time_record}</p>
                </div>
                <img src={character.character_image} alt={character.character_name} />
              </>
            )}

            {/* ✅ 업적 랭킹 박스 */}
            {rankInfo && "trophy_grade" in rankInfo && (
              <>
                <h3>이번 주 업적 랭킹 1위</h3>
                <div className="info">
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                  <p>World: {character.world_name}</p>
                  <p>Trophy Grade: {rankInfo.trophy_grade}</p>
                  <p>Trophy Score: {rankInfo.trophy_score}</p>
                </div>
                <img src={character.character_image} alt={character.character_name} />
              </>
            )}
          </div>
        ) : (
          <p key={index}>캐릭터 정보를 불러오는 중...</p>
        );
      })}
    </div>
  );
};

export default RankCharacter;
