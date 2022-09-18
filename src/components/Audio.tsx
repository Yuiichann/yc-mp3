import React, { useEffect, useRef } from 'react';

interface Props {
  linkMp3: string;
}

const Audio = ({ linkMp3 }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);
  return (
    <>
      {linkMp3 === '' ? (
        'Không có nhac'
      ) : (
        <audio controls ref={audioRef}>
          <source src={linkMp3} />
        </audio>
      )}
    </>
  );
};

export default Audio;
