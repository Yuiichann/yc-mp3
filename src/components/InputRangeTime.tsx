import { memo } from 'react';

interface Props {
  handleSetCurrentTime: (time: number) => void;
}

const InputRangeTime = () => {
  return (
    <div className="absolute left-0 top-0 w-full h-[5px]">
      <input
        type="range"
        min={0}
        step={0.01}
        className="absolute left-0 top-0 w-full h-full outline-none border-none bg-cyan-300 appearance-none cursor-pointer"
      />
    </div>
  );
};

export default memo(InputRangeTime);
