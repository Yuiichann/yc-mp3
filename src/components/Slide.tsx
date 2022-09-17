import React from 'react';
import { BannerApi } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

interface Props {
  data: BannerApi[];
}

const handleCreatteURL = (type: number) => {
  let url = '';
  switch (type) {
    case 1: {
      url = 'bai-hat';
      break;
    }

    case 4: {
      url = 'playlist';
      break;
    }

    case 8: {
      url = 'audio';
      break;
    }

    default: {
      url = 'undefine';
      break;
    }
  }

  return url;
};

const Slide = ({ data }: Props) => {
  return (
    <Swiper spaceBetween={20} slidesPerView={2}>
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Link to={`/${handleCreatteURL(item.type)}?id=${item.encodeId}`}>
            <img src={item.banner} alt={item.title} className="rounded-xl" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
