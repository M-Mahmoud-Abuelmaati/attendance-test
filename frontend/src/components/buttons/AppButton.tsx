interface AppButtonProps {
  title: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
const AppButton = ({ type, title, loading, onClick }: AppButtonProps) => {
  return (
    <button
      className="bg-blue-800 w-full p-2 rounded-md text-white"
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default AppButton;
