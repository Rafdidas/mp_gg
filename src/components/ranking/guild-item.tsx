import React from "react";
import { GuildRanking } from "../../types/ranking.types";

const GuildItem = ({ rank }: { rank: GuildRanking }) => {
  return (
    <div>
      <p>{rank.ranking}</p>
      <p>{rank.world_name}</p>
      <p>{rank.guild_name}</p>
      <p>{rank.guild_level}</p>
      <p>{rank.guild_mark}</p>
      <p>{rank.guild_point}</p>
      <p>{rank.guild_master_name}</p>
    </div>
  );
};

export default GuildItem;
