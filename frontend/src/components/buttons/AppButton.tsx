interface AppButtonProps {
  title: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
const AppButton = ({ type, title, loading, onClick }: AppButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={loading}>
      {title}
    </button>
  );
};

export default AppButton;
