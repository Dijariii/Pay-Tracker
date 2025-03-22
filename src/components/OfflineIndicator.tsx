
import React from 'react';
import { usePlayersContext } from '@/contexts/PlayersContext';
import { Wifi, WifiOff } from 'lucide-react';

const OfflineIndicator: React.FC = () => {
  const { isOnline, syncData } = usePlayersContext();

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${isOnline ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
      {isOnline ? (
        <>
          <Wifi size={18} />
          <span className="text-sm font-medium">Online</span>
          <button 
            onClick={syncData}
            className="ml-1 text-xs bg-green-600/30 hover:bg-green-500/30 px-2 py-0.5 rounded"
          >
            Sync
          </button>
        </>
      ) : (
        <>
          <WifiOff size={18} />
          <span className="text-sm font-medium">Offline</span>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;
