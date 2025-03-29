interface InputProps {
  placeholder: string;
  type: string;
  id: string;
  name: string;
  handleInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  value?: string;
}

export default function Input({
  placeholder,
  type,
  id,
  name,
  handleInputChange,
  value,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      onChange={handleInputChange}
      placeholder={placeholder}
      value={value}
      className="bg-text w-80 text-sm outline-none px-4 py-1 font-montserrat text-gray placeholder:text-gray-600 placeholder:font-bold placeholder:uppercase border-none rounded-lg"
    />
  );
}
