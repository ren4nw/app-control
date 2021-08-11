import { useApp } from "../../contexts/AppContext";
import { DirectionType } from "../../types";
import { getIcons } from "../../utils/component-utils";

interface ScrollButtonProps {
  direction: Exclude<DirectionType, 'left' | 'right'>;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction }) => {
  const { emit } = useApp();

  const rounded = direction === 'down' ? 'rounded-b-md' : 'rounded-t-md';

  const handlePress = () => {
    emit('scroll', { direction });
  };

  return (
    <button className={`flex bg-gray-800 hover:bg-gray-600 text-white p-8 ${rounded}`} onClick={handlePress}>
      {getIcons(direction)}
    </button>
  );
};

export default ScrollButton;
