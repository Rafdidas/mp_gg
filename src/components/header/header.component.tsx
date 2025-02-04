import { FC } from "react";
import "./header.style.scss";

const Header: FC = () => {
  return (
    <header id="header">
      <section>
        <div>
          <h1>MP.GG</h1>
          <p>메이플스토리</p>
        </div>
        <div>
          <form className="search-form">
            <input className="search-input" placeholder="캐릭터 또는 길드" />
            <button className="search-btn" type="submit">
              버튼
            </button>
          </form>
        </div>
      </section>
      <section>
        <nav>
          <ul className="sc-5943a344-2 SxyoH">
            <li>
              <a href="/info/link">가이드</a>
            </li>
            <li>
              <a href="/tools/analysis">유용한 도구</a>
            </li>
            <li>
              <a href="/jobs">직업 분석</a>
            </li>
            <li>
              <a href="/history/cube">큐브/스타포스</a>
            </li>
            <li>
              <a href="/trends/popular">트렌드</a>
            </li>
            <li>
              <a href="/ranks/power">순위표</a>
            </li>
            <li>
              <a href="/favorite">즐겨찾기</a>
            </li>
            <li>
              <a href="/board/news/list">새소식</a>
            </li>
            <li>
              <a href="https://dak.gg/cards?view=grid&amp;game=maplestory&amp;type=all&amp;from=maplestory">
                닥지지 카드
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section>
        <h2>maple.GG</h2>
        <div>
          <form className="search-form">
            <input className="search-input" placeholder="캐릭터 또는 길드" />
            <button className="search-btn" type="submit">
              버튼
            </button>
          </form>
        </div>
        <div>랭킹</div>
        <div>전투력 랭킹</div>
      </section>
    </header>
  );
};

export default Header;
