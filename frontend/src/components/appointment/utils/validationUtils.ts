
/**
 * Validates if the provided string is a valid email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates if the provided string is a valid phone format
 * Allows formats like (123) 456-7890, 123-456-7890, 1234567890
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Checks if the date is a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Checks if the date is in the past
 */
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Checks if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

/**
 * Determines if a date should be disabled in the date picker
 */
export const isDateDisabled = (date: Date): boolean => {
  return isWeekend(date) || isPastDate(date);
};

/**
 * Formats a Date object to a readable string
 */
export const formatDate = (date: Date | undefined): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Converts a time string like "11:00 AM" to hour and minute components
 */
export const parseTimeString = (timeString: string): { hour: number, minute: number } => {
  const [timePart, amPm] = timeString.split(' ');
  let [hourStr, minuteStr] = timePart.split(':');
  
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  
  // Convert to 24-hour format
  if (amPm.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (amPm.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }
  
  return { hour, minute };
};

/**
 * Filters available times based on current time if the selected date is today
 */
export const filterAvailableTimes = (times: string[], selectedDate: Date | undefined): string[] => {
  if (!selectedDate || !isToday(selectedDate)) {
    return times;
  }
  
  // If date is today, filter out past times
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  return times.filter(timeSlot => {
    const { hour, minute } = parseTimeString(timeSlot);
    
    // Compare with current time
    if (hour < currentHour) {
      return false;
    } else if (hour === currentHour && minute <= currentMinute) {
      return false;
    }
    
    return true;
  });
};
