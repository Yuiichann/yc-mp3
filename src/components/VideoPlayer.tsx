import { memo } from 'react';

interface Props {
  linkVideo: string;
}

const VideoPlayer = ({ linkVideo }: Props) => {
  return (
    <video src={linkVideo} autoPlay={true} controls className="mx-auto lg:max-w-[80%]"></video>
  );
};

export default memo(VideoPlayer);
