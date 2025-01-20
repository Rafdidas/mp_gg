import React from "react";

interface UnionRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  union_level: number;
  union_power: number;
}

const UnionItem = ({ rank }: { rank: UnionRanking }) => {
  return (
    <div>
      <p>{rank.ranking}</p>
      <p>{rank.character_name}</p>
      <p>{rank.world_name}</p>
      <p>{rank.class_name}</p>
      <p>{rank.sub_class_name}</p>
      <p>{rank.union_level}</p>
      <p>{rank.union_power}</p>
    </div>
  );
};

export default UnionItem;
