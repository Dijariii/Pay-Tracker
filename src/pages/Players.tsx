
import React, { useState } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { Search, Filter, Plus, Tag } from 'lucide-react';
import { usePlayersContext } from '@/contexts/PlayersContext';
import AddPlayerDialog from '@/components/AddPlayerDialog';

const Players = () => {
  const { players, isLoading } = usePlayersContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'U7' | 'U9' | 'U11' | 'U13' | 'U15'>('all');
  const [addPlayerDialogOpen, setAddPlayerDialogOpen] = useState(false);

  // Filter players based on search, payment status, and category
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || player.category === filterCategory;
    
    if (filterStatus === 'all') return matchesSearch && matchesCategory;
    
    // Get latest payment
    const latestPayment = player.payments[player.payments.length - 1];
    
    if (filterStatus === 'paid') {
      return matchesSearch && matchesCategory && latestPayment.paid;
    }
    
    return matchesSearch && matchesCategory && !latestPayment.paid;
  });

  return (
    <div className="page-transition min-h-screen">
      {/* Page Content */}
      <div className="md:pl-72 pt-20 md:pt-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-gjakova-red/10 text-gjakova-red text-xs font-medium rounded-full mb-2">
              Players
            </div>
            <h1 className="text-3xl font-bold">Team Members</h1>
            <p className="text-white/60 mt-2">
              View and manage all players and their payment status.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-white/40" />
              </div>
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gjakova-gray/20 border border-gjakova-gray/20 rounded-lg focus:outline-none focus:border-gjakova-red/40 focus:ring-1 focus:ring-gjakova-red/20 text-white"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'paid' | 'unpaid')}
                  className="appearance-none pl-10 pr-8 py-3 bg-gjakova-gray/20 border border-gjakova-gray/20 rounded-lg focus:outline-none focus:border-gjakova-red/40 focus:ring-1 focus:ring-gjakova-red/20 text-white cursor-pointer"
                >
                  <option value="all">All Players</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-white/40" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as 'all' | 'U7' | 'U9' | 'U11' | 'U13' | 'U15')}
                  className="appearance-none pl-10 pr-8 py-3 bg-gjakova-gray/20 border border-gjakova-gray/20 rounded-lg focus:outline-none focus:border-gjakova-red/40 focus:ring-1 focus:ring-gjakova-red/20 text-white cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="U7">Under 7</option>
                  <option value="U9">Under 9</option>
                  <option value="U11">Under 11</option>
                  <option value="U13">Under 13</option>
                  <option value="U15">Under 15</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag size={18} className="text-white/40" />
                </div>
              </div>
              
              <button 
                className="py-3 px-4 bg-gjakova-red text-white rounded-lg hover:bg-gjakova-dark-red transition-colors duration-300 flex items-center gap-2"
                onClick={() => setAddPlayerDialogOpen(true)}
              >
                <Plus size={18} />
                <span>Add</span>
              </button>
            </div>
          </div>
          
          {/* Players Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="glass-card rounded-xl h-40 animate-pulse">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gjakova-gray/30"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gjakova-gray/30 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gjakova-gray/20 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredPlayers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlayers.map((player, index) => (
                    <div key={player.id} className="animate-scale-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <PlayerCard player={player} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 glass-card rounded-xl">
                  <Search size={48} className="text-white/20 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No players found</h3>
                  <p className="text-white/60 text-center max-w-md">
                    We couldn't find any players matching your search criteria. Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Add Player Dialog */}
      <AddPlayerDialog 
        open={addPlayerDialogOpen} 
        onOpenChange={setAddPlayerDialogOpen} 
      />
    </div>
  );
};

export default Players;
