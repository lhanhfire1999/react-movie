import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { embedEpisode, embedMovie } from '../../api/embedMovie';
import { useBackdropPath } from '../../utils';
import styles from './Video.module.scss';

const Video = ({ id, backdropPath }) => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const tvInfos = useMemo(() => {
    return {
      season: searchParams.get('season') || 1,
      episode: searchParams.get('episode') || 1,
    };
  }, [searchParams]);

  const iframeSrc = useMemo(() => {
    if (category === 'tv') {
      return embedEpisode(id, tvInfos.season, tvInfos.episode);
    }
    if (category === 'movie') {
      return embedMovie(id);
    }
    return null;
  }, [category, id, tvInfos.episode, tvInfos.season]);

  return (
    <div
      className={styles.video}
      style={{ backgroundImage: `url(${useBackdropPath(backdropPath)})` }}
    >
      <div className={styles.video__wrapper}>
        <iframe title={id} src={iframeSrc} frameBorder="0" allowFullScreen />
      </div>
    </div>
  );
};

Video.propTypes = {
  id: PropTypes.number.isRequired,
  backdropPath: PropTypes.string.isRequired,
};

export default React.memo(Video);
