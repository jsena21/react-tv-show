import { useEffect, useState } from "react";
import "./global.css";
import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { Logo } from "./components/Logo/Logo";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { BACKDROP_BASE_URL } from "./config";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTvShow, setCurrentTvShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTvShow(populars[0]);
    }
  }

  async function fetchRecommendations(tvShowId) {
    const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
    if (recommendations.length > 0) {
      setRecommendationList(recommendations.slice(0, 10));
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTvShow) {
      fetchRecommendations(currentTvShow.id);
    }
  }, [currentTvShow]);

  async function searchTVShow(TVShowname) {
    const searchResponse = await TVShowAPI.fetchByTitle(TVShowname);
    if (searchResponse.length > 0) {
      setCurrentTvShow(searchResponse[0]);
    }
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTvShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTvShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="Watowatch"
              subtitle="Find a show you may like"
            />
          </div>
          <div className="col-sd-12 col-md-4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTvShow && <TVShowDetail tvShow={currentTvShow} />}
      </div>
      <div className={s.recommendations_shows}>
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTvShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
