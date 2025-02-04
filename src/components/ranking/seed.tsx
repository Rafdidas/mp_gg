import { FC } from "react";
import { SeedRanking } from "../../types/ranking.types";
import SeedItem from "./seed-item";

interface SeedProps {
  seedRanking: SeedRanking[];
}

const Seed: FC<SeedProps> = ({ seedRanking }) => {
  return (
    <div className="rank_box">
      <h2>더 시드 랭킹</h2>
      <ul className="rank_list">
        {seedRanking.map((rank) => {
          return (
            <li key={rank.ranking} >
              <SeedItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Seed;
