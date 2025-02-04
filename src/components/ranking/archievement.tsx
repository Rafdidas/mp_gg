import { FC } from "react";
import { ArchievementRanking } from "../../types/ranking.types";
import ArchievementItem from "./archievement-item";

interface ArchievementProps {
  archievementRanking: ArchievementRanking[];
}

const Archievement: FC<ArchievementProps> = ({ archievementRanking }) => {
  return (
    <div className="rank_box">
      <h2>업적 랭킹</h2>
      <ul className="rank_list">
        {archievementRanking.map((rank) => {
          return (
            <li key={rank.character_name} >
              <ArchievementItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Archievement;
