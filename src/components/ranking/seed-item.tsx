import React from "react";
import { SeedRanking } from "../../types/ranking.types";

const SeedItem = ({ rank }: { rank: SeedRanking }) => {
  return (
    <div className="info_box">
      <p>{rank.ranking}</p>
      <p>{rank.character_name}</p>
      <p>{rank.world_name}</p>
      <p>{rank.class_name}</p>
      <p>{rank.sub_class_name}</p>
      <p>{rank.character_level}</p>
      <p>{rank.theseed_floor}</p>
      <p>{rank.theseed_time_record}</p>
    </div>
  );
};

export default SeedItem;
