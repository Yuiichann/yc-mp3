import { memo } from 'react';
import { Link } from 'react-router-dom';
import { A11y, Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AlbumApi, BannerApi } from '../types';
import getUrlByType from '../utils/getUrlByType';

interface Props {
  data: BannerApi[];
  isRanking?: boolean;
}

// Slider using banner api in getHome zingmp3
const Slide = ({ data, isRanking }: Props) => {
  // chose type
  const handleChooseType = (numType?: number, textType?: string) => {
    let type: string = '';

    if (typeof numType !== 'undefined') {
      type = getUrlByType(numType);
    }

    if (typeof textType !== 'undefined') {
      type = textType.toLowerCase();
    }

    return type;
  };

  return (
    <>
      {/* Slider on Desktop */}
      <div className={`hidden md:block ${isRanking ? 'px-5' : ''}`}>
        <Swiper
          modules={[Navigation, Scrollbar, A11y, Autoplay]}
          grabCursor={true}
          autoplay={{
            delay: 4000,
          }}
          spaceBetween={isRanking ? 10 : 20}
          slidesPerView={isRanking ? 5 : 2}
          navigation
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/${handleChooseType(item.type, item.textType)}?id=${item.encodeId}`}>
                <img src={item.banner || item.thumbnailM} alt={item.title} className="rounded-xl" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Slider on Mobile */}
      <div className="block md:hidden">
        <Swiper
          modules={
            isRanking
              ? [Scrollbar, A11y, Autoplay]
              : [Scrollbar, A11y, EffectFade, Autoplay, Pagination]
          }
          autoplay={{
            delay: 4000,
          }}
          pagination={{ clickable: true }}
          effect={!isRanking ? 'fade' : undefined}
          spaceBetween={5}
          slidesPerView={isRanking ? 3 : 1}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/${handleChooseType(item.type, item.textType)}?id=${item.encodeId}`}>
                <img
                  src={item.banner || item.thumbnailM}
                  alt={item.title}
                  className="rounded-md w-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default memo(Slide);

interface SliderProps {
  data: AlbumApi[];
  slidePerView?: number;
}
// slider for small slider
export const Slider = ({ data, slidePerView }: SliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y, Autoplay]}
      grabCursor={true}
      autoplay={{
        delay: 4000,
      }}
      spaceBetween={10}
      slidesPerView={slidePerView}
      navigation
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Link to={`/${item.textType.toLowerCase()}?id=${item.encodeId}`}>
            <img src={item.thumbnailM} alt={item.title} className="rounded-xl" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
