// DatePicker.tsx
import React from 'react';

interface DatePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};

export default DatePicker;
