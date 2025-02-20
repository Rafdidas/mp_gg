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
import { Link } from "react-router-dom";

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

        return { characterData, ocid };
      },
      enabled: !!ocid,
    })),
  });

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  return (
    <div className="rank_top_section">
      {/* ✅ "이번 주 랭킹 1위" 박스 */}
      {characterQueries[0]?.data && (
        <div className="rank_top_box total_top">
          <h3>이번 주 랭킹 1위</h3>
          <div className="info">
            <p><img src={`/assets/${characterQueries[0].data.characterData.world_name}.png`} alt={characterQueries[0].data.characterData.world_name} /></p>
            <p>{characterQueries[0].data.characterData.character_name}</p>
            <p>Lv.{characterQueries[0].data.characterData.character_level}</p>
            <p>{characterQueries[0].data.characterData.character_class}</p>
          </div>
          <img
            src={characterQueries[0].data.characterData.character_image}
            alt={characterQueries[0].data.characterData.character_name}
          />
          <div className="add_info">
            <p>랭킹 1위</p>
            <p>{characterQueries[0].data.characterData.character_class}</p>
          </div>
          <div className="link_detail">
            <Link to={`character-detail/${encodeURIComponent(characterQueries[0].data.characterData.character_name)}`}>
              상세 보기
            </Link>
          </div>
        </div>
      )}

      {/* ✅ 유니온, 무릉도장, 더 시드, 업적 랭킹을 map()으로 추가 */}
      {characterQueries.slice(1).map(({ data }, index) => {
        const rankInfo = rankData[index + 1];
        const character = data?.characterData;
        //const ocid = data?.ocid;

        return character ? (
          <div key={index} className={`rank_top_box rank_top_box${index}`}>
            {/* ✅ 유니온 랭킹 박스 */}
            {rankInfo && "union_level" in rankInfo && (
              <>
                <h3>이번 주 유니온 랭킹 1위</h3>
                <div className="info">
                  <p><img src={`/assets/${character.world_name}.png`} alt={character.world_name} /></p>
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                </div>
                <img
                  src={character.character_image}
                  alt={character.character_name}
                />
                <div className="add_info">
                  <p>Lv.{rankInfo.union_level ? new Intl.NumberFormat("ko-KR").format(rankInfo.union_level) : ""}</p>
                  <p>전투력 {rankInfo.union_power ? new Intl.NumberFormat("ko-KR").format(rankInfo.union_power) : ""}</p>
                </div>
                <div className="link_detail">
                  <Link to={`character-detail/${encodeURIComponent(character.character_name)}`}>상세 보기</Link>
                </div>
              </>
            )}

            {/* ✅ 무릉도장 랭킹 박스 */}
            {rankInfo && "dojang_floor" in rankInfo && (
              <>
                <h3>이번 주 무릉도장 랭킹 1위</h3>
                <div className="info">
                  <p><img src={`/assets/${character.world_name}.png`} alt={character.world_name} /></p>
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                </div>
                <img
                  src={character.character_image}
                  alt={character.character_name}
                />
                <div className="add_info">
                  <p>{rankInfo.dojang_floor}층</p>
                  <p>{rankInfo.dojang_time_record ? formatTime(rankInfo.dojang_time_record) : ""}</p>
                </div>
                <div className="link_detail">
                  <Link to={`character-detail/${encodeURIComponent(character.character_name)}`}>상세 보기</Link>
                </div>
              </>
            )}

            {/* ✅ 더 시드 랭킹 박스 */}
            {rankInfo && "theseed_floor" in rankInfo && (
              <>
                <h3>이번 주 더 시드 랭킹 1위</h3>
                <div className="info">
                  <p><img src={`/assets/${character.world_name}.png`} alt={character.world_name} /></p>
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                  
                </div>
                <img
                  src={character.character_image}
                  alt={character.character_name}
                />
                <div className="add_info">
                  <p>{rankInfo.theseed_floor}층</p>
                  <p>{rankInfo.theseed_time_record ? formatTime(rankInfo.theseed_time_record) : ""}</p>
                </div>
                <div className="link_detail">
                  <Link to={`character-detail/${encodeURIComponent(character.character_name)}`}>상세 보기</Link>
                </div>
              </>
            )}

            {/* ✅ 업적 랭킹 박스 */}
            {rankInfo && "trophy_grade" in rankInfo && (
              <>
                <h3>이번 주 업적 랭킹 1위</h3>
                <div className="info">
                  <p><img src={`/assets/${character.world_name}.png`} alt={character.world_name} /></p>
                  <p>{character.character_name}</p>
                  <p>Lv.{character.character_level}</p>
                  <p>{character.character_class}</p>
                  
                </div>
                <img
                  src={character.character_image}
                  alt={character.character_name}
                />
                <div className="add_info">
                  <p>{rankInfo.trophy_grade}</p>
                  <p>{rankInfo.trophy_score ? new Intl.NumberFormat("ko-KR").format(rankInfo.trophy_score) : ""}점</p>
                </div>
                <div className="link_detail">
                  <Link to={`character-detail/${encodeURIComponent(character.character_name)}`}>상세 보기</Link>
                </div>
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
