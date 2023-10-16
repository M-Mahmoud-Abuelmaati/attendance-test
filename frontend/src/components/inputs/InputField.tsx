interface InputFieldProps {
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  type?: "text" | "email" | "password";
  handleChange: (e: any) => void;
}
const InputField = ({
  name,
  placeholder,
  value,
  error,
  type,
  handleChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        className="border border-black p-1 rounded-md indent-2"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputField;
