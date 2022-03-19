import React from 'react';
import PropTypes from 'prop-types';
import { getTrailerThumbUrl, getTrailerUrl } from '../../utils';
import { $ } from '../../constants';

const TrailerList = ({ videos }) => {
  const handlePlayModal = (id, key) => {
    $(`#trailer-modal-${id} iframe`).setAttribute('src', getTrailerUrl(key));
    $(`#trailer-modal-${id}`).classList.add('active');
  };

  return (
    <ul className="trailer-list">
      {videos.map((video) => (
        <li
          key={video?.id}
          className="trailer-card"
          onClick={() => handlePlayModal(video?.id, video?.key)}
        >
          <div
            className="trailer-card__img"
            style={{
              backgroundImage: `url(${
                getTrailerThumbUrl(video?.key).standard
              })  `,
            }}
          >
            <span className="play-btn">
              <i className="bx bx-play-circle bx-lg"></i>
            </span>
          </div>
          <h3 className="trailer-card__title">{video?.name}</h3>
        </li>
      ))}

      <div className="btns">
        <div className="btn-next">
          <i className="bx bx-chevron-right bx-md"></i>
        </div>
        <div className="btn-back">
          <i className="bx bx-chevron-left bx-md"></i>
        </div>
      </div>
    </ul>
  );
};

TrailerList.propTypes = {
  videos: PropTypes.array,
};

export default TrailerList;
