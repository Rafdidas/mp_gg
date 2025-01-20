import React from "react";
import { ArchievementRanking } from "../../types/ranking.types";

const ArchievementItem = ({ rank }: { rank: ArchievementRanking }) => {
  return (
    <div>
      <p>{rank.ranking}</p>
      <p>{rank.character_name}</p>
      <p>{rank.world_name}</p>
      <p>{rank.class_name}</p>
      <p>{rank.sub_class_name}</p>
      <p>{rank.trophy_grade}</p>
      <p>{rank.trophy_score}</p>
    </div>
  );
};

export default ArchievementItem;
