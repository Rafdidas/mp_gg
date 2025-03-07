import {
  formatDateToKorean,
  getTodayDate,
} from "../../utils/getTodayDate.utils";
import useRanking from "../../hook/useRanking";
import { UnionRanking } from "../../types/ranking.types";
import { Link } from "react-router-dom";

const todayDate = getTodayDate();

const Union = () => {
  const { rankingData, ocidData, characterData } = useRanking("union", 10);

  const unionRanking = rankingData as UnionRanking[];
  return (
    <div className="wrap-inner">
      <div className="list-box">
        <h2 className="list-tit">
          <strong>{formatDateToKorean(todayDate)}</strong> 랭킹
        </h2>
        {unionRanking ? (
          <ul className="ranking-grid grid-5">
            <li className="ranking-grid-head">
              <p>#</p>
              <div>캐릭터</div>
              <p>레벨</p>
              <p>전투력</p>
              <p>길드</p>
            </li>
            {unionRanking.map((character) => (
              <li key={character.ranking}>
                <p>{character.ranking}</p>
                <div className="char-info">
                  <p className="img">
                    <img
                      src={
                        characterData[character.character_name]?.data
                          ?.character_image
                      }
                      alt={character.character_name}
                    />
                  </p>
                  <p>
                    <span>
                      <Link
                        to={`/character-detail/${
                          ocidData[character.character_name]
                        }`}
                      >
                        {character.character_name}
                      </Link>
                    </span>
                    <span className="level-word">
                      Lv.
                      {characterData[character.character_name]
                        ?.character_level ?? "-"}
                      | {character.world_name}
                    </span>
                  </p>
                </div>
                <p className="char-level">{character.union_level}</p>
                <p className="char-power">{character.union_power}</p>
                <p className="char-guild">
                  {characterData[character.character_name]?.guildName ?? "-"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>랭킹 데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default Union;
