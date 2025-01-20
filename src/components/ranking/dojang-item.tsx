import React from "react";
import { DojangRanking } from "../../types/ranking.types";

const DojangItem = ({ rank }: { rank: DojangRanking }) => {
  return (
    <div>
      <p>{rank.ranking}</p>
      <p>{rank.character_name}</p>
      <p>{rank.world_name}</p>
      <p>{rank.class_name}</p>
      <p>{rank.sub_class_name}</p>
      <p>{rank.character_level}</p>
      <p>{rank.dojang_floor}</p>
      <p>{rank.dojang_time_record}</p>
    </div>
  );
};

export default DojangItem;
