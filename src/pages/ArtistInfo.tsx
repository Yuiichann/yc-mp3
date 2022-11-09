import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import ListGrid from '../components/ListGrid';
import ListMv from '../components/ListMv';
import ListSong from '../components/ListSong';
import Loading from '../components/Loading';
import { SliderSpotlight } from '../components/Slide';
import { AppDispatch, RootState } from '../config/store';
import { addTempArtist } from '../reducer/tempGlobalState';
import { ArtistDetail } from '../types';
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

  // call api get data
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

  // return not found
  if (!artistAlias) {
    return <NotFound />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {artistInfo ? (
        <section className="px-1 lg:px-2">
          {/* info include image, name, realname, birthday, sortbio */}
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div className="w-full lg:w-8/12 text-center lg:text-left lg:text-16 text-14 p-2">
              <h1 className="text-20 font-semibold tracking-normal mb-3">{artistInfo.name}</h1>
              {artistInfo.realname && (
                <p className="italic mt-1 tracking-normal">Tên thật: {artistInfo.realname}</p>
              )}
              {artistInfo.birthday && (
                <p className="italic mt-1 tracking-normal">Sinh nhật: {artistInfo.birthday}</p>
              )}

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
          {artistInfo.biography && (
            <div className="my-4">
              <h1 className="title text-center">Tiểu sử</h1>
              <div className="flex flex-col space-y-4 text-16 leading-6 text-justify max-w-[90%] lg:max-w-none mx-auto">
                {artistInfo.biography.split('<br>').map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          )}

          {/* List music */}

          {artistInfo.sections && (
            <>
              <div className="mt-12">
                <h1 className="title text-center">Tổng hơp các bài hát</h1>
                <div className="h-[400px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-primary">
                  <ListSong
                    type=""
                    dataSong={{ total: 0, totalDuration: 0, items: artistInfo.sections[0].items }}
                    enbleIndex={false}
                  />
                </div>
              </div>

              {artistInfo.sections.map(
                (sec, index) =>
                  index > 0 && (
                    <div className="mt-12">
                      <h1 className="title">{sec.title}</h1>
                      {sec.sectionType === 'playlist' && (
                        <ListGrid type="playlist" data={sec.items} />
                      )}
                      {sec.sectionType === 'artist' && (
                        <SliderSpotlight data={sec.items} space={5} slidePerView={4} />
                      )}
                      {sec.sectionType === 'video' && <ListMv data={sec.items} />}
                    </div>
                  )
              )}
            </>
          )}
        </section>
      ) : (
        <div>
          <h1 className="text-center title">Không có dữ liệu</h1>
        </div>
      )}
    </>
  );
};

export default ArtistInfo;
