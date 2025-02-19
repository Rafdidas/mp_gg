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
  guild_mark: string;
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

export interface OverallRankTop {
  date: string;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: string;
  character_guild_name: string;
  character_image: string;
  character_date_create: string;
  access_flag: string;
  liberation_quest_clear_flag: string;
}

export interface CharacterPopularity {
  data: string;
  popularity: number;
}

export interface CharacterStat {
  date: string;
  character_class: string;
  final_stat: [{
    stat_name: string;
    stat_value: number;
  }];
  remain_ap: number;
}

export interface HyperStat {
  date: string
  character_class: string;
  use_preset_no: string;
  use_available_hyper_stat: number;
  hyper_stat_preset_1: [
    {
      stat_type: string;
      stat_point: number;
      stat_level: number;
      stat_increase: string;
    }
  ],
  hyper_stat_preset_1_remain_point: number;
  hyper_stat_preset_2: [
    {
      stat_type: string;
      stat_point: number;
      stat_level: number;
      stat_increase: string;
    }
  ],
  hyper_stat_preset_2_remain_point: number;
  hyper_stat_preset_3: [
    {
      stat_type: string;
      stat_point: number;
      stat_level: number;
      stat_increase: string;
    }
  ],
  hyper_stat_preset_3_remain_point: number;
}

export interface ItemEquipment {
  date: string;
  character_gender: string;
  character_class: string;
  preset_no: number;
  item_equipment: [
    {
      item_equipment_part: string;
      item_equipment_slot: string;
      item_name: string;
      item_icon: string;
      item_description: string;
      item_shape_name: string;
      item_shape_icon: string;
      item_gender: string;
      item_total_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        damage: string;
        equipment_level_decrease: number;
        max_hp_rate: string;
        max_mp_rate: string;
      },
      item_base_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        max_hp_rate: string;
        max_mp_rate: string;
        base_equipment_level: number;
      },
      potential_option_flag: string;
      additional_potential_option_flag: string;
      potential_option_grade: string;
      additional_potential_option_grade: string;
      potential_option_1: string;
      potential_option_2: string;
      potential_option_3: string;
      additional_potential_option_1: string;
      additional_potential_option_2: string;
      additional_potential_option_3: string;
      equipment_level_increase: number;
      item_exceptional_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        exceptional_upgrade: number;
      },
      item_add_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        damage: string;
        all_stat: string;
        equipment_level_decrease: number;
      },
      growth_exp: number;
      growth_level: number;
      scroll_upgrade: string;
      cuttable_count: string;
      golden_hammer_flag: string;
      scroll_resilience_count: string;
      scroll_upgradable_count: string;
      soul_name: string;
      soul_option: string;
      item_etc_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
      },
      starforce: string;
      starforce_scroll_flag: string;
      item_starforce_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
      },
      special_ring_level: number;
      date_expire: string;
    }
  ],
  item_equipment_preset_1: [
    {
      item_equipment_part: string;
      equipment_slot: string;
      item_name: string;
      item_icon: string;
      item_description: string;
      item_shape_name: string;
      item_shape_icon: string;
      item_gender: string;
      item_total_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        damage: string;
        equipment_level_decrease: number;
        max_hp_rate: string;
        max_mp_rate: string;
      },
      item_base_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        max_hp_rate: string;
        max_mp_rate: string;
        base_equipment_level: number;
      },
      potential_option_grade: string;
      additional_potential_option_grade: string;
      potential_option_1: string;
      potential_option_2: string;
      potential_option_3: string;
      additional_potential_option_1: string;
      additional_potential_option_2: string;
      additional_potential_option_3: string;
      equipment_level_increase: number;
      item_exceptional_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        exceptional_upgrade: number;
      },
      item_add_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        damage: string;
        all_stat: string;
        equipment_level_decrease: number;
      },
      growth_exp: number;
      growth_level: number;
      scroll_upgrade: string;
      cuttable_count: string;
      golden_hammer_flag: string;
      scroll_resilience_count: string;
      scroll_upgradable_count: string;
      soul_name: string;
      soul_option: string;
      item_etc_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
      },
      starforce: string;
      starforce_scroll_flag: string;
      item_starforce_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
      },
      special_ring_level: number;
      date_expire: string;
    }
  ],
  item_equipment_preset_2: [
    {
      item_equipment_part: string;
      equipment_slot: string;
      item_name: string;
      item_icon: string;
      item_description: string;
      item_shape_name: string;
      item_shape_icon: string;
      item_gender: string;
      item_total_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        damage: string;
        equipment_level_decrease: number;
        max_hp_rate: string;
        max_mp_rate: string;
      },
      item_base_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        max_hp_rate: string;
        max_mp_rate: string;
        base_equipment_level: number;
      },
      potential_option_grade: string;
      additional_potential_option_grade: string;
      potential_option_1: string;
      potential_option_2: string;
      potential_option_3: string;
      additional_potential_option_1: string;
      additional_potential_option_2: string;
      additional_potential_option_3: string;
      equipment_level_increase: number;
      item_exceptional_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        exceptional_upgrade: number;
      },
      item_add_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        damage: string;
        all_stat: string;
        equipment_level_decrease: number;
      },
      growth_exp: number;
      growth_level: number;
      scroll_upgrade: string;
      cuttable_count: string;
      golden_hammer_flag: string;
      scroll_resilience_count: string;
      scroll_upgradable_count: string;
      soul_name: string;
      soul_option: string;
      item_etc_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
      },
      starforce: string;
      starforce_scroll_flag: string;
      item_starforce_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string
      },
      special_ring_level: number;
      date_expire: string;
    }
  ],
  item_equipment_preset_3: [
    {
      item_equipment_part: string;
      equipment_slot: string;
      item_name: string;
      item_icon: string;
      item_description: string;
      item_shape_name: string;
      item_shape_icon: string;
      item_gender: string;
      item_total_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        damage: string;
        equipment_level_decrease: number;
        max_hp_rate: string;
        max_mp_rate: string;
      },
      item_base_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        max_hp_rate: string;
        max_mp_rate: string;
        base_equipment_level: number;
      },
      potential_option_grade: string;
      additional_potential_option_grade: string;
      potential_option_1: string;
      potential_option_2: string;
      potential_option_3: string;
      additional_potential_option_1: string;
      additional_potential_option_2: string;
      additional_potential_option_3: string;
      equipment_level_increase: number;
      item_exceptional_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        exceptional_upgrade: number;
      },
      item_add_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        damage: string;
        all_stat: string;
        equipment_level_decrease: number;
      },
      growth_exp: number;
      growth_level: number;
      scroll_upgrade: string;
      cuttable_count: string;
      golden_hammer_flag: string;
      scroll_resilience_count: string;
      scroll_upgradable_count: string;
      soul_name: string;
      soul_option: string;
      item_etc_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string
      },
      starforce: string;
      starforce_scroll_flag: string;
      item_starforce_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string
      },
      special_ring_level: number;
      date_expire: string;
    }
  ],
  title: {
    title_name: string;
    title_icon: string;
    title_description: string;
    date_expire: string;
    date_option_expire: string;
  },
  dragon_equipment: [
    {
      item_equipment_part: string;
      equipment_slot: string;
      item_name: string;
      item_icon: string;
      item_description: string;
      item_shape_name: string;
      item_shape_icon: string;
      item_gender: string;
      item_total_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        damage: string;
        equipment_level_decrease: number;
        max_hp_rate: string;
        max_mp_rate: string
      },
      item_base_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        max_hp_rate: string;
        max_mp_rate: string;
        base_equipment_level: number;
      },
      equipment_level_increase: number;
      item_exceptional_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string
      },
      item_add_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        damage: string;
        all_stat: string;
        equipment_level_decrease: number;
      },
      growth_exp: number;
      growth_level: number;
      scroll_upgrade: string;
      cuttable_count: string;
      golden_hammer_flag: string;
      scroll_resilience_count: string;
      scroll_upgradable_count: string;
      soul_name: string;
      soul_option: string;
      item_etc_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string
      },
      starforce: string;
      starforce_scroll_flag: string;
      item_starforce_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string
      },
      special_ring_level: number;
      date_expire: string;
    }
  ],
  mechanic_equipment: [
    {
      item_equipment_part: string;
      equipment_slot: string;
      item_name: string;
      item_icon: string;
      item_description: string;
      item_shape_name: string;
      item_shape_icon: string;
      item_gender: string;
      item_total_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        damage: string;
        equipment_level_decrease: number;
        max_hp_rate: string;
        max_mp_rate: string
      },
      item_base_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        max_hp_rate: string;
        max_mp_rate: string;
        base_equipment_level: number;
      },
      equipment_level_increase: number;
      item_exceptional_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string
      },
      item_add_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        damage: string;
        all_stat: string;
        equipment_level_decrease: number;
      },
      growth_exp: number;
      growth_level: number;
      scroll_upgrade: string;
      cuttable_count: string;
      golden_hammer_flag: string;
      scroll_resilience_count: string;
      scroll_upgradable_count: string;
      soul_name: string;
      soul_option: string;
      item_etc_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string
      },
      starforce: string;
      starforce_scroll_flag: string;
      item_starforce_option: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
      },
      special_ring_level: number;
      date_expire: string;
    }
  ]
}

export interface CashEquipment {
  date: string
  character_gender: string
  character_class: string
  character_look_mode: string
  preset_no: number
  cash_item_equipment_base: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ],
  cash_item_equipment_preset_1: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ],
  cash_item_equipment_preset_2: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ],
  cash_item_equipment_preset_3: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ],
  additional_cash_item_equipment_base: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ],
  additional_cash_item_equipment_preset_1: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ],
  additional_cash_item_equipment_preset_2: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ],
  additional_cash_item_equipment_preset_3: [
    {
      cash_item_equipment_part: string
      cash_item_equipment_slot: string
      cash_item_name: string
      cash_item_icon: string
      cash_item_description: string
      cash_item_option: [
        {
          option_type: string
          option_value: string
        }
      ],
      date_expire: string
      date_option_expire: string
      cash_item_label: string
      cash_item_coloring_prism: {
        color_range: string
        hue: number,
        saturation: number,
        value: number
      },
      item_gender: string
    }
  ]
}

export interface SkiiInfo {
  date: string;
  character_class: string;
  character_skill_grade: string;
  character_skill: [
    {
      skill_name: string;
      skill_description: string;
      skill_level: number;
      skill_effect: string;
      skill_effect_next: string;
      skill_icon: string;
    }
  ]
}

export interface SymbolInfo {
  date: string;
  character_class: string;
  symbol: [
    {
      symbol_name: string;
      symbol_icon: string;
      symbol_description: string;
      symbol_force: string;
      symbol_level: number;
      symbol_str: string;
      symbol_dex: string;
      symbol_int: string;
      symbol_luk: string;
      symbol_hp: string;
      symbol_drop_rate: string;
      symbol_meso_rate: string;
      symbol_exp_rate: string;
      symbol_growth_count: number;
      symbol_require_growth_count: number;
    }
  ]
}


export interface Ocid {
  ocid: string;
}