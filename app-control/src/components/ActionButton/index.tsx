interface ActionButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, className = '', onClick = null }) => {
  return (
    <button className={`flex bg-gray-800 text-white p-2 rounded-md ${className}`} onClick={() => onClick?.()}>
      {label}
    </button>
  );
};

export default ActionButton;
