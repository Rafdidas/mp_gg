import { Link } from "react-router-dom";
import {
  formatDateToKorean,
  getTodayDate,
} from "../../utils/getTodayDate.utils";
import "./total.scss";
import useRanking from "../../hook/useRanking";
import { DojangRanking } from "../../types/ranking.types";

const todayDate = getTodayDate();

const Dojang = () => {
  const { rankingData, ocidData, characterData } = useRanking("dojang", 10);

  const dojangRanking = rankingData as DojangRanking[];

  return (
    <div className="wrap-inner">
      <div className="list-box">
        <h2 className="list-tit">
          <strong>{formatDateToKorean(todayDate)}</strong> 랭킹
        </h2>
        {dojangRanking ? (
          <ul className="ranking-grid">
            <li className="ranking-grid-head">
              <p>#</p>
              <div>캐릭터</div>
              <p>기록</p>
              <p>길드</p>
            </li>
            {dojangRanking.map((character) => (
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
                      Lv.{character.character_level} | {character.world_name}
                    </span>
                  </p>
                </div>
                <p className="char-popular">
                  {character.dojang_floor}층(
                  {character.dojang_time_record})
                </p>
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

export default Dojang;
