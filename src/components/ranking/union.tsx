import { FC } from "react";
import { UnionRanking } from "../../types/ranking.types";
import UnionItem from "./union-item";

interface UnionProps {
  unionRanking: UnionRanking[];
}

const Union: FC<UnionProps> = ({ unionRanking }) => {
  return (
    <div className="rank_box">
      <h2>유니온 랭킹</h2>
      <ul className="rank_list">
        {unionRanking.map((rank) => {
          return (
            <li key={rank.ranking} >
              <UnionItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Union;
