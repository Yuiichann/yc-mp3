import { memo } from 'react';
import { Link } from 'react-router-dom';
import { A11y, Autoplay, EffectCards, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AlbumApi, Artist, BannerApi } from '../types';
import getUrlByType from '../utils/getUrlByType';
import ImageLazyLoad from './ImageLazyLoad';

interface Props {
  data: BannerApi[];
  onMobile?: boolean;
}

// handle choose type of banner
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

// Slider Banner Home
export const SliderBanner = memo(({ data, onMobile }: Props) => {
  return (
    <Swiper
      modules={onMobile ? [EffectFade, Autoplay, Pagination] : [EffectCards, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      effect={onMobile ? 'fade' : 'cards'}
      cardsEffect={
        !onMobile
          ? {
              slideShadows: false,
              perSlideOffset: onMobile ? 1 : 8,
            }
          : {}
      }
      pagination={
        onMobile && {
          clickable: true,
          dynamicBullets: true,
        }
      }
      grabCursor={true}
    >
      {data.map((item, index) => (
        <SwiperSlide key={`${item.encodeId}-${index}`}>
          <Link
            to={`/${handleChooseType(item.type, item.textType)}?id=${item.encodeId}`}
            className="pb-8 flex items-center justify-center select-none"
          >
            <ImageLazyLoad
              src={item.thumbnailM || item.banner || ''}
              alt={item.title}
              className="rounded-md"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

interface SliderProps {
  data: AlbumApi[];
  slidePerView?: number;
  space?: number;
  navigate?: boolean;
}
// slider for small slider
export const Slider = ({ data, slidePerView, space, navigate }: SliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y, Autoplay]}
      grabCursor={true}
      autoplay={{
        delay: 4000,
      }}
      spaceBetween={space || 10}
      slidesPerView={slidePerView}
      navigation={navigate}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Link
            to={`/${item.textType ? item.textType.toLowerCase() : 'bai-hat'}?id=${item.encodeId}`}
          >
            <ImageLazyLoad src={item.thumbnailM} alt={item.title} className="rounded-xl" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

interface SliderSpotlightProps {
  data: Artist[];
  slidePerView?: number;
  space?: number;
  navigate?: boolean;
}

// slider Artist
export const SliderSpotlight = ({ data, navigate, slidePerView, space }: SliderSpotlightProps) => {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y, Autoplay]}
      grabCursor={true}
      autoplay={{
        delay: 4000,
      }}
      spaceBetween={space || 10}
      slidesPerView={slidePerView}
      navigation={navigate}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Link
            to={`/ca-si?name=${item.alias}`}
            className="flex flex-col items-center space-y-2 truncate"
          >
            <ImageLazyLoad src={item.thumbnail} alt={item.alias} className="rounded-xl" />
            <h2 className="text-14 font-medium">{item.name}</h2>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
