export interface OverallRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  character_level: number;
  character_exp: number;
  character_popularity: number;
  character_guildname: string;
}

export interface UnionRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  union_level: number;
  union_power: number;
}

export interface GuildRanking {
  date: string;
  world_name: string;
  guild_name: string;
  guild_level: number;
  guild_mark: "";
  guild_point: number;
  ranking: number;
  guild_master_name: string;
}
export interface DojangRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  character_level: number;
  dojang_floor: number;
  dojang_time_record: number;
}

export interface SeedRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  character_level: number;
  theseed_floor: number;
  theseed_time_record: number;
}

export interface ArchievementRanking {
  date: string;
  ranking: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  trophy_grade: string;
  trophy_score: number;
}
