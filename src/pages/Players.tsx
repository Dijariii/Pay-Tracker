
import React, { useState, useEffect } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { Search, Filter, Plus, Tag, SlidersHorizontal, X } from 'lucide-react';
import { usePlayersContext } from '@/contexts/PlayersContext';
import AddPlayerDialog from '@/components/AddPlayerDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AttendanceTracker from '@/components/AttendanceTracker';
import ImportExportData from '@/components/ImportExportData';

const Players = () => {
  const { players, isLoading, searchPlayers } = usePlayersContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'U7' | 'U9' | 'U11' | 'U13' | 'U15'>('all');
  const [addPlayerDialogOpen, setAddPlayerDialogOpen] = useState(false);
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Re-filter when any filter changes or when players change
  useEffect(() => {
    // Use the searchPlayers function from context
    const filtered = searchPlayers(searchQuery, {
      category: filterCategory,
      paymentStatus: filterStatus
    });
    setFilteredPlayers(filtered);
  }, [searchQuery, filterStatus, filterCategory, players, searchPlayers]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterCategory('all');
  };

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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-white/40" />
              </div>
              <Input
                type="text"
                placeholder="Search players by name, position, or jersey number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-6 h-auto bg-gjakova-gray/20 border border-gjakova-gray/20 text-white"
              />
              {searchQuery && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gjakova-gray/30 bg-gjakova-gray/20">
                    <SlidersHorizontal size={16} className="mr-2" />
                    Filters
                    {(filterStatus !== 'all' || filterCategory !== 'all') && (
                      <span className="ml-2 h-5 w-5 rounded-full bg-gjakova-red text-white text-xs flex items-center justify-center">
                        {(filterStatus !== 'all' ? 1 : 0) + (filterCategory !== 'all' ? 1 : 0)}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-background border-gjakova-gray/30 p-0" align="end">
                  <div className="bg-gjakova-gray/10 p-4 border-b border-gjakova-gray/20">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">Filters</h3>
                      {(filterStatus !== 'all' || filterCategory !== 'all') && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                          Clear all
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Payment Status</label>
                      <Select 
                        value={filterStatus} 
                        onValueChange={(value) => setFilterStatus(value as 'all' | 'paid' | 'unpaid')}
                      >
                        <SelectTrigger className="bg-gjakova-gray/10 border-gjakova-gray/30">
                          <SelectValue placeholder="All Players" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-gjakova-gray/30">
                          <SelectItem value="all">All Players</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select 
                        value={filterCategory} 
                        onValueChange={(value) => setFilterCategory(value as 'all' | 'U7' | 'U9' | 'U11' | 'U13' | 'U15')}
                      >
                        <SelectTrigger className="bg-gjakova-gray/10 border-gjakova-gray/30">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-gjakova-gray/30">
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="U7">Under 7</SelectItem>
                          <SelectItem value="U9">Under 9</SelectItem>
                          <SelectItem value="U11">Under 11</SelectItem>
                          <SelectItem value="U13">Under 13</SelectItem>
                          <SelectItem value="U15">Under 15</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="default"
                className="bg-gjakova-red text-white hover:bg-gjakova-dark-red"
                onClick={() => setAddPlayerDialogOpen(true)}
              >
                <Plus size={18} className="mr-1" />
                <span>Add Player</span>
              </Button>
            </div>
          </div>
          
          {/* Toggle for advanced features */}
          <div className="flex justify-end mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-white/70 hover:text-white"
            >
              {showAdvanced ? 'Hide Advanced Features' : 'Show Advanced Features'}
            </Button>
          </div>
          
          {/* Advanced Features Section */}
          {showAdvanced && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <AttendanceTracker />
              <ImportExportData />
            </div>
          )}
          
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
                  
                  {(searchQuery || filterStatus !== 'all' || filterCategory !== 'all') && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="mt-4 border-gjakova-gray/30"
                    >
                      Clear Filters
                    </Button>
                  )}
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
