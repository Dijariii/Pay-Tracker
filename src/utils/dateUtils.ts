
import { format, getMonth } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

// Format a date as YYYY-MM-DD
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Get current month name
export const getCurrentMonth = (): string => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentDate = new Date();
  return months[currentDate.getMonth()];
};

// Get Kosovo time (GMT+1)
export const getKosovoTime = (): Date => {
  // Use the current date and adjust to Kosovo timezone
  const kosovoTimeZone = 'Europe/Belgrade'; // Belgrade shares timezone with Kosovo
  const now = new Date();
  const kosovoTimeStr = formatInTimeZone(now, kosovoTimeZone, "yyyy-MM-dd'T'HH:mm:ss");
  return new Date(kosovoTimeStr);
};

// Format a date to a readable string
export const formatReadableDate = (date: Date): string => {
  const kosovoTimeZone = 'Europe/Belgrade'; // Belgrade shares timezone with Kosovo
  return formatInTimeZone(date, kosovoTimeZone, 'EEEE, d MMMM yyyy, HH:mm');
};

// Format for spreadsheet display
export const formatForSpreadsheet = (data: any[]): string => {
  // Create CSV string
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => 
    Object.values(item).map(value => 
      typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
    ).join(',')
  ).join('\n');
  
  return `${headers}\n${rows}`;
};
