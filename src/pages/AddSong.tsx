import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ycMp3 from '../api/ycmp3Api';
import { SongApi } from '../types';

const AddSong = () => {
  const [encode, setEncode] = useState('');
  const [linkMp3, setLinkMp3] = useState('');
  const [error, setError] = useState<string>();
  const [isFetchData, setIsFetchData] = useState(false);

  const [songInfo, setSongInfo] = useState<SongApi>();

  const handleCheckEncodeID = async () => {
    setError('');
    if (!encode) {
      setError('Trường EncodeID buộc nhập !!!');
      return;
    }

    if (encode.length !== 8) {
      setError('Encode ID không hợp lệ. Encode ID bao gồm 8 ký tự !!!');
      return;
    }

    setIsFetchData(true);
    const data: any = await ycMp3.getInfoSong({ id: encode });
    setIsFetchData(false);

    if (data.msg === 'Success') {
      setSongInfo(data.data);
      setEncode('');
      setError(undefined);
    } else {
      setError('Không tìm thấy bài hát!!!');
      setSongInfo(undefined);
    }
  };

  const handleUpload = async () => {
    if (!linkMp3) {
      toast.error('Link MP3 Không hợp lệ!');
      return;
    }

    if (!songInfo) {
      toast.error('Looi!!');
      return;
    }

    const postData = {
      title: songInfo.title,
      artistsNames: songInfo.artistsNames,
      thumbnail: songInfo.thumbnail,
      thumbnailM: songInfo.thumbnailM,
      releaseDate: songInfo.releaseDate,
      duration: songInfo.duration,
      encodeId: songInfo.encodeId,
      link_mp3: linkMp3,
    };

    const uploadData = await axios.post(
      'https://api-ycmp3.vercel.app/api/album-yc/addSong',
      postData
    );

    if (uploadData.data.msg === 'Success') {
      toast.success('Upload thanh cong!!!');
    } else {
      toast.error('Có lỗi!!!');
    }
    setLinkMp3('');
    setSongInfo(undefined);
  };

  return (
    <section className="px-1 lg:px-2">
      {/* check Encode */}
      <div className="my-2">
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="encode">Nhập EncodeID của bài hát</label>
          <input
            type="text"
            id="encode"
            placeholder="Encode ID"
            className="w-full border border-secondary outline-none p-2"
            value={encode}
            onChange={(e) => setEncode(e.target.value)}
          />
        </div>

        <div className="w-full mt-2">
          <button
            className="w-full p-2 bg-secondary text-white hover:opacity-75"
            onClick={handleCheckEncodeID}
          >
            {isFetchData ? 'Đang kiểm tra . . .' : 'Kiểm tra'}
          </button>
        </div>

        {error && (
          <div className="w-full my-2 text-center text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Show Song Info */}
      {songInfo && (
        <div className="mt-4 flex flex-col space-y-3">
          <div>Tên bài hát: {songInfo.title}</div>
          <div>Ca sĩ trình bày: {songInfo.artistsNames}</div>
          <div>Ngày phát hành: {songInfo.releaseDate}</div>
          <div>Thời lượng: {songInfo.duration}</div>
          <div className="flex items-center space-x-4">
            <span>Thumbnail:</span>
            <img src={songInfo.thumbnail} width={100} height={100} loading="lazy" />
          </div>

          <div className="flex items-center space-x-4">
            <span>ThumbnailM:</span>
            <img src={songInfo.thumbnailM} width={100} height={100} loading="lazy" />
          </div>

          <div className="w-full flex flex-col space-y-2 mt-4">
            <label htmlFor="mp3">Nhập LINK MP3:</label>
            <input
              type="text"
              id="mp3"
              placeholder="Link Mp3"
              className="w-full border border-secondary outline-none p-2"
              value={linkMp3}
              onChange={(e) => setLinkMp3(e.target.value)}
            />
          </div>

          <div className="w-full mt-2">
            <button
              className="w-full p-2 bg-secondary text-white hover:opacity-75"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddSong;
