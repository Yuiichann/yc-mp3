import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
}

const ImageLazyLoad = (props: Props) => {
  return <LazyLoadImage {...props} effect="blur" />;
};

export default memo(ImageLazyLoad);
