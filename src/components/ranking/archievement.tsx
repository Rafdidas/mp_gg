import { FC } from "react";
import { ArchievementRanking } from "../../types/ranking.types";
import ArchievementItem from "./archievement-item";

interface ArchievementProps {
  archievementRanking: ArchievementRanking[];
}

const Archievement: FC<ArchievementProps> = ({ archievementRanking }) => {
  return (
    <div>
      <h2>업적 랭킹</h2>
      <ul>
        {archievementRanking.map((rank) => {
          return (
            <li key={rank.character_name} style={{ borderBottom: "1px solid #aaa" }}>
              <ArchievementItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Archievement;
