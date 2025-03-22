
import { Player } from './playerData';

// Keys for local storage
const PLAYERS_STORAGE_KEY = 'gjakova-players';
const LAST_SYNC_KEY = 'gjakova-last-sync';

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
};
