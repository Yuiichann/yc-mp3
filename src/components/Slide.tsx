import { memo } from 'react';
import { Link } from 'react-router-dom';
import { A11y, Navigation, Scrollbar, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BannerApi } from '../types';
import getUrlByType from '../utils/getUrlByType';

interface Props {
  data: BannerApi[];
}

const Slide = ({ data }: Props) => {
  return (
    <>
      {/* Slider on Desktop */}
      <div className="hidden lg:block">
        <Swiper
          modules={[Navigation, Scrollbar, A11y, Autoplay]}
          autoplay={{
            delay: 4000,
          }}
          spaceBetween={20}
          slidesPerView={2}
          navigation
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/${getUrlByType(item.type)}?id=${item.encodeId}`}>
                <img src={item.banner} alt={item.title} className="rounded-xl" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Slider on Mobile */}
      <div className="block lg:hidden">
        <Swiper
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          autoplay={{
            delay: 4000,
          }}
          effect="fade"
          spaceBetween={10}
          slidesPerView={1}
          navigation
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/${getUrlByType(item.type)}?id=${item.encodeId}`}>
                <img src={item.banner} alt={item.title} className="rounded-xl mx-auto" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default memo(Slide);
