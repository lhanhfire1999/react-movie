import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';
import { embedEpisode, embedMovie } from '../../api/embedMovie';
import { useBackdropPath } from '../../utils';
import styles from './VideoIframe.module.scss';

const VideoIframe = ({ category, id, backdropPath }) => {
  const [searchParams] = useSearchParams();

  const tvInfo = useMemo(() => {
    return {
      season: searchParams.get('ss') ? +searchParams.get('ss') : 1,
      episode: searchParams.get('ep') ? +searchParams.get('ep') : 1,
    };
  }, [searchParams]);

  const iframeSrc = useMemo(() => {
    if (category === 'movie') {
      return embedMovie(id);
    }
    if (category === 'tv') {
      return embedEpisode(id, tvInfo.season, tvInfo.episode);
    }
    return null;
  }, [category, id, tvInfo.episode, tvInfo.season]);

  return (
    <div
      className={styles.videoIframe}
      style={{ backgroundImage: `url(${useBackdropPath(backdropPath)})` }}
    >
      <div className={styles.videoIframe__wrapper}>
        <iframe title={id} src={iframeSrc} frameBorder="0" allowFullScreen />
      </div>
    </div>
  );
};

VideoIframe.propTypes = {
  id: PropTypes.number.isRequired,
  backdropPath: PropTypes.string.isRequired,
};

export default React.memo(VideoIframe);
