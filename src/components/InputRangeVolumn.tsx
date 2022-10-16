import { memo } from 'react';

interface Props {
  isChildOfComponent: 'audio' | 'private';
  volumnValue: number;
  handleChangeVolumn: (volumnString: string) => void;
}

const InputRangeVolumn = ({ handleChangeVolumn, isChildOfComponent, volumnValue }: Props) => {
  return (
    <input
      type="range"
      min={0}
      max={1}
      step={0.05}
      value={volumnValue}
      className={`${isChildOfComponent === 'audio' ? 'w-11/12 slider' : 'w-[150px]'}`}
      onChange={(e) => handleChangeVolumn(e.target.value)}
    />
  );
};

export default memo(InputRangeVolumn);
