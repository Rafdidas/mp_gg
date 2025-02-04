import { FC } from "react";
import { OverallRanking, UnionRanking, GuildRanking, DojangRanking, SeedRanking, ArchievementRanking, OverallRankTop, Ocid } from "../../types/ranking.types";
import { getTodayDate } from "../../utils/getTodayDate.utils";
import { useQuery } from "@tanstack/react-query";
import { fetchDataNormal, fetchRankTop } from "../../api/rankingTopApi";

interface RankCharacterProps {
  overallTop: OverallRanking | null;
  unionTop: UnionRanking | null;
  guildTop: GuildRanking | null;
  dojangTop: DojangRanking | null;
  seedTop: SeedRanking | null;
  archievementTop: ArchievementRanking | null;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RankCharacter:FC<RankCharacterProps> = ({
  overallTop,
  unionTop,
  guildTop,
  dojangTop,
  seedTop,
  archievementTop,
}) => {

    const todayDate = getTodayDate();
    const ocidUrl = `${BASE_URL}/id?character_name=${overallTop?.character_name}`;
    const { data: ocid } = useQuery({
      queryKey: ["ocid", overallTop?.character_name],
      queryFn: () => fetchDataNormal<Ocid>(ocidUrl),
      enabled: !!overallTop?.character_name,
    });


    const overallTopUrl = `${BASE_URL}/character/basic?ocid=${ocid?.ocid}&date=2025-02-04`;

    const { data: overRankTop } = useQuery({
      queryKey: ["rankTop", ocid?.ocid],
      queryFn: () => fetchDataNormal<OverallRankTop>(overallTopUrl),
      enabled: !!ocid?.ocid,
    });

    console.log(overRankTop);

    return (
      
        <div className="rank_top_section">
        {ocid?.ocid ? <p>OCID: {ocid.ocid}</p> : <p>OCID 정보를 불러오는 중...</p>}
        {overRankTop ? (
          <div className="rank_top_box">
            <p>Character Name: {overRankTop.character_name}</p>
            <p>Class: {overRankTop.character_class}</p>
            <p>Level: {overRankTop.character_level}</p>
            <p>Gender: {overRankTop.character_gender}</p>
            <p>World: {overRankTop.world_name}</p>
            <img src={overRankTop.character_image} alt={overRankTop.character_name} />
          </div>
        ) : (
          <p>캐릭터 정보를 불러오는 중...</p>
        )}
      </div>
    )
}

export default RankCharacter;