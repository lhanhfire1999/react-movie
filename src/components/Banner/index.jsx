import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import tmdbApi, { movieType } from '../../api/tmdpApi';
import BannerItem from './BannerItem';
import './Banner.scss';

const Banner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, {
          params,
        });
        setMovies(response.results.slice(0, 3));
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className="banner">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        grabCursor={true}
        loop={true}
        navigation={true}
        // autoplay={{ delay: 5000 }}
        modules={[Autoplay, Navigation]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <BannerItem key={movie.id} movies={movie} active={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
