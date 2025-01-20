import { FC } from "react";
import { GuildRanking } from "../../types/ranking.types";
import GuildItem from "./guild-item";

interface GuildProps {
  guildRanking: GuildRanking[];
}

const Guild: FC<GuildProps> = ({ guildRanking }) => {
  console.log(guildRanking);
  return (
    <div>
      <h2>길드 랭킹</h2>
      <ul>
        {guildRanking.map((rank) => {
          return (
            <li key={rank.ranking} style={{ borderBottom: "1px solid #aaa" }}>
              <GuildItem rank={rank} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Guild;
