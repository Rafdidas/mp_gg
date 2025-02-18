import React, { useEffect, useState } from "react";
import { OverallRanking } from "../../types/ranking.types";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_MAPLE_KEY;

const OverallItem = ({ rank }: { rank: OverallRanking }) => {
  const [ocid, setOcid] = useState<string | null>(null);

  useEffect(() => {
    const fetchOcid = async () => {
      try {
        const ocidData = await fetch(
          `${BASE_URL}/id?character_name=${rank.character_name}`,
          {
            headers: {
              "x-nxopen-api-key": API_KEY || "",
            },
          }
        );
        const data = await ocidData;
        //   setOcid(data); // ocid 값을 상태에 저장
      } catch (error) {
        console.error("ocid 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (rank.character_name) {
      fetchOcid();
    }
  }, [rank.character_name]);

  return (
    <div className="info_box">
      <p>ocid: {ocid ? ocid : "불러오는 중..."}</p>
      <p>{rank.ranking}</p>
      <p>{rank.character_name}</p>
      <p>{rank.world_name}</p>
      <p>{rank.class_name}</p>
      <p>{rank.sub_class_name}</p>
      <p>{rank.character_level}</p>
      {/* <p>{rank.character_exp}</p> */}
      <p>{rank.character_popularity}</p>
      <p>{rank.character_guildname}</p>
    </div>
  );
};

export default OverallItem;
