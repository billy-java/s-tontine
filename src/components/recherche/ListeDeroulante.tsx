// Dropdown.tsx

interface ListeDeroulanteProps<T> {
  value: T;
  options: T[];
  onChange: (value: T) => void;
  placeholder: string;
  className?: string;
}

const ListeDeroulante = <T extends string | number>({
  value,
  options,
  onChange,
  placeholder,
  className,
}: ListeDeroulanteProps<T>) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={`p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 ${className}`}>
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
export default ListeDeroulante;
