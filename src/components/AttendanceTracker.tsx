
import React, { useState, useEffect } from 'react';
import { Calendar, UserCheck, Search } from 'lucide-react';
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

const AttendanceTracker: React.FC = () => {
  const { players } = usePlayersContext();
  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  
  useEffect(() => {
    // Load existing attendance records
    const records = getAttendanceRecords() || [];
    setAttendanceRecords(records);
    
    // Filter players based on search
    setFilteredPlayers(players.filter(player => 
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [players, searchQuery]);
  
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
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
          <Input
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gjakova-gray/20 border-gjakova-gray/30"
          />
        </div>
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
