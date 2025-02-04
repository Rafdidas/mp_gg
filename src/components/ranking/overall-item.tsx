import React from "react";
import { OverallRanking } from "../../types/ranking.types";

const OverallItem = ({ rank }: { rank: OverallRanking }) => {
  return (
    <div className="info_box">
      <p>{rank.ranking}</p>
      <p>{rank.character_name}</p>
      <p>{rank.world_name}</p>
      <p>{rank.class_name}</p>
      <p>{rank.sub_class_name}</p>
      <p>{rank.character_level}</p>
      {/* <p>{rank.character_exp}</p> */}
      <p>{rank.character_popularity}</p>
      <p>{rank.character_guildname}</p>
    </div>
  );
};

export default OverallItem;
