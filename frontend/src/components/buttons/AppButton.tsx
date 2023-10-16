interface AppButtonProps {
  title: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}
const AppButton = ({ type, title, loading, className, onClick }: AppButtonProps) => {
  return (
    <button
      className={`bg-blue-800 w-full p-2 rounded-md text-white ${className}`}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default AppButton;
