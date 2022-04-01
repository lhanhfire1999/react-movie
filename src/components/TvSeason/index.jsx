import React, { useMemo } from 'react';
import Button from '../Button';

const TvSeason = ({ seasons }) => {
  const seasonInfos = useMemo(() => {
    return seasons.filter((season) => season?.season_number > 0);
  }, [seasons]);

  return (
    <>
      <div className="tv-season section">
        <Button
          onClick={() => null}
          color="sliver"
          sizeS
          icon="bx-chevron-down"
          reverse
        >
          {seasonInfos[0].name}
        </Button>
        <ul>
          {seasonInfos.map((info) => (
            <li key={info?.id}>
              {info?.name} - {info?.air_date?.slice(0, 4)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

TvSeason.propTypes = {};

export default TvSeason;
