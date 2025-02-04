import { FC } from "react";
import { OverallRanking } from "../../types/ranking.types";
import OverallItem from "./overall-item";

interface OverallProps {
  overallRanking: OverallRanking[];
}

const Overall: FC<OverallProps> = ({ overallRanking }) => {
  return (
    <div className="rank_box">
      <h2>종합 랭킹</h2>
      <ul className="rank_list">
        {overallRanking.map((rank) => {
          return (
            <li key={rank.ranking}>
              <OverallItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Overall;
