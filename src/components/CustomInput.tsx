import React, { memo } from 'react';
import { useField } from 'formik';

interface Props {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: string;
}

const CustomInput = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    // input group
    <div className="flex flex-col mb-4">
      {/* labet */}
      <label htmlFor={props.id} className="select-none tracking-wider w-fit">
        {label}
      </label>
      {/* input */}
      <input
        {...props}
        {...field}
        className={`px-2 py-[6px] text-14 border outline-none rounded-sm flex-grow ${
          meta.error && meta.touched ? 'border-red-600' : 'border-secondary'
        }`}
      />

      {/* alert error */}
      {meta.error && meta.touched && (
        <div className="min-h-[24px] text-red-600 text-14">
          <span className="leading-6">{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export default memo(CustomInput);
