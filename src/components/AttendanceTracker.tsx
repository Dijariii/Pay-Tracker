
import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, UserCheck, Search, Filter } from 'lucide-react';
import { usePlayersContext } from '@/contexts/PlayersContext';
import { AttendanceRecord, getAttendanceRecords, saveAttendanceRecord } from '@/utils/localStorage';
import { formatDate } from '@/utils/dateUtils';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

const AttendanceTracker: React.FC = () => {
  const { players } = usePlayersContext();
  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  
  // Calculate total attendance stats
  const attendanceStats = useMemo(() => {
    const todaysRecords = attendanceRecords.filter(r => r.date === date);
    const presentCount = todaysRecords.filter(r => r.present).length;
    const totalCount = players.length;
    const percentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
    
    return {
      present: presentCount,
      total: totalCount,
      percentage
    };
  }, [attendanceRecords, date, players]);
  
  useEffect(() => {
    // Load existing attendance records
    const records = getAttendanceRecords() || [];
    setAttendanceRecords(records);
    
    // Apply filters
    applyFilters();
  }, [players, searchQuery, categoryFilter]);
  
  const applyFilters = () => {
    let filtered = [...players];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(player.jerseyNumber).includes(searchQuery)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(player => player.category === categoryFilter);
    }
    
    setFilteredPlayers(filtered);
  };
  
  const getPlayerAttendance = (playerId: number): boolean => {
    const record = attendanceRecords.find(
      r => r.playerId === playerId && r.date === date
    );
    return record ? record.present : false;
  };
  
  const toggleAttendance = (playerId: number) => {
    const currentStatus = getPlayerAttendance(playerId);
    const newRecord: AttendanceRecord = {
      playerId,
      date,
      present: !currentStatus
    };
    
    // Save to localStorage
    saveAttendanceRecord(newRecord);
    
    // Update state
    const updatedRecords = [...attendanceRecords];
    const existingIndex = updatedRecords.findIndex(
      r => r.playerId === playerId && r.date === date
    );
    
    if (existingIndex !== -1) {
      updatedRecords[existingIndex] = newRecord;
    } else {
      updatedRecords.push(newRecord);
    }
    
    setAttendanceRecords(updatedRecords);
    toast.success(`Attendance ${!currentStatus ? 'marked' : 'unmarked'} for player`);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  
  // Get unique categories from players
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(players.map(player => player.category))];
    return ['all', ...uniqueCategories];
  }, [players]);
  
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Attendance Tracker</h2>
        <div className="flex items-center space-x-2">
          <Calendar size={18} className="text-white/70" />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="bg-gjakova-gray/20 border border-gjakova-gray/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-gjakova-red/40"
          />
        </div>
      </div>
      
      <div className="mb-4 bg-gjakova-gray/10 p-3 rounded-lg flex items-center justify-between">
        <div>
          <span className="text-sm text-white/60">Attendance:</span>
          <span className="ml-2 font-medium">{attendanceStats.present}/{attendanceStats.total} players</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full h-2 bg-gjakova-gray/30 rounded-full overflow-hidden w-24">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${attendanceStats.percentage}%` }}
            ></div>
          </div>
          <span className="text-xs">{attendanceStats.percentage}%</span>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
          <Input
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gjakova-gray/20 border-gjakova-gray/30"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-shrink-0 border-gjakova-gray/30 focus:ring-0">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gjakova-gray/95 border-gjakova-gray/30">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gjakova-gray/30" />
            {categories.map(category => (
              <DropdownMenuItem 
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`cursor-pointer ${categoryFilter === category ? 'bg-gjakova-red/20 text-gjakova-red' : ''}`}
              >
                {category === 'all' ? 'All Categories' : category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <div 
              key={player.id}
              className="flex items-center justify-between p-3 bg-gjakova-gray/10 hover:bg-gjakova-gray/20 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gjakova-gray/30 overflow-hidden">
                  {player.imageUrl ? (
                    <img 
                      src={player.imageUrl} 
                      alt={player.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/70">
                      {player.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-white/60">{player.category} • #{player.jerseyNumber}</p>
                </div>
              </div>
              
              <Button
                variant={getPlayerAttendance(player.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleAttendance(player.id)}
                className={getPlayerAttendance(player.id) 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "border-gjakova-gray/30 text-white/70 hover:bg-gjakova-gray/30"}
              >
                <UserCheck size={16} className="mr-1" />
                {getPlayerAttendance(player.id) ? 'Present' : 'Absent'}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-white/60">
            No players found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
