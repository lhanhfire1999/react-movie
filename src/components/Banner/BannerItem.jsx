import apiConfig from '../../api/apiConfig';

const BannerItem = ({ movies }) => {
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    release_date,
    vote_average,
  } = movies;

  const originalImgUrl = apiConfig.originalImage(
    backdrop_path ? backdrop_path : poster_path
  );

  const w500ImgUrl = apiConfig.w500Image(
    poster_path ? poster_path : backdrop_path
  );

  return (
    <div
      className="banner__item"
      style={{ backgroundImage: `url(${originalImgUrl})` }}
    >
      <div className="container item-wraper">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="item-content">
              <h1 className="item-content__title">{title}</h1>
              <ul className="item-content__infos">
                <li>{vote_average}/10</li>
                <li>{release_date}</li>
              </ul>
              <p className="item-content__description">{overview}</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-0">
            <div className="item-poster">
              <img src={w500ImgUrl} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
