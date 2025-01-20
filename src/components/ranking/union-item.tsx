import { UnionRanking } from "../../types/ranking.types";

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
