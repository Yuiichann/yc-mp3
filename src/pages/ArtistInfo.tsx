import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import ListSong from '../components/ListSong';
import Loading from '../components/Loading';
import { AppDispatch, RootState } from '../config/store';
import { addTempArtist } from '../reducer/tempGlobalState';
import { ArtistDetail, SongApi } from '../types';
import NotFound from './NotFound';

const ArtistInfo = () => {
  const [artistInfo, setArtistInfo] = useState<ArtistDetail>();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { temp_artists } = useSelector((state: RootState) => state.tempGlobalState);

  // get name alias of artist
  let [searchParams] = useSearchParams();
  const artistAlias = searchParams.get('name');

  // check artist in temp state
  const tempArtistSaved = temp_artists.find((artist) => artist.alias === artistAlias);

  useEffect(() => {
    if (artistAlias) {
      setIsLoading(true);

      // if artist temp not found, fetch data
      if (!tempArtistSaved) {
        const fetchData = async () => {
          const res: any = await ycMp3.getArtist({ name: artistAlias });

          if (res.msg === 'Success') {
            dispatch(addTempArtist(res.data));
            setArtistInfo(res.data);
          }

          setIsLoading(false);
        };

        fetchData();
      } else {
        setArtistInfo(tempArtistSaved);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    }
  }, [artistAlias]);

  // console.log(artistInfo);

  if (!artistAlias) {
    return <NotFound />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {artistInfo && (
        <section className="px-1 lg:px-2">
          {/* info include image, name, realname, birthday, sortbio */}
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div className="w-full lg:w-8/12 text-center lg:text-left lg:text-16 text-14 p-2">
              <h1 className="text-20 font-semibold tracking-normal mb-3">{artistInfo.name}</h1>
              <p className="italic mt-1 tracking-normal">Tên thật: {artistInfo.realname}</p>
              <p className="italic mt-1 tracking-normal">Sinh nhật: {artistInfo.birthday}</p>

              <p className="text-justify mt-4 max-w-[400px] mx-auto lg:max-w-none leading-6">
                {artistInfo.sortBiography}
              </p>
            </div>
            <div className="w-full lg:w-4/12 p-2 select-none">
              <img
                src={artistInfo.thumbnailM || artistInfo.thumbnail}
                alt={artistInfo.alias}
                loading="lazy"
                width={250}
                height={250}
                className="rounded-full max-w-[250px] mx-auto"
              />
            </div>
          </div>

          {/* main bio a.k.a Tiểu sử */}
          <div className="my-4">
            <h1 className="title text-center">Tiểu sử</h1>
            <div className="flex flex-col space-y-2 text-16 leading-6 text-justify">
              {artistInfo.biography.split('<br>').map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div></div>
        </section>
      )}
    </>
  );
};

export default ArtistInfo;
