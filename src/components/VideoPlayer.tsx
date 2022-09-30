import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../config/store';
import { setStatusAudio } from '../reducer/audioStatus';

interface Props {
  linkVideo: string;
}

const VideoPlayer = ({ linkVideo }: Props) => {
  return (
    <video src={linkVideo} autoPlay={true} controls className="mx-auto lg:max-w-[80%]"></video>
  );
};

export default memo(VideoPlayer);
