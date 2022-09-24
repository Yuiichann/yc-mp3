import React, { memo, useEffect, useState } from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../config/store';
import { fetchDataMp3, setInfoSongPlaying } from '../reducer/songPlayingSlice';
import { AlbumApi, SongApi, SongPlaying } from '../types';
import convertDate from '../utils/convertDate';
import { SkeletonNewRelease } from './Skeleton';

interface Props {
  data: SongApi[] | AlbumApi[];
  type: 'song' | 'album';
}

// use page search && home
const NewReleaseTab = ({ data, type }: Props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  //fake loading after 400 milisecond will render
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [type]);

  // handle play 1 song when click play this, after click, they will dispatch 2 actions: 1 actions set info song, the other will fetch link mp3
  const handlePlayCurrentMusic = (
    e: React.MouseEvent<HTMLDivElement>,
    encodeId: string,
    detailSong: SongPlaying['currentDetails']
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // with type === album
    if (type === 'album') {
      console.warn('Chưa hỗ trợ phát Album');
      return;
    }

    // with type === song
    if (type === 'song') {
      // dispatch actions
      dispatch(setInfoSongPlaying(detailSong));
      dispatch(fetchDataMp3(encodeId));
    }
  };

  return loading ? (
    <>
      {/* fake loading */}
      <SkeletonNewRelease />
    </>
  ) : (
    <>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-1">
        {data.map((item, index) => (
          <div className="p-1" key={item.encodeId}>
            <Link
              to={`/${type === 'song' ? 'bai-hat' : 'album'}?id=${item.encodeId}`}
              className="relative"
            >
              <img
                src={item.thumbnailM}
                alt=""
                loading="lazy"
                className="rounded-md mx-auto w-full"
              />
              <div className="absolute top-0 left-0 rounded-md bg-overlay w-full h-full">
                <div
                  className="absolute right-1 bottom-1 text-3xl lg:text-4xl text-white cursor-pointer p-1 hover:scale-125 effect"
                  onClick={(e) =>
                    handlePlayCurrentMusic(e, item.encodeId, {
                      title: item.title,
                      artistsNames: item.artistsNames,
                      thumbnail: item.thumbnail,
                      encodeId: item.encodeId,
                    })
                  }
                >
                  <MdPlayCircleFilled />
                </div>
              </div>
            </Link>
            <div className="mt-1 text-center lg:text-left">
              <div className="w-full min-w-0 truncate my-1">
                <Link to={`/${type === 'song' ? 'bai-hat' : 'album'}?id=${item.encodeId}`}>
                  <h2 className="font-medium text-16 md:text-18 cursor-pointer hover:opacity-60">
                    {item.title}
                  </h2>
                </Link>
              </div>
              <p className="cursor-default">{convertDate(item.releaseDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(NewReleaseTab);
