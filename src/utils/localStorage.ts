
import { Player } from './playerData';

// Keys for local storage
const PLAYERS_STORAGE_KEY = 'gjakova-players';
const LAST_SYNC_KEY = 'gjakova-last-sync';
const ATTENDANCE_KEY = 'gjakova-attendance';

// Types
export interface AttendanceRecord {
  playerId: number;
  date: string;
  present: boolean;
  notes?: string;
}

// Save players to local storage
export const savePlayersToLocalStorage = (players: Player[]): void => {
  try {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Get players from local storage
export const getPlayersFromLocalStorage = (): Player[] | null => {
  try {
    const players = localStorage.getItem(PLAYERS_STORAGE_KEY);
    return players ? JSON.parse(players) : null;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
};

// Get last sync timestamp
export const getLastSyncTime = (): string | null => {
  return localStorage.getItem(LAST_SYNC_KEY);
};

// Clear local storage data
export const clearLocalStorage = (): void => {
  localStorage.removeItem(PLAYERS_STORAGE_KEY);
  localStorage.removeItem(LAST_SYNC_KEY);
  localStorage.removeItem(ATTENDANCE_KEY);
};

// Attendance tracking functions
export const saveAttendanceRecord = (record: AttendanceRecord): void => {
  try {
    const existingRecords = getAttendanceRecords() || [];
    // Check if record for this player and date already exists
    const index = existingRecords.findIndex(
      r => r.playerId === record.playerId && r.date === record.date
    );
    
    if (index !== -1) {
      // Update existing record
      existingRecords[index] = record;
    } else {
      // Add new record
      existingRecords.push(record);
    }
    
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(existingRecords));
  } catch (error) {
    console.error('Error saving attendance record:', error);
  }
};

export const getAttendanceRecords = (): AttendanceRecord[] | null => {
  try {
    const records = localStorage.getItem(ATTENDANCE_KEY);
    return records ? JSON.parse(records) : [];
  } catch (error) {
    console.error('Error retrieving attendance records:', error);
    return null;
  }
};

export const getPlayerAttendance = (playerId: number): AttendanceRecord[] => {
  const records = getAttendanceRecords() || [];
  return records.filter(record => record.playerId === playerId);
};

// Data export/import functions
export const exportData = (): string => {
  try {
    const data = {
      players: getPlayersFromLocalStorage(),
      attendance: getAttendanceRecords(),
      lastSync: getLastSyncTime()
    };
    
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error exporting data:', error);
    return JSON.stringify({ error: 'Failed to export data' });
  }
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.players) {
      savePlayersToLocalStorage(data.players);
    }
    
    if (data.attendance) {
      localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(data.attendance));
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
