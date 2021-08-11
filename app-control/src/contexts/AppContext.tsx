import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { SocketData } from '../types';

export interface IAppContext {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  emit: (event: string, data: SocketData) => void;
  connectionStatus: string;
}

const AppContext = React.createContext<IAppContext>({} as IAppContext);

export const Provider: React.FC = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState('');
  
  const socket = useRef(io()).current;

  const emit = (event: string,data: SocketData) => {
    socket.emit(event, data);
  };
  
  const context: IAppContext = {
    socket,
    emit,
    connectionStatus,
  };

  useEffect(() => {
    socket.on('connect', () => {
      setConnectionStatus('conectado');

      toast.success('Você está conectado ao seu computador!', {
        position: toast.POSITION.TOP_CENTER,
      });
    });

    socket.on('connect_error', () => {
      setConnectionStatus('desconectado');

      toast.error('Houve um erro na conexão!', {
        position: toast.POSITION.TOP_CENTER,
        delay: 5,
      });
    });
  }, []);

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  return useContext(AppContext);
}

