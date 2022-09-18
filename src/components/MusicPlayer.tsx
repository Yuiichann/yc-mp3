import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ycMp3 from '../api/ycmp3Api';
import { AppDispatch, RootState } from '../config/store';
import { setSongPlayingInQueue } from '../reducer/songPlaying';
import Audio from './Audio';

const MusicPlayer = () => {
  const [linkSong, setLinkSong] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { currentPlaying, listWatting, error } = useSelector(
    (state: RootState) => state.songPlaying
  );

  // auto play first song at queue
  useEffect(() => {
    // playing first song in list Waitting
    if (listWatting.length > 0) {
      dispatch(setSongPlayingInQueue(0));
    }
  }, [listWatting]);

  // when curr song change => call api get link mp3
  useEffect(() => {
    setIsLoading(true);
    
    if (currentPlaying) {
      const getLinkMp3 = async () => {
        const res: any = await ycMp3.getSong({ id: currentPlaying });

        console.log(res);

        if (res.err !== 0) {
          console.log('ERROR');
          setIsLoading(false);
          setLinkSong('');
          return;
        }

        setLinkSong(res.data['128']);
        setIsLoading(false);
      };

      getLinkMp3();
    }
  }, [currentPlaying]);

  return (
    <div className="fixed bottom-0 left-0 w-screen bg-tertiary bg-main text-white">
      <div className="h-player px-4 py-2">
        <div>
          {currentPlaying ? (
            <>{isLoading ? 'Loading....' : <Audio linkMp3={linkSong} />}</>
          ) : (
            <>
              <h1>Hàng đợi rỗng</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
