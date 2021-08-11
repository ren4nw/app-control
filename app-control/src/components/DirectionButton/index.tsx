import { useRef } from "react";
import { useApp } from "../../contexts/AppContext";
import { DirectionType } from "../../types";
import { getIcons, getRounded } from "../../utils/component-utils";

interface DirectionButtonProps {
  direction: DirectionType;
}

type IntervalType = ReturnType<typeof setInterval>;

const DirectionButton: React.FC<DirectionButtonProps> = ({ direction }) => {
  const { emit } = useApp();

  const timer = useRef<IntervalType | null>(null);

  const rounded = getRounded(direction);

  const move = (speed: 'fast' | 'slow') => () => {
    emit('move', { direction, speed });
  };

  const handlePressIn = () => {
    timer.current = setInterval(move('fast'), 100);
  };

  const handlePressOut = () => {
    clearInterval(timer.current as unknown as IntervalType);
  };

  return (
    <button
      className={`bg-gray-800 hover:bg-gray-600 text-white p-8 ${rounded}`}
      onClick={move('slow')}
      onMouseDown={handlePressIn}
      onMouseUp={handlePressOut}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
    >
      {getIcons(direction)}
    </button>
  );
};

export default DirectionButton;

