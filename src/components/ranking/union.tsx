import { FC, useEffect } from "react";
import { UnionRanking } from "../../types/ranking.types";
import UnionItem from "./union-item";

interface UnionProps {
  unionRanking: UnionRanking[];
}

const Union: FC<UnionProps> = ({ unionRanking }) => {
  return (
    <div>
      <h2>유니온 랭킹</h2>
      <ul>
        {unionRanking.map((rank) => {
          return (
            <li key={rank.ranking} style={{ borderBottom: "1px solid #aaa" }}>
              <UnionItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Union;
