import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { MessageType } from '../types/game';

interface GameMessageProps {
  message: { text: string; type: MessageType };
}

const GameMessage: React.FC<GameMessageProps> = ({ message }) => {
  if (!message.text) return null;

  const getMessageStyle = (type: MessageType) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'danger':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800';
    }
  };

  const getIcon = (type: MessageType) => {
    const iconProps = { size: 20 };
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'danger':
        return <AlertCircle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  return (
    <div className="mb-6 flex justify-center">
      <div
        className={`
          max-w-md px-6 py-4 rounded-xl border-2 shadow-lg animate-bounce
          ${getMessageStyle(message.type)}
        `}
      >
        <div className="flex items-center gap-3">
          {getIcon(message.type)}
          <span className="font-semibold text-lg">{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default GameMessage;