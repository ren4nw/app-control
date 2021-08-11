import { useApp } from "../../contexts/AppContext";
import { DirectionType } from "../../types";

interface MouseButtonProps {
  direction: Exclude<DirectionType, 'up' | 'down'>;
}

const MouseButton: React.FC<MouseButtonProps> = ({ direction }) => {
  const { emit } = useApp();

  const borderRound = direction === 'left' ? 'rounded-tl-md' : 'rounded-tr-md';
  const border = direction === 'left' ? 'border-r-2' : '';

  const handlePress = () => {
    emit('click', { direction });
  };

  return (
    <button
      className={`
        flex-1 h-28 ${borderRound} ${border} bg-gray-800 hover:bg-gray-600
      `}
      onClick={handlePress}
    />
  );
};

export default MouseButton;
