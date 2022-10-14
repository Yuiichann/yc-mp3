import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddSong = () => {
  const [encode, setEncode] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [release, setRelease] = useState('');
  const [thumb, setThumb] = useState('');
  const [thumbM, setThumbM] = useState('');
  const [mp3, setMp3] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!encode || !title || !artist || !duration || !release || !thumb || !thumbM || !mp3) {
      toast.error('k nhap du');
      return;
    }

    if (isNaN(Number(duration)) || isNaN(Number(release))) {
      toast.error('duration and release nhap so');
      return;
    }

    await axios
      .post('https://api-ycmp3v2.vercel.app/api/album-yc/addSong', {
        encodeId: encode,
        title: title,
        artistsNames: artist,
        duration: duration,
        releaseDate: release,
        thumbnail: thumb,
        thumbnailM: thumbM,
        link_mp3: mp3,
      })
      .then((res) => {
        if (res.status === 200) {
          toast('upload thanh cong');
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full space-y-4">
        <input
          type="text"
          placeholder="EncodeId of zingmp3"
          className="p-2 border"
          value={encode}
          onChange={(e) => setEncode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          className="p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="ArtistName"
          className="p-2 border"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration"
          className="p-2 border"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="text"
          placeholder="ReleaseDate"
          className="p-2 border"
          value={release}
          onChange={(e) => setRelease(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thumnail"
          className="p-2 border"
          value={thumb}
          onChange={(e) => setThumb(e.target.value)}
        />
        <input
          type="text"
          placeholder="ThumnailM"
          className="p-2 border"
          value={thumbM}
          onChange={(e) => setThumbM(e.target.value)}
        />
        <input
          type="text"
          placeholder="LinkMp3"
          className="p-2 border"
          value={mp3}
          onChange={(e) => setMp3(e.target.value)}
        />

        <input type="submit" value="Submit" className="button" />
      </div>
    </form>
  );
};

export default AddSong;
