import { FC } from "react";
import { GuildRanking } from "../../types/ranking.types";
import GuildItem from "./guild-item";

interface GuildProps {
  guildRanking: GuildRanking[];
}

const Guild: FC<GuildProps> = ({ guildRanking }) => {
  return (
    <div className="rank_box">
      <h2>길드 랭킹</h2>
      <ul className="rank_list">
        {guildRanking.map((rank) => {
          return (
            <li key={rank.ranking} >
              <GuildItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Guild;
