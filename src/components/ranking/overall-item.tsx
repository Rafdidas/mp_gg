import React from "react";

interface OverallRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  character_level: number;
  character_exp: number;
  character_popularity: number;
  character_guildname: string;
}

const OverallItem = ({ rank }: { rank: OverallRanking }) => {
  return (
    <div>
      <p>{rank.ranking}</p>
      <p>{rank.character_name}</p>
      <p>{rank.world_name}</p>
      <p>{rank.class_name}</p>
      <p>{rank.sub_class_name}</p>
      <p>{rank.character_level}</p>
      <p>{rank.character_exp}</p>
      <p>{rank.character_popularity}</p>
      <p>{rank.character_guildname}</p>
    </div>
  );
};

export default OverallItem;
