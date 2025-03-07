import { FC } from "react";
import { UnionRanking } from "../../types/ranking.types";
import UnionItem from "./union-item";
import { Link } from "react-router-dom";

interface UnionProps {
  unionRanking: UnionRanking[];
}

const Union: FC<UnionProps> = ({ unionRanking }) => {
  return (
    <div className="rank_box">
      <p>
        <Link to={`/ranks/union`}>더보기</Link>
      </p>
      <h2>유니온 랭킹</h2>
      <ul className="rank_list">
        {unionRanking.map((rank) => {
          return (
            <li key={rank.ranking}>
              <UnionItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Union;
