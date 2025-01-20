import { FC } from "react";
import { DojangRanking } from "../../types/ranking.types";
import DojangItem from "./dojang-item";

interface DojangProps {
  dojangRanking: DojangRanking[];
}

const Dojang: FC<DojangProps> = ({ dojangRanking }) => {
  return (
    <div>
      <h2>무릉도장 랭킹</h2>
      <ul>
        {dojangRanking.map((rank) => {
          return (
            <li key={rank.ranking} style={{ borderBottom: "1px solid #aaa" }}>
              <DojangItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dojang;
