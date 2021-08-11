import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import ActionButton from "./components/ActionButton";
import ConnectionStatus from "./components/ConnectionStatus";
import DirectionButton from "./components/DirectionButton";
import Keyboard from "./components/Keyboard";
import MouseButton from "./components/MouseButton";
import ScrollButton from "./components/ScrollButton";
import { Provider } from './contexts/AppContext';

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);

  return (
    <Provider>
      <div className="App bg-black flex h-screen w-screen justify-center items-center">
        <div className="flex flex-col h-screen bg-white w-screen lg:w-1/2 rounded-xl">
          <ToastContainer />
          <Keyboard show={showKeyboard} onClose={() => setShowKeyboard(false)} />
          <div className="flex flex-col">
            <div className="flex justify-center bg-gray-800 text-white p-4">
              PyControle
            </div>
            <div className="flex flex-col">
              <ConnectionStatus />
              <div className="flex mt-2 px-4">
                <ActionButton label="Abrir teclado" onClick={() => setShowKeyboard(true)} />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end items-center m-1">
            <div className="flex flex-col w-full items-end pr-4">
              <ScrollButton direction="up" />
              <ScrollButton direction="down" />
            </div>
            <div className="flex">
              <DirectionButton direction="up" />
            </div>
            <div className="flex">
              <DirectionButton direction="left" />
              <DirectionButton direction="down" />
              <DirectionButton direction="right" />
            </div>
          </div>
          <div className="flex">
            <MouseButton direction="left" />
            <MouseButton direction="right" />
          </div>
        </div>  
      </div>
    </Provider>
  );
}

export default App;
