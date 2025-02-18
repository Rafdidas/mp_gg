import { FC } from 'react';
import './character_detail.style.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDataNormal } from '../../api/rankingTopApi';
import { CharacterPopularity, CharacterStat, OverallRankTop } from '../../types/ranking.types';

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
    // 스탯
    const { data: characterStat } = useQuery({
        queryKey: ["characterStat", ocid],
        queryFn: async () => {
            if (!ocid) return null;
            return fetchDataNormal<CharacterStat>(`${BASE_URL}/character/stat?ocid=${ocid}`);
        },
        enabled: !!ocid,
    });


    return (
        <div id='character_detail'>
            <h1>Character_detail</h1>
            {
                characterInfo ? (
                    <div className='character_info'>
                        <div>
                            <img src={characterInfo.character_image} alt={characterInfo.character_name} />
                        </div>
                        <div>
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
                    <p className='loading'>캐릭터 정보를 불러오는 중...</p>
                )
            }
            {
                characterStat ? (
                    <div className='stat'>
                        <h3>스탯</h3>
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
                    <p className='loading'>캐릭터 스탯 불러오는 중...</p>
                )
            }
        </div>
    );
}

export default CharacterDetail;