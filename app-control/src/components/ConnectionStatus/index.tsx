import { useApp } from "../../contexts/AppContext";

const ConnectionStatus: React.FC = () => {
  const { connectionStatus } = useApp();

  return (
    <div className="px-4 mt-2">
      <span>Status da conexão: {connectionStatus}</span>
    </div>
  );
};

export default ConnectionStatus;
