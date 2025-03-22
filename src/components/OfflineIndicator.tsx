import React from 'react';
import { usePlayersContext } from '@/contexts/PlayersContext';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { getLastSyncTime } from '@/utils/localStorage';

const OfflineIndicator: React.FC = () => {
  const { isOnline, syncData } = usePlayersContext();
  const lastSync = getLastSyncTime();
  
  const formatLastSync = () => {
    if (!lastSync) return 'Never';
    
    try {
      const syncDate = new Date(lastSync);
      const isToday = new Date().toDateString() === syncDate.toDateString();
      
      if (isToday) {
        return `Today at ${syncDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      
      return syncDate.toLocaleDateString([], { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg flex items-center gap-2 transition-all ${isOnline ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'} backdrop-blur-md shadow-lg`}>
      {isOnline ? (
        <>
          <Wifi size={18} />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Online</span>
            <span className="text-xs opacity-80">Last sync: {formatLastSync()}</span>
          </div>
          <button 
            onClick={syncData}
            className="ml-1 text-xs bg-green-600/30 hover:bg-green-500/30 px-3 py-1 rounded flex items-center gap-1"
          >
            <RefreshCw size={14} />
            Sync
          </button>
        </>
      ) : (
        <>
          <WifiOff size={18} />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Offline</span>
            <span className="text-xs opacity-80">Working from local data</span>
          </div>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;
