import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  percentage: number;
  currentTime: number;
  duration: number;
  handleChangeCurrentTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile?: boolean;
}

const AudioTimeProcess = ({
  percentage = 0,
  handleChangeCurrentTime,
  currentTime = 0,
  duration = 0,
  isMobile,
}: Props) => {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef<HTMLInputElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rangeRef.current || !thumbRef.current) return;

    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage;

    setPosition(isNaN(percentage) ? 0 : percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  const convertTime = useCallback(
    (time: number) => {
      const mm = Number((time / 60).toFixed(0));
      const ss = Number((time % 60).toFixed(0));

      return `${mm === 0 ? '00' : `0${mm}`}:${ss < 10 ? `0${ss}` : ss}`;
    },
    [currentTime, duration]
  );

  if (!isMobile) {
    return (
      <>
        {/* time current */}
        <div className="w-[40px] flex items-center justify-center text-12 tracking-wide">
          <span>{convertTime(currentTime)}</span>
        </div>
        <div className="flex-grow min-w-0 h-2 bg-gray-800 relative rounded-lg cursor-pointer group">
          {/*  */}
          <div
            className="h-full absolute left-0 top-0 bg-white z-10 rounded-lg group-hover:opacity-90"
            style={{
              width: `${progressBarWidth}px`,
            }}
          ></div>
          {/* thumb */}
          <div
            className="w-3 h-3 top-1/2 -translate-y-1/2 rounded-lg bg-white border absolute z-20 opacity-0 group-hover:opacity-100"
            ref={thumbRef}
            style={{
              left: `${position}%`,
              marginLeft: `${marginLeft}px`,
            }}
          ></div>

          {/* input */}
          <input
            type="range"
            className="w-full appearance-none absolute bg-[transparent] z-30 cursor-pointer outline-none"
            value={position}
            step={0.1}
            ref={rangeRef}
            onChange={handleChangeCurrentTime}
            id="time-range"
          />
        </div>
        {/* Total time */}
        <div className="w-[40px] flex items-center justify-center text-12 tracking-wide">
          <span>{convertTime(duration)}</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex-grow min-w-0 h-2 bg-gray-300 relative cursor-pointer group">
          {/*  */}
          <div
            className="h-full absolute left-0 top-0 bg-violet-500 z-10 group-hover:opacity-90"
            style={{
              width: `${progressBarWidth}px`,
            }}
          ></div>
          {/* thumb */}
          <div
            className="w-fit h-fit top-1/2 -translate-y-1/2 bg-white border absolute z-20 opacity-0 group-hover:opacity-100 text-[12px] font-medium text-primary p-1 rounded-md"
            ref={thumbRef}
            style={{
              left: `${position}%`,
              marginLeft: `${marginLeft}px`,
            }}
          >
            <span>{convertTime(currentTime)}</span>
          </div>

          {/* input */}
          <input
            type="range"
            className="w-full appearance-none absolute bg-[transparent] z-30 cursor-pointer outline-none"
            value={position}
            step={0.1}
            ref={rangeRef}
            onChange={handleChangeCurrentTime}
            id="time-range"
          />
        </div>
      </>
    );
  }
};

export default memo(AudioTimeProcess);
