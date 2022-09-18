import { Link } from 'react-router-dom';
import { A11y, Navigation, Scrollbar } from 'swiper';
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
    <Swiper modules={[Navigation, Scrollbar, A11y]} spaceBetween={20} slidesPerView={2} navigation>
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Link to={`/${getUrlByType(item.type)}?id=${item.encodeId}`}>
            <img src={item.banner} alt={item.title} className="rounded-xl" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
