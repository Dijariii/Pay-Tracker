
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player, players as initialPlayers } from '@/utils/playerData';
import { toast } from 'sonner';

interface PlayersContextType {
  players: Player[];
  isLoading: boolean;
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: number, updates: Partial<Omit<Player, 'id'>>) => void;
  deletePlayer: (id: number) => void;
  recordPayment: (playerId: number, paymentIndex: number) => void;
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

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setPlayers(initialPlayers);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <PlayersContext.Provider value={{ 
      players, 
      isLoading, 
      addPlayer, 
      updatePlayer, 
      deletePlayer, 
      recordPayment 
    }}>
      {children}
    </PlayersContext.Provider>
  );
};
