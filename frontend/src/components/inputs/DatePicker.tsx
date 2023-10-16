interface DatePickerProps {
  value?: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}
const DatePicker = ({
  value,
  placeholder,
  error,
  onChange,
}: DatePickerProps) => {
  return (
    <div className="w-full">
      <label>{placeholder}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder={placeholder}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default DatePicker;
