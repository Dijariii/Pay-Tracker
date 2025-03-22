
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player, players as initialPlayers } from '@/utils/playerData';
import { toast } from 'sonner';
import { 
  savePlayersToLocalStorage, 
  getPlayersFromLocalStorage 
} from '@/utils/localStorage';

interface PlayersContextType {
  players: Player[];
  isLoading: boolean;
  isOnline: boolean;
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: number, updates: Partial<Omit<Player, 'id'>>) => void;
  deletePlayer: (id: number) => void;
  recordPayment: (playerId: number, paymentIndex: number) => void;
  syncData: () => void;
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const usePlayersContext = () => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error('usePlayersContext must be used within a PlayersProvider');
  }
  return context;
};

export const PlayersProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Online/offline status listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('You are back online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('You are offline. Changes will be saved locally.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load data from localStorage or use initial data
  useEffect(() => {
    const loadData = async () => {
      const storedPlayers = getPlayersFromLocalStorage();
      
      if (storedPlayers) {
        setPlayers(storedPlayers);
      } else {
        // Use initial data if nothing in localStorage
        setPlayers(initialPlayers);
      }
      
      setIsLoading(false);
    };

    // Simulate loading data with a slight delay for UX
    const timer = setTimeout(() => {
      loadData();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever players change
  useEffect(() => {
    if (!isLoading && players.length > 0) {
      savePlayersToLocalStorage(players);
    }
  }, [players, isLoading]);

  const addPlayer = (playerData: Omit<Player, 'id'>) => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    
    // Create payments for the current month
    const payments = [
      { month: currentMonth, year: currentYear, paid: false, amount: 25 }
    ];
    
    const newPlayer = {
      ...playerData,
      id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
      payments
    };
    
    setPlayers(prev => [...prev, newPlayer]);
    toast.success(`Player ${playerData.name} added successfully`);
  };

  const updatePlayer = (id: number, updates: Partial<Omit<Player, 'id'>>) => {
    setPlayers(prev => 
      prev.map(player => 
        player.id === id ? { ...player, ...updates } : player
      )
    );
    toast.success("Player updated successfully");
  };

  const deletePlayer = (id: number) => {
    // Find player name before deletion for the toast message
    const playerName = players.find(p => p.id === id)?.name || 'Player';
    
    setPlayers(prev => prev.filter(player => player.id !== id));
    toast.success(`${playerName} has been removed`);
  };

  const recordPayment = (playerId: number, paymentIndex: number) => {
    setPlayers(prev => 
      prev.map(player => {
        if (player.id === playerId) {
          const updatedPayments = [...player.payments];
          updatedPayments[paymentIndex] = {
            ...updatedPayments[paymentIndex],
            paid: true,
            date: new Date().toISOString().split('T')[0]
          };
          
          return {
            ...player,
            payments: updatedPayments
          };
        }
        return player;
      })
    );
    
    toast.success("Payment recorded successfully");
  };

  // Function to sync data with server (mock)
  const syncData = () => {
    if (!isOnline) {
      toast.error("Cannot sync while offline");
      return;
    }
    
    toast.success("Data synced successfully");
    // In a real app, this would sync with a backend
  };

  return (
    <PlayersContext.Provider value={{ 
      players, 
      isLoading,
      isOnline,
      addPlayer, 
      updatePlayer, 
      deletePlayer, 
      recordPayment,
      syncData
    }}>
      {children}
    </PlayersContext.Provider>
  );
};
