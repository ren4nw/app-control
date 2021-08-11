import { useState } from "react";
import SimpleKeyboard from 'react-simple-keyboard';
import { useApp } from "../../contexts/AppContext";
import { mapKey } from "../../utils";
import { getIcons } from "../../utils/component-utils";

interface KeyboardProps {
  show?: boolean;
  onClose?: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ show = false, onClose = null }) => {
  const [text, setText] = useState('');

  const { emit } = useApp();

  const handlePress = (key: string) => {
    const pressedKey = mapKey(key);

    console.log('key', pressedKey);

    if (pressedKey === 'enter') {
      setText('');
    }

    emit('type', { key: pressedKey });
  };

  return show ? (
    <div className="flex flex-col absolute bg-black h-screen w-screen lg:w-1/2 bg-opacity-50">
      <div className="flex flex-1 justify-end p-4">
        <button className="flex w-12 h-12 bg-white justify-center items-center rounded-md" onClick={() => onClose?.()}>
          {getIcons('close')}
        </button>
      </div>
      <div className="flex flex-col bg-white">
        <input type="text" value={text} disabled className="h-8 border-b border-gray-300" />
        <div className="flex-1">
          <SimpleKeyboard
            mergeDisplay
            display={{ '{lock}': 'ESC' }}
            onChange={(input: string) => setText(input)}
            onKeyPress={handlePress}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Keyboard;

