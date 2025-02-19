import { FC, useState } from 'react';
import './character_detail.style.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDataNormal } from '../../api/rankingTopApi';
import { CashEquipment, CharacterPopularity, CharacterStat, HyperStat, ItemEquipment, OverallRankTop, SkiiInfo, SymbolInfo } from '../../types/ranking.types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CharacterDetail:FC = () => {
    const { ocid } = useParams<{ ocid: string }>();

    //기본 정보
    const { data: characterInfo } = useQuery({
        queryKey: ["characterInfo", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<OverallRankTop>(`${BASE_URL}/character/basic?ocid=${ocid}`);
        },
        enabled: !!ocid,
    });
    // 인기도
    const { data: characterPopularity } = useQuery({
        queryKey: ["characterPopularity", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<CharacterPopularity>(`${BASE_URL}/character/popularity?ocid=${ocid}`);
        },
        enabled: !!ocid,
    });
    // 종합능력치
    const { data: characterStat } = useQuery({
        queryKey: ["characterStat", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<CharacterStat>(`${BASE_URL}/character/stat?ocid=${ocid}`);
        },
        enabled: !!ocid,
    });
    // 하이퍼스탯
    const { data: hyperStat } = useQuery({
        queryKey: ["hyperStat", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<HyperStat>(`${BASE_URL}/character/hyper-stat?ocid=${ocid}`);
        },
        enabled: !!ocid,
    });
    // 착용 장비
    const { data: itemEquip } = useQuery({
        queryKey: ["itemEquip", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<ItemEquipment>(`${BASE_URL}/character/item-equipment?ocid=${ocid}`);
        }
    });
    // 착용 캐시템
    const { data: itemCash } = useQuery({
        queryKey: ["itemCash", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<CashEquipment>(`${BASE_URL}/character/cashitem-equipment?ocid=${ocid}`);
        }
    });
    // 스킬 정보
    const { data: skillSix } = useQuery({
        queryKey: ["skillSix", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<SkiiInfo>(`${BASE_URL}/character/skill?ocid=${ocid}&character_skill_grade=6`);
        }
    });
    const { data: skillFive } = useQuery({
        queryKey: ["skillFive", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<SkiiInfo>(`${BASE_URL}/character/skill?ocid=${ocid}&character_skill_grade=5`);
        }
    });
    // 심볼 정보
    const { data: symbolInfo } = useQuery({
        queryKey: ["symbolInfo", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<SymbolInfo>(`${BASE_URL}/character/symbol-equipment?ocid=${ocid}`);
        }
    });

    const [activeTab, setActiveTab] = useState<string>('스탯/장비');
    const [activePresetHyper, setActivePresetHyper] = useState<number>(1);
    const [activePresetItem, setActivePresetItem] = useState<number>(1);


    return (
        <div id='character_detail'>
            <h1>Character_detail</h1>
            {
                characterInfo ? (
                    <div className='character_info'>
                        <div className='character_cash'>
                            {
                                itemCash ? (
                                    <ul>
                                        {
                                            itemCash?.cash_item_equipment_preset_1.map((cash, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>{cash.cash_item_equipment_part}: </span>
                                                        <span>{cash.cash_item_name}</span>
                                                    </li>
                                                )
                                            })                                            
                                        }
                                    </ul>
                                ) : null
                            }
                            
                        </div>
                        <div className='character_img'>
                            <img src={characterInfo.character_image} alt={characterInfo.character_name} />
                        </div>
                        <div className='character_basic_info'>
                            <p>{characterInfo.character_name}</p>
                            <p>Level: {characterInfo.character_level}</p>
                            <p>Class: {characterInfo.character_class}</p>
                            <p>World: {characterInfo.world_name}</p>
                            {
                                characterPopularity ? (
                                    <p>Popularity: {characterPopularity?.popularity ? new Intl.NumberFormat("ko-KR").format(characterPopularity?.popularity) : "-"}</p>
                                ) : null
                            }
                        </div>
                        
                    </div>
                ) : (
                    <p className='empty'>캐릭터 정보를 불러오는 중...</p>
                )
            }
            <ul className='preset_list tab_list'>
                {
                    ['스탯/장비','스킬 및 심볼'].map((preset) => {
                        return (
                            <li key={preset} className={activeTab === preset ? "active" : ""} onClick={() => setActiveTab(preset)}>{preset}</li>
                        )
                    })
                }
            </ul>
            <div className={`detail_tab detail_stat ${activeTab === "스탯/장비" ? "active" : ""}`}>
                <h2>스탯/장비</h2>
                <div className='stat_box'>
                    {
                        characterStat ? (
                            <div className='total_stat'>
                                <h3>종합능력치</h3>
                                <ul>
                                    {
                                        characterStat?.final_stat?.map((stat, index) => {
                                            return(
                                                <li key={index}>
                                                    <span>{stat.stat_name} : </span>
                                                    <span> {stat.stat_value ? new Intl.NumberFormat("ko-KR").format(stat.stat_value) : "-"}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        ) : (
                            <p className='empty'>캐릭터 스탯 불러오는 중...</p>
                        )
                    }
                    <div className='hyper_stat_box'>
                        <ul className='preset_list'>
                            {
                                [1,2,3].map((preset) => {
                                    return (
                                        <li key={preset} className={activePresetHyper === preset ? "active" : ""} onClick={() => setActivePresetHyper(preset)}>프리셋 {preset}</li>
                                    )
                                })
                            }
                        </ul>
                        {
                            hyperStat ? (
                                [1,2,3].map((preset) => {
                                    const presetKey = `hyper_stat_preset_${preset}` as keyof typeof hyperStat;
                                    const statPreset = hyperStat[presetKey];
                                    return (
                                        <div key={preset} className={activePresetHyper === preset ? "stat active" : "stat"}>
                                            <h3>하이퍼 스탯 프리셋 {preset}</h3>
                                            <ul>
                                                {
                                                    Array.isArray(statPreset) && statPreset.filter(stat => stat.stat_level !== 0).map((stat, index) => (
                                                        <li key={index}>
                                                            <span className='stat_level'>Lv {stat.stat_level}</span>
                                                            <span> {stat.stat_increase} </span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className='empty'>캐릭터 스탯 불러오는 중...</p>
                            )
                        }
                        
                    </div>
                    <div className='item_equip'>
                        <ul className='preset_list'>
                            {
                                [1,2,3].map((preset) => {
                                    return (
                                        <li key={preset} className={activePresetItem === preset ? "active" : ""} onClick={() => setActivePresetItem(preset)}>프리셋 {preset}</li>
                                    )
                                })
                            }
                        </ul>
                        {
                            itemEquip ? (
                                <div className='equip_box'>
                                    {
                                        [1,2,3].map((preset) => {
                                            const presetKey = `item_equipment_preset_${preset}` as keyof typeof itemEquip;
                                            const equipmentList = itemEquip[presetKey];
                                            
                                            return (
                                                <div key={preset} className={`equip_preset equip_preset${preset} ${activePresetItem === preset ? "active" : "" }`}>
                                                    <h2>장비 프리셋 {preset}</h2>
                                                    <div className='item_part_wrap'>
                                                        {
                                                            Array.isArray(equipmentList) && equipmentList.map((data, index) => {
                                                                return (
                                                                    <div key={index} className='item_part'>
                                                                        {
                                                                            data.starforce !== '0' && (
                                                                                <p className='starforce'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#F6A730" d="m5 0 1.323 3.18 3.432.275-2.615 2.24.799 3.35L5 7.25 2.061 9.045l.8-3.35-2.616-2.24 3.432-.275z"></path></svg>
                                                                                    {data.starforce}
                                                                                </p>
                                                                            )
                                                                        }
                                                                        <div className='basic_info'>
                                                                            <p>{data.item_name}</p>
                                                                            <p className='img'><img src={data.item_icon} alt={data.item_name} /></p>
                                                                            {/* <p>{data.item_description}</p> */}
                                                                        </div>
                                                                        <h4 className='item_sort'>장비 분류: {data.item_equipment_part}</h4>
                                                                        <p className='req_level'>REQ LV: {data.item_base_option.base_equipment_level}</p>
                                                                        <div className='stat_info'>
                                                                            {
                                                                                data.item_total_option.str !== '0' && (
                                                                                    <p>str: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.str}</span>
                                                                                        <span className='base_item_stat'>({data.item_base_option.str}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.str !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.str}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.str !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.str}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.str !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.str}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.str !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.str}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            
                                                                            {
                                                                                data.item_total_option.dex !== '0' && (
                                                                                    <p>dex: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.dex}</span>
                                                                                        <span className='base_item_stat'>({data.item_base_option.dex}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.dex !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.dex}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.dex !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.dex}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.dex !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.dex}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.dex !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.dex}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.int !== '0' && (
                                                                                    <p>int: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.int}</span>
                                                                                        <span className='base_item_stat'>({data.item_base_option.int}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.int !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.int}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.int !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.int}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.int !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.int}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.int !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.int}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.luk !== '0' && (
                                                                                    <p>luk: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.luk}</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.luk}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.luk !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.luk}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.luk !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.luk}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.luk !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.luk}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.luk !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.luk}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.max_hp !== '0' && (
                                                                                    <p>최대 HP: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.max_hp}</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.max_hp}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.max_hp !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.max_hp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.max_hp !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.max_hp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.max_hp !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.max_hp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.max_hp !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.max_hp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.max_mp !== '0' && (
                                                                                    <p>최대 MP: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.max_mp}</span>
                                                                                        <span className='base_item_stat'>({data.item_base_option.max_mp}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.max_mp !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.max_mp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.max_mp !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.max_mp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.max_mp !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.max_mp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.max_mp !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.max_mp}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.attack_power !== '0' && (
                                                                                    <p>공격력: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.attack_power}</span>
                                                                                        <span className='base_item_stat'>({data.item_base_option.attack_power}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.attack_power !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.attack_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.attack_power !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.attack_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.attack_power !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.attack_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.attack_power !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.attack_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.magic_power !== '0' && (
                                                                                    <p>마력: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.magic_power}</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.magic_power}</span>
                                                                                        {
                                                                                            data.item_exceptional_option.magic_power !== '0' && (
                                                                                                <span className='except_item_stat'>+{data.item_exceptional_option.magic_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_add_option.magic_power !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.magic_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.magic_power !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.magic_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.magic_power !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.magic_power}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.armor !== '0' && (
                                                                                    <p>방어력: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.armor}</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.armor}</span>
                                                                                        {
                                                                                            data.item_add_option.armor !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.armor}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.armor !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.armor}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.armor !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.armor}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.speed !== '0' && (
                                                                                    <p>이동속도: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.speed}</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.speed}</span>
                                                                                        {
                                                                                            data.item_add_option.speed !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.speed}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.speed !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.speed}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.speed !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.speed}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.jump !== '0' && (
                                                                                    <p>점프력: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.jump}</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.jump}</span>
                                                                                        {
                                                                                            data.item_add_option.jump !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.jump}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_etc_option.jump !== '0' && (
                                                                                                <span className='etc_item_stat'>+{data.item_etc_option.jump}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        {
                                                                                            data.item_starforce_option.jump !== '0' && (
                                                                                                <span className='star_item_stat'>+{data.item_starforce_option.jump}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.boss_damage !== '0' && (
                                                                                    <p>보스 공격 시 데미지 증가: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.boss_damage}%</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.boss_damage}</span>
                                                                                        {
                                                                                            data.item_add_option.boss_damage !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.boss_damage}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.ignore_monster_armor !== '0' && (
                                                                                    <p>몬스터 방어율 무시: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.ignore_monster_armor}%</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.ignore_monster_armor}</span>)
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.all_stat !== '0' && (
                                                                                    <p>올스탯: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.all_stat}%</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.all_stat}</span>
                                                                                        {
                                                                                            data.item_add_option.all_stat !== '0' && (
                                                                                                <span className='add_item_stat'>+{data.item_add_option.all_stat}</span>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.damage !== '0' && (
                                                                                    <p>데미지: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.damage}%</span>
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.equipment_level_decrease !== 0 && (
                                                                                    <p>착용 레벨 감소: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.equipment_level_decrease}</span>
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.max_hp_rate !== '0' && (
                                                                                    <p>최대 HP: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.max_hp_rate}%</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.max_hp_rate}</span>
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            {
                                                                                data.item_total_option.max_mp_rate !== '0' && (
                                                                                    <p>최대 MP: 
                                                                                        <span className='total_item_stat'>+{data.item_total_option.max_mp_rate}%</span> 
                                                                                        <span className='base_item_stat'>({data.item_base_option.max_mp_rate}</span>
                                                                                        )
                                                                                    </p>
                                                                                )
                                                                            }
                                                                            
                                                                        </div>
                                                                        <div className='potential_option'>
                                                                            { "potential_option_grade" in data && <h5>잠재능력 {data.potential_option_grade}</h5> }
                                                                            { "potential_option_1" in data && <p>{data.potential_option_1}</p> }
                                                                            { "potential_option_2" in data && <p>{data.potential_option_2}</p> }
                                                                            { "potential_option_3" in data && <p>{data.potential_option_3}</p> }
                                                                        </div>
                                                                        <div className='additional_potential'>
                                                                            { "additional_potential_option_grade" in data && <h5>에디셔널 잠재능력 {data.potential_option_grade}</h5> }
                                                                            { "additional_potential_option_1" in data && <p>{data.additional_potential_option_1}</p> }
                                                                            { "additional_potential_option_2" in data && <p>{data.additional_potential_option_2}</p> }
                                                                            { "additional_potential_option_3" in data && <p>{data.additional_potential_option_3}</p> }
                                                                        </div>
                                                                        <p>착용 레벨 증가 : {data.equipment_level_increase}</p>
                                                                        <p className='cuttable_count'>가위 사용 가능 횟수: {data.cuttable_count}</p>
                                                                        {/* <img src={data.item_shape_icon} alt={data.item_shape_name} /> */}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        }) 
                                    }
                                </div>
                            ) : (
                                <p className='empty'>정보가 없습니다.</p>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={`detail_tab detail_skill ${activeTab === "스킬 및 심볼" ? "active" : ""}`}>
                <h2>스킬 및 심볼</h2>
                {
                    skillSix ? (
                        <div className='skill_wrap'>
                            <h3>6차 스킬</h3>
                            <ul className='skill_list'>
                            {
                                
                                skillSix.character_skill.map((data, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={data.skill_icon} alt={data.skill_name} />
                                            <p>{data.skill_name}</p>
                                            <p>Lv{data.skill_level}</p>
                                            {/* <p>{data.skill_effect}</p> */}
                                        </li>
                                    )
                                })
                                
                            }
                            </ul>  
                        </div>
                    ) : (
                        <p className='empty'>스킬 정보가 없습니다.</p>
                    )
                }
                {
                    skillFive ? (
                        <div className='skill_wrap'>
                            <h3>5차 스킬</h3>
                            <ul className='skill_list'>
                            {
                                
                                skillFive.character_skill.map((data, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={data.skill_icon} alt={data.skill_name} />
                                            <p>{data.skill_name}</p>
                                            <p>Lv{data.skill_level}</p>
                                            {/* <p>{data.skill_effect}</p> */}
                                        </li>
                                    )
                                })
                                
                            }
                            </ul>  
                        </div>
                    ) : (
                        <p className='empty'>스킬 정보가 없습니다.</p>
                    )
                }
                {
                    symbolInfo ? (
                        <div className='symbol_wrap'>
                            <h3>심볼</h3>
                            <ul className='symbol_list'>
                                {
                                    symbolInfo.symbol.map((data, index) => {
                                        return (
                                            <li key={index}>
                                                <p>{data.symbol_name}</p>
                                                <img src={data.symbol_icon} alt={data.symbol_name} />
                                                <p>Lv {data.symbol_level}</p>
                                                <p>ARC {data.symbol_force}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : (
                        <p className='empty'>심볼 정보가 없습니다.</p>
                    )
                }
            </div>
        </div>
    );
}

export default CharacterDetail;