import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import VideoPlayer from '../components/VideoPlayer';
import { VideoItems } from '../types';
import selectVideo from '../utils/selectVideo';
import NotFound from './NotFound';

const Video = () => {
  const [videoData, setVideoData] = useState<VideoItems>();
  const [isLoading, setIsLoading] = useState(true);

  // get Id video
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get('id');

  useEffect(() => {
    if (!videoId) return;

    setIsLoading(true);
    const fetchData = async () => {
      const res: any = await ycMp3.getVideo({ id: videoId });

      // check data fetch success
      if (res.msg === 'Success') {
        setVideoData(res.data as VideoItems);
      } else {
        console.error(res);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [videoId]);

  // if not videoId ==> page not found
  if (!videoId) {
    return <NotFound />;
  }

  return isLoading ? (
    <Loading />
  ) : videoData ? (
    // show data here
    <div>
      {videoData.streaming.mp4 && <VideoPlayer linkVideo={selectVideo(videoData.streaming.mp4)} />}
    </div>
  ) : (
    <div>
      <h1 className="text-center text-xl mt-3">Không có dữ liệu!!!</h1>
    </div>
  );
};

export default Video;
