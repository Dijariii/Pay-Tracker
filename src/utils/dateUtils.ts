
// Format a date as YYYY-MM-DD
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
  const now = new Date();
  // Kosovo is in GMT+1 (Central European Time)
  // During standard time; CET is UTC+1
  const kosovoOffset = 1 * 60; // minutes
  const localOffset = now.getTimezoneOffset(); // minutes
  
  // Calculate the total offset in minutes from local time to Kosovo time
  const totalOffsetMinutes = localOffset + kosovoOffset;
  
  // Apply the offset to the current time
  return new Date(now.getTime() + totalOffsetMinutes * 60 * 1000);
};

// Format a date to a readable string
export const formatReadableDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Belgrade' // Belgrade time is the same as Kosovo time
  });
};
