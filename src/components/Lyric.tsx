import { useEffect, memo, useState } from 'react';
import ycMp3 from '../api/ycmp3Api';
import { AiOutlineLoading } from 'react-icons/ai';

interface Props {
  encodeId: string;
}

const Lyric = ({ encodeId }: Props) => {
  const [lyric, setLyric] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLyric = async () => {
      const res: any = await ycMp3.getLyric({ id: encodeId });

      if (res.msg === 'Success' && res.data.file) {
        const textFile = res.data.file;

        await fetch(textFile)
          .then((res) => res.text())
          .then((text) => {
            if (text.length < 0) return;

            // covert file text to array on every line
            const arr = text.toString().replace(/\r\n/g, '\n').split('\n');

            if (arr.length === 0) return;

            // remove timeline on each line
            const lyricConvert = arr.map((item) => item.split(']')[1].trim());

            setLyric(lyricConvert);
          });
      }
      setIsLoading(false);
    };

    fetchLyric();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[450px]">
          <div className="animate-spin text-3xl text-secondary">
            <AiOutlineLoading />
          </div>
        </div>
      ) : (
        <div className="flex space-y-2 flex-col px-2 mt-6 text-center lg:text-left lg:pl-12">
          {lyric.map((item, index) => (
            <p key={index}>{item}</p>
          ))}

          {lyric.length === 0 && <h1 className="text-center font-normal text-xl">Không có lời</h1>}
        </div>
      )}
    </>
  );
};

export default memo(Lyric);
