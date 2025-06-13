
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  color?: string;
}

export default function Button({ onClick, children, color = "#ffedd5" }: ButtonProps) {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      style={{ backgroundColor: color}}
    >
      {children}
    </button>
  );
}
