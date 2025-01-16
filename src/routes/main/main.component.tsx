import { FC, useEffect, useState } from 'react';
import './main.style.scss';

interface OverallRanking {
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

const Main: FC = () => {
    const API_KEY = process.env.REACT_APP_MAPLE_KEY;
    // const characterName = "CHARACTER NAME";
    const urlString =
        "https://open.api.nexon.com/maplestory/v1/ranking/overall?date=2023-12-22&page=1";


    const [overallRanking, setOverallRanking] = useState<OverallRanking[]>([]);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const overallFetch = async () => {
            try {
                const response = await fetch(urlString, {
                    headers: {
                        "x-nxopen-api-key": API_KEY || "",
                    },
                });
                if (!response.ok) {
                    throw new Error(`error: ${response.status}`);
                }

                const data = await response.json();
                setOverallRanking(data.ranking);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        overallFetch();
        
    }, [urlString, API_KEY]);

    return (
        <section id='main'>
            <h1>Main</h1>
            <ul>
            {
                overallRanking.map((rank) => {
                    return (
                        <li key={rank.ranking} style={{borderBottom: '1px solid #aaa'}}>
                            
                            <p>{rank.ranking}</p>
                            <p>{rank.character_name}</p>
                            <p>{rank.world_name}</p>
                            <p>{rank.class_name}</p>
                            <p>{rank.sub_class_name}</p>
                            <p>{rank.character_level}</p>
                            <p>{rank.character_exp}</p>
                            <p>{rank.character_popularity}</p>
                            <p>{rank.character_guildname}</p>
                        </li>
                    )
                })
            }
            </ul>
        </section>
    )
}

export default Main;