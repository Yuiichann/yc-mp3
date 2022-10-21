import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../config/store';
import { setStatusAudio } from '../reducer/audioStatus';

interface Props {
  linkVideo: string;
}

const VideoPlayer = ({ linkVideo }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setStatusAudio('pause'));

    return () => {
      dispatch(setStatusAudio('playing'));
    };
  }, []);

  return (
    <video src={linkVideo} autoPlay={true} controls className="mx-auto lg:max-w-[80%]"></video>
  );
};

export default memo(VideoPlayer);
